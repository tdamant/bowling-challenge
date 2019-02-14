// TO DO - refactor validation
// tidy up optional params
// encapsulate further
// test third roll validation

function manager(){
  var frames = []
  var lastFrameStrike = false
  var lastFrameSpare = false

  function input(r1, r2=null, r3=null){
    checkRolls( r1, r2);
    if (lastFrameStrike) {updatelastStrike(r1,r2)};
    if (lastFrameSpare) {updatelastSpare(r1)};
    if (isfinalFrame()) { return finalFrameInput(r1, r2, r3)};
    addFrame(r1, r2);
  };

  function checkRolls (a, b) {
    let isvalidRoll = ((a >= 0 && a < 11) && ((b >= 0 && b < 11) || b === null))
    if (!isvalidRoll) {
      throw("invalid role")
    };
  };

  function finalFrameInput(r1, r2, r3){
    if (isStrike(r1) || isSpare(r1, r2)) {
      return addFrame(r1, r2 , r3)
    }
    addFrame(r1 ,r2)
  }

  function isfinalFrame(){
    return frames.length === 9
  }

  function addFrame (r1, r2, r3 = null) {
      isStrike(r1);
      isSpare(r1, r2)
      frame = new Frame((frames.length + 1), r1, r2, (r1 + r2 + r3), r3)
      frames.push(frame);
  }

  function isStrike(r1) {
    if (r1 === 10){
      lastFrameStrike = true
      return true
    };
    false
  };

  function isSpare(r1, r2) {
    if (r1 + r2 === 10 && r1 !== 10){
      lastFrameSpare = true
      return true
    };
    false
  };

  function updatelastStrike(r1, r2) {
    frame = frames[(frames.length - 1)];
    let bonus = r1 + r2;
    if (bonus > 10) {bonus = 10}
    frame.totalScore += bonus
  }

  function updatelastSpare(r1) {
    frame = frames[(frames.length - 1)];
    frame.totalScore += r1
  }

  function Frame(frameNo, r1, r2=null, totalScore, r3 = null) {
    this.id = frameNo;
    this.roll1 = r1;
    this.roll2 = r2;
    this.roll3 = r3;
    this.totalScore = totalScore;
  };

  return {
    Frame: Frame,
    frames: frames,
    input: input
  };
};
module.exports = manager;
