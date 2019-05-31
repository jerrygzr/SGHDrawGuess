// src/App.js

import React from 'react';
import {Lobby} from 'boardgame.io/react';
import { DrawGuess } from './game';
import { DrawGuessBoard } from './board';


class App extends React.Component {
  render() {
	  var TTT=[{games:DrawGuess,game:DrawGuess, board:DrawGuessBoard,}];
    return (
      <div>
	    <Lobby
	    gameServer ={'http://104.168.144.15:8000'}
	    lobbyServer ={'http://104.168.144.15:8000'}
	    gameComponents={TTT}
	    />;
      </div>
    );
  }
}
export default App;
