# Test-Time Adaptation: Optimization vs. Context

## Claim
A fixed-size recurrent state can acquire an unseen task's rule at inference
time — no backward pass, no parameter update — and can rival (and in
low-demonstration, simple-rule regimes, beat) gradient-based adaptation.
This advantage is not unconditional: the context route still depends on
demonstrations that actually span the target rule's complexity, and
degrades when they don't.

## Audience & Prerequisites
**Intended for:** ML practitioners, students, or researchers who
understand gradient descent and have basic familiarity with few-shot /
in-context learning, but haven't necessarily read recent ARC-AGI or
test-time-adaptation literature.

**Prerequisites:** basic linear algebra, what a gradient descent step is,
what "in-context learning" means at a high level. No prior knowledge of
BDH, BDH-CQ, HRM, or TRM required — the artifact and one-page summary
introduce all of these.

## Learning Objectives
- Understand the structural distinction between the optimization route
  (task-specific gradient adaptation) and the context/recurrent-state
  route (additive state accumulation, no parameter update).
- Observe how demonstration count and rule complexity change which route
  wins, using a live, manipulable toy experiment.
- Connect the toy contrast to BDH-CQ's actual mechanism (the S_t
  recurrence) and to the HRM/TRM baselines it's compared against.
- Recognize a concrete limitation: the context route's advantage depends
  on demonstration coverage, not just on avoiding gradient descent.

## What this artifact demonstrates
Two toy agents answer the same unseen-rule tasks from a handful of
demonstrations: one by fitting a tiny linear model via gradient descent
(standing in for the optimization route used by HRM/TRM), the other by
accumulating demonstrations additively into a fixed-size associative
state and doing inference-time lookup (standing in for BDH-CQ's S_t
update). The learner picks a rule and demonstration count, watches
aggregate accuracy diverge between the two agents, and can drill into any
single example to see the actual demonstrations, both predictions, and
ground truth side by side. A dedicated module then connects this toy
contrast to BDH-CQ's real, cited mechanism and its documented limits.

## Live Links
- **Deployed artifact (no sign-in required):** https://gentle-palmier-2af9b9.netlify.app/
- **GitHub repository:** https://github.com/aakritithecoder/bdh-test-time-adaptation
  
The one-sentence claim above is directly testable in the running app:
switch to `incrementMod` at low demonstration counts and watch the
optimization route close the gap that `repeatLast2` shows at the same
settings — evidence that the toy models a real trade-off, not a
fixed winner.

## Architecture
- `src/components/TaskGenerator.js` — generates toy rule-based tasks (LIVE, real computation)
- `src/components/OptimizationAgent.js` — gradient-based toy adapter (LIVE)
- `src/components/RecurrentAgent.js` — additive-state toy adapter (LIVE)
- `src/components/Controls.jsx` — rule/demo-count/trial-count sliders (LIVE)
- `src/components/ComparisonChart.jsx` — aggregate accuracy bar chart (LIVE, recomputes on every control change)
- `src/components/TaskInspector.jsx` — single-example view: demonstrations, test input, both predictions, and ground truth side by side (LIVE, real computation, re-rolls a fresh random task on demand)
- `src/content/BDHModule.jsx` — sourced explanation of BDH-CQ's real mechanism (STATIC TEXT, cited from arXiv:2608.09888)
- `src/data/precomputed.json` — not used in this submission; all results shown are computed live in-browser

## What's live vs. precomputed vs. illustrative
- The aggregate comparison chart and the single-example inspector: 100%
  live computation, recomputed on every control change or "New random
  example" click.
- The BDH-CQ connection (`BDHModule.jsx`): illustrative analogy + cited
  claims from the primary paper, **not** a reproduction of BDH-CQ's
  actual model or code — stated explicitly in-artifact.

## How to reproduce
```bash
git clone https://github.com/aakritithecoder/bdh-test-time-adaptation
cd bdh-test-time-adaptation
npm install
npm run dev
```
Open the printed local URL, select a rule from the dropdown, adjust the
demonstration/trial sliders, and click "New random example" to see a
single task's demonstrations and both agents' predictions against ground
truth.

## Known limitations
- The toy task tests only single-step associative recall on a small
  discrete vocabulary — it does not test compositional or multi-step
  rule inference the way BDH-CQ's real ARC-AGI-1 evaluation does.
- `RecurrentAgent.js`'s nearest-neighbor fallback treats all sequence
  positions as equally relevant — a real learned update like BDH-CQ's
  U_θ would presumably learn which positions matter; our stand-in does
  not. 
- Default `vocabSize`/`seqLen` were chosen to produce a legible, sensitive
  demo rather than to maximize either agent's absolute accuracy — this
  tradeoff is disclosed rather than hidden.

## Primary sources
1. Kosowski et al. (2025). "The Dragon Hatchling: The Missing Link between the Transformer and Models of the Brain." arXiv:2509.26507 — supports: base BDH architecture, sparse activations, synaptic memory framing (used in BDH module background).
2. Engdahl et al. (2026). "BDH-CQ: In-Context Learning with Recurrent Latent Reasoning." arXiv:2608.09888 — supports: the S_t recurrence equation, the no-backward-pass claim, ARC-AGI-1 29.5% pass@2 result, HRM/TRM cost comparison.
3. Wang et al. (2025). "Hierarchical Reasoning Model." arXiv:2506.21734 — supports: the optimization-route baseline (HRM), transductive task augmentation, $1.48/task cost.
4. Jolicoeur-Martineau et al. (2025). "Less is More: Recursive Reasoning with Tiny Networks." arXiv:2510.04871 — supports: TRM baseline, $1.76/task cost, improved ARC-AGI-1 accuracy over HRM.


## AI assistance disclosure
- Initial toy-agent code (`TaskGenerator.js`, `OptimizationAgent.js`, `RecurrentAgent.js`) was scaffolded with AI assistance (Claude) based on our own design spec (optimization-route vs. recurrent-state-route contrast); logic was reviewed, tested, and modified by the team.
- `TaskInspector.jsx` was AI-scaffolded to satisfy the "visible state" and "truth beside estimate" design standards, then adjusted by the team.
- `BDHModule.jsx` text and the one-page summary were drafted with AI assistance using paraphrase of claims from the primary BDH-CQ paper (arXiv:2608.09888) and the HRM/TRM papers; each claim was verified by the team against the primary sources before finalizing.
- README structure was AI-assisted; all technical claims were independently checked against primary sources by Aakriti Jha.
- UI components (`Controls.jsx`, `ComparisonChart.jsx`) were AI-scaffolded and manually adjusted.

## Source and license record
- React 19.2.8 (MIT License) — https://github.com/facebook/react
- React DOM 19.2.8 (MIT License) — https://github.com/facebook/react
- Recharts 3.10.1 (MIT License) — https://github.com/recharts/recharts
- Vite 8.2.2 (MIT License) — https://github.com/vitejs/vite
- @vitejs/plugin-react 6.1.0 (MIT License) — https://github.com/vitejs/vite-plugin-react
- oxlint 1.79.0 (MIT License, dev-only, not shipped) — https://github.com/oxc-project/oxc
- TypeScript type definitions (@types/react, @types/react-dom) — dev-only, MIT License
- All original code (TaskGenerator.js, OptimizationAgent.js, RecurrentAgent.js, App.jsx, Controls.jsx, ComparisonChart.jsx, TaskInspector.jsx, BDHModule.jsx) written by our team for this submission — no external code reused beyond the libraries listed above.
- No external data, weights, graphics, or fonts used.
- BDH-CQ equations and reported figures sourced from arXiv:2608.09888, cited under academic fair-use for educational commentary.
