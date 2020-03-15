// server

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('../db/index.js');

const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get('/songData', (req, res) => {
  database.getOneSong((err, data) => {
    if (err) {
      res.sendStatus(404);
    }
    res.send(data);
  });
});
