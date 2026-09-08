import { useState, useMemo, useEffect } from "react";
import { generateTask, RULE_NAMES } from "./components/TaskGenerator";
import { optimizationPredict } from "./components/OptimizationAgent";
import { recurrentPredict } from "./components/RecurrentAgent";
import ComparisonChart from "./components/ComparisonChart";
import Controls from "./components/Controls";
import TaskInspector from "./components/TaskInspector";
import BDHModule from "./content/BDHModule";

const VOCAB_SIZE = 3;
const SEQ_LEN = 3;

export default function App() {
  const [rule, setRule] = useState(RULE_NAMES[0]);
  const [numDemos, setNumDemos] = useState(3);
  const [trials, setTrials] = useState(30);
  const [exampleTask, setExampleTask] = useState(() =>
    generateTask(RULE_NAMES[0], 3, SEQ_LEN, VOCAB_SIZE)
  );

  const rerollExample = () => {
    setExampleTask(generateTask(rule, numDemos, SEQ_LEN, VOCAB_SIZE));
  };

  // regenerate the single example whenever rule/numDemos change
  useEffect(() => {
    rerollExample();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rule, numDemos]);

  const exampleOptPred = optimizationPredict(exampleTask.demonstrations, exampleTask.testInput, VOCAB_SIZE);
  const exampleRecPred = recurrentPredict(exampleTask.demonstrations, exampleTask.testInput, VOCAB_SIZE);

  const results = useMemo(() => {
    let optCorrect = 0, recCorrect = 0;
    for (let i = 0; i < trials; i++) {
      const task = generateTask(rule, numDemos, SEQ_LEN, VOCAB_SIZE);
      const optPred = optimizationPredict(task.demonstrations, task.testInput, VOCAB_SIZE);
      const recPred = recurrentPredict(task.demonstrations, task.testInput, VOCAB_SIZE);
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

      <h3>Aggregate accuracy (averaged over {trials} random tasks)</h3>
      <ComparisonChart
        optAccuracy={results.optAccuracy}
        recAccuracy={results.recAccuracy}
      />

      <button onClick={rerollExample} style={{ margin: "12px 0", padding: "6px 12px" }}>
        🎲 New random example
      </button>

      <TaskInspector
        task={exampleTask}
        optPred={exampleOptPred}
        recPred={exampleRecPred}
        vocabSize={VOCAB_SIZE}
        seqLen={SEQ_LEN}
      />

      <BDHModule />
    </div>
  );
}