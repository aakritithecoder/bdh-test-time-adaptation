export default function Controls({ rule, setRule, numDemos, setNumDemos, trials, setTrials, ruleOptions }) {
  return (
    <div style={{ display: "flex", gap: 16, margin: "24px 0", flexWrap: "wrap" }}>
      <label>
        Rule:
        <select value={rule} onChange={(e) => setRule(e.target.value)}>
          {ruleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>
      <label>
        # Demonstrations: {numDemos}
        <input type="range" min="1" max="10" value={numDemos}
          onChange={(e) => setNumDemos(Number(e.target.value))} />
      </label>
      <label>
        # Trials (averaged): {trials}
        <input type="range" min="5" max="50" value={trials}
          onChange={(e) => setTrials(Number(e.target.value))} />
      </label>
    </div>
  );
}
