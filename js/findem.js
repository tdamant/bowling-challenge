(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
bowlingCardModule = require('../src/bowlingCard.js');

},{"../src/bowlingCard.js":2}],2:[function(require,module,exports){
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
    checkRolls( r1, r2);
    if (lastFrameStrike) {updatelastStrike(r1,r2)};
    if (lastFrameSpare) {updatelastSpare(r1)};
    if (isfinalFrame()) { return finalFrameInput(r1, r2, r3)};
    addFrame(r1, r2);
  };

  function checkRolls (a, b) {
    let isvalidRoll = ((a >= 0 && a < 11) && ((b >= 0 && b < 11) || b === null))
    if (!isvalidRoll) {
      throw("invalid roll")
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImpzL21haW4uanMiLCJzcmMvYm93bGluZ0NhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJib3dsaW5nQ2FyZE1vZHVsZSA9IHJlcXVpcmUoJy4uL3NyYy9ib3dsaW5nQ2FyZC5qcycpO1xuIiwiLy8gVE8gRE8gLSByZWZhY3RvciB2YWxpZGF0aW9uXG4vLyB0aWR5IHVwIG9wdGlvbmFsIHBhcmFtc1xuLy8gZW5jYXBzdWxhdGUgZnVydGhlclxuLy8gdGVzdCB0aGlyZCByb2xsIHZhbGlkYXRpb25cbi8vIGFkZCB0ZXN0cyB0byBjaGVjayBhZGRpbmcgdGhpcmQgcm9sZSBvdXRzaWRlIG9mIDEwdGggZnJhbWUgaXNuJ3QgYWxsb3dlZFxuLy8gc3RvcCBnYW1lcyBnb2luZyBvbiBwYXN0IDEwIGZyYW1lc1xuXG5mdW5jdGlvbiBtYW5hZ2VyKCl7XG4gIHZhciBmcmFtZXMgPSBbXVxuICB2YXIgbGFzdEZyYW1lU3RyaWtlID0gZmFsc2VcbiAgdmFyIGxhc3RGcmFtZVNwYXJlID0gZmFsc2VcblxuICBmdW5jdGlvbiBpbnB1dChyMSwgcjI9bnVsbCwgcjM9bnVsbCl7XG4gICAgY2hlY2tSb2xscyggcjEsIHIyKTtcbiAgICBpZiAobGFzdEZyYW1lU3RyaWtlKSB7dXBkYXRlbGFzdFN0cmlrZShyMSxyMil9O1xuICAgIGlmIChsYXN0RnJhbWVTcGFyZSkge3VwZGF0ZWxhc3RTcGFyZShyMSl9O1xuICAgIGlmIChpc2ZpbmFsRnJhbWUoKSkgeyByZXR1cm4gZmluYWxGcmFtZUlucHV0KHIxLCByMiwgcjMpfTtcbiAgICBhZGRGcmFtZShyMSwgcjIpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNoZWNrUm9sbHMgKGEsIGIpIHtcbiAgICBsZXQgaXN2YWxpZFJvbGwgPSAoKGEgPj0gMCAmJiBhIDwgMTEpICYmICgoYiA+PSAwICYmIGIgPCAxMSkgfHwgYiA9PT0gbnVsbCkpXG4gICAgaWYgKCFpc3ZhbGlkUm9sbCkge1xuICAgICAgdGhyb3coXCJpbnZhbGlkIHJvbGxcIilcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGZpbmFsRnJhbWVJbnB1dChyMSwgcjIsIHIzKXtcbiAgICBpZiAoaXNTdHJpa2UocjEpIHx8IGlzU3BhcmUocjEsIHIyKSkge1xuICAgICAgcmV0dXJuIGFkZEZyYW1lKHIxLCByMiAsIHIzKVxuICAgIH1cbiAgICBhZGRGcmFtZShyMSAscjIpXG4gIH1cblxuICBmdW5jdGlvbiBpc2ZpbmFsRnJhbWUoKXtcbiAgICByZXR1cm4gZnJhbWVzLmxlbmd0aCA9PT0gOVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRnJhbWUgKHIxLCByMiwgcjMgPSBudWxsKSB7XG4gICAgICBpc1N0cmlrZShyMSk7XG4gICAgICBpc1NwYXJlKHIxLCByMilcbiAgICAgIGZyYW1lID0gbmV3IEZyYW1lKChmcmFtZXMubGVuZ3RoICsgMSksIHIxLCByMiwgKHIxICsgcjIgKyByMyksIHIzKVxuICAgICAgZnJhbWVzLnB1c2goZnJhbWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdHJpa2UocjEpIHtcbiAgICBpZiAocjEgPT09IDEwKXtcbiAgICAgIGxhc3RGcmFtZVN0cmlrZSA9IHRydWVcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICBmYWxzZVxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzU3BhcmUocjEsIHIyKSB7XG4gICAgaWYgKHIxICsgcjIgPT09IDEwICYmIHIxICE9PSAxMCl7XG4gICAgICBsYXN0RnJhbWVTcGFyZSA9IHRydWVcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICBmYWxzZVxuICB9O1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZWxhc3RTdHJpa2UocjEsIHIyKSB7XG4gICAgZnJhbWUgPSBmcmFtZXNbKGZyYW1lcy5sZW5ndGggLSAxKV07XG4gICAgbGV0IGJvbnVzID0gcjEgKyByMjtcbiAgICBpZiAoYm9udXMgPiAxMCkge2JvbnVzID0gMTB9XG4gICAgZnJhbWUudG90YWxTY29yZSArPSBib251c1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlbGFzdFNwYXJlKHIxKSB7XG4gICAgZnJhbWUgPSBmcmFtZXNbKGZyYW1lcy5sZW5ndGggLSAxKV07XG4gICAgZnJhbWUudG90YWxTY29yZSArPSByMVxuICB9XG5cbiAgZnVuY3Rpb24gRnJhbWUoZnJhbWVObywgcjEsIHIyPW51bGwsIHRvdGFsU2NvcmUsIHIzID0gbnVsbCkge1xuICAgIHRoaXMuaWQgPSBmcmFtZU5vO1xuICAgIHRoaXMucm9sbDEgPSByMTtcbiAgICB0aGlzLnJvbGwyID0gcjI7XG4gICAgdGhpcy5yb2xsMyA9IHIzO1xuICAgIHRoaXMudG90YWxTY29yZSA9IHRvdGFsU2NvcmU7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBGcmFtZTogRnJhbWUsXG4gICAgZnJhbWVzOiBmcmFtZXMsXG4gICAgaW5wdXQ6IGlucHV0XG4gIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBtYW5hZ2VyO1xuIl19
