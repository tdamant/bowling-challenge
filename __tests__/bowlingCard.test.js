const manager = require('../src/bowlingCard');
let testManager;
beforeEach(function() {
  testManager = manager()
});
describe ("manager", () => {
  describe ("input", () => {
    test("it adds a frame object to the frames array", () => {
      testManager.input(4, 3);
      expect(testManager.frames[0]).toBeInstanceOf(testManager.Frame)
    });
    test("it creates frames with correct params", () => {
      testManager.input(4, 3);
      frame = testManager.frames[0];
      expect(frame.id).toBe(1);
      expect(frame.roll1).toBe(4);
      expect(frame.roll2).toBe(3);
      expect(frame.totalScore).toBe(7);
    });
  });
    describe("when a stike is rolled", () => {
      test("it adds frame to frames", () =>{
        testManager.input(10);
        expect(testManager.frames[0].roll1).toBe(10);
        expect(testManager.frames[0].roll2).toBe(null);
      });
      test("it updates total score once next frame is complete", () => {
        testManager.input(10);
        testManager.input(1,5);
        expect(testManager.frames[0].totalScore).toBe(16);
      });
      test("it only updates scores when a strike is rolled", () => {
        testManager.input(1 , 5);
        testManager.input(2,3);
        expect(testManager.frames[0].totalScore).toBe(6);
      })
    });

    describe("when a sapre is rolled", () => {
      test("it adds frame to frames w/o total score", () => {
        testManager.input(1,9);
        expect(testManager.frames[0].roll1).toBe(1);
        expect(testManager.frames[0].roll2).toBe(9);
      });
      test("it updates score after next frame", () => {
        testManager.input(1,9);
        testManager.input(5,2);
        expect(testManager.frames[0].totalScore).toBe(15)
      });
      test("it only updates scores when a spare is rolled", () =>{
        testManager.input(1,8);
        testManager.input(1,5);
        expect(testManager.frames[0].totalScore).toBe(9)
      })
    });

    // NEED a test for rolling strike / spare in the 9th and then in the 10th

    describe("final frame", () => {
      describe("non strike or spare rolled", () => {
        let testManager = manager()
        for(let i = 0; i < 9; i++ ){
          testManager.input(1, 5);
        }
        test("frame treated as normal", () => {
          testManager.input(1, 6);
          expect(testManager.frames[9].totalScore).toBe(7)
        });
      });
      describe("strike rolled", () => {
        let testManager = manager()
        for(let i = 0; i < 9; i++ ){
          testManager.input(1, 5);
        }
        test("three balls can be rolled", () => {
          testManager.input(10, 4, 7);
          expect(testManager.frames[9].totalScore).toBe(21)
      });
        describe("strike rolled in previous frame", () => {
          let testManager = manager();
          for(let i = 0; i < 8; i++ ){
            testManager.input(1, 5);
          };
          testManager.input(10)
          test("correctly updates 9th frame score", () => {
            testManager.input(10,5,6);
            expect(testManager.frames[8].totalScore).toBe(20);
            expect(testManager.frames[9].totalScore).toBe(21)
          })
        })
        describe("spare rolled in previous frame", () => {
          let testManager = manager();
          for(let i = 0; i < 8; i++ ){
            testManager.input(1, 5);
          };
          testManager.input(1, 9)
          test("correctly updates 8th frame score", () => {
            testManager.input(10, 2 , 4)
            expect(testManager.frames[8].totalScore).toBe(20)
          })
        })
    });
      describe("spare rolled", () => {
        let testManager = manager()
        for(let i = 0; i < 9; i++ ){
          testManager.input(1, 5);
        }
        test('correctly updates last frame', () => {
          testManager.input(1,9,2);
          expect(testManager.frames[9].totalScore).toBe(12)
        })
      })
  });

    describe("roll validation", () => {
      test("can't be more than 10", () => {
        expect(() => {
          testManager.input(11,4);
        }).toThrowError("invalid role");
      });
      test("can't be more than 10", () => {
        expect(() => {
          testManager.input(4,11);
        }).toThrowError("invalid role");
      });
      test("can't be less than 10", () => {
        expect(() => {
          testManager.input(-4,4);
        }).toThrowError("invalid role");
      });
      test("must be a integer", () => {
        expect(() => {
          testManager.input("A",4);
        }).toThrowError("invalid role");
      });
    });
});
