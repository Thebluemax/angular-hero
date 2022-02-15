#!/bin/bash

# Start the first process
nginx -g 'daemon off;' &

# Start the second process
echo "\n" | nohup json-server   /var/www/html/assets/backend/db.json --routes /var/www/html/assets/backend/routes.json --no-cors --host 0.0.0.0 --port 3000 > logs.log &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?

