const manager = require('../src/bowlingCard');
testManager = manager()
describe ("manager", () => {
  describe ("input", () => {
    test("it adds a frame object to the frames array", () => {
      testManager.input(4, 3);
      expect(testManager.frames[0]).toBeInstanceOf(testManager.Frame)
    });
    test("it creates frames with correct params", () => {
      frame = testManager.frames[0];
      expect(frame.id).toBe(1);
      expect(frame.roll1).toBe(4);
      expect(frame.roll2).toBe(3);
      expect(frame.totalScore).toBe(7);
    });
  });
    describe("when a stike is rolled", () => {
      test("it adds frame to frames w/o total score", () =>{
        thirdManager = manager();
        thirdManager.input(10);
        expect(thirdManager.frames[0].roll1).toBe(10);
        expect(thirdManager.frames[0].roll2).toBe(null);
        expect(thirdManager.frames[0].totalScore).toBe(null);
      });
      test("it updates total score once next frame is complete", () => {
        thirdManager.input(1,5);
        expect(thirdManager.frames[0].totalScore).toBe(16);
      });
      test("it only updates scores when a strike is rolled", () => {
        thirdManager.input(2,3);
        expect(thirdManager.frames[1].totalScore).toBe(6);
      })
    });

    describe("when a sapre is rolled", () => {
      test("it adds frame to frames w/o total score", () => {
        fourthManager = manager();
        fourthManager.input(1,9);
        expect(fourthManager.frames[0].roll1).toBe(1);
        expect(fourthManager.frames[0].roll2).toBe(9);
        expect(fourthManager.frames[0].totalScore).toBe(null);
      });
      test("it updates score after next frame", () => {
        fourthManager.input(5,2);
        expect(fourthManager.frames[0].totalScore).toBe(15)
      });
      test("it only updates scores when a spare is rolled", () =>{
        fourthManager.input(1,5);
        expect(fourthManager.frames[1].totalScore).toBe(7)
      })
    });

    // NEED a test for rolling strike / spare in the 9th and then in the 10th

    describe("final frame", () => {
      describe("non strike or spare rolled", () => {
        fithManager = manager();
        for(let i = 0; i < 9; i++ ){
          fithManager.input(1, 5);
        }
        test("frame treated as normal", () => {
          fithManager.input(1, 6);
          expect(fithManager.frames[9].totalScore).toBe(7)
        });
      });
      describe("strike rolled", () => {
        sixthManager = manager();
        for(let i = 0; i < 9; i++ ){
          sixthManager.input(1, 5);
        }
        test("three balls can be rolled", () => {
          sixthManager.input(10, 4, 7);
          expect(sixthManager.frames[9].totalScore).toBe(21)
      });
    });
  });

    describe("roll validation", () => {
      test("a roll can't be more than 10", () => {
        expect(() => {
          testManager.input(11,4);
        }).toThrowError("invalid role");
      });
      test("a roll can't be more than 10", () => {
        expect(() => {
          testManager.input(4,11);
        }).toThrowError("invalid role");
      });
      test("a roll can't be less than 10", () => {
        expect(() => {
          testManager.input(-4,4);
        }).toThrowError("invalid role");
      });
      test("a roll must be a integer", () => {
        expect(() => {
          testManager.input("A",4);
        }).toThrowError("invalid role");
      });
    });
});
