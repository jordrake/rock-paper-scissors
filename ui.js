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

  const gridEl = document.getElementById("rock-paper-scissors");

  grid.each((x, y, type) => {
    gridEl.childNodes[y].childNodes[x].dataset.type = type;
    counts[type]++;
  });
  
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

  grid.eachRow((y) =>{
    const rowEl = document.createElement("div");
    rowEl.className = "row";
    gridFrag.appendChild(rowEl);

    return (x) => {
      const cellEl = document.createElement("div");
      cellEl.className = `cell`;
      cellEl.dataset.y = y;
      cellEl.dataset.x = x;
      rowEl.appendChild(cellEl);
    }
  });

  gridEl.appendChild(gridFrag);
}
