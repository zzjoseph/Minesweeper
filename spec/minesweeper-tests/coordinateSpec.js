describe('Coordinate', function() {
  var Coordinate = require('../../client/coordinate');

  describe('when compared with coordinate with the same row and col value', function() {
    var c1 = new Coordinate(1, 2);
    var c2 = new Coordinate(1, 2);
    it('should return true', function() {
      expect(c1.equals(c2)).toBeTruthy();
    });
  });
});