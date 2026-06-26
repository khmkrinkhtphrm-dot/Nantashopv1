#!/bin/sh
echo "Running migrations..."
node scripts/migrate.mjs
echo "Starting server..."
exec node --enable-source-maps artifacts/api-server/dist/index.mjs
