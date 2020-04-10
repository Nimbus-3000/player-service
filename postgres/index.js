require('dotenv').config();
const { Pool } = require('pg');
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DB
}

const pool = new Pool(config);

module.exports.postSong = (data) => {
  return pool.query(`SELECT last_value FROM users_id_seq`)
    .then(artistId => {
      return pool.query(`SELECT last_value FROM genres_id_seq`)
        .then(genreId => pool.query(`INSERT INTO songs (songname, songdate, songlength, songfile, coverfile, artistid, genreid) VALUES ('${data.songName}', '${data.songDate}', ${data.songLength}, '${data.songFile.split('.com/')[1]}', '${data.coverFile.split('.com/')[1]}', ${artistId + 1}, ${genreId + 1})`))
    })
}

module.exports.getSong = (id) => {
  return pool.query(`SELECT * FROM genres, users, songs WHERE genres.id = songs.genreid AND users.id = songs.artistid AND songs.id = ${id}`)
    .then(songData => {
      return pool.query(`SELECT * FROM users, comments WHERE users.id = comments.userid AND comments.songid = ${id}`)
        .then(comments => {
          songData.rows[0].comments = comments.rows;
          return songData.rows[0];
        })
    })
}

module.exports.putSong = (data) => {
  return pool.query(`UPDATE songs SET songname = '${data.songName}', songdate = '${data.songDate}, songlength = ${data.songLength}, songfile = '${data.songFile}', coverfile = '${data.coverFile}'`)
    .catch(err => console.log(err.stack))
}

module.exports.deleteSong = (id) => {
  return pool.query(`DELETE FROM songs WHERE id = ${id}`)
}
