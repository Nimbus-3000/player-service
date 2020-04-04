const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createObjectCsvWriter({
  path: './data.csv',
  header: ['id', 'name']
});