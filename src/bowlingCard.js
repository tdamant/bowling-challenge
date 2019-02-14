// TO DO - refactor validation
// tidy up optional params
// encapsulate further

function manager(){
  var frames = []
  var lastFrameStrikeorSpare = false

  function input(r1, r2=null, r3=null){
    checkRolls( r1, r2);
    if (lastFrameStrikeorSpare) {updatelastStrikeorSpare(r1,r2)};
    if (isfinalFrame()) { return finalFrameInput(r1, r2, r3)}
    addFrame(this.frames.length + 1, r1, r2);
  };

  function checkRolls (a, b) {
    let isvalidRoll = ((a >= 0 && a < 11) && ((b >= 0 && b < 11) || b === null))
    if (!isvalidRoll) {
      throw("invalid role")
    };
  };

  function finalFrameInput(r1, r2, r3){
    if (r1===10) {
      frame = new Frame(10, r1, null, (r1+r2+r3))
      frames.push(frame);
      return frame}

    else {
      addFrame((this.frames.length + 1), r1, r2, (r1 + r2))
    }
  }

  function isfinalFrame(){
    return frames.length === 9
  }

  function updatelastStrikeorSpare(r1,r2){
      frame = frames[(frames.length - 1)];
      if (frame.roll1 === 10) {
        return frame.totalScore = (10 + r1 + r2)
      }
      frame.totalScore = (10 + r1)
  };

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

  function isStrikeorSpare(r1, r2) {
    if (r1 === 10 || (r1+r2 === 10)){
      lastFrameStrikeorSpare = true
      return true
    };
    false
  };

  function Frame(frameNo, r1, r2=null, totalScore) {
    this.id = frameNo;
    this.roll1 = r1;
    this.roll2 = r2;
    this.totalScore = totalScore;
  };

  return {
    Frame: Frame,
    frames: frames,
    input: input
  };
};
module.exports = manager;
