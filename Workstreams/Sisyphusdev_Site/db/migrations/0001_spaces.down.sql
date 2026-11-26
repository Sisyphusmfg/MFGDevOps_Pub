-- 0001_spaces (down): removes everything 0001_spaces.up.sql created, data included.
-- Running this on a database that holds real users' records deletes them: that is
-- IRREVERSIBLE (PUB-D-04) and needs Marc's explicit approval.
-- Statements are separated by "--;" lines.

DROP SCHEMA app CASCADE;
--;
REVOKE app_api FROM CURRENT_USER;
--;
DROP ROLE app_api;
