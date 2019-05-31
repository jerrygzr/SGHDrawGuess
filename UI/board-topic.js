/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
//import "./board.css";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


class BoardTopic extends React.Component {
  submitTopicName(name) {
	  this.props.moves.submitTopic(name);
  }

  render() {
	var topicSelect=(
		<div>
		    <link
		  rel="stylesheet"
		  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
		  crossOrigin="anonymous"
		/>
		    <DropdownButton id="topicSelect" title="Choose topic">
		    	<Dropdown.Item onSelect={() => {this.submitTopicName("Kancolle")}}> Kancolle </Dropdown.Item>
		    	<Dropdown.Item onSelect={() => {this.submitTopicName("ArkKnights")}}> ArkKnights </Dropdown.Item>
		    </DropdownButton>
		</div>
	    );
	return (<div id="topicSelect">
		{topicSelect}
	  </div>
	);
  }
}

export default BoardTopic;
