#!/bin/sh

yarn start &

# Keep waiting until the server is started
while [[ $(curl -s -o /dev/null -w "%{http_code}" http://localhost:8020/healthy) != "204" ]]; do
  sleep 0.1
done

echo "Server has started"
exit 0
