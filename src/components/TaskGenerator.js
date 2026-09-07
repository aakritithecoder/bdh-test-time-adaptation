// Generates toy sequence tasks with a hidden rule.
// Each task = { rule, demonstrations: [{input, output}], testInput, testOutput }

const RULES = {
  repeatLast2: (seq) => seq[seq.length - 2],
  reversePair: (seq) => [...seq].reverse()[1],
  incrementMod: (seq, n = 5) => (seq[seq.length - 1] + 1) % n,
  copyFirst: (seq) => seq[0],
};

export function generateTask(ruleName, numDemos = 3, seqLen = 4, vocabSize = 5) {
  const ruleFn = RULES[ruleName];
  const makeSeq = () =>
    Array.from({ length: seqLen }, () => Math.floor(Math.random() * vocabSize));

  const demonstrations = Array.from({ length: numDemos }, () => {
    const input = makeSeq();
    const output = ruleFn(input, vocabSize);
    return { input, output };
  });

  const testInput = makeSeq();
  const testOutput = ruleFn(testInput, vocabSize);

  return { rule: ruleName, demonstrations, testInput, testOutput };
}

export const RULE_NAMES = Object.keys(RULES);
