-- Isolation tests for 0001_spaces (design O6). Run as the database owner, on a branch,
-- never on a database that holds real users' data. Each check raises an exception on
-- failure, so the run stops at the first leak. The last statement returns 'all passed'.
-- Statements are separated by "--;" lines; run them in order in one session or transaction.
--
-- People (fixed test ids):
--   A  aaaaaaaa-…-0001  individual        B  bbbbbbbb-…-0002  individual
--   O  00000000-…-0003  org owner         D  dddddddd-…-0004  org admin
--   M  11111111-…-0005  member, team 1    N  22222222-…-0006  member, team 2
--   P  99999999-…-0009  platform admin

-- Clean any earlier run (owner bypasses row-level security).
DELETE FROM app.organization WHERE name = 'Test Org (isolation)';
--;
DELETE FROM app.space WHERE user_id IN ('aaaaaaaa-0000-0000-0000-000000000001','bbbbbbbb-0000-0000-0000-000000000002');
--;
DELETE FROM app.platform_admin WHERE user_id = '99999999-0000-0000-0000-000000000009';
--;
DELETE FROM app.access_request WHERE email LIKE '%@isolation.test';
--;
-- Setup as owner.
INSERT INTO app.platform_admin (user_id) VALUES ('99999999-0000-0000-0000-000000000009');
--;
INSERT INTO app.space (id, kind, user_id) VALUES
  ('a0000000-0000-0000-0000-00000000000a', 'personal', 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-00000000000b', 'personal', 'bbbbbbbb-0000-0000-0000-000000000002');
--;
INSERT INTO app.organization (id, name, created_by) VALUES
  ('0e000000-0000-0000-0000-0000000000e0', 'Test Org (isolation)', '00000000-0000-0000-0000-000000000003');
--;
INSERT INTO app.org_member (org_id, user_id, role) VALUES
  ('0e000000-0000-0000-0000-0000000000e0', '00000000-0000-0000-0000-000000000003', 'owner'),
  ('0e000000-0000-0000-0000-0000000000e0', 'dddddddd-0000-0000-0000-000000000004', 'admin'),
  ('0e000000-0000-0000-0000-0000000000e0', '11111111-0000-0000-0000-000000000005', 'member'),
  ('0e000000-0000-0000-0000-0000000000e0', '22222222-0000-0000-0000-000000000006', 'member');
--;
INSERT INTO app.team (id, org_id, name) VALUES
  ('71000000-0000-0000-0000-000000000071', '0e000000-0000-0000-0000-0000000000e0', 'Team 1'),
  ('72000000-0000-0000-0000-000000000072', '0e000000-0000-0000-0000-0000000000e0', 'Team 2');
--;
INSERT INTO app.team_member (team_id, user_id) VALUES
  ('71000000-0000-0000-0000-000000000071', '11111111-0000-0000-0000-000000000005'),
  ('72000000-0000-0000-0000-000000000072', '22222222-0000-0000-0000-000000000006');
--;
INSERT INTO app.record (id, space_id, app, title, data, created_by, updated_by)
SELECT v.id::uuid, v.space::uuid, 'posiwid', v.title, '{}'::jsonb, v.who::uuid, v.who::uuid FROM (VALUES
  ('a1000000-0000-0000-0000-0000000000a1', 'a0000000-0000-0000-0000-00000000000a', 'A private', 'aaaaaaaa-0000-0000-0000-000000000001'),
  ('b1000000-0000-0000-0000-0000000000b1', 'b0000000-0000-0000-0000-00000000000b', 'B private', 'bbbbbbbb-0000-0000-0000-000000000002')) AS v(id, space, title, who);
--;
INSERT INTO app.record (id, space_id, app, title, data, created_by, updated_by)
SELECT 'c1000000-0000-0000-0000-0000000000c1'::uuid, s.id, 'goal', 'Team 1 goal', '{}'::jsonb,
       '11111111-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000005'
FROM app.space s WHERE s.team_id = '71000000-0000-0000-0000-000000000071';
--;
INSERT INTO app.record (id, space_id, app, title, data, created_by, updated_by)
SELECT 'c2000000-0000-0000-0000-0000000000c2'::uuid, s.id, 'design', 'Team 2 design', '{}'::jsonb,
       '22222222-0000-0000-0000-000000000006', '22222222-0000-0000-0000-000000000006'
FROM app.space s WHERE s.team_id = '72000000-0000-0000-0000-000000000072';
--;
-- From here on, act as the API role.
SET ROLE app_api;
--;
-- 1. A sees exactly A's record.
DO $$ DECLARE n int; BEGIN
  PERFORM set_config('app.user_id', 'aaaaaaaa-0000-0000-0000-000000000001', false);
  SELECT count(*) INTO n FROM app.record;
  IF n <> 1 OR NOT EXISTS (SELECT 1 FROM app.record WHERE title = 'A private') THEN
    RAISE EXCEPTION 'T1 failed: A sees % records', n; END IF;
END $$;
--;
-- 2. B cannot read, change, delete or write into A's space.
DO $$ DECLARE n int; BEGIN
  PERFORM set_config('app.user_id', 'bbbbbbbb-0000-0000-0000-000000000002', false);
  SELECT count(*) INTO n FROM app.record WHERE id = 'a1000000-0000-0000-0000-0000000000a1';
  IF n <> 0 THEN RAISE EXCEPTION 'T2a failed: B reads A''s record'; END IF;
  UPDATE app.record SET title = 'hacked' WHERE id = 'a1000000-0000-0000-0000-0000000000a1';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 0 THEN RAISE EXCEPTION 'T2b failed: B updated A''s record'; END IF;
  DELETE FROM app.record WHERE id = 'a1000000-0000-0000-0000-0000000000a1';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 0 THEN RAISE EXCEPTION 'T2c failed: B deleted A''s record'; END IF;
  BEGIN
    INSERT INTO app.record (space_id, app, data, created_by, updated_by)
    VALUES ('a0000000-0000-0000-0000-00000000000a', 'posiwid', '{}', 'bbbbbbbb-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000002');
    RAISE EXCEPTION 'T2d failed: B wrote into A''s space';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN
    UPDATE app.record SET space_id = 'a0000000-0000-0000-0000-00000000000a' WHERE id = 'b1000000-0000-0000-0000-0000000000b1';
    RAISE EXCEPTION 'T2e failed: B moved a record into A''s space';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  SELECT count(*) INTO n FROM app.space;
  IF n <> 1 THEN RAISE EXCEPTION 'T2f failed: B sees % spaces', n; END IF;
END $$;
--;
-- 3. Team members see their own team only, and no personal records.
DO $$ DECLARE n int; BEGIN
  PERFORM set_config('app.user_id', '11111111-0000-0000-0000-000000000005', false);
  SELECT count(*) INTO n FROM app.record;
  IF n <> 1 OR NOT EXISTS (SELECT 1 FROM app.record WHERE title = 'Team 1 goal') THEN
    RAISE EXCEPTION 'T3a failed: team 1 member sees % records', n; END IF;
  PERFORM set_config('app.user_id', '22222222-0000-0000-0000-000000000006', false);
  SELECT count(*) INTO n FROM app.record;
  IF n <> 1 OR NOT EXISTS (SELECT 1 FROM app.record WHERE title = 'Team 2 design') THEN
    RAISE EXCEPTION 'T3b failed: team 2 member sees % records', n; END IF;
END $$;
--;
-- 4. Org owner and admin see every team's records (SDEV-D-17), and no personal records.
DO $$ DECLARE n int; BEGIN
  PERFORM set_config('app.user_id', 'dddddddd-0000-0000-0000-000000000004', false);
  SELECT count(*) INTO n FROM app.record;
  IF n <> 2 THEN RAISE EXCEPTION 'T4a failed: admin sees % records', n; END IF;
  PERFORM set_config('app.user_id', '00000000-0000-0000-0000-000000000003', false);
  SELECT count(*) INTO n FROM app.record;
  IF n <> 2 THEN RAISE EXCEPTION 'T4b failed: owner sees % records', n; END IF;
END $$;
--;
-- 5. A plain member can't manage teams or members, or join another team.
DO $$ BEGIN
  PERFORM set_config('app.user_id', '11111111-0000-0000-0000-000000000005', false);
  BEGIN
    INSERT INTO app.team (org_id, name) VALUES ('0e000000-0000-0000-0000-0000000000e0', 'Rogue');
    RAISE EXCEPTION 'T5a failed: member created a team';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN
    INSERT INTO app.team_member (team_id, user_id) VALUES ('72000000-0000-0000-0000-000000000072', '11111111-0000-0000-0000-000000000005');
    RAISE EXCEPTION 'T5b failed: member joined team 2';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN
    INSERT INTO app.org_member (org_id, user_id, role) VALUES ('0e000000-0000-0000-0000-0000000000e0', 'bbbbbbbb-0000-0000-0000-000000000002', 'member');
    RAISE EXCEPTION 'T5c failed: member added someone to the organization';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
--;
-- 6. An admin can't grant the owner role; the last owner can't leave.
DO $$ BEGIN
  PERFORM set_config('app.user_id', 'dddddddd-0000-0000-0000-000000000004', false);
  BEGIN
    UPDATE app.org_member SET role = 'owner' WHERE user_id = 'dddddddd-0000-0000-0000-000000000004';
    RAISE EXCEPTION 'T6a failed: admin made themselves owner';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM LIKE 'T6a%' THEN RAISE; END IF;
  END;
  PERFORM set_config('app.user_id', '00000000-0000-0000-0000-000000000003', false);
  BEGIN
    DELETE FROM app.org_member WHERE user_id = '00000000-0000-0000-0000-000000000003';
    RAISE EXCEPTION 'T6b failed: last owner left';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM LIKE 'T6b%' THEN RAISE; END IF;
  END;
END $$;
--;
-- 7. Saving stamps the caller and bumps the version.
DO $$ DECLARE r record; BEGIN
  PERFORM set_config('app.user_id', 'aaaaaaaa-0000-0000-0000-000000000001', false);
  UPDATE app.record SET title = 'A private v2' WHERE id = 'a1000000-0000-0000-0000-0000000000a1';
  SELECT version, updated_by INTO r FROM app.record WHERE id = 'a1000000-0000-0000-0000-0000000000a1';
  IF r.version <> 2 OR r.updated_by <> 'aaaaaaaa-0000-0000-0000-000000000001' THEN
    RAISE EXCEPTION 'T7 failed: version %, updated_by %', r.version, r.updated_by; END IF;
END $$;
--;
-- 8. Removing a member from the organization removes team access at once.
DO $$ DECLARE n int; BEGIN
  PERFORM set_config('app.user_id', 'dddddddd-0000-0000-0000-000000000004', false);
  DELETE FROM app.org_member WHERE user_id = '11111111-0000-0000-0000-000000000005';
  PERFORM set_config('app.user_id', '11111111-0000-0000-0000-000000000005', false);
  SELECT count(*) INTO n FROM app.record;
  IF n <> 0 THEN RAISE EXCEPTION 'T8 failed: removed member still sees % records', n; END IF;
END $$;
--;
-- 9. Anonymous: no records; can file a request; can't read requests.
DO $$ DECLARE n int; BEGIN
  PERFORM set_config('app.user_id', '', false);
  SELECT count(*) INTO n FROM app.record;
  IF n <> 0 THEN RAISE EXCEPTION 'T9a failed: anonymous sees % records', n; END IF;
  INSERT INTO app.access_request (email, name) VALUES ('new.person@isolation.test', 'New Person');
  SELECT count(*) INTO n FROM app.access_request;
  IF n <> 0 THEN RAISE EXCEPTION 'T9b failed: anonymous reads requests'; END IF;
  BEGIN
    INSERT INTO app.access_request (email, name, status) VALUES ('sneaky@isolation.test', 'Sneaky', 'approved');
    RAISE EXCEPTION 'T9c failed: anonymous filed an approved request';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
--;
-- 10. Only a platform admin reads and decides requests.
DO $$ DECLARE n int; BEGIN
  PERFORM set_config('app.user_id', '00000000-0000-0000-0000-000000000003', false);
  SELECT count(*) INTO n FROM app.access_request WHERE email LIKE '%@isolation.test';
  IF n <> 0 THEN RAISE EXCEPTION 'T10a failed: org owner reads requests'; END IF;
  PERFORM set_config('app.user_id', '99999999-0000-0000-0000-000000000009', false);
  SELECT count(*) INTO n FROM app.access_request WHERE email LIKE '%@isolation.test';
  IF n <> 1 THEN RAISE EXCEPTION 'T10b failed: platform admin sees % requests', n; END IF;
  UPDATE app.access_request SET status = 'declined', decided_by = '99999999-0000-0000-0000-000000000009', decided_at = now()
  WHERE email = 'new.person@isolation.test';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'T10c failed: platform admin could not decide'; END IF;
END $$;
--;
RESET ROLE;
--;
SELECT set_config('app.user_id', '', false);
--;
-- Clean up the test rows.
DELETE FROM app.organization WHERE name = 'Test Org (isolation)';
--;
DELETE FROM app.space WHERE user_id IN ('aaaaaaaa-0000-0000-0000-000000000001','bbbbbbbb-0000-0000-0000-000000000002');
--;
DELETE FROM app.platform_admin WHERE user_id = '99999999-0000-0000-0000-000000000009';
--;
DELETE FROM app.access_request WHERE email LIKE '%@isolation.test';
--;
SELECT 'all passed' AS result;
