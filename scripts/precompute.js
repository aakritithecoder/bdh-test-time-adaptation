// Run heavier trial counts offline, save as JSON, load into the app.
// node scripts/precompute.js > src/data/precomputed.json
import { generateTask, RULE_NAMES } from "../src/components/TaskGenerator.js";
import { optimizationPredict } from "../src/components/OptimizationAgent.js";
import { recurrentPredict } from "../src/components/RecurrentAgent.js";

const results = {};
for (const rule of RULE_NAMES) {
  results[rule] = [];
  for (let numDemos = 1; numDemos <= 10; numDemos++) {
    let optCorrect = 0, recCorrect = 0;
    const trials = 500;
    for (let i = 0; i < trials; i++) {
      const task = generateTask(rule, numDemos);
      if (optimizationPredict(task.demonstrations, task.testInput, 5) === task.testOutput) optCorrect++;
      if (recurrentPredict(task.demonstrations, task.testInput, 5) === task.testOutput) recCorrect++;
    }
    results[rule].push({ numDemos, optAccuracy: optCorrect/trials, recAccuracy: recCorrect/trials });
  }
}
console.log(JSON.stringify(results, null, 2));
