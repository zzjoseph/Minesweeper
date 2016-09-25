describe("Minesweeper", function() {
  var Minesweeper = require('../../client/game');
  var Coordinate = require('../../client/coordinate');
  var minesweeper = new Minesweeper(9, 9, 10);

  describe('when setup', function() {
    var initCoord = new Coordinate(1, 1);
    beforeEach(function() {
      minesweeper.setup(initCoord);
    });

    afterEach(function() {
      minesweeper = new Minesweeper(9, 9, 10);
    })

    it("should keep the initial coordinate and its neighbors clear", function() {
      expect(minesweeper._board.get(initCoord)).not.toEqual("mine");
      minesweeper._board.neighbors(initCoord).forEach(function(current, index, array) {
        expect(minesweeper._board.get(current)).not.toEqual("mine");
      });
    });
  });

  describe('when user', function() {
    beforeEach(function() {
      minesweeper._board.set(new Coordinate(1, 2), "mine");
      minesweeper._board.set(new Coordinate(4, 8), "mine");
      minesweeper._board.set(new Coordinate(3, 2), "mine");
      minesweeper._board.set(new Coordinate(2, 5), "mine");
      minesweeper._board.set(new Coordinate(8, 8), "mine");
      minesweeper._board.set(new Coordinate(4, 7), "mine");
      minesweeper._board.set(new Coordinate(3, 5), "mine");
      minesweeper._board.set(new Coordinate(8, 6), "mine");
      minesweeper._board.set(new Coordinate(6, 1), "mine");
      minesweeper._board.set(new Coordinate(0, 3), "mine");

      for(var r=0; r < 9; r++) {
        for(var c=0; c < 9; c++) {
          var coord = new Coordinate(r, c)
          if(minesweeper._board.get(coord) != "mine")
            minesweeper._board.set(coord, minesweeper.getNeighbors(coord).filter(function(e, i, a) { return minesweeper._board.get(e) == "mine" }, minesweeper).length);
        }
      }
    });

    afterEach(function() {
      minesweeper = new Minesweeper(9, 9, 10);
    });

    describe("click mine", function() {
      it('should set state to gameover', function() {
        minesweeper.click(new Coordinate(1, 2));
        expect(minesweeper._state).toEqual(2);
      });
    });

    describe("click safe", function() {
      it('should display the number of mines nearby', function() {
        minesweeper.click(new Coordinate(0, 0));
        expect(minesweeper._view.get(new Coordinate(0, 0))).toEqual(0);
        expect(minesweeper._view.get(new Coordinate(0, 1))).toEqual(1);
        expect(minesweeper._view.get(new Coordinate(0, 2))).toEqual("unopened");
      });
    });

    describe("flag mine", function() {
      it("should decrement the number of remaining mines", function() {
        minesweeper.flag(new Coordinate(1, 2));
        expect(minesweeper._view.get(new Coordinate(1, 2))).toEqual("flag");
        expect(minesweeper._remainMines).toEqual(9);
      });
    });
  });
});
