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
    return addFrame(r1, r2);
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImpzL21haW4uanMiLCJzcmMvYm93bGluZ0NhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImJvd2xpbmdDYXJkTW9kdWxlID0gcmVxdWlyZSgnLi4vc3JjL2Jvd2xpbmdDYXJkLmpzJyk7XG4iLCIvLyBUTyBETyAtIHJlZmFjdG9yIHZhbGlkYXRpb25cbi8vIHRpZHkgdXAgb3B0aW9uYWwgcGFyYW1zXG4vLyBlbmNhcHN1bGF0ZSBmdXJ0aGVyXG4vLyB0ZXN0IHRoaXJkIHJvbGwgdmFsaWRhdGlvblxuLy8gYWRkIHRlc3RzIHRvIGNoZWNrIGFkZGluZyB0aGlyZCByb2xlIG91dHNpZGUgb2YgMTB0aCBmcmFtZSBpc24ndCBhbGxvd2VkXG4vLyBzdG9wIGdhbWVzIGdvaW5nIG9uIHBhc3QgMTAgZnJhbWVzXG5cbmZ1bmN0aW9uIG1hbmFnZXIoKXtcbiAgdmFyIGZyYW1lcyA9IFtdXG4gIHZhciBsYXN0RnJhbWVTdHJpa2UgPSBmYWxzZVxuICB2YXIgbGFzdEZyYW1lU3BhcmUgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGlucHV0KHIxLCByMj1udWxsLCByMz1udWxsKXtcbiAgICBjaGVja1JvbGxzKHIxLCByMik7XG4gICAgaWYgKGxhc3RGcmFtZVN0cmlrZSkge3VwZGF0ZWxhc3RTdHJpa2UocjEscjIpfTtcbiAgICBpZiAobGFzdEZyYW1lU3BhcmUpIHt1cGRhdGVsYXN0U3BhcmUocjEpfTtcbiAgICBpZiAoaXNmaW5hbEZyYW1lKCkpIHsgcmV0dXJuIGZpbmFsRnJhbWVJbnB1dChyMSwgcjIsIHIzKX07XG4gICAgcmV0dXJuIGFkZEZyYW1lKHIxLCByMik7XG4gIH07XG5cbiAgZnVuY3Rpb24gY2hlY2tSb2xscyAoYSwgYikge1xuICAgIGxldCBpc3ZhbGlkUm9sbCA9ICgoYSA+PSAwICYmIGEgPCAxMSkgJiYgKGIgPj0gMCAmJiBiIDwgMTEpKVxuICAgIGlmICghaXN2YWxpZFJvbGwpIHtcbiAgICAgIHRocm93KFwiaW52YWxpZCByb2xsXCIpXG4gICAgfTtcbiAgICBpZiAoZnJhbWVzLmxlbmd0aCA8IDkgJiYgKGErYiA+IDEwKSkge1xuICAgICAgdGhyb3coXCJyb2xsIGNhbid0IGJlIG1vcmUgdGhhbiAxMFwiKVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBmaW5hbEZyYW1lSW5wdXQocjEsIHIyLCByMyl7XG4gICAgaWYgKChyMT09PTEwKSB8fCAocjEgKyByMiA9PT0xMCkpIHtcbiAgICBmcmFtZSA9IG5ldyBGcmFtZSgoZnJhbWVzLmxlbmd0aCArIDEpLCByMSwgcjIsIChyMSArIHIyICsgcjMpLCByMylcbiAgICBmcmFtZXMucHVzaChmcmFtZSlcbiAgICByZXR1cm4gZnJhbWV9O1xuICAgIHJldHVybiBhZGRGcmFtZShyMSAscjIpXG4gIH1cblxuICBmdW5jdGlvbiBpc2ZpbmFsRnJhbWUoKXtcbiAgICByZXR1cm4gZnJhbWVzLmxlbmd0aCA9PT0gOVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRnJhbWUgKHIxLCByMiwgcjMgPSBudWxsKSB7XG4gICAgICBmcmFtZSA9IG5ldyBGcmFtZSgoZnJhbWVzLmxlbmd0aCArIDEpLCByMSwgcjIsIChyMSArIHIyICsgcjMpLCByMyk7XG4gICAgICBpc1N0cmlrZShmcmFtZSk7XG4gICAgICBpc1NwYXJlKGZyYW1lKTtcbiAgICAgIGZyYW1lcy5wdXNoKGZyYW1lKTtcbiAgICAgIHJldHVybiBmcmFtZVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTdHJpa2UoZnJhbWUpIHtcbiAgICBpZiAoZnJhbWUucm9sbDEgPT09IDEwKXtcbiAgICAgIGxhc3RGcmFtZVN0cmlrZSA9IHRydWU7XG4gICAgICBmcmFtZS5yb2xsMiA9IG51bGxcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfTtcbiAgICBsYXN0RnJhbWVTdHJpa2UgPSBmYWxzZTtcbiAgICBmYWxzZVxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzU3BhcmUoZnJhbWUpIHtcbiAgICBpZiAoZnJhbWUudG90YWxTY29yZSA9PT0gMTAgJiYgZnJhbWUucm9sbDEgIT09IDEwKXtcbiAgICAgIGxhc3RGcmFtZVNwYXJlID0gdHJ1ZVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9O1xuICAgIGxhc3RGcmFtZVNwYXJlID0gZmFsc2VcbiAgICBmYWxzZVxuICB9O1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZWxhc3RTdHJpa2UocjEsIHIyKSB7XG4gICAgZnJhbWUgPSBmcmFtZXNbKGZyYW1lcy5sZW5ndGggLSAxKV07XG4gICAgbGV0IGJvbnVzID0gcjEgKyByMjtcbiAgICBpZiAoYm9udXMgPiAxMCkge2JvbnVzID0gMTB9XG4gICAgZnJhbWUudG90YWxTY29yZSArPSBib251c1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlbGFzdFNwYXJlKHIxKSB7XG4gICAgZnJhbWUgPSBmcmFtZXNbKGZyYW1lcy5sZW5ndGggLSAxKV07XG4gICAgZnJhbWUudG90YWxTY29yZSArPSByMVxuICB9XG5cbiAgZnVuY3Rpb24gRnJhbWUoZnJhbWVObywgcjEsIHIyPW51bGwsIHRvdGFsU2NvcmUsIHIzID0gbnVsbCkge1xuICAgIHRoaXMuaWQgPSBmcmFtZU5vO1xuICAgIHRoaXMucm9sbDEgPSByMTtcbiAgICB0aGlzLnJvbGwyID0gcjI7XG4gICAgdGhpcy5yb2xsMyA9IHIzO1xuICAgIHRoaXMudG90YWxTY29yZSA9IHRvdGFsU2NvcmU7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNMYXN0RnJhbWVTcGFyZVN0cmlrZSgpIHtcbiAgICByZXR1cm4gKGxhc3RGcmFtZVN0cmlrZSB8fCBsYXN0RnJhbWVTcGFyZSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgRnJhbWU6IEZyYW1lLFxuICAgIGZyYW1lczogZnJhbWVzLFxuICAgIGlucHV0OiBpbnB1dCxcbiAgICBpc0xhc3RGcmFtZVNwYXJlU3RyaWtlOiBpc0xhc3RGcmFtZVNwYXJlU3RyaWtlXG4gIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBtYW5hZ2VyO1xuIl19
