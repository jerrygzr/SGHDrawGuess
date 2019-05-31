/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import paper from "paper";
import PropTypes from "prop-types";
import "./board.css";
import { importPathInks } from "./utils.js";

class BoardGuesser extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool
  };

  componentDidMount() {
    this.paper = new paper.PaperScope();
    this.paper.setup(this.canvas); // Setup Paper #canvas

    this.importThenRender();
  }

  componentDidUpdate() {
    this.paper = new paper.PaperScope();
    this.paper.setup(this.canvas); // Setup Paper #canvas
    
    this.importThenRender();
  }

  importThenRender() {
    if (this.props.G.pathinks !== null) {
      this.pathinks = importPathInks(
        this.props.G.pathinks,
        this.canvas.offsetWidth,
        this.canvas.offsetHeight
      );
      this.drawInk();
    }
  }

  drawInk() {
    this.clonepathinks = JSON.parse(JSON.stringify(this.pathinks));
    if (this.paths) {
      this.paths.forEach(path => path.remove());
    }
    this.paths = [];
    Object.keys(this.pathinks).forEach(thispath => {
      var i = this.paths.push(new this.paper.Path()) - 1;
      this.paths[i].importJSON(thispath);
    });
  }

  // Clear Paper Drawing Canvas
  clearDrawing() {
    // Remove Paper Path Layer
    if (this.paths) {
      this.paths.forEach(path => path.remove());
      this.paths = [];
    }
  }

  submitGuess() {
    if (this.guess !== null) {
      if (this.guess === "") {
        alert("Enter a guess!");
      } else {
	let guess={word:this.guess.value, from:this.props.playerID,};
        this.props.moves.submitGuess(guess);
	this.guess.value='';
      }
    }
  }

  render() {
    var guessboard='';
	  if (this.props.G.nguess>0) {
		  for (var i=0; i<this.props.G.nguess; i++) {
			  guessboard=( <div>
				  <p> {this.props.G.player_names[this.props.G.from[i]]} : {this.props.G.guesses[i]} </p>
				  {guessboard}
				  </div>
			  );
		  }
	  }
	  if (this.props.G.winner!=null) {
			  guessboard=( <div>
				  <p> {this.props.G.player_names[this.props.G.from[this.props.G.nguess-1]]} is correct! </p>
				  {guessboard}
				  </div>
			  );
	  }
    var scoreboard='';
	  for (i=0; i<this.props.ctx.numPlayers; i++) {
		  scoreboard = (<div>
			  {scoreboard}
			  <p> {this.props.G.player_names[i]} : {this.props.G.scores[i]}</p>
			  </div>
		  );
	  }
    const guess_form = (
      <div className="buttonHolder">
        <input
          ref={guess => {
            this.guess = guess;
          }}
          id="df"
          type="text"
          name="guess"
        />
        <button
          className="GameButton"
          id="guessSubmit"
          onClick={() => this.submitGuess()}
          ref={submitButton => {
            this.submitButton = submitButton;
          }}
          disabled={this.props.G.attempt[this.props.playerID]>2}
        >
          Guess
        </button>
      </div>
    );
    var info='';
    if (this.props.ctx.phase==='play') {
	    info=(<div>
			<p> {this.props.G.player_names[this.props.G.currentdrawer]} is drawing.</p>
		    </div>
	    );
    } else {
	    info=(<div>
			<p> The answer is {this.props.G.topic}</p>
		    </div>
	    );
    }


    return (
      <div>
	{info}
        <div id="wrapper">
          <canvas
            hidpi="off"
            ref={canvas => {
              this.canvas = canvas;
            }}
          />
        </div>
        {guess_form}
	<div id="wrapper-result">
		<div id="wrapper-guess">
	    		{guessboard}
		</div>
		<div id="wrapper-score">
	    		{scoreboard}
		</div>
	</div>
      </div>
    );
  }
}

export default BoardGuesser;
