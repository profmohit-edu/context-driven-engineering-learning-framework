"use strict";

const form = document.querySelector("#context-form");
const output = document.querySelector("#output");
const samples = {
  novice: { level: "novice", topic: "embedded", goal: "troubleshoot", time: "20", environment: "simulator", collaboration: "individual", confidence: "1" },
  advanced: { level: "advanced", topic: "embedded", goal: "evaluate", time: "90", environment: "lab", collaboration: "team", confidence: "5" }
};

function setSample(name) {
  Object.entries(samples[name]).forEach(([key, value]) => { form.elements[key].value = value; });
  form.requestSubmit();
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}

function render(result) {
  output.hidden = false;
  output.innerHTML = `
    <div class="result-head">
      <div><span class="eyebrow">Generated framework output</span><h2>${esc(result.title)}</h2><p>${esc(result.outcome)}</p></div>
      <span class="pathway-badge">${esc(result.pathwayType)}</span>
    </div>
    <section aria-labelledby="why-title"><h3 id="why-title">Why this pathway changed for this context</h3><ul class="reason-list">${result.reasons.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>
    <section aria-labelledby="path-title"><h3 id="path-title">Personalized learning pathway</h3><div class="timeline">${result.steps.map((x, i) => `<article><span>${i + 1}</span><div><h4>${esc(x.title)} <small>${x.minutes} min</small></h4><p>${esc(x.detail)}</p></div></article>`).join("")}</div></section>
    <section aria-labelledby="trace-title"><h3 id="trace-title">Five-stage framework processing trace</h3><div class="trace">${result.trace.map(x => `<article><strong>${esc(x.stage)}</strong><p>${esc(x.decision)}</p></article>`).join("")}</div></section>
    <footer class="result-footer"><code>${esc(result.id)}</code><span>${result.adaptiveSignature.map(esc).join(" · ")}</span><button id="download" type="button">Download pathway JSON</button></footer>`;
  document.querySelector("#download").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${result.id}.json`; a.click(); URL.revokeObjectURL(a.href);
  });
  output.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const input = Object.fromEntries(new FormData(form).entries());
  try { render(window.ContextLearning.generatePathway(input)); }
  catch (error) { output.hidden = false; output.innerHTML = `<div class="error"><strong>Input could not be processed.</strong><p>${esc(error.message)}</p></div>`; }
});

document.querySelector("#sample-novice").addEventListener("click", () => setSample("novice"));
document.querySelector("#sample-advanced").addEventListener("click", () => setSample("advanced"));
