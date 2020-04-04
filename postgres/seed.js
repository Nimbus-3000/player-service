const { Pool, Client } = require('pg');
const connectionString = 'postgresql://eric@localhost:5432/nimbus';

// const pool = new Pool({ connectionString });
// pool.query('SELECT NOW()', (err, res) => {
//   (err) ? console.log('Error: ', err) : console.log('Result: ', res);
//   pool.end();
// });

const client = new Client({ connectionString });
client.connect()
  .then(() => {
    console.log('Starting seeding...');
    console.time('Seeding');
    client.query(`COPY nimbus.nimbus.genres FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/genres.csv' DELIMITER ',' CSV HEADER;`)
  })
  .then(() => client.query(`COPY nimbus.nimbus.users FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/users.csv' DELIMITER ',' CSV HEADER;`))
  .then(() => client.query(`COPY nimbus.nimbus.artists FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/artists.csv' DELIMITER ',' CSV HEADER;`))
  .then(() => client.query(`COPY nimbus.nimbus.albums FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/albums.csv' DELIMITER ',' CSV HEADER;`))
  .then(() => client.query(`COPY nimbus.nimbus.songs FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/songs.csv' DELIMITER ',' CSV HEADER;`))
  .then(() => client.query(`COPY nimbus.nimbus.comments FROM '/Users/eric/Desktop/hrsf126-nimbus/player-service/postgres/data/comments.csv' DELIMITER ',' CSV HEADER;`))
  .catch(err => console.log(err))
  .then(() => {
    console.timeEnd('Seeding');
    client.end()
  });
