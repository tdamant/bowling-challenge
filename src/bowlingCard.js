function manager(){
  var frames = []
  var lastFrameStrikeorSpare = false

  function frameScorer(a, b=null){
    checkRolls( a, b);
    if (lastFrameStrikeorSpare) {
      updatePreviousStrikeorSpare(a,b);
    }
    addFrame(this.frames.length + 1, a, b);
    return a + b;
  };

  function checkRolls (a, b) {
    let isvalidRoll = ((a >= 0 && a < 11) && ((b >= 0 && b < 11) || b === null))
    if (!isvalidRoll) {
      throw("invalid role")
    };
  };

  function updatePreviousStrikeorSpare(r1,r2){
      frame = frames[(frames.length - 1)]
      if (frame.roll1 === 10) {
        frame.totalScore = (10 + r1 + r2)
      }
      else {
        frame.totalScore = (10 + r1)
      }
  }

  function addFrame (frameNo, r1, r2, totalScore) {
    if (isStrikeorSpare(r1, r2)) {
      frame = new Frame(frameNo, r1, r2, null)
      frames.push(frame);
      return frame
    }
    else {
      frame = new Frame(frameNo, r1, r2, (r1+r2))
      frames.push(frame);
      lastFrameStrikeorSpare = false
      return frame
    }
  }

  function Frame(frameNo, r1, r2=null, totalScore) {
    this.id = frameNo;
    this.roll1 = r1;
    this.roll2 = r2;
    this.totalScore = totalScore;
  }

  function isStrikeorSpare(r1, r2) {
    if (r1 === 10 || (r1+r2 === 10)){
      lastFrameStrikeorSpare = true
      return true
    };
    false
  };

  return {
    Frame: Frame,
    frames: frames,
    frameScorer: frameScorer,
    isStrikeorSpare: isStrikeorSpare,
    manager: manager,
    addFrame: addFrame
  };
};
module.exports = manager;
