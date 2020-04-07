echo "Executing data generation script..."
node --max-old-space-size=8192 cassandra/songComments.js

echo "Executing COPY..."
cqlsh -f cassandra/schema.cql