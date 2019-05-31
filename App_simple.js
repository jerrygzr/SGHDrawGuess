// src/App.js

//import React from 'react';
import { Client } from 'boardgame.io/react';
import { DrawGuess } from './game';
import { DrawGuessBoard } from './board';

const App = Client({
  game: DrawGuess,
  board: DrawGuessBoard,
//  debug:false,
});

export default App;
