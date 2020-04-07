const faker = require('faker');
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

// create 20M users
const dataGen = () => {
  writer.pipe(fs.createWriteStream(path.resolve(__dirname, '../data/users.csv')));
  console.log('Starting users...');
  console.time('Users');

  for (let i = 0; i < 20000000; i++) {
    writer.write({
      id: i,
      name: `${faker.name.lastName()}${faker.name.firstName()}`,
      avatar: `${Math.floor(Math.random() * 1000)}_${Math.floor(Math.random() * 10)}`
    });
    
    if (i % 2000000 === 0) {
      console.log(`${i / 200000}% done...`)
    }
  }

  writer.end();
  console.timeEnd('Users');
}

dataGen();
