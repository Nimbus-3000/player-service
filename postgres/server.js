// require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { postSong, getSong, getSongComments, putSong, deleteSong } = require('./db.js');

const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(port, () => console.log(`Listening on port ${port}...`));

// create single new song
app.post('/api/songs', (req, res, next) => {
  postSong(req.data)
    .then(res.sendStatus(200))
    .catch(next);
});

// read song with given id
app.get('/api/songs/:id', (req, res, next) => {
  getSong(req.params.id)
    .then(data => res.status(200).send(data))
    .catch(next);
});

// read all comments with a given songid
app.get('/api/comments/songid/:id', (req, res, next) => {
  getSongComments(req.params.id)
    .then(data => res.status(200).send(data))
    .catch(next);
});

// update song with same id as req.data
app.put('/api/songs', (req, res, next) => {
  putSong(req.data)
    .then(res.sendStatus(200))
    .catch(next);
});

// delete song with given id
app.delete('/api/songs/:_id', (req, res, next) => {
  deleteSong(req.params.id)
    .then(res.sendStatus(200))
    .catch(next);
});
