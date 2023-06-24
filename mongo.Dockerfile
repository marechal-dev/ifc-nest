FROM bitnami/mongodb:5.0.17

ENTRYPOINT mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
  INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"; \
  INIT_USER_CMD="db.getUser('$MONGO_INITDB_ROOT_USERNAME') || db.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [ 'root' ] })"; \
  until (mongo admin --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD && $INIT_USER_CMD"); do sleep 1; done; \
  echo "REPLICA SET ONLINE"; wait $MONGOD_PID;