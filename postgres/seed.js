const { Pool, Client } = require('pg');
const connectionString = 'postgresql://eric@localhost:5432/nimbus';

// const pool = new Pool({ connectionString });
// pool.query('SELECT NOW()', (err, res) => {
// (err) ? console.log('Error: ', err) : console.log('Result: ', res);
//   pool.end();
// });

const client = new Client({ connectionString });
client.connect()
  .then(() => {
    console.log('Starting seeding...');
    console.time('Seeding');
    console.time('Seeding genres');
    return client.query(`COPY nimbus.genres FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/genres.csv' DELIMITER ',' CSV HEADER;`);
  })
  .then(() => {
    console.timeEnd('Seeding genres');
    console.log('Seeding users...');
    console.time('Seeding users');
    return client.query(`COPY nimbus.users FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/users.csv' DELIMITER ',' CSV HEADER;`);
  })
  .then(() => {
    console.timeEnd('Seeding users');
    console.log('Seeding albums...')
    console.time('Seeding albums');
    return client.query(`COPY nimbus.albums FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/albums.csv' DELIMITER ',' CSV HEADER;`);
  })
  .then(() => {
    console.timeEnd('Seeding albums');
    console.log('Seeding songs...')
    console.time('Seeding songs');
    return client.query(`COPY nimbus.songs FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/songs.csv' DELIMITER ',' CSV HEADER;`);
  })
  .then(() => {
    console.timeEnd('Seeding songs');
    console.log('Seeding comments...')
    console.time('Seeding comments');
    return client.query(`COPY nimbus.comments FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/comments.csv' DELIMITER ',' CSV HEADER;`);
  })
  .then(() => {
    console.timeEnd('Seeding comments');
    console.log('Adding foreign keys...');
    console.time('Foreign keys');
    return client.query(`ALTER TABLE nimbus.albums ADD CONSTRAINT albumUser FOREIGN KEY (userId) REFERENCES nimbus.users (id);`);
  })
  .then(() => client.query(`ALTER TABLE nimbus.songs ADD CONSTRAINT songAlbum FOREIGN KEY (albumId) REFERENCES nimbus.albums (id);`))
  .then(() => client.query(`ALTER TABLE nimbus.songs ADD CONSTRAINT songGenre FOREIGN KEY (genreId) REFERENCES nimbus.genres (id);`))
  .then(() => client.query(`ALTER TABLE nimbus.comments ADD CONSTRAINT commentSong FOREIGN KEY (songId) REFERENCES nimbus.songs (id);`))
  .then(() => client.query(`ALTER TABLE nimbus.comments ADD CONSTRAINT commentUser FOREIGN KEY (userId) REFERENCES nimbus.users (id);`))
  .then(() => {
    console.timeEnd('Foreign keys');
    console.log('Indexing database...');
    console.time('Indexing');
    return client.query(`CREATE INDEX commentSong ON comments(songId);`);
  })
  .then(() => client.query(`CREATE INDEX commentUser ON comments(userId);`))
  .then(() => client.query(`CREATE INDEX songAlbum ON songs(albumId);`))
  .then(() => client.query(`CREATE INDEX songGenre ON songs(genreId);`))
  .then(() => client.query(`CREATE INDEX albumUser ON albums(userId);`))
  .then(() => {
    console.timeEnd('Indexing');
    console.timeEnd('Seeding');
    client.end();
  })
  .catch(err => console.log(err));
