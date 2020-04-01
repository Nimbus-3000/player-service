const faker = require('faker');
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
  comments: [{
    username: String,
    avatar: String,
    comment: String,
  },
  ],
});

const Song = mongoose.model('Song', songSchema);

const firstname = faker.name.firstName;
const songTitle = faker.lorem.words;
const postDate = faker.date.past;
const tag = faker.lorem.word;
const comments = () => {
  const commentArr = [];
  while (commentArr.length < 10) {
    commentArr.push(
      {
        username: firstname(),
        avatar: faker.image.nature(),
        comment: faker.lorem.sentence(),
      },
    );
  }
  return commentArr;
};


const seedData = [];
for (let i = 0; i < 100; i++) {
  let randomImg = Math.floor(Math.random() * 10);
  let randomSong = Math.floor(Math.random() * 11);
  const song = new Song(
    {
      _id: i,
      artistName: firstname(),
      songTitle: songTitle(),
      mediaFile: `https://audiblymedia.s3-us-west-1.amazonaws.com/audio/${randomSong}.mp3`,
      postDate: postDate(),
      tag: tag(),
      albumCover: `https://audiblymedia.s3-us-west-1.amazonaws.com/images/${randomImg}.jpeg`,
      comments: comments(),
    },
  );
  seedData.push(song);
}

Song.collection.insertMany(seedData, () => process.exit());
