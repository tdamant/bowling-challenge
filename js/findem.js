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
    checkRolls(r1, r2);
    if (lastFrameStrike) {updatelastStrike(r1,r2)};
    if (lastFrameSpare) {updatelastSpare(r1)};
    if (isfinalFrame()) { return finalFrameInput(r1, r2, r3)};
    addFrame(r1, r2);
  };

  function checkRolls (a, b) {
    let isvalidRoll = ((a >= 0 && a < 11) && (b >= 0 && b < 11))
    if (!isvalidRoll) {
      throw("invalid roll")
    };
    if (frames.length < 9 && (a+b > 10)) {
      throw("roll can't be more than 10")
    }
  };

  function finalFrameInput(r1, r2, r3){
    if ((r1===10) || (r1 + r2 ===10)) {
    frame = new Frame((frames.length + 1), r1, r2, (r1 + r2 + r3), r3)
    return frames.push(frame)};
    addFrame(r1 ,r2)
  }

  function isfinalFrame(){
    return frames.length === 9
  }

  function addFrame (r1, r2, r3 = null) {
      frame = new Frame((frames.length + 1), r1, r2, (r1 + r2 + r3), r3);
      isStrike(frame);
      isSpare(frame);
      frames.push(frame);
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImpzL21haW4uanMiLCJzcmMvYm93bGluZ0NhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiYm93bGluZ0NhcmRNb2R1bGUgPSByZXF1aXJlKCcuLi9zcmMvYm93bGluZ0NhcmQuanMnKTtcbiIsIi8vIFRPIERPIC0gcmVmYWN0b3IgdmFsaWRhdGlvblxuLy8gdGlkeSB1cCBvcHRpb25hbCBwYXJhbXNcbi8vIGVuY2Fwc3VsYXRlIGZ1cnRoZXJcbi8vIHRlc3QgdGhpcmQgcm9sbCB2YWxpZGF0aW9uXG4vLyBhZGQgdGVzdHMgdG8gY2hlY2sgYWRkaW5nIHRoaXJkIHJvbGUgb3V0c2lkZSBvZiAxMHRoIGZyYW1lIGlzbid0IGFsbG93ZWRcbi8vIHN0b3AgZ2FtZXMgZ29pbmcgb24gcGFzdCAxMCBmcmFtZXNcblxuZnVuY3Rpb24gbWFuYWdlcigpe1xuICB2YXIgZnJhbWVzID0gW11cbiAgdmFyIGxhc3RGcmFtZVN0cmlrZSA9IGZhbHNlXG4gIHZhciBsYXN0RnJhbWVTcGFyZSA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5wdXQocjEsIHIyPW51bGwsIHIzPW51bGwpe1xuICAgIGNoZWNrUm9sbHMocjEsIHIyKTtcbiAgICBpZiAobGFzdEZyYW1lU3RyaWtlKSB7dXBkYXRlbGFzdFN0cmlrZShyMSxyMil9O1xuICAgIGlmIChsYXN0RnJhbWVTcGFyZSkge3VwZGF0ZWxhc3RTcGFyZShyMSl9O1xuICAgIGlmIChpc2ZpbmFsRnJhbWUoKSkgeyByZXR1cm4gZmluYWxGcmFtZUlucHV0KHIxLCByMiwgcjMpfTtcbiAgICBhZGRGcmFtZShyMSwgcjIpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNoZWNrUm9sbHMgKGEsIGIpIHtcbiAgICBsZXQgaXN2YWxpZFJvbGwgPSAoKGEgPj0gMCAmJiBhIDwgMTEpICYmIChiID49IDAgJiYgYiA8IDExKSlcbiAgICBpZiAoIWlzdmFsaWRSb2xsKSB7XG4gICAgICB0aHJvdyhcImludmFsaWQgcm9sbFwiKVxuICAgIH07XG4gICAgaWYgKGZyYW1lcy5sZW5ndGggPCA5ICYmIChhK2IgPiAxMCkpIHtcbiAgICAgIHRocm93KFwicm9sbCBjYW4ndCBiZSBtb3JlIHRoYW4gMTBcIilcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gZmluYWxGcmFtZUlucHV0KHIxLCByMiwgcjMpe1xuICAgIGlmICgocjE9PT0xMCkgfHwgKHIxICsgcjIgPT09MTApKSB7XG4gICAgZnJhbWUgPSBuZXcgRnJhbWUoKGZyYW1lcy5sZW5ndGggKyAxKSwgcjEsIHIyLCAocjEgKyByMiArIHIzKSwgcjMpXG4gICAgcmV0dXJuIGZyYW1lcy5wdXNoKGZyYW1lKX07XG4gICAgYWRkRnJhbWUocjEgLHIyKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNmaW5hbEZyYW1lKCl7XG4gICAgcmV0dXJuIGZyYW1lcy5sZW5ndGggPT09IDlcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEZyYW1lIChyMSwgcjIsIHIzID0gbnVsbCkge1xuICAgICAgZnJhbWUgPSBuZXcgRnJhbWUoKGZyYW1lcy5sZW5ndGggKyAxKSwgcjEsIHIyLCAocjEgKyByMiArIHIzKSwgcjMpO1xuICAgICAgaXNTdHJpa2UoZnJhbWUpO1xuICAgICAgaXNTcGFyZShmcmFtZSk7XG4gICAgICBmcmFtZXMucHVzaChmcmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1N0cmlrZShmcmFtZSkge1xuICAgIGlmIChmcmFtZS5yb2xsMSA9PT0gMTApe1xuICAgICAgbGFzdEZyYW1lU3RyaWtlID0gdHJ1ZTtcbiAgICAgIGZyYW1lLnJvbGwyID0gbnVsbFxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGxhc3RGcmFtZVN0cmlrZSA9IGZhbHNlO1xuICAgIGZhbHNlXG4gIH07XG5cbiAgZnVuY3Rpb24gaXNTcGFyZShmcmFtZSkge1xuICAgIGlmIChmcmFtZS50b3RhbFNjb3JlID09PSAxMCAmJiBmcmFtZS5yb2xsMSAhPT0gMTApe1xuICAgICAgbGFzdEZyYW1lU3BhcmUgPSB0cnVlXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH07XG4gICAgbGFzdEZyYW1lU3BhcmUgPSBmYWxzZVxuICAgIGZhbHNlXG4gIH07XG5cbiAgZnVuY3Rpb24gdXBkYXRlbGFzdFN0cmlrZShyMSwgcjIpIHtcbiAgICBmcmFtZSA9IGZyYW1lc1soZnJhbWVzLmxlbmd0aCAtIDEpXTtcbiAgICBsZXQgYm9udXMgPSByMSArIHIyO1xuICAgIGlmIChib251cyA+IDEwKSB7Ym9udXMgPSAxMH1cbiAgICBmcmFtZS50b3RhbFNjb3JlICs9IGJvbnVzXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVsYXN0U3BhcmUocjEpIHtcbiAgICBmcmFtZSA9IGZyYW1lc1soZnJhbWVzLmxlbmd0aCAtIDEpXTtcbiAgICBmcmFtZS50b3RhbFNjb3JlICs9IHIxXG4gIH1cblxuICBmdW5jdGlvbiBGcmFtZShmcmFtZU5vLCByMSwgcjI9bnVsbCwgdG90YWxTY29yZSwgcjMgPSBudWxsKSB7XG4gICAgdGhpcy5pZCA9IGZyYW1lTm87XG4gICAgdGhpcy5yb2xsMSA9IHIxO1xuICAgIHRoaXMucm9sbDIgPSByMjtcbiAgICB0aGlzLnJvbGwzID0gcjM7XG4gICAgdGhpcy50b3RhbFNjb3JlID0gdG90YWxTY29yZTtcbiAgfTtcblxuICBmdW5jdGlvbiBpc0xhc3RGcmFtZVNwYXJlU3RyaWtlKCkge1xuICAgIHJldHVybiAobGFzdEZyYW1lU3RyaWtlIHx8IGxhc3RGcmFtZVNwYXJlKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBGcmFtZTogRnJhbWUsXG4gICAgZnJhbWVzOiBmcmFtZXMsXG4gICAgaW5wdXQ6IGlucHV0LFxuICAgIGlzTGFzdEZyYW1lU3BhcmVTdHJpa2U6IGlzTGFzdEZyYW1lU3BhcmVTdHJpa2VcbiAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IG1hbmFnZXI7XG4iXX0=
