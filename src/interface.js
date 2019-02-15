let manager = bowlingCardModule();

function buildTable() {
  function addRowToTable (i) {
    function addNewRow(i){
      return `<tr id='frame-${i}'></tr>`
    };

    function addNewCells(i){
      return `<td id="${i}-frame-number">15%</td>`+
      `<td id="${i}-r1">15%</td>`+
      `<td id="${i}-r2">15%</td>`+
      `<td id="${i}-frame-total">20%</td>`+
      `<td id="${i}-running-score">10%</td>`
    };
    document.getElementById('table').insertAdjacentHTML('beforeend', addNewRow(i));
    document.getElementById(`frame-${i}`).insertAdjacentHTML('beforeend', addNewCells(i));
  };
  for(let i =1; i < 11; i++){
    addRowToTable(i)}
}

function listenToSubmit() {

  document.getElementById('submit').addEventListener('click', function(event){
    event.preventDefault();
    roll1 = parseInt(document.getElementById('roll1').value);
    roll2 = parseInt(document.getElementById('roll2').value);
    manager.input(roll1, roll2)})
};

// manager.input(1,2)
listenToSubmit();
buildTable();
