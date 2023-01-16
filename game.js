import { ROCK, PAPER, SCISSORS, EMPTY, DRAW, WIN, LOSE } from "./constants.js";

export function fight(attacker, target) {
  if (attacker === target) {
    return DRAW;
  }

  if (
    target === EMPTY ||
    (attacker === ROCK && target === SCISSORS) ||
    (attacker === PAPER && target === ROCK) ||
    (attacker === SCISSORS && target === PAPER)
  ) {
    return WIN;
  }

  return LOSE;
}
