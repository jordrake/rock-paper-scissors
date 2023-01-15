export function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function minMax(min, max, value) {
  return Math.min(Math.max(value, min), max);
}
