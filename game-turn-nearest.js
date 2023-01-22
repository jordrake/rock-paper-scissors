import { WIN, EMPTY } from "./constants.js";
import { minMax, nAritySet } from "./utils.js";
import { fight } from "./game.js";
import { config } from "./ui.js";

function distanceBetween(x, y, targetX, targetY) {
  return Math.abs(x - targetX) + Math.abs(y - targetY);
}

function oneSpaceTowards(x, y, targetX, targetY) {
  const xDiff = targetX - x;
  const yDiff = targetY - y;

  return Math.abs(yDiff) > Math.abs(xDiff)
    ? [0, minMax(-1, 1, yDiff)]
    : [minMax(-1, 1, xDiff), 0];
}

export function gameTurnNearest(grid) {
  const { duplicate } = config();
  const visitedSet = nAritySet();

  grid.each((x, y, me) => {
    if (me === EMPTY || visitedSet.has(x, y)) {
      return;
    }

    let nearest;
    let distance;
    grid.each((targetX, targetY, them) => {
      if (them !== EMPTY && fight(me, them) === WIN) {
        const newDistance = distanceBetween(x, y, targetX, targetY);
        if (!nearest) {
          nearest = [targetX, targetY];
          distance = newDistance;
        } else {
          if (newDistance < distance) {
            nearest = [targetX, targetY];
            distance = newDistance;
          }
        }
      }
    });

    if (nearest) {
      const [nearestX, nearestY] = nearest;
      const move = oneSpaceTowards(x, y, nearestX, nearestY);

      const [targetX, targetY] = [x + move[0], y + move[1]];
      const target = grid.at(targetX, targetY);

      if (fight(me, target) === WIN) {
        grid.place(targetX, targetY, me);
        visitedSet.add(targetX, targetY);

        if (!duplicate || target === EMPTY) {
          grid.place(x, y, EMPTY);
        }
      }
    }
  });
}
