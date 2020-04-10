const { Client } = require('pg');
const connectionString = 'postgresql://eric@localhost:5432/nimbus';

const client = new Client({ connectionString });
client.connect()
  .then(() => {
    console.log('Starting seeding...');
    console.time('Seeding');
    console.time('Seeding genres');
    return client.query(`COPY nimbus.genres (genreName) FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/genres.csv' DELIMITER ',' CSV HEADER`);
  })
  .then(() => {
    console.timeEnd('Seeding genres');
    console.log('Seeding users...');
    console.time('Seeding users');
    return client.query(`COPY nimbus.users (userName, userAvatar) FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/users.csv' DELIMITER ',' CSV HEADER`);
  })
  .then(() => {
    console.timeEnd('Seeding users');
    console.log('Seeding songs...')
    console.time('Seeding songs');
    return client.query(`COPY nimbus.songs (songName, songDate, songLength, songFile, coverFile, artistId, genreId) FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/songs.csv' DELIMITER ',' CSV HEADER`);
  })
  .then(() => {
    console.timeEnd('Seeding songs');
    console.log('Seeding comments...')
    console.time('Seeding comments');
    return client.query(`COPY nimbus.comments (commentText, commentTime, songId, userID) FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/comments.csv' DELIMITER ',' CSV HEADER`);
  })
  .then(() => {
    console.timeEnd('Seeding comments');
    console.log('Adding foreign keys...');
    console.time('Foreign keys');
    return client.query(`ALTER TABLE nimbus.songs ADD CONSTRAINT songArtist FOREIGN KEY (artistId) REFERENCES nimbus.users (id)`);
  })
  .then(() => client.query(`ALTER TABLE nimbus.songs ADD CONSTRAINT songGenre FOREIGN KEY (genreId) REFERENCES nimbus.genres (id)`))
  .then(() => client.query(`ALTER TABLE nimbus.comments ADD CONSTRAINT commentSong FOREIGN KEY (songId) REFERENCES nimbus.songs (id) ON DELETE CASCADE`))
  .then(() => client.query(`ALTER TABLE nimbus.comments ADD CONSTRAINT commentUser FOREIGN KEY (userId) REFERENCES nimbus.users (id) ON DELETE CASCADE`))
  .then(() => {
    console.timeEnd('Foreign keys');
    console.log('Indexing database...');
    console.time('Indexing');
    return client.query(`CREATE INDEX commentSong ON comments(songId)`);
  })
  .then(() => client.query(`CREATE INDEX commentUser ON comments(userId)`))
  .then(() => client.query(`CREATE INDEX songArtist ON songs(artistId)`))
  .then(() => client.query(`CREATE INDEX songGenre ON songs(genreId)`))
  .then(() => {
    console.timeEnd('Indexing');
    console.timeEnd('Seeding');
    client.end();
  })
  .catch(err => console.log(err));
