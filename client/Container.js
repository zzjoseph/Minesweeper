import React from 'react';
import ReactDOM from 'react-dom';
import Minesweeper from './game';
import Row from './Row';
import Coordinate from './coordinate';
// import Solver from './solver';
// import $ from 'jquery';

const READY = 0;
const RUNNING = 1;
const GAMEOVER = 2;
const WIN = 3;

class Container extends React.Component {
	constructor(props) {
		super(props);
		this.game = new Minesweeper(9, 9, 10);
		this.state = { gameState: READY};
	}
	newGame() {
		this.game = new Minesweeper(9, 9, 10);
		this.setState({gameState: READY});
	}
	handleClick(c) {
		if(this.state.gameState == READY)
			this.game.setup(c);
		this.game.click(c);
		this.setState({gameState: this.game._state});
		console.log(this.game._state);
		// this.game._printView();
	}
	handleFlag(c) {
		if(this.state.gameState == READY || this.state.gameState == RUNNING) {
			this.game.flag(c);
			this.setState({gameState: this.game._state});
		}
		// this.game._printView();
	}
	render() {
		let view = this.game._view;
		let state;
		if(this.state.gameState == WIN) {
			state = "you win";
		} else if (this.state.gameState == GAMEOVER) {
			state = "you lose";
		} else {
			state = "";
		}
		let rows = view._matrix.map(function(e, i, a) {
			return (
				<Row data={e} key={i} row={i} handleClick={this.handleClick.bind(this)} handleFlag={this.handleFlag.bind(this)}/>
			);
		}, this);
		return (
			<div>
			  <p>State: {state}</p>
				<button onClick={this.newGame.bind(this)}>new game</button>
				<table>
					<tbody>
					{rows}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Container;
