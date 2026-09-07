# Test-Time Adaptation: Optimization vs. Context

## Claim
[Your one-sentence falsifiable claim here]

## Audience & Prerequisites
Intended for: [e.g., ML practitioners familiar with gradient descent and attention]
Prerequisites: [list]

## Learning Objectives
- [ ] Understand the optimization-route vs. recurrent-state-route distinction
- [ ] Observe how demonstration count affects each route's accuracy
- [ ] Connect the toy result to BDH-CQ's actual test-time adaptation mechanism

## Architecture
- `src/components/TaskGenerator.js` — generates toy rule-based tasks (LIVE, real computation)
- `src/components/OptimizationAgent.js` — gradient-based toy adapter (LIVE)
- `src/components/RecurrentAgent.js` — additive-state toy adapter (LIVE)
- `src/content/BDHModule.jsx` — sourced explanation of BDH-CQ's real mechanism (STATIC TEXT, cited)
- `src/data/precomputed.json` — [describe what's precomputed here, if anything]

## What's live vs. precomputed vs. illustrative
- The comparison chart: 100% live computation, re-runs on every slider change
- The BDH-CQ connection: illustrative analogy + cited claims, NOT a reproduction of BDH-CQ

## How to reproduce
\`\`\`bash
git clone <repo-url>
cd bdh-test-time-adaptation
npm install
npm run dev
\`\`\`

## Primary sources
1. [Dragon Hatchling paper] — [what it supports]
2. [BDH-CQ technical report] — [what it supports]
3. [Primary paper #3, 2022-2026] — [what it supports]
4. [Primary paper #4 if used]

## AI assistance disclosure
[Be specific: which files/sections used AI assistance, for what — code scaffolding, writing, etc.]

## Credits & licenses
[List any reused code, fonts, assets, and their licenses]
