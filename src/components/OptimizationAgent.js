// Toy stand-in for the "optimization route" (HRM/TRM-style):
// fits a tiny linear model to the demonstrations via gradient descent
// BEFORE answering the test input. This requires a backward pass per task.

export function optimizationPredict(demonstrations, testInput, vocabSize, steps = 50, lr = 0.1) {
  // weight vector maps each input position to an output logit-ish scalar
  let w = new Array(testInput.length).fill(0);
  let b = 0;

  const predict = (input) =>
    input.reduce((sum, x, i) => sum + w[i] * x, b);

  for (let s = 0; s < steps; s++) {
    demonstrations.forEach(({ input, output }) => {
      const pred = predict(input);
      const error = pred - output;
      w = w.map((wi, i) => wi - lr * error * input[i]);
      b = b - lr * error;
    });
  }

  const raw = predict(testInput);
  return Math.max(0, Math.min(vocabSize - 1, Math.round(raw)));
}
