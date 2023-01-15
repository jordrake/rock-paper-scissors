import { WIN, EMPTY } from "./constants.js";
import { minMax } from "./utils.js";
import { config, fight } from "./game.js";

export function gameTurnNearest(grid) {
  const { duplicate } = config();
  let seen = {};

  grid.each((x, y, me) => {
    if (me === EMPTY || seen[`${x},${y}`]) {
      return;
    }

    let nearest;
    let distance;
    grid.each((targetX, targetY, them) => {
      if (them !== EMPTY && fight(me, them) === WIN) {
        const newDistance = Math.abs(x - targetX) + Math.abs(y - targetY);
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
      const xDiff = nearestX - x;
      const yDiff = nearestY - y;

      const moveTowards =
        Math.abs(yDiff) > Math.abs(xDiff)
          ? [0, minMax(-1, 1, yDiff)]
          : [minMax(-1, 1, xDiff), 0];

      const [targetX, targetY] = [x + moveTowards[0], y + moveTowards[1]];
      const target = grid.at(targetX, targetY);

      if (fight(me, target) === WIN) {
        grid.place(targetX, targetY, me);
        seen[`${targetX},${targetY}`] = true;

        if (!duplicate) {
          grid.place(x, y, EMPTY);
        }
      } else {
        // Don't move
        seen[`${x},${y}`] = true;
      }
    }
  });
}
