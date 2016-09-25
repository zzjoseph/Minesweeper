var Coordinate = function(row, col) {
	this.row = row;
	this.col = col;
	this.equals = function(c) {
		return this.row == c.row && this.col == c.col;
	}
}

module.exports = Coordinate;