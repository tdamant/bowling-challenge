function bundle () {
  let manager = bowlingCardModule();

  function buildTable() {
    function addRowToTable (i) {
      function addNewRow(i){
        return `<tr id='frame-${i}'></tr>`
      };

      function addNewCells(i){
        let div = `<td></td>`
        return `<td>${i}</td>`+div+div+div+div
      };
      document.getElementById('table').insertAdjacentHTML('beforeend', addNewRow(i));
      document.getElementById(`frame-${i}`).insertAdjacentHTML('beforeend', addNewCells(i));
    };
    for(let i =1; i < 11; i++){
      addRowToTable(i)}
  }

  function updatePage(frame) {
    row = document.getElementById(`frame-${frame.id}`)
    row.children[1].innerHTML = frame.roll1;
    row.children[2].innerHTML = frame.roll2;
    if(!manager.isLastFrameSpareStrike()){
      row.children[3].innerHTML = frame.totalScore
    };

    function updatePreviousFrame() {
      frame = manager.frames[manager.frames.length - 2]
      row = document.getElementById(`frame-${frame.id}`)
      row.children[3].innerHTML = frame.totalScore
    };

    function isFinalFrame() {
      if (manager.frames.length === 9) {extraRoll()}
    }


    updatePreviousFrame()
    isFinalFrame()
  };

  function listenToSubmit() {
    document.getElementById('submit').addEventListener('click', function(event){
      event.preventDefault();
      roll1 = parseInt(document.getElementById('roll1').value);
      roll2 = parseInt(document.getElementById('roll2').value);
      frame = manager.input(roll1, roll2);
      updatePage(frame);
    })
  };

  function extraRoll() {
    document.getElementById('roll-inputs').insertAdjacentHTML('beforeend', "<select id='roll3'></select>");
    roll3 = document.getElementById('roll3')
    roll3.insertAdjacentHTML('beforeend', '<option selected hidden>Roll 3 score</option>')
    for(let i = 0; i < 11; i++) {
      roll3.insertAdjacentHTML('beforeend', `<option value=${i}>${i}</option>` )
    };
  }

  // <select id='roll3'>
  //   <option value=0>0</option>
  //   <option value=0>-</option>
  //   <option value=1>1</option>
  //   <option value=2>2</option>
  //   <option value=3>3</option>
  //   <option value=4>4</option>
  //   <option value=5>5</option>
  //   <option value=6>6</option>
  //   <option value=7>7</option>
  //   <option value=8>8</option>
  //   <option value=9>9</option>
  //   <option value=10>10</option>
  // </select>

  return {
    listenToSubmit: listenToSubmit,
    buildTable: buildTable
  }
}


bundle = bundle()
bundle.listenToSubmit();
bundle.buildTable();
