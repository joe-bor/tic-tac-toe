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
const gridEls = [...document.querySelectorAll(".square")];
console.log(gridEls);
/*----- event listeners -----*/
document.querySelector("#game-box").addEventListener("click", markGrid);
playBtn.addEventListener("click", init);

/*----- functions -----*/
init();
function init() {
  turn = 1;
  winner = null;
  //TODO: Make sure to reset grid later after tests
  grid = [
    [1, -1, 0],
    [0, 0, 0],
    [0, 0, 0],
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
      //dynamically select id to select our div with their id
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
    messageEl.innerText = `Player ${MARKS[turn]["marker"]} is thinking`;
  }
}

function renderControl() {
  //conditionally render the play button
  playBtn.style.visibility = winner ? "visible" : "hidden";

  //prevent re-click of div? add className?
}

//TODO: create APP's logic (clicking div)
function markGrid(event) {
  //select the event target, then modify grid accordingly
  const clickedEl = event.target;
  //make sure clicked element IS NOT the parent div
  if (!clickedEl.classList.contains("square")) return;
  const row = clickedEl.getAttribute("data-row");
  const col = clickedEl.getAttribute("data-col");

  grid[row][col] = turn;
  console.log(grid);
  //check if there's a winner
  //return if winner
  if (winner) return;
  //else toggle the turn
  turn *= -1;
  //render changes
  render();
}

//TODO: create and layout winning conditions
