export function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function minMax(min, max, value) {
  return Math.min(Math.max(value, min), max);
}

export function nAritySet() {
  const set = new Set();

  const keyGen = (...parts) => parts.join(",");

  return {
    add: (...parts) => set.add(keyGen(parts)),
    has: (...parts) => set.has(keyGen(parts)),
  };
}
