const manager = require('../src/bowlingCard');
testManager = manager()
describe ("manager", () => {
  test("knows what frame it's on", () => {
    testManager.frameScorer(1,2)
    expect(testManager.frame).toBe(2)
  })
  describe("framescorer", () => {
    test('it adds the rolls together', () => {
      expect(testManager.frameScorer(1, 2)).toBe(3);
    });
    test("a roll can't be more than 10", () => {
      expect(() => {
        testManager.frameScorer(11,4);
      }).toThrowError("invalid role");
    });
    test("a roll can't be more than 10", () => {
      expect(() => {
        testManager.frameScorer(4,11);
      }).toThrowError("invalid role");
    });
    test("a roll can't be less than 10", () => {
      expect(() => {
        testManager.frameScorer(-4,4);
      }).toThrowError("invalid role");
    });
    test("a roll must be a integer", () => {
      expect(() => {
        testManager.frameScorer("A",4);
      }).toThrowError("invalid role");
    });
  });
  describe("isStike", () => {
    test('can detect a strike', () => {
      expect(testManager.isStrike(10)).toBe(true)
    });
    test('can detect a non strike', () => {
      expect(testManager.isStrike(9)).toBe(false)
    })
  });
  describe("isSpare", () => {
    expect(testManager.isSpare(1, 9)).toBe(true)
  })
});
