import { useState, useMemo } from "react";
import { generateTask, RULE_NAMES } from "./components/TaskGenerator";
import { optimizationPredict } from "./components/OptimizationAgent";
import { recurrentPredict } from "./components/RecurrentAgent";
import ComparisonChart from "./components/ComparisonChart";
import Controls from "./components/Controls";
import BDHModule from "./content/BDHModule";

export default function App() {
  const [rule, setRule] = useState(RULE_NAMES[0]);
  const [numDemos, setNumDemos] = useState(3);
  const [trials, setTrials] = useState(10);

  const results = useMemo(() => {
    let optCorrect = 0, recCorrect = 0;
    for (let i = 0; i < trials; i++) {
      const task = generateTask(rule, numDemos);
      const optPred = optimizationPredict(task.demonstrations, task.testInput, 5);
      const recPred = recurrentPredict(task.demonstrations, task.testInput, 5);
      if (optPred === task.testOutput) optCorrect++;
      if (recPred === task.testOutput) recCorrect++;
    }
    return {
      optAccuracy: optCorrect / trials,
      recAccuracy: recCorrect / trials,
    };
  }, [rule, numDemos, trials]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1>Test-Time Adaptation: Optimization vs. Context</h1>
      <p>
        <strong>Claim:</strong> a fixed-size recurrent state can acquire an
        unseen task's rule at inference time — no backward pass, no parameter
        update — and can rival gradient-based adaptation on simple pattern tasks.
      </p>

      <Controls
        rule={rule} setRule={setRule}
        numDemos={numDemos} setNumDemos={setNumDemos}
        trials={trials} setTrials={setTrials}
        ruleOptions={RULE_NAMES}
      />

      <ComparisonChart
        optAccuracy={results.optAccuracy}
        recAccuracy={results.recAccuracy}
      />

      <BDHModule />
    </div>
  );
}
