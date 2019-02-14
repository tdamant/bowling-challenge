function manager(){
  var frames = []
  var lastFrameStrike = false

  function frameScorer(a, b=0){
    checkRolls( a, b);
    if (lastFrameStrike) {
      updatePreviousStrike(a,b);
    };
    addFrame(this.frames.length + 1, a, b);
    return a + b;
  };

  function checkRolls (a, b) {
    let isvalidRoll = ((a >= 0 && a < 11) && (b >= 0 && b < 11))
    if (!isvalidRoll) {
      throw("invalid role")
    };
  };

  function updatePreviousStrike(a,b){
      frames[(frames.length - 1)].totalScore = (10+a+b)
  }

  function addFrame (frameNo, r1, r2, totalScore) {
    if(isStrike(r1)) {
      frame = new Frame(frameNo, r1, null, null)
      frames.push(frame);
      lastFrameStrike = true
      return frame
    }
    else {
      frame = new Frame(frameNo, r1, r2, (r1+r2))
      frames.push(frame);
      this.lastFrameStrike = false
      return frame
    }
  }

  function Frame(frameNo, r1, r2, totalScore) {
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
