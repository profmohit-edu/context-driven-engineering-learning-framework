"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { generatePathway, validate } = require("../core.js");

const novice = { level:"novice", topic:"embedded", goal:"troubleshoot", time:20, environment:"simulator", collaboration:"individual", confidence:1 };
const advanced = { level:"advanced", topic:"embedded", goal:"evaluate", time:90, environment:"lab", collaboration:"team", confidence:5 };

test("normal scenario produces all five framework stages", () => {
  const result = generatePathway(novice);
  assert.equal(result.trace.length, 5);
  assert.equal(result.steps.length, 5);
  assert.equal(result.steps.reduce((sum, step) => sum + step.minutes, 0), 20);
  assert.match(result.title, /sensor reliability/);
});

test("novice low-confidence context activates scaffolding", () => {
  const result = generatePathway(novice);
  assert.equal(result.pathwayType, "Scaffolded pathway");
  assert.match(result.steps[0].detail, /worked example/);
  assert.ok(result.adaptiveSignature.includes("scaffold:on"));
});

test("advanced high-confidence context activates challenge pathway", () => {
  const result = generatePathway(advanced);
  assert.equal(result.pathwayType, "Advanced challenge pathway");
  assert.match(result.steps[0].detail, /without a worked example/);
  assert.match(result.steps[3].detail, /peer-review response/);
});

test("contrasting contexts produce materially different outputs", () => {
  const a = generatePathway(novice);
  const b = generatePathway(advanced);
  assert.notDeepEqual(a.adaptiveSignature, b.adaptiveSignature);
  assert.notEqual(a.steps[2].detail, b.steps[2].detail);
  assert.notEqual(a.outcome, b.outcome);
  assert.match(a.steps[2].detail, /simulation/);
  assert.match(b.steps[2].detail, /bench sensor/);
});

test("topic changes the resource and deliverable", () => {
  const network = generatePathway({ ...novice, topic:"networks", goal:"apply", time:45 });
  assert.match(network.steps[2].detail, /packet-flow/);
  assert.match(network.outcome, /latency budget/);
});

test("invalid context is rejected", () => {
  assert.throws(() => validate({ ...novice, confidence:8 }), /Confidence/);
  assert.throws(() => generatePathway({ ...novice, topic:"unknown" }), /Unsupported/);
});
