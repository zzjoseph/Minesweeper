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
	changeLevel(e) {
		let level = e.target.value;
		if(level == "beginner") {
			this.game = new Minesweeper(9, 9, 10);
		} else if(level == "intermediate") {
			this.game = new Minesweeper(16, 16, 40);
		} else {
			this.game = new Minesweeper(16, 30, 99);
		}
		this.setState({ gameState: READY});
	}
	newGame() {
		let level = document.getElementById("level").value;
		if(level == "beginner") {
			this.game = new Minesweeper(9, 9, 10);
		} else if(level == "intermediate") {
			this.game = new Minesweeper(16, 16, 40);
		} else {
			this.game = new Minesweeper(16, 30, 99);
		}
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
				<select id="level" onChange={this.changeLevel.bind(this)} defaultValue="beginner">
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
					<option value="expert">Expert</option>
				</select>
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
