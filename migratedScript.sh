#!/bin/bash
set -e

#pauses the script for 10 seconds
sleep 10
#runs the migratedb
npm run migratedb
node run.js

exit 0
