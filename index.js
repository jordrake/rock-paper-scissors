import { sample } from "./utils.js";
import { Grid } from "./grid.js";
import { gameTurnNearest } from "./game-turn-nearest.js";
import { gameTurnRandom } from "./game-turn-random.js";
import { ROCK, PAPER, SCISSORS, EMPTY, emojis } from "./constants.js";
import { config } from "./game.js";

function fillGrid(grid) {
  const types = [EMPTY, ROCK, PAPER, SCISSORS];

  grid.map(() => sample(types));
}

function drawGrid(grid) {
  const gridEl = document.getElementById("rock-paper-scissors");
  gridEl.innerHTML = ""; // Clear grid

  const gridFrag = document.createDocumentFragment();

  const cells = grid.getCells();
  const counts = {
    [ROCK]: 0,
    [PAPER]: 0,
    [SCISSORS]: 0,
  };

  for (let y = 0; y < cells.length; y++) {
    const row = cells[y];
    const rowEl = document.createElement("div");
    rowEl.className = "row";

    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      const cellEl = document.createElement("div");
      cellEl.className = `cell`;
      cellEl.innerHTML = emojis[cell];
      cellEl.dataset["y"] = y;
      cellEl.dataset["x"] = x;

      counts[cell]++;

      rowEl.appendChild(cellEl);
    }

    gridFrag.appendChild(rowEl);
  }

  gridEl.appendChild(gridFrag);
  document.getElementById(
    "rock-count"
  ).innerText = `${emojis[ROCK]}: ${counts[ROCK]}`;
  document.getElementById(
    "paper-count"
  ).innerText = `${emojis[PAPER]}: ${counts[PAPER]}`;
  document.getElementById(
    "scissors-count"
  ).innerText = `${emojis[SCISSORS]}: ${counts[SCISSORS]}`;
}

let grid = new Grid(30, 30, EMPTY);
fillGrid(grid);
drawGrid(grid);

function next() {
  const { algorithm } = config();
  const gridTurn = algorithm === "random" ? gameTurnRandom : gameTurnNearest;

  gridTurn(grid);
  drawGrid(grid);
}

let timeoutHandle;
function timer() {
  const { tickRate } = config();

  next();

  timeoutHandle = setTimeout(timer, tickRate);
}

function start() {
  stop();
  timer();
}

function stop() {
  clearTimeout(timeoutHandle);
}

function reset() {
  stop();
  grid = new Grid(30, 30, EMPTY);
  fillGrid(grid);
  drawGrid(grid);
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("next").addEventListener("click", next);
