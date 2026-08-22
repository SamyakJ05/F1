import assert from "node:assert/strict";
import test from "node:test";

async function renderPath(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Apex Atlas homepage", async () => {
  const response = await renderPath("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Apex Atlas/i);
  assert.match(html, /Know the race/i);
  assert.match(html, /lights out/i);
  assert.match(html, /CIRCUITS/i);
  assert.match(html, /STRATEGY/i);
});

test("server-renders circuits atlas page", async () => {
  const response = await renderPath("/circuits");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Circuit Atlas/i);
  assert.match(html, /2026/i);
  assert.match(html, /Suzuka/i);
});

test("server-renders driver comparison page", async () => {
  const response = await renderPath("/drivers");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Drivers/i);
  assert.match(html, /Telemetry/i);
  assert.match(html, /Constructors Championship/i);
});

test("server-renders motorsport quiz challenge page", async () => {
  const response = await renderPath("/quiz");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Motorsport IQ/i);
  assert.match(html, /RACECRAFT/i);
});

test("server-renders legal and compliance pages", async () => {
  const [aboutRes, privacyRes, termsRes, contactRes] = await Promise.all([
    renderPath("/about"),
    renderPath("/privacy"),
    renderPath("/terms"),
    renderPath("/contact"),
  ]);

  assert.equal(aboutRes.status, 200);
  assert.equal(privacyRes.status, 200);
  assert.equal(termsRes.status, 200);
  assert.equal(contactRes.status, 200);

  const privacyHtml = await privacyRes.text();
  assert.match(privacyHtml, /Google AdSense/i);
  assert.match(privacyHtml, /DART/i);
  assert.match(privacyHtml, /GDPR/i);
});
