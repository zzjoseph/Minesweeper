var Board = require('./board');
var Coordinate = require('./coordinate');

const MINE = "mine";
const UNOPENED = "unopened";
const QUESTIONMARK = "questionmark";
const FLAG = "flag";
const XFLAG = "xflag";

const READY = 0;
const RUNNING = 1;
const GAMEOVER = 2;
const WIN = 3;

var Minesweeper = function(numRows, numCols, numMines) {
  this._board = new Board(numRows, numCols, 0);
  this._view = new Board(numRows, numCols, UNOPENED);
  this._state = READY;
  this._remainMines = numMines;
  this._unopenedCount = numRows * numCols;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  this.click = function(c) {
    if(this._state != RUNNING && this._state != READY)
      return
    if(this._state == READY)
      this._state = RUNNING;
    this._unopenedCount--;
    if(this._board.get(c) == MINE) {
      this._view.set(c, MINE);
      this._state = GAMEOVER;
    } else {
      this._view.set(c, this._board.get(c));
      if(this._view.get(c) == 0) {
        this.getNeighbors(c).forEach(function(e, i, a) {
          if(this._view.get(e) == UNOPENED && this._board.get(e) != MINE) {
            this.click(e);
          }
        }, this);
      }
    }
    if(this._remainMines == 0 && this._unopenedCount == 0)
      this._state = WIN;
  }

  this.flag = function(c) {
    if(this._state != RUNNING && this._state != READY)
      return
    if(this._view.get(c) == UNOPENED) {
      this._unopenedCount--;
      this._view.set(c, FLAG);
      if(this._board.get(c) == MINE)
        this._remainMines--;
      if(this._remainMines == 0 && this._unopenedCount == 0)
        this._state = WIN;
    } else if(this._view.get(c) == FLAG) {
      this._view.set(c, UNOPENED);
      this._unopenedCount++;
      if(this._board.get(c) == MINE)
        this._remainMines++;
    }
    // console.log("unopened count: ", this._unopenedCount);
    // console.log("remaining mines: ", this._remainMines);
  }

  this.randomCoord = function(candidates) {
    if(candidates) {
      var index = getRandomInt(0, candidates.length);
      return candidates[index];
    }
    var row = getRandomInt(0, numRows);
    var col = getRandomInt(0, numCols);
    return new Coordinate(row, col);
  }

  this.getNeighbors = function(c) {
    return this._board.neighbors(c);
  }

  this.isNeighbor = function(c1, c2) {
    return this._board.isNeighbor(c1, c2);
  }

  this._print = function() {
    for(var row = 0; row < numRows; row++) {
      var rowStr = "";
      for(var col = 0; col < numCols; col++) {
        rowStr += this._board.get(new Coordinate(row, col));
        rowStr += "\t";
      }
      console.log(rowStr);
    }
  }

  this._printView = function() {
    for(var row = 0; row < numRows; row++) {
      var rowStr = "";
      for(var col = 0; col < numCols; col++) {
        rowStr += this._view.get(new Coordinate(row, col));
        rowStr += "\t";
      }
      console.log(rowStr);
    }
  }

  this.setup = function(initCoord) {
    var count = 0;
    var neighbors = this.getNeighbors(initCoord);
    while(count < numMines) {
      var coord = this.randomCoord();
      if(this._board.get(coord) != MINE && !(this.isNeighbor(initCoord, coord)) && !initCoord.equals(coord)) {
        this._board.set(coord, MINE);
        count++;
      }
    }

    for(var r=0; r < numRows; r++) {
      for(var c=0; c < numCols; c++) {
        var coord = new Coordinate(r, c)
        if(this._board.get(coord) != MINE)
          this._board.set(coord, this.getNeighbors(coord).filter(function(e, i, a) { return this._board.get(e) == MINE }, this).length);
      }
    }
  }

  this.giveup = function() {
    console.log('Player Give up');
    this._state = GAMEOVER;
  }
}

module.exports = Minesweeper;
