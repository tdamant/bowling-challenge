function manager(){
  var frame = 1;

  function frameScorer(a, b){
    checkRolls( a, b);
    this.frame ++
    return a + b;

    function checkRolls (a, b) {
      let isvalidRoll = ((a >= 0 && a < 11) && (b >= 0 && b < 11))
      if (!isvalidRoll) {
        throw("invalid role")
      };
    };
  };

  function isStrike(a) {
    return a === 10;
  };

  function isSpare(a, b){
    return (a+b) === 10
  };

  return {
    frame: frame,
    frameScorer: frameScorer,
    isStrike: isStrike,
    isSpare: isSpare,
    manager: manager
  };
};
module.exports = manager;
