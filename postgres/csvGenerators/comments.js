const faker = require('faker');
const path = require('path');
const fs = require('fs');

const writeComments = fs.createWriteStream(path.resolve(__dirname, '../data/comments.csv'));

// create 50M comments
const dataGen = (writer, encoding, callback) => {
  let i = 50000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      const data = `${faker.lorem.sentence(10)},${Math.floor(Math.random() * 150)},${Math.floor(Math.random() * 10000000) + 1},${Math.floor(Math.random() * 10000000) + 1}\n`;
      if (id % 5000000 === 0) {
        console.log(`${id / 500000}% done...`);
      }
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }

  writer.write(`commentText,commentTime,songId,userId\n`, 'utf8', () => {
    console.log('Starting comments...');
    console.time('Comments');
    write();
  });
}

dataGen(writeComments, 'utf8', () => {
  console.timeEnd('Comments');
  writeComments.end()
});
