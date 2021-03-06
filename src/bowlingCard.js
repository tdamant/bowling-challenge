// TO DO - refactor validation
// tidy up optional params
// encapsulate further
// test third roll validation
// add tests to check adding third role outside of 10th frame isn't allowed
// stop games going on past 10 frames

function manager(){
  var frames = []
  var lastFrameStrike = false
  var lastFrameSpare = false

  function input(r1, r2=null, r3=null){
    checkRolls(r1, r2, r3);
    if (lastFrameStrike) {updatelastStrike(r1,r2)};
    if (lastFrameSpare) {updatelastSpare(r1)};
    if (isfinalFrame()) { return finalFrameInput(r1, r2, r3)};
    return addFrame(r1, r2);
  };

  function checkRolls (r1, r2, r3) {

    if (frames.length < 9 && (r1 + r2 > 10)) {
      throw("roll can't be more than 10")
    }

    if (frames.length === 9) {checkFinalRolls(r1, r2 ,r3 )}

    function checkFinalRolls(r1, r2, r3) {
      if ((r1 !== 10) && ((r1 + r2) !== 10)) {
        if(r3 !== null){throw"invalid roll"}
      }
    }
  };

  function finalFrameInput(r1, r2, r3){
    if ((r1===10) || (r1 + r2 ===10)) {
    frame = new Frame((frames.length + 1), r1, r2, (r1 + r2 + r3), r3)
    frames.push(frame)
    return frame};
    return addFrame(r1 ,r2)
  }

  function isfinalFrame(){
    return frames.length === 9
  }

  function addFrame (r1, r2, r3 = null) {
      frame = new Frame((frames.length + 1), r1, r2, (r1 + r2 + r3), r3);
      isStrike(frame);
      isSpare(frame);
      frames.push(frame);
      return frame
  }

  function isStrike(frame) {
    if (frame.roll1 === 10){
      lastFrameStrike = true;
      frame.roll2 = null
      return true
    };
    lastFrameStrike = false;
    false
  };

  function isSpare(frame) {
    if (frame.totalScore === 10 && frame.roll1 !== 10){
      lastFrameSpare = true
      return true
    };
    lastFrameSpare = false
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

  function isLastFrameSpareStrike() {
    return (lastFrameStrike || lastFrameSpare)
  }

  return {
    Frame: Frame,
    frames: frames,
    input: input,
    isLastFrameSpareStrike: isLastFrameSpareStrike
  };
};
module.exports = manager;
