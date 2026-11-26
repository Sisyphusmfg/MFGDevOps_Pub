-- 0001_spaces (up): accounts, spaces and saved records for purpose.sisyphusdev.com.
-- Design: Workstreams/Sisyphusdev_Site/POSIWID_Design_Purpose_Accounts.md
-- Decisions: SDEV-D-14 (spaces + row-level security), SDEV-D-15 (own org/team tables),
-- SDEV-D-17 (org owners and admins see every team), SDEV-D-19 (Marc approves accounts).
-- Back path: 0001_spaces.down.sql.
--
-- The API connects as a login role that is a member of app_api. app_api owns nothing and
-- does not bypass row-level security, so every policy below applies to every API query.
-- The API sets the signed-in user per transaction:
--   SELECT set_config('app.user_id', '<uuid from the verified JWT>', true);
-- No user id set = anonymous: only an access request can be inserted.
-- Statements are separated by "--;" lines so tools can run them one by one.

CREATE ROLE app_api NOLOGIN NOINHERIT;
--;
GRANT app_api TO CURRENT_USER WITH INHERIT FALSE, SET TRUE;
--;
CREATE SCHEMA app;
--;
GRANT USAGE ON SCHEMA app TO app_api;
--;
-- Who is calling. NULL when no user is set.
CREATE FUNCTION app.current_user_id() RETURNS uuid
LANGUAGE sql STABLE AS $$
  SELECT NULLIF(current_setting('app.user_id', true), '')::uuid
