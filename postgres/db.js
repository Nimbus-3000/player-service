require('dotenv').config();
const { Pool } = require('pg');
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DB
}

const pool = new Pool(config);

exports.postSong = (data) => {
  return pool.query(`SELECT last_value FROM users_userid_seq`)
    .then(artistId => {
      return pool.query(`SELECT last_value FROM genres_genreid_seq`)
        .then(genreId => pool.query(`INSERT INTO songs (songname, songdate, songlength, songfile, coverfile, artistid, genreid) VALUES ('${data.songName}', '${data.songDate}', ${data.songLength}, '${data.songFile.split('.com/')[1]}', '${data.coverFile.split('.com/')[1]}', ${artistId.rows[0].last_value + 1}, ${genreId.rows[0].last_value + 1})`))
    })
    .catch(err => console.log(err.stack))
}

exports.getSong = (id) => {
  return pool.query(`SELECT * FROM genres, users, songs WHERE genres.genreid = songs.genreid AND users.userid = songs.artistid AND songs.songid = ${id}`)
    .then(songData => songData.rows[0])
    .catch(err => console.log(err.stack))
}

exports.getSongComments = (id) => {
  return pool.query(`SELECT * FROM users, comments WHERE users.userid = comments.userid AND comments.songid = ${id}`)
    .then(comments => comments.rows)
    .catch(err => console.log(err.stack))
}

exports.putSong = (data) => {
  return pool.query(`UPDATE songs SET songname = '${data.songName}', songdate = '${data.songDate}, songlength = ${data.songLength}, songfile = '${data.songFile}', coverfile = '${data.coverFile}'`)
    .catch(err => console.log(err.stack))
}

exports.deleteSong = (id) => {
  return pool.query(`DELETE FROM songs WHERE songid = ${id}`)
    .catch(err => console.log(err.stack))
}
