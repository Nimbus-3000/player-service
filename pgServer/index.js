require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('../postgres/index.js');

const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(port, () => console.log(`listening on port ${port}.`));

// create single new song
app.post('/api/songs', (req, res) => {
  pg.postSong(req.data)
    .then(res.sendStatus(200))
});

// read song with given id
app.get('/api/songs/:id', (req, res) => {
  pg.getSong(req.params.id)
    .then(data => res.status(200).send(data))
});

// read all comments with a given songid
app.get('/api/comments/songid/:id', (req, res) => {
  pg.getSongComments(req.params.id)
    .then(data => res.status(200).send(data))
});

// update song with same id as req.data
app.put('/api/songs', (req, res) => {
  pg.putSong(req.data)
    .then(res.sendStatus(200))
});

// delete song with given id
app.delete('/api/songs/:_id', (req, res) => {
  pg.deleteSong(req.params.id)
    .then(res.sendStatus(200))
});
