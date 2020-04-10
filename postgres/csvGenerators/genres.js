const faker = require('faker');
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

// create 1k genres
const dataGen = () => {
  writer.pipe(fs.createWriteStream(path.resolve(__dirname, '../data/genres.csv')));
  console.log('Starting genres...');
  console.time('Genres');

  for (let i = 0; i < 1000; i++) {
    writer.write({
      genreName: faker.lorem.word()
    });
    
    if (i % 100 === 0) {
      console.log(`${i / 10}% done...`)
    }
  }

  writer.end();
  console.timeEnd('Genres');
}

dataGen();
