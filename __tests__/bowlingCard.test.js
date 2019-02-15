const manager = require('../src/bowlingCard');
let gameManager;
beforeEach(function() {
  gameManager = manager()
});
describe ("manager", () => {
  describe ("input", () => {
    test("it adds a frame object to the frames array", () => {
      gameManager.input(4, 3);
      expect(gameManager.frames[0]).toBeInstanceOf(gameManager.Frame)
    });
    test("it creates frames with correct params", () => {
      gameManager.input(4, 3);
      frame = gameManager.frames[0];
      expect(frame.id).toBe(1);
      expect(frame.roll1).toBe(4);
      expect(frame.roll2).toBe(3);
      expect(frame.totalScore).toBe(7);
    });
  });
    describe("when a stike is rolled", () => {
      test("it adds frame to frames", () =>{
        // user input still treated as 0 on client side when first roll 10
        gameManager.input(10, 0);
        expect(gameManager.frames[0].roll1).toBe(10);
        expect(gameManager.frames[0].roll2).toBe(null);
      });
      test("it updates total score once next frame is complete", () => {
        gameManager.input(10, 0);
        gameManager.input(1,5);
        expect(gameManager.frames[0].totalScore).toBe(16);
      });
      test("it only updates scores when a strike is rolled", () => {
        gameManager.input(1 , 5);
        gameManager.input(2,3);
        expect(gameManager.frames[0].totalScore).toBe(6);
      })
    });

    describe("when a sapre is rolled", () => {
      test("it adds frame to frames w/o total score", () => {
        gameManager.input(1,9);
        expect(gameManager.frames[0].roll1).toBe(1);
        expect(gameManager.frames[0].roll2).toBe(9);
      });
      test("it updates score after next frame", () => {
        gameManager.input(1,9);
        gameManager.input(5,2);
        expect(gameManager.frames[0].totalScore).toBe(15)
      });
      test("it only updates scores when a spare is rolled", () =>{
        gameManager.input(1,8);
        gameManager.input(1,5);
        expect(gameManager.frames[0].totalScore).toBe(9)
      })
    });

    // NEED a test for rolling strike / spare in the 9th and then in the 10th

    describe("final frame", () => {
      describe("non strike or spare rolled", () => {
        let gameManager = manager()
        for(let i = 0; i < 9; i++ ){
          gameManager.input(1, 5);
        }
        test("frame treated as normal", () => {
          gameManager.input(1, 6);
          expect(gameManager.frames[9].totalScore).toBe(7)
        });
      });
      describe("strike rolled", () => {
        let gameManager = manager()
        for(let i = 0; i < 9; i++ ){
          gameManager.input(1, 5);
        }
        test("three balls can be rolled", () => {
          gameManager.input(10, 4, 7);
          expect(gameManager.frames[9].totalScore).toBe(21)
      });
        describe("strike rolled in previous frame", () => {
          let gameManager = manager();
          for(let i = 0; i < 8; i++ ){
            gameManager.input(1, 5);
          };
          gameManager.input(10)
          test("correctly updates 9th frame score", () => {
            gameManager.input(10,5,6);
            expect(gameManager.frames[8].totalScore).toBe(20);
            expect(gameManager.frames[9].totalScore).toBe(21)
          })
        })
        describe("spare rolled in previous frame", () => {
          let gameManager = manager();
          for(let i = 0; i < 8; i++ ){
            gameManager.input(1, 5);
          };
          gameManager.input(1, 9)
          test("correctly updates 8th frame score", () => {
            gameManager.input(10, 2 , 4)
            expect(gameManager.frames[8].totalScore).toBe(20)
          })
        })
    });
      describe("spare rolled", () => {
        let gameManager = manager()
        for(let i = 0; i < 9; i++ ){
          gameManager.input(1, 5);
        }
        test('correctly updates last frame', () => {
          gameManager.input(1,9,2);
          expect(gameManager.frames[9].totalScore).toBe(12)
        })
      })
  });

    describe("roll validation", () => {
      test("can't be more than 10", () => {
        expect(() => {
          gameManager.input(11,4);
        }).toThrowError("invalid roll");
      });
      test("can't be more than 10", () => {
        expect(() => {
          gameManager.input(4,11);
        }).toThrowError("invalid roll");
      });
      test("can't be less than 10", () => {
        expect(() => {
          gameManager.input(-4,4);
        }).toThrowError("invalid roll");
      });
      test("must be a integer", () => {
        expect(() => {
          gameManager.input("A",4);
        }).toThrowError("invalid roll");
      });
      test("can't roll more than 10", () => {
        expect(() => {
          gameManager.input(10, 4);
        }).toThrowError("roll can't be more than 10");
      })
    });
    describe("isLastFrameSpareStrike", () => {
      test("it is false untill a spare or strike rolled", () => {
        gameManager.input(1,2);
        expect(gameManager.isLastFrameSpareStrike()).toBe(false)
      });
      test("it is true when a spare is rolled", () => {
        gameManager.input(5,5);
        expect(gameManager.isLastFrameSpareStrike()).toBe(true)
      });
      test("it is true when a strike is rolled", () => {
        gameManager.input(10,0);
        expect(gameManager.isLastFrameSpareStrike()).toBe(true)
      });
      test("it is false once a strike or spare not rolled", () => {
        gameManager.input(10,0);
        gameManager.input(1,3)
        expect(gameManager.isLastFrameSpareStrike()).toBe(false)
      })
    })
});
