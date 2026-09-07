export default function BDHModule() {
  return (
    <section style={{ marginTop: 40, borderTop: "2px solid #ddd", paddingTop: 24 }}>
      <h2>Where this shows up in BDH-CQ</h2>
      <p>
        The toy experiment above is a simplified illustration of a real
        architectural distinction. BDH-CQ (Pathway, 2026) defines its
        contextual memory update as a recurrence: S_t = U_θ(S_t-1, D_t),
        where D_t is the t-th demonstration and θ stays fixed throughout —
        no gradient step touches θ at inference time. The paper calls out a
        special case matching linear attention exactly: S_t = S_t-1 + U_θ(D_t),
        i.e. the state accumulates additively per demonstration — the same
        mechanism the "recurrent-state route" agent above uses, just far
        simpler than BDH-CQ's learned high-dimensional update.
      </p>
      <p>
        <strong>What's real vs. illustrative:</strong> the accuracy bars
        above come from a real, live toy simulation you can inspect in{" "}
        <code>OptimizationAgent.js</code> and <code>RecurrentAgent.js</code>.
        Neither is BDH-CQ itself — they are minimal stand-ins built to show
        the same structural contrast (gradient adaptation vs. additive
        state accumulation) at a scale you can watch update live.
      </p>
      <p>
        <strong>Limitation:</strong> this toy task tests single-step
        associative recall only. It does not test compositional or
        multi-step rule inference the way BDH-CQ's real ARC-AGI-1
        evaluation does.
      </p>
    </section>
  );
}