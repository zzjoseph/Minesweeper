import React from 'react';
import ReactDOM from 'react-dom';
import Coordinate from './coordinate';

class Row extends React.Component {
	constructor(props) {
		super(props);
	}
  entryClick(r, c, e) {
		if(e.button == 0)
			this.props.handleClick(new Coordinate(r, c));
		else {
			this.props.handleFlag(new Coordinate(r, c));
		}
  }
	handleContextMenu(r, c, e) {
		e.preventDefault();
		this.entryClick(r, c, e);
	}

	render() {
    let row = this.props.row;
    let entries = this.props.data.map(function(e, i, a) {
      return (
        <td key={i}><img id={row + ',' + i} onContextMenu={this.handleContextMenu.bind(this, row, i)} onClick={this.entryClick.bind(this, row, i)} src={"images/Minesweeper_" + e + ".svg"}/></td>
      );
    }, this);
		return (
      <tr>{entries}</tr>
		);
	}
}

export default Row;
