const faker = require('faker');
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const dataGen = () => {
  writer.pipe(fs.createWriteStream(path.resolve(__dirname, '../data/artists.csv')));
  console.log('Starting artists...');
  console.time('Artists');
  for (let i = 0; i < 500000; i++) {
    writer.write({
      id: i,
      name: `${faker.name.lastName()} ${faker.name.firstName()}`
    });
    if (i % 50000 === 0) {
      console.log(`${i / 5000}% done...`)
    }
  }
  writer.end();
  console.timeEnd('Artists');
}

dataGen();
