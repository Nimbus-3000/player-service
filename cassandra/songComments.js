const faker = require('faker');
const path = require('path');
const fs = require('fs');

const writeComments = fs.createWriteStream(path.join(__dirname, '/data/songComments.csv'));


// Takes faker user name as input
// Returns string of (0-3 albums / user) * (5-10 songs / album) * (3-7 comments / song)
const generateUserRecords = (artistName) => {
  const records = [];
  for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
    records.push(generateAlbumRecords(artistName, faker.commerce.productName()));
  }
  return records.join('');
}

// Takes faker user and album names as input
// Returns string of (5-10 songs / album) * (5 comments / song)
const generateAlbumRecords = (artistName, albumName) => {
  const records = [];
  for (let i = 0; i < (Math.floor(Math.random() * 6) + 5); i++) {
    records.push(generateCommentRecords(artistName, albumName, faker.commerce.productName()));
  }
  return records.join('');
}

// Takes faker user, album, genre, song title, and post date as input
// Returns string of records representing 3-7 comments
const generateCommentRecords = (artistName, albumName, songTitle) => {
  const songLengths = [644, 212, 167, 213, 235, 218, 172, 210, 183, 372];
  const years = ['2015', '2016', '2017', '2018', '2019'];
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];

  const songId = Math.floor(Math.random() * 10);
  const records = [];
  let commentUuid, albumCover, commentAvatar, commentUsername, commentText, commentTime, genre, length, mediaFile, postDate;

  for (let i = 0; i < (Math.floor(Math.random() * 5)+ 3); i++) {
    /*
    songTitle
    artistname
    commentuuid
    albumcover
    albumname
    commentavatar
    commentusername
    commenttext
    commenttime
    genre
    length
    mediafile
    postdate  
    */
    commentUuid = faker.random.uuid();
    albumCover = `${Math.floor(Math.random() * 1000)}_${Math.floor(Math.random() * 10)}`;
    commentAvatar = `${Math.floor(Math.random() * 1000)}_${Math.floor(Math.random() * 10)}`;
    commentUsername = `${faker.name.lastName()}${faker.name.firstName()}`;
    commentText = faker.lorem.sentence(10);
    commentTime = Math.floor(Math.random() * songLengths[songId]);
    genre = faker.lorem.word();
    length = songLengths[songId];;
    mediaFile = songId % 10;
    postDate  = `${years[Math.floor(Math.random() * 5)]}-${months[Math.floor(Math.random() * 12)]}-${days[Math.floor(Math.random() * 28)]}`;
    
    records.push(`${songTitle},${artistName},${commentUuid},${albumCover},${albumName},${commentAvatar},${commentUsername},${commentText},${commentTime},${genre},${length},${mediaFile},${postDate}\n`);
  }
  return records.join('');
}

const dataGen = (writer, encoding, callback) => {
  let i = 1000000;
  let id = 0;

  function write() {
    let ok = true;
    do {
      i--;
      id++;
      let song = `${generateUserRecords(`${faker.name.lastName()} ${faker.name.firstName()}`)}`;

      if (id % 100000 === 0) {
        console.log(`${id / 10000}% done...`);
      }
      if (i === 0) {
        writer.write(song, encoding, callback);
      } else {
        ok = writer.write(song, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  writer.write(`songtitle,artistname,commentuuid,albumcover,albumname,commentavatar,commentusername,commenttext,commenttime,genre,length,mediafile,postdate\n`, 'utf8', () => {
    console.log('Starting comments...');
    console.time('Comments');
    write();
  });
}

dataGen(writeComments, 'utf8', () => {
  console.timeEnd('Comments');
  writeComments.end()
});
