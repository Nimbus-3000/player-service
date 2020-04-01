// database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/player', { useNewUrlParser: true, useUnifiedTopology: true });

const songSchema = new mongoose.Schema({
  _id: Number,
  artistName: String,
  songTitle: String,
  mediaFile: String,
  postDate: Date,
  tag: [String],
  albumCover: String,
  comments: [
    {
      username: String,
      avatar: String,
      comment: String,
    },
  ],
});

const Song = mongoose.model('Song', songSchema);

// calls cb with result of inserting data representing single song
const createSong = (data, callback) => {
  const song = new Song(data);
  song.save()
    .then(success => callback(null, success))
    .catch(err => callback(err, null));
};

// calls cb with song with input id, if found in database
const readSong = (_id, callback) => {
  Song.find({ _id })
    .then(data => callback(null, data[0]))
    .catch((err) => callback(err, null));
};

// calls cb with result of updating song with id found in input data object
const updateSong = (data, callback) => {
  Song.updateOne({ _id: data._id }, { $set: data })
    .then(success => callback(null, success))
    .catch(err => callback(err, null));
};

// calls cb with result of deleting song with input id
const deleteSong = (_id, callback) => {
  Song.deleteOne({ _id })
    .then(success => callback(null, success))
    .catch(err => callback(err, null));
}

module.exports = {
  createSong,
  readSong,
  updateSong,
  deleteSong,
};
