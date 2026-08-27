# Context-Driven Engineering Learning Framework

**Interactive Prototype:** 2.0  
**Foundational Framework:** 1.0 (2026)  
**Author:** Mohit Tiwari  
**Department:** Computer Science and Engineering, Bharati Vidyapeeth's College of Engineering, New Delhi  
**License:** CC BY 4.0

## Live interactive demonstrator

The public application operationalizes the original framework as an inspectable, deterministic learning-pathway generator. A learner supplies prior knowledge, engineering topic, learning need, time, environment, collaboration mode and confidence. These inputs alter the learning activity, scaffolding, resource mode, expected evidence and reflection intervention.

The application does **not** use generative AI. Recommendations are produced by documented rules in `core.js`.

## Original five-stage architecture retained

1. Context Trigger Activation
2. Stakeholder Identification and Mapping
3. Constraint Structuring
4. Trade-off Evaluation
5. Reflective Decision Justification

Version 2.0 turns each stage into a visible processing trace. The original Version 1.0 repository state and static `impact.html` remain preserved; see [`docs/PROVENANCE.md`](docs/PROVENANCE.md).

## Adaptive mechanism

- Novice level or confidence 1–2 activates a worked example, readiness check and early checkpoint.
- Advanced level with confidence 4–5 removes the worked example and activates assumption challenge, stakeholder objection and peer critique.
- Learning need selects concept construction, worked-to-independent application, diagnostic fault isolation, or multi-criteria trade-off evaluation.
- Simulator versus physical lab selects a materially different resource/activity environment.
- Available time changes the required evidence from a decision snapshot to a documented technical deliverable with validation and peer response.
- Collaboration mode assigns individual, pair or engineering-team roles.
- Subject selection changes domain resources, engineering concepts and deliverables.

## Reproducible scenarios

### Scenario A — scaffolded diagnostic pathway

- Novice; Embedded Systems; Troubleshoot; 20 minutes; Simulator; Individual; confidence 1.
- Produces a guided concept primer, readiness checkpoint, simulated fault-isolation activity and annotated decision snapshot.

### Scenario B — advanced evaluation pathway

- Advanced; Embedded Systems; Evaluate; 90 minutes; Physical lab; Engineering team; confidence 5.
- Produces an open-ended challenge, stakeholder/team roles, physical bench investigation, alternative comparison, peer challenge and evidence-backed defense.

Use the two sample buttons in the application to reproduce these outputs.

## Run locally

Open `index.html` in a browser. No build step, backend, API key or user data store is required.

## Tests

Requires Node.js 20 or newer:

```bash
npm test
```

Tests cover validation, all five stages, novice scaffolding, advanced challenge mode, topic-specific resources and materially different output for contrasting contexts.

## Original framework purpose

The framework integrates decision-context reasoning into engineering management education while supporting stakeholder mapping, constraint identification, trade-off evaluation, reflective justification and Outcome-Based Education alignment. It is applicable to Principles of Management for Engineers, engineering-management modules, capstone reflection and techno-managerial case discussions.

## Citation

Tiwari, M. (2026). *Context-Driven Engineering Learning Framework (Version 1.0).*  
Interactive demonstrator Version 2.0, current repository release.
