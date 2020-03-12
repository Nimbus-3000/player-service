var faker  = require('faker');
// const mongoose = require('mongoose')

// mongoose.connect('mongo://localhost/top_player_db');

// var db = mongoose.connection;

console.log('TESTING 1 2 3')


// var songData = {
//         ArtistName: String,
//         SongTitle: String,
//         MediaFile: URL String(s3),
//         PostDate: Date,
//         Tags: [String, String, String],
//         AlbumCover: URL (from s3),
//         _id: Number
//         Comments: [
//             {
//         Username: String,
//         Avatar: URL (s3),
//         Comment: String,
//         Song: String,
//         TimeStamp: String/time,
//             }	
//         ]
// }


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
    seedData.push(
        {
            artistName: firstname(),
            songTitle: songTitle(),
            postDate: postDate(),
            tag: tag(),
            albumCover: albumCover(),
            comments: comments()
        }
    )
}

console.log(seedData);