// REVISED — sourced from BDH-CQ: In-Context Learning with Recurrent Latent
// Reasoning (arXiv:2608.09888, Engdahl, Kosowski, Chorowski, Stamirowska,
// Uznański, Jiang, Phadke, Kinas, Zhong — Pathway, 2026).
// Replace the placeholder BDHModule.jsx from Step 14 with this.

export default function BDHModule() {
  return (
    <section style={{ marginTop: 40, borderTop: "2px solid #ddd", paddingTop: 24 }}>
      <h2>Where this shows up in BDH-CQ</h2>

      <p>
        The toy experiment above is a simplified illustration of a real
        architectural distinction. BDH-CQ (Pathway, 2026) defines its
        contextual memory update as a recurrence:
      </p>
      <pre style={{ background: "#f5f5f5", padding: 12 }}>
        S_t = U_θ(S_{"{t-1}"}, D_t)
      </pre>
      <p>
        where D_t is the t-th demonstration and θ stays fixed throughout —
        no gradient step touches θ at inference time. The paper calls out a
        special case matching linear attention exactly:
      </p>
      <pre style={{ background: "#f5f5f5", padding: 12 }}>
        S_t = S_{"{t-1}"} + U_θ(D_t)
      </pre>
      <p>
        i.e. the state accumulates <em>additively</em> per demonstration —
        the same mechanism the "recurrent-state route" agent above uses,
        just far simpler (a plain associative lookup vs. BDH-CQ's learned
        high-dimensional update U_θ).
      </p>

      <p>
        BDH-CQ actually keeps <strong>two</strong> distinct state variables:
        S_t (contextual memory — changes as demonstrations are consumed,
        supports in-context learning) and H_r (a separate latent reasoning
        workspace that iterates <em>after</em> demonstrations are ingested to
        actually solve the query). The toy experiment above only models the
        S_t half — it has no analog of the iterative H_r reasoning step.
      </p>

      <h3>The optimization-route contrast is real, not invented</h3>
      <p>
        The paper explicitly contrasts BDH-CQ with HRM and TRM, two prior
        recursive ARC solvers. Their pipeline is transductive: demonstration
        pairs from the evaluation task are augmented into training samples,
        each augmented puzzle gets a learned identity embedding, and
        predictions are voted over augmentations — meaning an unseen task
        requires a backward pass before it can be evaluated at all. ARC
        Prize reported costs of $1.48/task (HRM) and $1.76/task (TRM),
        reflecting that coupling of task-specific optimization with
        inference. BDH-CQ instead reports <strong>no evaluation-task
        demonstrations in training and no parameter updates at
        inference</strong> — its 150M-parameter configuration reached 29.5%
        pass@2 on the public ARC-AGI-1 evaluation set at a computed
        $0.00070/task, independently reproduced by outside auditors from
        Bielik AI and NYU.
      </p>

      <h3>What's real vs. illustrative here</h3>
      <p>
        The accuracy bars in the chart above come from a real, live toy
        simulation — inspect <code>OptimizationAgent.js</code> and{" "}
        <code>RecurrentAgent.js</code> yourself. Neither is BDH-CQ, HRM, or
        TRM — they are minimal stand-ins built to exhibit the same
        structural contrast (gradient adaptation vs. additive state
        accumulation) at a scale you can watch update in under a second.
      </p>

      <h3>Limitation</h3>
      <p>
        This toy task tests single-step associative recall on a tiny
        discrete vocabulary. BDH-CQ's own reported results show its real
        limits are elsewhere: it solves dense color-permutation binding
        perfectly (24/24 at every tested level) but degrades sharply on
        ordering (0/24 at length 8 under a "short" context) and on
        five-deep nested containment — failures the paper traces to
        insufficient demonstration coverage, not to the recurrent-state
        mechanism itself. The toy experiment does not test compositional
        rule inference at all, so it cannot speak to that boundary — it
        only isolates the single-step "no backward pass" claim.
      </p>
    </section>
  );
}