$$;
--;
CREATE TABLE app.platform_admin (
  user_id    uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
--;
CREATE TABLE app.organization (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 120),
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
--;
CREATE TABLE app.org_member (
  org_id     uuid NOT NULL REFERENCES app.organization(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL,
  role       text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (org_id, user_id)
);
--;
CREATE TABLE app.team (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id     uuid NOT NULL REFERENCES app.organization(id) ON DELETE CASCADE,
  name       text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 120),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (org_id, name)
);
--;
CREATE TABLE app.team_member (
  team_id    uuid NOT NULL REFERENCES app.team(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (team_id, user_id)
);
--;
-- Where records live: one personal space per user, one space per team.
CREATE TABLE app.space (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind       text NOT NULL CHECK (kind IN ('personal', 'team')),
  user_id    uuid UNIQUE,
  team_id    uuid UNIQUE REFERENCES app.team(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((kind = 'personal' AND user_id IS NOT NULL AND team_id IS NULL)
      OR (kind = 'team'     AND team_id IS NOT NULL AND user_id IS NULL))
);
--;
CREATE TABLE app.record (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id   uuid NOT NULL REFERENCES app.space(id) ON DELETE CASCADE,
  app        text NOT NULL CHECK (app IN ('posiwid', 'design', 'goal')),
  title      text NOT NULL DEFAULT '' CHECK (length(title) <= 200),
  data       jsonb NOT NULL,
  created_by uuid NOT NULL,
  updated_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  version    integer NOT NULL DEFAULT 1
);
--;
CREATE INDEX record_space_app ON app.record (space_id, app, updated_at DESC);
--;
-- SDEV-D-19: nobody gets an account without Marc's approval. A request can name an
-- organization to join (org_id, org_role), when an organization admin asked on someone's behalf.
CREATE TABLE app.access_request (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email        text NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 254),
  name         text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 120),
  reason       text NOT NULL DEFAULT '' CHECK (length(reason) <= 1000),
  org_name     text NOT NULL DEFAULT '' CHECK (length(org_name) <= 120),
  org_id       uuid REFERENCES app.organization(id) ON DELETE SET NULL,
  org_role     text CHECK (org_role IN ('admin', 'member')),
  requested_by uuid,
  status       text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
  decided_by   uuid,
  decided_at   timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now(),
  CHECK ((status = 'pending') = (decided_by IS NULL AND decided_at IS NULL))
);
--;
CREATE UNIQUE INDEX access_request_one_pending ON app.access_request (lower(email)) WHERE status = 'pending';
--;
CREATE TABLE app.audit (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  at         timestamptz NOT NULL DEFAULT now(),
  actor      uuid,
  action     text NOT NULL,
  detail     jsonb NOT NULL DEFAULT '{}'::jsonb
);
--;
-- Access helpers. SECURITY DEFINER so policies can read membership without recursing
-- through the membership tables' own policies; search_path is pinned.
CREATE FUNCTION app.is_platform_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = app, pg_temp AS $$
  SELECT EXISTS (SELECT 1 FROM app.platform_admin WHERE user_id = app.current_user_id())
$$;
--;
CREATE FUNCTION app.org_role_of(p_org uuid) RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = app, pg_temp AS $$
  SELECT role FROM app.org_member WHERE org_id = p_org AND user_id = app.current_user_id()
$$;
--;
CREATE FUNCTION app.is_org_member(p_org uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = app, pg_temp AS $$
  SELECT app.org_role_of(p_org) IS NOT NULL
$$;
--;
CREATE FUNCTION app.is_org_admin(p_org uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = app, pg_temp AS $$
  SELECT coalesce(app.org_role_of(p_org) IN ('owner', 'admin'), false)
$$;
--;
-- The one access rule (design § 4): own personal space; or a team you are on while still
-- in its organization; or any team of an organization you own or administer (SDEV-D-17).
CREATE FUNCTION app.can_access(p_space uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = app, pg_temp AS $$
  SELECT EXISTS (
    SELECT 1 FROM app.space s
    WHERE s.id = p_space
      AND app.current_user_id() IS NOT NULL
      AND (
        (s.kind = 'personal' AND s.user_id = app.current_user_id())
        OR (s.kind = 'team' AND EXISTS (
              SELECT 1 FROM app.team t
              WHERE t.id = s.team_id
                AND (
                  app.is_org_admin(t.org_id)
                  OR (app.is_org_member(t.org_id) AND EXISTS (
                        SELECT 1 FROM app.team_member tm
                        WHERE tm.team_id = t.id AND tm.user_id = app.current_user_id()))
                )))
      )
  )
$$;
--;
-- Each team gets its space when it is created.
CREATE FUNCTION app.team_space() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = app, pg_temp AS $$
BEGIN
  INSERT INTO app.space (kind, team_id) VALUES ('team', NEW.id);
  RETURN NEW;
END $$;
--;
CREATE TRIGGER team_space AFTER INSERT ON app.team FOR EACH ROW EXECUTE FUNCTION app.team_space();
--;
-- A team member must belong to the team's organization.
CREATE FUNCTION app.team_member_in_org() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = app, pg_temp AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM app.org_member m JOIN app.team t ON t.org_id = m.org_id
                 WHERE t.id = NEW.team_id AND m.user_id = NEW.user_id) THEN
    RAISE EXCEPTION 'user is not a member of this team''s organization';
  END IF;
  RETURN NEW;
END $$;
--;
CREATE TRIGGER team_member_in_org BEFORE INSERT OR UPDATE ON app.team_member
FOR EACH ROW EXECUTE FUNCTION app.team_member_in_org();
--;
-- An organization always keeps at least one owner. Leaving an organization also removes
-- its team memberships.
CREATE FUNCTION app.org_member_guard() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = app, pg_temp AS $$
BEGIN
  IF OLD.role = 'owner' AND (TG_OP = 'DELETE' OR NEW.role <> 'owner')
     AND EXISTS (SELECT 1 FROM app.organization WHERE id = OLD.org_id)
     AND NOT EXISTS (SELECT 1 FROM app.org_member
                     WHERE org_id = OLD.org_id AND role = 'owner' AND user_id <> OLD.user_id) THEN
    RAISE EXCEPTION 'an organization must keep at least one owner';
  END IF;
  IF TG_OP = 'DELETE' THEN
    DELETE FROM app.team_member tm USING app.team t
    WHERE tm.team_id = t.id AND t.org_id = OLD.org_id AND tm.user_id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NEW;
END $$;
--;
CREATE TRIGGER org_member_guard BEFORE UPDATE OR DELETE ON app.org_member
FOR EACH ROW EXECUTE FUNCTION app.org_member_guard();
--;
-- Only owners grant or hold the owner role; admins manage admins and members.
CREATE FUNCTION app.org_member_role_check() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = app, pg_temp AS $$
BEGIN
  IF app.current_user_id() IS NOT NULL
     AND (NEW.role = 'owner' OR (TG_OP = 'UPDATE' AND OLD.role = 'owner'))
     AND coalesce(app.org_role_of(NEW.org_id), '') <> 'owner' THEN
    RAISE EXCEPTION 'only an owner can grant or change the owner role';
  END IF;
  RETURN NEW;
END $$;
--;
CREATE TRIGGER org_member_role_check BEFORE INSERT OR UPDATE ON app.org_member
FOR EACH ROW EXECUTE FUNCTION app.org_member_role_check();
--;
-- Record bookkeeping: who saved, when, and optimistic-lock version.
CREATE FUNCTION app.record_stamp() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_by := coalesce(app.current_user_id(), NEW.created_by);
    NEW.updated_by := NEW.created_by;
    NEW.version := 1;
  ELSE
    NEW.created_by := OLD.created_by;
    NEW.created_at := OLD.created_at;
    NEW.updated_by := coalesce(app.current_user_id(), NEW.updated_by);
    NEW.version := OLD.version + 1;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END $$;
--;
CREATE TRIGGER record_stamp BEFORE INSERT OR UPDATE ON app.record
FOR EACH ROW EXECUTE FUNCTION app.record_stamp();
--;
-- Signed-in user: make sure their personal space exists; returns its id.
CREATE FUNCTION app.ensure_personal_space() RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = app, pg_temp AS $$
DECLARE v uuid;
BEGIN
  IF app.current_user_id() IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  INSERT INTO app.space (kind, user_id) VALUES ('personal', app.current_user_id())
  ON CONFLICT (user_id) DO NOTHING;
  SELECT id INTO v FROM app.space WHERE user_id = app.current_user_id();
  RETURN v;
END $$;
--;
-- Signed-in user: create an organization and become its owner.
CREATE FUNCTION app.create_organization(p_name text) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = app, pg_temp AS $$
DECLARE v uuid;
BEGIN
  IF app.current_user_id() IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  INSERT INTO app.organization (name, created_by) VALUES (p_name, app.current_user_id()) RETURNING id INTO v;
  -- Insert as the definer with no role check: the creator is the first owner.
  PERFORM set_config('app.bootstrap_owner', 'on', true);
  INSERT INTO app.org_member (org_id, user_id, role) VALUES (v, app.current_user_id(), 'owner');
  PERFORM set_config('app.bootstrap_owner', '', true);
  INSERT INTO app.audit (actor, action, detail) VALUES (app.current_user_id(), 'org.create', jsonb_build_object('org_id', v));
  RETURN v;
END $$;
--;
-- Let create_organization's first owner through the role check.
CREATE OR REPLACE FUNCTION app.org_member_role_check() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = app, pg_temp AS $$
BEGIN
  IF current_setting('app.bootstrap_owner', true) = 'on' THEN RETURN NEW; END IF;
  IF app.current_user_id() IS NOT NULL
     AND (NEW.role = 'owner' OR (TG_OP = 'UPDATE' AND OLD.role = 'owner'))
     AND coalesce(app.org_role_of(NEW.org_id), '') <> 'owner' THEN
    RAISE EXCEPTION 'only an owner can grant or change the owner role';
  END IF;
  RETURN NEW;
END $$;
--;
-- Row-level security. app_api never owns these tables, so the policies always apply.
ALTER TABLE app.platform_admin ENABLE ROW LEVEL SECURITY;
--;
ALTER TABLE app.organization   ENABLE ROW LEVEL SECURITY;
--;
ALTER TABLE app.org_member     ENABLE ROW LEVEL SECURITY;
--;
ALTER TABLE app.team           ENABLE ROW LEVEL SECURITY;
--;
ALTER TABLE app.team_member    ENABLE ROW LEVEL SECURITY;
--;
ALTER TABLE app.space          ENABLE ROW LEVEL SECURITY;
--;
ALTER TABLE app.record         ENABLE ROW LEVEL SECURITY;
--;
ALTER TABLE app.access_request ENABLE ROW LEVEL SECURITY;
--;
ALTER TABLE app.audit          ENABLE ROW LEVEL SECURITY;
--;
CREATE POLICY platform_admin_self ON app.platform_admin FOR SELECT TO app_api USING (user_id = app.current_user_id());
--;
CREATE POLICY org_read   ON app.organization FOR SELECT TO app_api USING (app.is_org_member(id));
--;
CREATE POLICY org_update ON app.organization FOR UPDATE TO app_api USING (app.is_org_admin(id)) WITH CHECK (app.is_org_admin(id));
--;
CREATE POLICY org_delete ON app.organization FOR DELETE TO app_api USING (app.org_role_of(id) = 'owner');
--;
CREATE POLICY member_read   ON app.org_member FOR SELECT TO app_api USING (app.is_org_member(org_id));
--;
CREATE POLICY member_insert ON app.org_member FOR INSERT TO app_api WITH CHECK (app.is_org_admin(org_id));
--;
CREATE POLICY member_update ON app.org_member FOR UPDATE TO app_api USING (app.is_org_admin(org_id)) WITH CHECK (app.is_org_admin(org_id));
--;
CREATE POLICY member_delete ON app.org_member FOR DELETE TO app_api USING (app.is_org_admin(org_id) OR user_id = app.current_user_id());
--;
CREATE POLICY team_read  ON app.team FOR SELECT TO app_api USING (app.is_org_member(org_id));
--;
CREATE POLICY team_write ON app.team FOR ALL    TO app_api USING (app.is_org_admin(org_id)) WITH CHECK (app.is_org_admin(org_id));
--;
CREATE POLICY team_member_read ON app.team_member FOR SELECT TO app_api
  USING (EXISTS (SELECT 1 FROM app.team t WHERE t.id = team_id AND app.is_org_member(t.org_id)));
--;
CREATE POLICY team_member_write ON app.team_member FOR ALL TO app_api
  USING (EXISTS (SELECT 1 FROM app.team t WHERE t.id = team_id AND app.is_org_admin(t.org_id)))
  WITH CHECK (EXISTS (SELECT 1 FROM app.team t WHERE t.id = team_id AND app.is_org_admin(t.org_id)));
--;
CREATE POLICY space_read ON app.space FOR SELECT TO app_api USING (app.can_access(id));
--;
CREATE POLICY record_read   ON app.record FOR SELECT TO app_api USING (app.can_access(space_id));
--;
CREATE POLICY record_insert ON app.record FOR INSERT TO app_api WITH CHECK (app.can_access(space_id));
--;
CREATE POLICY record_update ON app.record FOR UPDATE TO app_api USING (app.can_access(space_id)) WITH CHECK (app.can_access(space_id));
--;
CREATE POLICY record_delete ON app.record FOR DELETE TO app_api USING (app.can_access(space_id));
--;
-- Anyone (no user id needed) may file a pending request; only platform admins see or decide them.
CREATE POLICY request_insert ON app.access_request FOR INSERT TO app_api
  WITH CHECK (status = 'pending' AND decided_by IS NULL
              AND (org_id IS NULL OR app.is_org_admin(org_id))
              AND (requested_by IS NULL OR requested_by = app.current_user_id()));
--;
CREATE POLICY request_admin_read   ON app.access_request FOR SELECT TO app_api USING (app.is_platform_admin());
--;
CREATE POLICY request_admin_decide ON app.access_request FOR UPDATE TO app_api USING (app.is_platform_admin()) WITH CHECK (app.is_platform_admin());
--;
CREATE POLICY audit_admin_read ON app.audit FOR SELECT TO app_api USING (app.is_platform_admin());
--;
-- Grants: the least app_api needs. No grant = no access, whatever the policies say.
GRANT SELECT ON app.platform_admin TO app_api;
--;
GRANT SELECT, UPDATE, DELETE ON app.organization TO app_api;
--;
GRANT SELECT, INSERT, UPDATE, DELETE ON app.org_member, app.team, app.team_member TO app_api;
--;
GRANT SELECT ON app.space TO app_api;
--;
GRANT SELECT, INSERT, DELETE ON app.record TO app_api;
--;
GRANT UPDATE (title, data, space_id) ON app.record TO app_api;
--;
GRANT INSERT (email, name, reason, org_name, org_id, org_role, requested_by) ON app.access_request TO app_api;
--;
GRANT SELECT, UPDATE (status, decided_by, decided_at) ON app.access_request TO app_api;
--;
GRANT SELECT ON app.audit TO app_api;
--;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA app FROM PUBLIC;
--;
GRANT EXECUTE ON FUNCTION app.current_user_id(), app.is_platform_admin(), app.org_role_of(uuid),
  app.is_org_member(uuid), app.is_org_admin(uuid), app.can_access(uuid),
  app.ensure_personal_space(), app.create_organization(text) TO app_api;
