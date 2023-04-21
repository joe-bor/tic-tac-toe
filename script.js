/*----- constants -----*/
const MARKS = {
  0: "",
  1: { marker: "🥶", color: "red" },
  "-1": { marker: "🥵", color: "purple" },
  //TODO: turn value to an object, to add corresponding color
};

/*----- state variables -----*/
let turn;
let winner;
let grid;

/*----- cached elements  -----*/
const messageEl = document.querySelector("h4");
const playBtn = document.querySelector("button");
/*----- event listeners -----*/

/*----- functions -----*/
init();

function init() {
  turn = 1;
  winner = null;
  //TODO: Make sure to reset grid later after tests
  grid = [
    [1, -1, 0],
    [0, 0, 0],
    [0, -1, 1],
  ];

  render();
}
//TODO: merge the render functions
function render() {
  renderGrid();
  renderMessage();
  renderControl();
}

function renderGrid() {
  grid.forEach((rowArr, rowIdx) => {
    rowArr.forEach((col, colIdx) => {
      //dynamically generates id to select our div with their id
      const boxId = `c${rowIdx}r${colIdx}`;
      const box = document.querySelector(`#${boxId}`);
      box.textContent = MARKS[col]["marker"];
      box.style.color = MARKS[col]["color"];
    });
  });
}

function renderMessage() {
  //change the message depending on state of game
  //is there a winner? who's turn is it?
  if (winner === "Tie") {
    messageEl.innerText = "It's a TIE!";
  } else if (winner) {
    messageEl.innerHTML = `Winner: <span style="color:${MARKS[turn]["color"]}"> PLAYER ${MARKS[turn]["marker"]}</span>`;
  } else {
    messageEl.innerText = `Player ${MARKS[turn]}'s is thinking`;
  }
}

function renderControl() {
  //conditionally render the play button
  playBtn.style.visibility = winner ? "visible" : "hidden";

  //prevent re-click of div? add className?
}

//TODO: create APP's logic (clicking div)
//TODO: create and layout winning conditions
