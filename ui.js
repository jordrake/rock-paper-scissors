import { ROCK, PAPER, SCISSORS, EMPTY } from "./constants.js";

export function config() {
  return {
    algorithm: document.getElementById("algorithm").value,
    tickRate: parseInt(document.getElementById("timer").value),
    duplicate: document.getElementById("duplicate").checked,
    gridSize: {
      rows: document.getElementById("grid-rows").value,
      columns: document.getElementById("grid-columns").value,
    },
  };
}

export function updateGridUiWithGame(grid) {
  const counts = {
    [ROCK]: 0,
    [PAPER]: 0,
    [SCISSORS]: 0,
  };

  const cells = grid.getCells();
  const gridEl = document.getElementById("rock-paper-scissors");
  for (let y = 0; y < cells.length; y++) {
    for (let x = 0; x < cells[y].length; x++) {
      const type = cells[y][x];
      gridEl.childNodes[y].childNodes[x].dataset.type = type;
      counts[type]++;
    }
  }

  document.getElementById(
    "rock-count"
  ).innerText = counts[ROCK];
  document.getElementById(
    "paper-count"
  ).innerText = counts[PAPER];
  document.getElementById(
    "scissors-count"
  ).innerText = counts[SCISSORS];
}

export function createGridUi(grid) {
  const gridEl = document.getElementById("rock-paper-scissors");
  gridEl.innerHTML = ""; // Clear grid

  const gridFrag = document.createDocumentFragment();

  const cells = grid.getCells();

  for (let y = 0; y < cells.length; y++) {
    const row = cells[y];
    const rowEl = document.createElement("div");
    rowEl.className = "row";

    for (let x = 0; x < row.length; x++) {
      const cellEl = document.createElement("div");
      cellEl.className = `cell`;
      cellEl.dataset.y = y;
      cellEl.dataset.x = x;
      rowEl.appendChild(cellEl);
    }
    gridFrag.appendChild(rowEl);
  }

  gridEl.appendChild(gridFrag);
}
