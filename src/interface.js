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
  }
  updatePreviousFrame()
};

function updatePreviousFrame() {
  frame = manager.frames[manager.frames.length - 2]
  row = document.getElementById(`frame-${frame.id}`)
  row.children[3].innerHTML = frame.totalScore
}


function listenToSubmit() {
  document.getElementById('submit').addEventListener('click', function(event){
    event.preventDefault();
    roll1 = parseInt(document.getElementById('roll1').value);
    roll2 = parseInt(document.getElementById('roll2').value);
    frame = manager.input(roll1, roll2);
    updatePage(frame);
  })
};

// manager.input(1,2)
listenToSubmit();
buildTable();
