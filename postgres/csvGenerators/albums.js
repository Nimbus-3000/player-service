const faker = require('faker');
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const dataGen = () => {
  writer.pipe(fs.createWriteStream(path.resolve(__dirname, '../data/albums.csv')));
  console.log('Starting albums...');
  console.time('Albums');
  for (let i = 0; i < 1000000; i++) {
    writer.write({
      id: i,
      name: faker.commerce.productName(),
      cover: `eric-liu-turntable.s3-us-west-1.amazonaws.com/${Math.floor(Math.random() * 1000)}_${Math.floor(Math.random() * 10)}`,
      artistId: Math.floor(Math.random() * 500000)
    });
    if (i % 100000 === 0) {
      console.log(`${i / 10000}% done...`)
    }
  }
  writer.end();
  console.timeEnd('Albums');
}

dataGen();
