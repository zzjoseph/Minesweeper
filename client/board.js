var Coordinate = require('./coordinate');
require('babel-polyfill');

var Board = function(numRows, numCols, value) {
	this._matrix = [];
	for(var r = 0; r < numRows; r++) {
		this._matrix.push([]);
		for(var c = 0; c < numCols; c++) {
			this._matrix[r].push(value);
		}
	}

	this.get = function(coordinate) {
		return this._matrix[coordinate.row][coordinate.col];
	}

	this.set = function(coordinate, value) {
		this._matrix[coordinate.row][coordinate.col] = value;
	}

	this.neighbors = function(c) {
		var row = c.row;
		var col = c.col;
		var result = [];
		for(var r = row-1; r <= row+1; r++) {
			for(var c = col-1; c <= col+1; c++) {
				if(r >=0 && c >=0 && r < numRows && c < numCols && (r != row || c != col))
					result.push(new Coordinate(r, c));
			}
		}
		return result;
	}
	this.isNeighbor = function(c1, c2) {
		var neighborList = this.neighbors(c1);
		return neighborList.some(function(current, index, array) {
			return current.equals(c2);
		});
	}
	this.coordIter = function* () {
		var c = new Coordinate(0, 0);
		var count = 0;
		while(count < numRows * numCols) {
			yield c;
			count++;
			if(c.row % 2 == 0) {
				if(c.col < numCols - 1)
					c = new Coordinate(c.row, c.col+1);
				else
					c = new Coordinate(c.row+1, c.col);
			}	else {
				if(c.col > 0)
					c = new Coordinate(c.row, c.col-1);
				else
					c = new Coordinate(c.row+1, c.col);
			}
		}
	}

}
// var board = new Board(9, 9, 0);
// board.coordList().forEach(function(e,i,a) {
// 	console.log(e.row, e.col);
// });
module.exports = Board;
