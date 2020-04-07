const faker = require('faker');
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

// create 2M albums
const dataGen = () => {
  writer.pipe(fs.createWriteStream(path.resolve(__dirname, '../data/albums.csv')));
  console.log('Starting albums...');
  console.time('Albums');
  
  for (let i = 0; i < 2000000; i++) {
    writer.write({
      id: i,
      name: faker.commerce.productName(),
      cover: `${Math.floor(Math.random() * 1000)}_${Math.floor(Math.random() * 10)}`,
      userId: Math.floor(Math.random() * 1000000) // only first 1M users have albums
    });

    if (i % 200000 === 0) {
      console.log(`${i / 20000}% done...`)
    }
  }
  
  writer.end();
  console.timeEnd('Albums');
}

dataGen();
