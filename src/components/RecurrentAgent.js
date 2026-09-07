// Toy stand-in for the "recurrent-state route" (BDH-CQ-style):
// state accumulates additively per demonstration (no parameter update,
// no backward pass). This is a simplified illustration, NOT the real
// BDH-CQ mechanism — label it as such in the UI.

export function recurrentPredict(demonstrations, testInput, vocabSize) {
  // fixed-size associative state: for each (input-pattern-hash) -> output tally
  const state = new Map();

  demonstrations.forEach(({ input, output }) => {
    const key = input.join(",");
    state.set(key, output); // additive associative write
  });

  const key = testInput.join(",");
  if (state.has(key)) return state.get(key);

  // fallback: nearest-neighbor by hamming distance over stored keys
  let best = null, bestDist = Infinity;
  for (const [k, v] of state.entries()) {
    const kArr = k.split(",").map(Number);
    const dist = kArr.reduce((d, val, i) => d + (val !== testInput[i] ? 1 : 0), 0);
    if (dist < bestDist) { bestDist = dist; best = v; }
  }
  return best ?? Math.floor(vocabSize / 2);
}
