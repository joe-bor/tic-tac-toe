/*----- constants -----*/
const MARKS = {
  0: "",
  1: "X",
  "-1": "O",
};

/*----- state variables -----*/
let turn;
let winner;
let grid;

/*----- cached elements  -----*/

/*----- event listeners -----*/

/*----- functions -----*/
init();

function init() {
  turn = 1;
  winner = null;
  grid = [
    [1, -1, 0],
    [0, 0, 0],
    [0, -1, 1],
  ];

  render();
}

function render() {
  grid.forEach((rowArr, rowIdx) => {
    rowArr.forEach((col, colIdx) => {
      //dynamically generates id to select our div
      const boxId = `c${rowIdx}r${colIdx}`;
      const box = document.querySelector(`#${boxId}`);
      box.textContent = MARKS[col];
    });
  });
}
