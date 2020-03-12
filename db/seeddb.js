var faker  = require('faker');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/top_player_db', {useNewUrlParser: true});

var db = mongoose.connection;

var songSchema = new mongoose.Schema({
    artistName: String,
    songTitle: String,
    mediaFile: String,
    postDate: Date,
    tag: [String, String, String],
    albumCover: String,
    _id: Number,
    comments: [
            {
                username: String,   
                avatar: String,
                comment: String
            }	
        ]
})

var Song = mongoose.model('Song', songSchema);


var firstname = faker.name.firstName;
var songTitle = faker.lorem.words;
var mediaFile
var postDate = faker.date.past;
var tag = faker.lorem.word;
var albumCover = faker.image.abstract;
var comments = () => {
    let commentArr = [];
    while (commentArr.length < 15) {
        commentArr.push(
            {
                username: firstname(),
                avatar: faker.image.nature(),
                comment: faker.lorem.sentence()
            }
        )
    }
    return commentArr;
}


const seedData = [];
while (seedData.length <= 10) {
    let song = new Song(
        {
            artistName: firstname(),
            songTitle: songTitle(),
            mediaFile: "https://audiblymedia.s3-us-west-1.amazonaws.com/audio/1.mp3",
            postDate: postDate(),
            tag: tag(),
            albumCover: albumCover(),
            comments: comments()
        }
    )
    seedData.push(song)
}

Song.collection.insertMany(seedData);






