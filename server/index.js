const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index.js');

const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(port, () => console.log(`listening on port ${port}.`));

// create single new song
app.post('/api/songs', (req, res) => {
  console.log(req.data);
  db.createSong(req.data, (err, success) => {
    (err) ? res.sendStatus(400) : res.status(201).json(success);
  });
});

// read random song
app.get('/api/songs', (req, res) => {
  const _id = Math.floor(100 * Math.random());
  db.readSong(_id, (err, data) => {
    (err) ? res.sendStatus(404) : res.status(200).json(data);
  });
});

// read song with given id
app.get('/api/songs/:_id', (req, res) => {
  db.readSong(req.params._id, (err, data) => {
    (err) ? res.sendStatus(404) : res.status(200).json(data);
  })
});

// update song with same id as req.data
app.put('/api/songs', (req, res) => {
  db.updateSong(req.data, (err, success) => {
    (err) ? res.sendStatus(404) : res.status(200).json(success);
  });
});

// delete song with given id
app.delete('/api/songs/:_id', (req, res) => {
  db.deleteSong(req.params._id, (err, success) => {
    (err) ? res.sendStatus(404) : res.status(200).json(success);
  })
});
