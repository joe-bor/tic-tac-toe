/*----- constants -----*/
const MARKS = {
  0: "",
  1: { marker: "🥶", color: "red" },
  "-1": { marker: "🥵", color: "purple" },
};

/*----- state variables -----*/
let turn;
let winner;
let grid;

/*----- cached elements  -----*/
const messageEl = document.querySelector("h4");
const playBtn = document.querySelector("button");
const gridEls = [...document.querySelectorAll(".square")];

/*----- event listeners -----*/
document.querySelector("#game-box").addEventListener("click", markGrid);
playBtn.addEventListener("click", init);

/*----- functions -----*/
init();
function init() {
  turn = 1;
  winner = null;
  grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  render();
}

function render() {
  renderGrid();
  renderMessage();
  renderControl();
}

function renderGrid() {
  grid.forEach((rowArr, rowIdx) => {
    rowArr.forEach((col, colIdx) => {
      //dynamically select id to select our div with their id
      const boxId = `r${rowIdx}c${colIdx}`;
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
    messageEl.innerText = `Player ${MARKS[turn]["marker"]} is thinking`;
  }
}

function renderControl() {
  //conditionally render the play button
  playBtn.style.visibility = winner ? "visible" : "hidden";

  //prevent re-click of div? add className?
}

function markGrid(event) {
  //select the event target, then modify grid accordingly
  const clickedEl = event.target;
  //make sure clicked element IS NOT the parent div
  if (!clickedEl.classList.contains("square")) return;
  const row = clickedEl.getAttribute("data-row");
  const col = clickedEl.getAttribute("data-col");

  grid[row][col] = turn;

  //update winner
  winner = checkForWinner(row, col);
  //else toggle the turn
  turn *= -1;
  //render changes
  render();
}

//This function returns 1 / -1 / null
function checkForWinner(row, col) {
  return checkHorizontalWin(row, col);
}

//TODO: prevent from going out of the grid, adjacent grids are the same player's
//! REDO check functions
function checkHorizontalWin(row, col) {
  //sum === 3 means win
  const left = checkMarkedLeft(row, col);
  const right = checkedMarkedRight(row, col);

  return left + right === 3 ? turn : null;
}

function checkedMarkedRight(row, col) {
  let sumRight = 0;
  //while we are within the box
  //and the box to our right is the same marker, increment sum and col
  while (grid[row][col] !== undefined && grid[row][col + 1] === turn) {
    sumRight++;
    col++;
  }
  console.log(`Right: ${sumRight}`); //! How come when I increment col it moves left
  return sumRight;
}

function checkMarkedLeft(row, col) {
  let sumLeft = 0;
  while (grid[row][col] !== undefined && grid[row][col - 1] === turn) {
    sumLeft++;
    col--;
  }
  console.log(`Left: ${sumLeft}`); //! How come when I increment col it moves right
  return sumLeft;
}

// grid[r][c] if c + 1 === turn, add sum then increment, then check again
