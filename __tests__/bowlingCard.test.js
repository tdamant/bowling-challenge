const manager = require('../src/bowlingCard');
testManager = manager()
describe ("manager", () => {
  describe ("addFrame", () => {
    test("it adds a frame object to the frames array", () => {
      testManager.addFrame(1, 4, 3, 7);
      expect(testManager.frames[0]).toBeInstanceOf(testManager.Frame)
    });
  });

  describe ("frames", () => {
    test("it has id, roll scores and total scores", () => {
      frame = testManager.addFrame(1, 4, 3, 7);
      expect(frame.id).toBe(1);
      expect(frame.roll1).toBe(4);
      expect(frame.roll2).toBe(3);
      expect(frame.totalScore).toBe(7);
    });
  });

  describe("framescorer", () => {
    secondManager = manager();
    describe("when a non stike / spare is rolled", () => {
      test("it adds frame to frames", () =>{
        secondManager.frameScorer(2,3);
        expect(secondManager.frames[0]).toBeInstanceOf(secondManager.Frame);
        expect(secondManager.frames[0].roll1).toBe(2);
        expect(secondManager.frames[0].totalScore).toBe(5);
      });
    });
  });

  describe("when a stike is rolled", () => {
    test("it adds frame to frames w/o total score", () =>{
      thirdManager = manager();
      thirdManager.frameScorer(10);
      expect(thirdManager.frames[0].roll1).toBe(10);
      expect(thirdManager.frames[0].roll2).toBe(null);
      expect(thirdManager.frames[0].totalScore).toBe(null);
    });
    test("it updates total score once next frame is complete", () => {
      thirdManager.frameScorer(1,5);
      expect(thirdManager.frames[0].totalScore).toBe(16);
    });
  });

  describe("when a sapre is rolled", () => {
    test("it adds frame to frames w/o total score", () => {
      fourthManager = manager();
      fourthManager.frameScorer(1,9);
      expect(fourthManager.frames[0].roll1).toBe(1);
      expect(fourthManager.frames[0].roll2).toBe(9);
      expect(fourthManager.frames[0].totalScore).toBe(null);
    });
    test("it updates score after next frame", () => {
      fourthManager.frameScorer(5,2);
      expect(fourthManager.frames[0].totalScore).toBe(15)
    });
  });

  describe("roll validation", () => {
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
});

// frame to be replaced with frams (and frames.length)
