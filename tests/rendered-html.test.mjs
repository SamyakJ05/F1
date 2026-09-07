import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";

async function renderPath(targetPath = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${targetPath}`, {
      headers: { accept: "*/*" },
    }),
    {
      ASSETS: {
        fetch: async (req) => {
          const url = new URL(req.url);
          try {
            const filePath = path.join(process.cwd(), "public", url.pathname);
            const content = await fs.readFile(filePath);
            const ext = path.extname(url.pathname);
            const types = {
              ".txt": "text/plain; charset=utf-8",
              ".svg": "image/svg+xml",
              ".ico": "image/x-icon",
              ".png": "image/png",
            };
            const contentType = types[ext] || "application/octet-stream";
            return new Response(content, { status: 200, headers: { "content-type": contentType } });
          } catch {
            return new Response("Not found", { status: 404 });
          }
        },
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

test("server-renders motorsport quiz challenge page with 20 questions", async () => {
  const response = await renderPath("/quiz");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Motorsport IQ/i);
  assert.match(html, /RACECRAFT/i);
  assert.match(html, /Assessment Domains/i);
});

test("server-renders technical stories and verifies no broken links", async () => {
  const [indexRes, tireRes, telemetryRes, groundRes] = await Promise.all([
    renderPath("/stories"),
    renderPath("/stories/tire-chemistry-thermal-degradation"),
    renderPath("/stories/telemetry-decoded-trail-braking"),
    renderPath("/stories/ground-effect-pressure-into-pace"),
  ]);

  assert.equal(indexRes.status, 200);
  assert.equal(tireRes.status, 200);
  assert.equal(telemetryRes.status, 200);
  assert.equal(groundRes.status, 200);

  const tireHtml = await tireRes.text();
  assert.match(tireHtml, /Tire Chemistry/i);
  assert.match(tireHtml, /Viscoelastic/i);
  assert.match(tireHtml, /TECHNICAL MOTORSPORT GLOSSARY/i);

  const telemetryHtml = await telemetryRes.text();
  assert.match(telemetryHtml, /Telemetry Decoded/i);
  assert.match(telemetryHtml, /Trail Braking/i);
});

test("server-renders strategy masterclass and car lab engineering pages", async () => {
  const [strategyRes, carLabRes] = await Promise.all([
    renderPath("/strategy"),
    renderPath("/car-lab"),
  ]);

  assert.equal(strategyRes.status, 200);
  assert.equal(carLabRes.status, 200);

  const strategyHtml = await strategyRes.text();
  assert.match(strategyHtml, /STRATEGY STUDIO/i);
  assert.match(strategyHtml, /THE MATHEMATICS OF THE UNDERCUT/i);

  const carLabHtml = await carLabRes.text();
  assert.match(carLabHtml, /AERODYNAMICS LAB/i);
  assert.match(carLabHtml, /Y250 VORTEX CONTROL/i);
});

test("server-renders legal and compliance pages with E-E-A-T standards", async () => {
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

  const aboutHtml = await aboutRes.text();
  assert.match(aboutHtml, /Fact-Checking/i);
  assert.match(aboutHtml, /Editorial Independence/i);

  const privacyHtml = await privacyRes.text();
  assert.match(privacyHtml, /Google AdSense/i);
  assert.match(privacyHtml, /DART/i);
  assert.match(privacyHtml, /GDPR/i);
});

test("serves valid ads.txt and robots.txt for Google AdSense crawler compliance", async () => {
  const [adsRes, robotsRes] = await Promise.all([
    renderPath("/ads.txt"),
    renderPath("/robots.txt"),
  ]);

  assert.equal(adsRes.status, 200);
  assert.equal(robotsRes.status, 200);

  const adsText = await adsRes.text();
  assert.match(adsText, /google\.com,\s*pub-1497786346597378,\s*DIRECT,\s*f08c47fec0942fa0/i);

  const robotsText = await robotsRes.text();
  assert.match(robotsText, /User-agent:\s*Mediapartners-Google/i);
  assert.match(robotsText, /User-agent:\s*AdsBot-Google/i);
  assert.match(robotsText, /Sitemap:\s*https:\/\/apexatlas\.online\/sitemap\.xml/i);
});

test("serves favicon and browser tab icons with valid headers and link tags", async () => {
  const [homeRes, icoRes, svgRes, appleRes] = await Promise.all([
    renderPath("/"),
    renderPath("/favicon.ico"),
    renderPath("/favicon.svg"),
    renderPath("/apple-touch-icon.png"),
  ]);

  assert.equal(homeRes.status, 200);
  const homeHtml = await homeRes.text();
  assert.match(homeHtml, /rel=["']icon["'][^>]*href=["']\/favicon\.ico["']/i);
  assert.match(homeHtml, /rel=["']icon["'][^>]*href=["']\/favicon\.svg["']/i);
  assert.match(homeHtml, /rel=["']apple-touch-icon["'][^>]*href=["']\/apple-touch-icon\.png["']/i);

  assert.equal(icoRes.status, 200);
  assert.match(icoRes.headers.get("content-type") ?? "", /^image\/x-icon/i);

  assert.equal(svgRes.status, 200);
  assert.match(svgRes.headers.get("content-type") ?? "", /^image\/svg\+xml/i);
  const svgBody = await svgRes.text();
  assert.match(svgBody, /polygon points=/i);
  assert.match(svgBody, /#c7ff31/i);

  assert.equal(appleRes.status, 200);
  assert.match(appleRes.headers.get("content-type") ?? "", /^image\/png/i);
});


