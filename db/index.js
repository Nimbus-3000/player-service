const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/top_player_db', { useNewUrlParser: true });

const songSchema = new mongoose.Schema({
  artistName: String,
  songTitle: String,
  mediaFile: String,
  postDate: Date,
  tag: [String, String, String],
  albumCover: String,
  _id: Number,
  comments: [{
    username: String,
    avatar: String,
    comment: String,
  },
  ],
});

const Song = mongoose.model('Song', songSchema);

const getAllSongs = (callback) => {
  Song.find({})
    .then((data) => {
      callback(null, data);
    })
    .catch(() => {
      callback(true);
    });
};

module.exports.getAllSongs = getAllSongs;
