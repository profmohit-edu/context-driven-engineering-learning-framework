(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ContextLearning = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const TOPICS = {
    embedded: {
      label: "Embedded Systems — sensor reliability",
      concept: "sensor sampling, noise, calibration and fault isolation",
      simulator: "Wokwi-style microcontroller simulation",
      lab: "bench sensor, serial monitor and controlled fault injection",
      deliverable: "annotated fault tree and corrected sensing routine"
    },
    structures: {
      label: "Data Structures — performance selection",
      concept: "complexity, access patterns and memory trade-offs",
      simulator: "interactive operation-count visualizer",
      lab: "local benchmark harness with representative workloads",
      deliverable: "evidence-backed structure selection memo"
    },
    networks: {
      label: "Computer Networks — latency diagnosis",
      concept: "delay components, packet loss and bottleneck isolation",
      simulator: "packet-flow and latency worksheet",
      lab: "packet capture and controlled network testbed",
      deliverable: "latency budget and mitigation decision"
    },
    economics: {
      label: "Engineering Economics — investment decision",
      concept: "cash flows, discounting, uncertainty and stakeholder value",
      simulator: "spreadsheet scenario model",
      lab: "decision model using documented cost assumptions",
      deliverable: "NPV comparison and justified recommendation"
    }
  };

  const GOALS = {
    understand: "explain the governing concepts",
    apply: "apply the concepts to an engineering case",
    troubleshoot: "diagnose and correct a technical failure",
    evaluate: "evaluate alternatives and defend a decision"
  };

  function validate(input) {
    const required = ["level", "topic", "goal", "time", "environment", "collaboration", "confidence"];
    for (const key of required) if (input[key] === undefined || input[key] === "") throw new Error(`Missing ${key}`);
    if (!TOPICS[input.topic]) throw new Error("Unsupported engineering topic");
    if (!GOALS[input.goal]) throw new Error("Unsupported learning need");
    const time = Number(input.time);
    const confidence = Number(input.confidence);
    if (![20, 45, 90].includes(time)) throw new Error("Time must be 20, 45 or 90 minutes");
    if (confidence < 1 || confidence > 5) throw new Error("Confidence must be between 1 and 5");
    return { ...input, time, confidence };
  }

  function generatePathway(raw) {
    const input = validate(raw);
    const topic = TOPICS[input.topic];
    const needsScaffold = input.level === "novice" || input.confidence <= 2;
    const highChallenge = input.level === "advanced" && input.confidence >= 4;
    const mode = input.environment === "lab" ? topic.lab : topic.simulator;
    const collaboration = input.collaboration === "individual"
      ? "individual think-aloud with a decision log"
      : input.collaboration === "pair"
        ? "pair roles: analyst and evidence-checker, then swap"
        : "team roles: analyst, stakeholder advocate and validation lead";

    const trigger = `${topic.label}: ${GOALS[input.goal]} within ${input.time} minutes using ${input.environment === "lab" ? "physical-lab evidence" : "simulation-accessible evidence"}.`;
    const stakeholders = input.goal === "evaluate"
      ? ["end user", "engineering team", "budget/safety owner"]
      : input.goal === "troubleshoot"
        ? ["system operator", "maintenance engineer", "affected user"]
        : ["learner", "peer reviewer", "course outcome assessor"];
    const constraints = [
      `${input.time}-minute time box`,
      input.environment === "lab" ? "physical equipment and measurement quality" : "simulation fidelity and accessible tooling",
      needsScaffold ? "limited prior confidence; prerequisite support required" : "learner ready for reduced scaffolding",
      input.collaboration === "individual" ? "no peer role available" : "coordination and role accountability"
    ];

    let opening;
    if (needsScaffold) opening = `Guided concept primer: inspect one worked example of ${topic.concept}, then answer a two-question readiness check.`;
    else if (highChallenge) opening = `Challenge brief: identify assumptions and propose competing approaches for ${topic.concept} without a worked example.`;
    else opening = `Retrieval warm-up: map prior knowledge to ${topic.concept} and identify one uncertainty.`;

    let activity;
    if (input.goal === "troubleshoot") activity = `Diagnostic investigation in ${mode}: reproduce a fault, collect two observations, isolate the most likely cause and test one correction.`;
    else if (input.goal === "evaluate") activity = `Trade-off studio in ${mode}: compare two feasible alternatives against stakeholder, performance and resource criteria.`;
    else if (input.goal === "apply") activity = `Worked-to-independent application in ${mode}: complete one scaffolded case, then solve a changed case independently.`;
    else activity = `Concept construction using ${mode}: build a visual model, predict one outcome and check the prediction against evidence.`;

    const evidence = input.time === 20
      ? "one annotated decision snapshot"
      : input.time === 45
        ? topic.deliverable
        : `${topic.deliverable}, test evidence and a peer-review response`;
    const reflection = highChallenge
      ? "Defend the selected approach, state when it would fail, and respond to one stakeholder objection."
      : needsScaffold
        ? "Complete: I chose ___ because ___; my evidence is ___; my next check is ___."
        : "Justify the decision with evidence, one trade-off and one improvement step.";
    const checkpoint = needsScaffold
      ? "Instructor/system checkpoint after the primer; continue only after the learner correctly identifies the governing principle."
      : highChallenge
        ? "Peer challenge checkpoint: another role must identify an unsupported assumption before finalization."
        : "Midpoint self-check against the decision criteria.";

    const allocations = input.time === 20 ? [4, 3, 7, 3, 3] : input.time === 45 ? [8, 7, 19, 6, 5] : [16, 15, 38, 12, 9];
    const steps = [
      { minutes: allocations[0], title: "Activate context", detail: opening },
      { minutes: allocations[1], title: "Map stakeholders and constraints", detail: `${collaboration}. Prioritize ${stakeholders.join(", ")}.` },
      { minutes: allocations[2], title: input.goal === "evaluate" ? "Evaluate trade-offs" : "Investigate and apply", detail: activity },
      { minutes: allocations[3], title: "Produce evidence", detail: `Create ${evidence}. ${checkpoint}` },
      { minutes: allocations[4], title: "Reflect and justify", detail: reflection }
    ];

    const trace = [
      { stage: "1 · Context Trigger", decision: trigger },
      { stage: "2 · Stakeholder Mapping", decision: `Prioritized ${stakeholders.join(", ")}; collaboration uses ${collaboration}.` },
      { stage: "3 · Constraint Structuring", decision: constraints.join("; ") + "." },
      { stage: "4 · Trade-off Evaluation", decision: `${needsScaffold ? "Scaffolded" : highChallenge ? "Open-ended" : "Moderately guided"} ${input.goal} activity using ${mode}.` },
      { stage: "5 · Reflective Justification", decision: `${evidence}; ${reflection}` }
    ];

    const reasons = [
      needsScaffold
        ? `The ${input.level} level/confidence ${input.confidence} activates prerequisite scaffolding and an early checkpoint.`
        : `The ${input.level} level/confidence ${input.confidence} permits ${highChallenge ? "reduced scaffolding and assumption challenge" : "moderate guidance"}.`,
      `${input.environment === "lab" ? "Physical-lab" : "Simulator"} access selects ${mode}.`,
      `The ${input.goal} need selects a ${input.goal === "troubleshoot" ? "fault-isolation" : input.goal === "evaluate" ? "multi-criteria trade-off" : input.goal === "apply" ? "worked-to-independent" : "concept-construction"} activity.`,
      `The ${input.time}-minute window changes the expected evidence to ${evidence}.`
    ];

    return {
      id: `CDLF-${input.topic.toUpperCase()}-${input.level.toUpperCase()}-${input.goal.toUpperCase()}`,
      input,
      title: `${topic.label} · ${input.goal} pathway`,
      pathwayType: needsScaffold ? "Scaffolded pathway" : highChallenge ? "Advanced challenge pathway" : "Guided application pathway",
      outcome: `By the end, the learner will ${GOALS[input.goal]} and submit ${evidence}.`,
      steps,
      trace,
      reasons,
      adaptiveSignature: [needsScaffold ? "scaffold:on" : "scaffold:reduced", highChallenge ? "challenge:advanced" : "challenge:standard", `mode:${input.environment}`, `goal:${input.goal}`, `time:${input.time}`]
    };
  }

  return { TOPICS, GOALS, validate, generatePathway };
});
