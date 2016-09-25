describe('Board', function() {
  var Board = require('../../client/board');
  var Coordinate = require('../../client/coordinate');
  var board = new Board(5, 10);

  describe('when ask for neighbors of a coordinate at the corner', function() {
    var upperLeft = new Coordinate(0, 0);
    var upperRight = new Coordinate(0, 9);
    var lowerLeft = new Coordinate(4, 0);
    var lowerRight = new Coordinate(4, 9);

    var ulNeighbors = board.neighbors(upperLeft);
    var urNeighbors = board.neighbors(upperRight);
    var llNeighbors = board.neighbors(lowerLeft);
    var lrNeighbors = board.neighbors(lowerRight);

    it('should return a list of three coordinates', function() {
      expect(ulNeighbors.length).toEqual(3);
      expect(urNeighbors.length).toEqual(3);
      expect(llNeighbors.length).toEqual(3);
      expect(lrNeighbors.length).toEqual(3);

      expect(board.isNeighbor(upperLeft, new Coordinate(0, 1))).toBeTruthy();
      expect(board.isNeighbor(upperLeft, new Coordinate(1, 0))).toBeTruthy();
      expect(board.isNeighbor(upperLeft, new Coordinate(1, 1))).toBeTruthy();

      expect(board.isNeighbor(upperRight, new Coordinate(0, 8))).toBeTruthy();
      expect(board.isNeighbor(upperRight, new Coordinate(1, 9))).toBeTruthy();
      expect(board.isNeighbor(upperRight, new Coordinate(1, 8))).toBeTruthy();

      expect(board.isNeighbor(lowerLeft, new Coordinate(4, 1))).toBeTruthy();
      expect(board.isNeighbor(lowerLeft, new Coordinate(3, 0))).toBeTruthy();
      expect(board.isNeighbor(lowerLeft, new Coordinate(3, 1))).toBeTruthy();

      expect(board.isNeighbor(lowerRight, new Coordinate(4, 8))).toBeTruthy();
      expect(board.isNeighbor(lowerRight, new Coordinate(3, 8))).toBeTruthy();
      expect(board.isNeighbor(lowerRight, new Coordinate(3, 9))).toBeTruthy();
    });
  });

  describe('when ask for neighbors of a coordinate on the border', function() {
    var up = new Coordinate(0, 5);
    var down = new Coordinate(4, 3);
    var left = new Coordinate(2, 0);
    var right = new Coordinate(2, 9);

    var upNeighbors = board.neighbors(up);
    var downNeighbors = board.neighbors(down);
    var leftNeighbors = board.neighbors(left);
    var rightNeighbors = board.neighbors(right);

    it("should have five neighbors", function() {
      expect(upNeighbors.length).toEqual(5);
      expect(downNeighbors.length).toEqual(5);
      expect(leftNeighbors.length).toEqual(5);
      expect(rightNeighbors.length).toEqual(5);

      expect(board.isNeighbor(up, new Coordinate(0, 4))).toBeTruthy();
      expect(board.isNeighbor(up, new Coordinate(0, 6))).toBeTruthy();
      expect(board.isNeighbor(up, new Coordinate(1, 4))).toBeTruthy();
      expect(board.isNeighbor(up, new Coordinate(1, 5))).toBeTruthy();
      expect(board.isNeighbor(up, new Coordinate(1, 6))).toBeTruthy();

      expect(board.isNeighbor(down, new Coordinate(4, 2))).toBeTruthy();
      expect(board.isNeighbor(down, new Coordinate(4, 4))).toBeTruthy();
      expect(board.isNeighbor(down, new Coordinate(3, 2))).toBeTruthy();
      expect(board.isNeighbor(down, new Coordinate(3, 3))).toBeTruthy();
      expect(board.isNeighbor(down, new Coordinate(3, 4))).toBeTruthy();

      expect(board.isNeighbor(left, new Coordinate(1, 0))).toBeTruthy();
      expect(board.isNeighbor(left, new Coordinate(3, 0))).toBeTruthy();
      expect(board.isNeighbor(left, new Coordinate(1, 1))).toBeTruthy();
      expect(board.isNeighbor(left, new Coordinate(2, 1))).toBeTruthy();
      expect(board.isNeighbor(left, new Coordinate(3, 1))).toBeTruthy();

      expect(board.isNeighbor(right, new Coordinate(1, 9))).toBeTruthy();
      expect(board.isNeighbor(right, new Coordinate(3, 9))).toBeTruthy();
      expect(board.isNeighbor(right, new Coordinate(1, 8))).toBeTruthy();
      expect(board.isNeighbor(right, new Coordinate(2, 8))).toBeTruthy();
      expect(board.isNeighbor(right, new Coordinate(3, 8))).toBeTruthy();
    });
  });

  describe('when ask for neighbors of a coordinate at the center', function() {
    var c = new Coordinate(2, 5);
    var cNeighbors = board.neighbors(c);

    it("should have eight neighbors", function() {
      expect(cNeighbors.length).toEqual(8);

      expect(board.isNeighbor(c, new Coordinate(1, 4))).toBeTruthy();
      expect(board.isNeighbor(c, new Coordinate(1, 5))).toBeTruthy();
      expect(board.isNeighbor(c, new Coordinate(1, 6))).toBeTruthy();
      expect(board.isNeighbor(c, new Coordinate(2, 4))).toBeTruthy();
      expect(board.isNeighbor(c, new Coordinate(2, 6))).toBeTruthy();
      expect(board.isNeighbor(c, new Coordinate(3, 4))).toBeTruthy();
      expect(board.isNeighbor(c, new Coordinate(3, 5))).toBeTruthy();
      expect(board.isNeighbor(c, new Coordinate(3, 6))).toBeTruthy();
    });
  });

  // describe('when ask for a list of all coordinates', function() {
  //   it("should have 50 elements", function() {
  //     expect(board.coordList().next()).toEqual(50);
  //   });
  // });
});
