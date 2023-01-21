import { WIN, EMPTY } from "./constants.js";
import { nAritySet, sample } from "./utils.js";
import { fight } from "./game.js";
import { config } from "./ui.js";

const moves = [
  [0, 1], // north
  [1, 0], // east
  [0, -1], // south
  [-1, 0], // west
];

export function gameTurnRandom(grid) {
  const { duplicate } = config();
  const visitedSet = nAritySet();

  grid.each((x, y, me) => {
    if (me === EMPTY || visitedSet.has(x, y)) {
      return;
    }

    const possibleMoves = moves
      .map((move) => [x + move[0], y + move[1]])
      .filter((move) => grid.exists(move[0], move[1]));

    const [targetX, targetY] = sample(possibleMoves);
    const target = grid.at(targetX, targetY);

    if (fight(me, target) === WIN) {
      grid.place(targetX, targetY, me);
      visitedSet.add(targetX, targetY);

      if (!duplicate || target === EMPTY) {
        grid.place(x, y, EMPTY);
      }
    }
  });
}
