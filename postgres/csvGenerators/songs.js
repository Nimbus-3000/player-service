const faker = require('faker');
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const songLengths = [644, 212, 167, 213, 235, 218, 172, 210, 183, 372];
const years = ['2015', '2016', '2017', '2018', '2019'];
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];

// create 10M songs
const dataGen = () => {
  writer.pipe(fs.createWriteStream(path.resolve(__dirname, '../data/songs.csv')));
  console.log('Starting songs...');
  console.time('Songs');

  for (let i = 0; i < 10000000; i++) {
    writer.write({
      songName: faker.commerce.productName(),
      songDate: `${years[Math.floor(Math.random() * 5)]}-${months[Math.floor(Math.random() * 12)]}-${days[Math.floor(Math.random() * 28)]}`,
      songLength: songLengths[i % 10],
      songFile: `${i % 10}`,
      coverFile: `${Math.floor(Math.random() * 100)}_${Math.floor(Math.random() * 10)}`,
      artistId: (Math.floor(Math.random() * 2000000) + 1),
      genreId: (Math.floor(Math.random() * 1000) + 1)
    });

    if (i % 1000000 === 0) {
      console.log(`${i / 100000}% done...`)
    }
  }

  writer.end();
  console.timeEnd('Songs');
}

dataGen();
