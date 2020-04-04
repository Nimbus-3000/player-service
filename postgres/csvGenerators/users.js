const faker = require('faker');
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const dataGen = () => {
  writer.pipe(fs.createWriteStream(path.resolve(__dirname, '../data/users.csv')));
  console.log('Starting users...');
  console.time('Users');
  for (let i = 0; i < 10000000; i++) {
    writer.write({
      id: i,
      name: faker.internet.userName(),
      avatar: `eric-liu-turntable.s3-us-west-1.amazonaws.com/${Math.floor(Math.random() * 1000)}_${Math.floor(Math.random() * 10)}`
    });
    if (i % 1000000 === 0) {
      console.log(`${i / 100000}% done...`)
    }
  }
  writer.end();
  console.timeEnd('Users');
}

dataGen();
