import React from 'react';
import BoardDrawer from './UI/board-drawer.js';
import BoardGuesser from './UI/board-guesser.js';

export class DrawGuessBoard extends React.Component {

  renderSwitch() {
	if (parseInt(this.props.playerID)===this.props.G.currentdrawer) {
     // case '0':
      //  return <BoardDrawer {...this.props} />;
     // case '1':
     //   return <BoardGuesser {...this.props} />;
//	    default :
        return ( <div>
		<BoardDrawer {...this.props} />
		</div>
	);
	}else {
        return ( <div>
         	<BoardGuesser {...this.props} />
		</div>
	);
	}

  //  }
  }
  componentDidMount() {
	  if (this.props.G.player_names[0]===null) {
	    let url_room="http://104.168.144.15:8000/games/DrawGuess/";
	    let url=url_room.concat(this.props.gameID);
	    function httpGet(theUrl)
	    {
		        var xmlHttp = new XMLHttpRequest();
		        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		        xmlHttp.send( null );
		        return xmlHttp.responseText;
	    }
	    let roominfo=httpGet(url);
	    let playerinfo=JSON.parse(roominfo).players;
	    var player_names=Array(playerinfo.length).fill('NoName');
	    for (let i=0; i<playerinfo.length; i++) {
		    player_names[i]=playerinfo[i].name;
	    }
	    this.player_names=player_names;
	    this.props.moves.submitNames(this.player_names);
	  }
  }


  render() {
    let winner=null;
    if (this.props.G.winner!== null) {
      winner = (
        <div id="results">
          <div id="winner">Winner: {this.props.G.winner}</div>
        </div>
      );
    }

    return (
      <div>
        {this.renderSwitch()}
        {winner}
      </div>
    );
  }
}
