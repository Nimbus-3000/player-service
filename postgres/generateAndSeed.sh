psql -f ./postgres/schema.sql -p 5432 -U eric nimbus
node --max-old-space-size=8192 postgres/csvGenerators/comments.js
node --max-old-space-size=8192 postgres/csvGenerators/genres.js
node --max-old-space-size=8192 postgres/csvGenerators/songs.js
node --max-old-space-size=8192 postgres/csvGenerators/users.js
node --max-old-space-size=8192 postgres/seed.js
