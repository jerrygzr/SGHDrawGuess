import { Game, TurnOrder } from 'boardgame.io/core';
import topics from "./topics/Kancolle.js";

export const DrawGuess = Game({
	setup: () => ({ round:0,pathinks:null,currentdrawer:null,topic: null, startTime:null, winner: null,scores: Array(9).fill(0),guesses: Array(30).fill(null), from:Array(30).fill(null), nguess: 0, attempt: Array(9).fill(0),giveup:0,nextround:0,}),

  moves: {
	  submitDraw(G,ctx,pathinks) {
		  G.pathinks=pathinks;
	  },
	  submitGuess(G,ctx,guess) {
		  G.guesses[G.nguess]=guess.word;
		  G.from[G.nguess]=guess.from;
		  G.nguess++;
		  G.attempt[guess.from]++;
	  },
	  giveUp(G,ctx) {
		  G.giveup=1;
	  },
	  nextRound(G,ctx) {
		  G.nextround=1;
	  },
  },

  flow: {
	  startingPhase: 'play',
	  phases: {
		  endGame: {
		  },
		  endRound: {
			  onPhaseEnd:(G, ctx) => {
				  G.nguess=0;
				  G.giveup=0;
				  if (G.round<1000) {
					  ctx.events.endPhase();
				  } else {
					  ctx.events.endPhase({next:'endGame'});
				  }
			  },
			  turnOrder: TurnOrder.ANY,			  
			  endPhaseIf : G => G.nextround===1,
			  next : 'play',
		  },
		  play: {
			  onPhaseBegin:(G, ctx) => {
				  G.round++;
				  G.pathinks=null;
				  G.winner=null;
				  G.topic=topics[Math.floor(Math.random()*topics.length)];
				  if (G.currentdrawer===null) {
					 G.currentdrawer=0;
				  } else {
				  	G.currentdrawer=(G.currentdrawer+1)%ctx.numPlayers;
				  }
				  let time=new Date();
				  G.startTime=time.getTime();
				  G.nguess=0;
				  G.giveup=0;
				  G.attempt.fill(0);
				  G.nextround=0;
			  },
			  turnOrder: TurnOrder.ANY,			  
			  endPhaseIf : (G,ctx) => {
				  if (ctx. numPlayers>1) return false;
				  if (G.giveup===1) return true;
				  if (G.nguess>0) {
				  if (G.guesses[G.nguess-1]===G.topic) {
					  return true;
				  }
	//			  let time=new Date();
	//			  let s=time.getTime();
	//			  if ((s-G.startTime)>60000) {
	//				 return true;
	//			  }
				}
				  alert("1");
				  return false;
			  },
			  next: 'endRound',
			  onPhaseEnd :(G,ctx) => {
				  alert("2");
				  if (G.nguess>0) {
				  	if (G.guesses[G.nguess-1]===G.topic) {
						G.winner=G.from[G.nguess-1];
						G.scores[G.winner]++;
						G.scores[G.currentdrawer]++;
					}
				  }
			  },
		  },
	  },


			 

 //   endGameIf: (G, ctx) => {
 //     if (IsVictory(G.cells)) {
 //       return { winner: ctx.currentPlayer };
 //     }
 //     if (IsDraw(G.cells)) {
 //       return { draw: true };
 //     }
 //   },
  },
});

