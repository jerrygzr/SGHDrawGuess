import { Game, TurnOrder } from 'boardgame.io/core';
import topics_Kancolle from "./topics/Kancolle.js";
import topics_ArkKnights from "./topics/ArkKnights.js";

export const DrawGuess = Game({
	name: 'DrawGuess' ,
	minPlayers:2,
	maxPlayers:8,
	setup: () => ({player_names:Array(9).fill(null), round:0,pathinks:null,currentdrawer:null,topiclist:null, topic: null, startTime:null, winner: null,scores: Array(9).fill(0),guesses: Array(30).fill(null), from:Array(30).fill(null), nguess: 0, attempt: Array(9).fill(0),giveup:0,nextround:0,}),

  moves: {
	  submitTopic(G,ctx,topicName) {
		  switch (topicName) {
			  case 'Kancolle' :
			  	G.topiclist=topics_Kancolle;
			  	break;
			  case 'ArkKnights' :
			  	G.topiclist=topics_ArkKnights;
			  	break;
			  default:
			  	G.topiclist=null;
		  }
	  },
	  submitNames(G,ctx,player_names) {
		  G.player_names=player_names;
	  },
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
	  startingPhase: 'chooseTopic',
	  phases: {
		  chooseTopic: {
			  allowedMoves : ['submitNames' ,'submitTopic','submitDraw'],
			  turnOrder: TurnOrder.ANY,			  
			  endPhaseIf : G => G.topiclist!=null,
			  next : 'play',
		  },
		  endRound: {
			  allowedMoves : ['submitDraw', 'nextRound'],
			  onPhaseBegin:(G, ctx) => {
				  if (G.round>1000) {
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
				  G.topic=G.topiclist[Math.floor(Math.random()*G.topiclist.length)];
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
				  return false;
			  },
			  next: 'endRound',
			  onPhaseEnd :(G,ctx) => {
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

