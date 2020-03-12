var faker  = require('faker');
const mongoose = require('mongoose')

mongoose.connect('mongo://localhost/top_player_db');

var db = mongoose.connection;