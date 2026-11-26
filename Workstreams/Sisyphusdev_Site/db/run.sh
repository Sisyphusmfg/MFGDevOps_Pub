#!/usr/bin/env bash
# Run a migration or the isolation tests against a Neon database with psql.
#   DATABASE_URL='<owner connection string for a BRANCH>' bash Workstreams/Sisyphusdev_Site/db/run.sh up|down|test
# Use the owner role's connection string from the Neon Console. Keep it in your shell, never
# in a file in this repository. Run "test" only on a branch, never where real users' data lives.
# "down" deletes every app table and its data (IRREVERSIBLE on real data, PUB-D-04).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
: "${DATABASE_URL:?set DATABASE_URL to the branch's owner connection string}"
case "${1:-}" in
  up)   file="$here/migrations/0001_spaces.up.sql" ;;
  down) file="$here/migrations/0001_spaces.down.sql" ;;
  test) file="$here/test/isolation.sql" ;;
  *) echo "usage: bash $0 up|down|test" >&2; exit 2 ;;
esac
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction -q -f "$file"
echo "run.sh: $1 ok"
