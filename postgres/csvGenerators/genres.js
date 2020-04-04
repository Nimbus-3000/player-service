const faker = require('faker');
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const dataGen = () => {
  writer.pipe(fs.createWriteStream(path.resolve(__dirname, '../data/genres.csv')));
  console.log('Starting genres...');
  console.time('Genres');
  for (let i = 0; i < 100000; i++) {
    writer.write({
      id: i,
      name: faker.lorem.word()
    });
    if (i % 10000 === 0) {
      console.log(`${i / 1000}% done...`)
    }
  }
  writer.end();
  console.timeEnd('Genres');
}

dataGen();
