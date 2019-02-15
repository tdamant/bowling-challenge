let manager = bowlingCardModule();

function buildTable() {
  function addRowToTable (i) {
    function addNewRow(i){
      return `<tr id='frame-${i}'></tr>`
    };

    function addNewCells(i){
      return `<td id="${i}-frame-number">${i}</td>`+
      `<td id="${i}-r1"></td>`+
      `<td id="${i}-r2"></td>`+
      `<td id="${i}-frame-total"></td>`+
      `<td id="${i}-running-score"></td>`
    };
    document.getElementById('table').insertAdjacentHTML('beforeend', addNewRow(i));
    document.getElementById(`frame-${i}`).insertAdjacentHTML('beforeend', addNewCells(i));
  };
  for(let i =1; i < 11; i++){
    addRowToTable(i)}
}

function updatePage(i) {
  document.getElementById(`${i}-r1`).innerHTML = manager.frames[(i-1)].roll1;
  document.getElementById(`${i}-r2`).innerHTML = manager.frames[(i-1)].roll2;
  if(!manager.isLastFrameSpareStrike()) {
    document.getElementById(`${i}-frame-total`).innerHTML = manager.frames[(i-1)].totalScore;
  }
  document.getElementById(`${i-1}-frame-total`).innerHTML = manager.frames[(i-2)].totalScore;
  console.log(manager.isLastFrameSpareStrike())

}

function listenToSubmit() {

  document.getElementById('submit').addEventListener('click', function(event){
    event.preventDefault();
    roll1 = parseInt(document.getElementById('roll1').value);
    roll2 = parseInt(document.getElementById('roll2').value);
    manager.input(roll1, roll2);
    updatePage(manager.frames.length);
  })
};

// manager.input(1,2)
listenToSubmit();
buildTable();
