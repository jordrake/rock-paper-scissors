import { sample } from "./utils.js";
import { Grid } from "./grid.js";
import { gameTurnNearest } from "./game-turn-nearest.js";
import { gameTurnRandom } from "./game-turn-random.js";
import { ROCK, PAPER, SCISSORS, EMPTY } from "./constants.js";
import { config, createGridUi, updateGridUiWithGame } from "./ui.js";

let grid;
let turnCount = 0;

function fillGrid(grid) {
  const types = [EMPTY, ROCK, PAPER, SCISSORS];

  grid.map(() => sample(types));
}

function next() {
  const { algorithm } = config();
  const gridTurn = algorithm === "random" ? gameTurnRandom : gameTurnNearest;

  gridTurn(grid);
  updateGridUiWithGame(grid, ++turnCount);
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
  const { gridSize } = config();

  turnCount = 0;

  stop();

  grid = new Grid(gridSize.rows, gridSize.columns, EMPTY);
  createGridUi(grid);
  fillGrid(grid);
  updateGridUiWithGame(grid, turnCount);
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("next").addEventListener("click", next);

reset();
