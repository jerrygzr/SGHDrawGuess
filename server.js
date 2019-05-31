// src/server.js
const Server = require('boardgame.io/server').Server;
const DrawGuess = require('./game').DrawGuess;
const server = Server({ games: [DrawGuess] });
server.run(8000);
