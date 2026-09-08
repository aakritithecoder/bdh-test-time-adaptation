export default function TaskInspector({ task, optPred, recPred, vocabSize, seqLen }) {
  const { demonstrations, testInput, testOutput } = task;

  return (
    <div style={{
      border: "1px solid #444", borderRadius: 8, padding: 16, margin: "24px 0",
      background: "#1a1a1a"
    }}>
      <h3 style={{ marginTop: 0 }}>One example, up close</h3>

      <p style={{ fontSize: 14, opacity: 0.8 }}>
        These are the actual demonstrations both agents saw for this task —
        nothing hidden, nothing averaged.
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
        <thead>
          <tr>
            <th style={cellStyle}>Demonstration input</th>
            <th style={cellStyle}>Demonstration output</th>
          </tr>
        </thead>
        <tbody>
          {demonstrations.map((d, i) => (
            <tr key={i}>
              <td style={cellStyle}>[{d.input.join(", ")}]</td>
              <td style={cellStyle}>{d.output}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p><strong>Test input (unseen):</strong> [{testInput.join(", ")}]</p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}></th>
            <th style={cellStyle}>Predicted</th>
            <th style={cellStyle}>Ground truth</th>
            <th style={cellStyle}>Correct?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>Optimization route</td>
            <td style={cellStyle}>{optPred}</td>
            <td style={cellStyle}>{testOutput}</td>
            <td style={cellStyle}>{optPred === testOutput ? "✅" : "❌"}</td>
          </tr>
          <tr>
            <td style={cellStyle}>Recurrent-state route</td>
            <td style={cellStyle}>{recPred}</td>
            <td style={cellStyle}>{testOutput}</td>
            <td style={cellStyle}>{recPred === testOutput ? "✅" : "❌"}</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontSize: 13, opacity: 0.7, marginTop: 16, borderTop: "1px solid #333", paddingTop: 12 }}>
        <strong>Model assumptions (stated, not hidden):</strong> vocabulary
        size = {vocabSize} (integers 0–{vocabSize - 1}), sequence
        length = {seqLen}. The recurrent-state route stores exact
        demonstration input→output pairs and falls back to nearest-neighbor
        matching over the <em>full</em> sequence when the test input wasn't
        seen verbatim — it does not know which positions the rule actually
        depends on. This is a real limitation of this toy stand-in, not of
        BDH-CQ's actual learned update.
      </p>
    </div>
  );
}

const cellStyle = { border: "1px solid #333", padding: "6px 10px", textAlign: "left", fontSize: 14 };