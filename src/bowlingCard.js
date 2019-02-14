function manager(){
  var frames = []
  var lastFrameStrike = false
  var lastFrameSpare = false

  function frameScorer(a, b=0){
    checkRolls( a, b);
    if (lastFrameStrike) {
      updatePreviousStrike(a,b);
    }
    else if (lastFrameSpare) {
      updatePreviousSpare(a)
    }
    addFrame(this.frames.length + 1, a, b);
    return a + b;
  };

  function checkRolls (a, b) {
    let isvalidRoll = ((a >= 0 && a < 11) && (b >= 0 && b < 11))
    if (!isvalidRoll) {
      throw("invalid role")
    };
  };

  function updatePreviousStrike(r1,r2){
      frames[(frames.length - 1)].totalScore = (10+r1+r2)
  }

  function updatePreviousSpare(r1) {
    frames[(frames.length - 1)].totalScore = (10+r1)
  }

  function addFrame (frameNo, r1, r2, totalScore) {
    if (isStrike(r1)) {
      frame = new Frame(frameNo, r1, null, null)
      frames.push(frame);
      lastFrameStrike = true
      return frame
    }
    else if (isSpare(r1, r2)) {
      frame = new Frame(frameNo, r1, r2, null)
      frames.push(frame);
      lastFrameSpare = true
      return frame
    }
    else {
      frame = new Frame(frameNo, r1, r2, (r1+r2))
      frames.push(frame);
      lastFrameStrike = false
      lastFrameSpare = false
      return frame
    }
  }

  function Frame(frameNo, r1, r2=null, totalScore) {
    this.id = frameNo;
    this.roll1 = r1;
    this.roll2 = r2;
    this.totalScore = totalScore;
  }

  function isStrike(a) {
    return a === 10;
  };

  function isSpare(a, b){
    return (a+b) === 10
  };

  return {
    Frame: Frame,
    frames: frames,
    frameScorer: frameScorer,
    isStrike: isStrike,
    isSpare: isSpare,
    manager: manager,
    addFrame: addFrame
  };
};
module.exports = manager;
