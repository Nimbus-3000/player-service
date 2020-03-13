const faker = require('faker');
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


const firstname = faker.name.firstName;
const songTitle = faker.lorem.words;
// const mediaFile;
const postDate = faker.date.past;
const tag = faker.lorem.word;
const albumCover = faker.image.abstract;
const comments = () => {
  const commentArr = [];
  while (commentArr.length < 15) {
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
while (seedData.length <= 10) {
  const song = new Song(
    {
      artistName: firstname(),
      songTitle: songTitle(),
      mediaFile: 'https://audiblymedia.s3-us-west-1.amazonaws.com/audio/1.mp3',
      postDate: postDate(),
      tag: tag(),
      albumCover: albumCover(),
      comments: comments(),
    },
  );
  seedData.push(song);
}

Song.collection.insertMany(seedData);
