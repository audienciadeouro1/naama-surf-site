import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the finished Naamã Surf site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Naamã Surf \| Aulas de Surf no Arpoador<\/title>/i);
  assert.match(html, /Sua primeira onda começa aqui\./);
  assert.match(html, /aria-controls="mobile-navigation"/);
  assert.match(html, /Posto 7/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("includes the responsive navigation and mobile safeguards", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /isMobileMenuOpen/);
  assert.match(page, /aria-expanded=\{isMobileMenuOpen\}/);
  assert.match(page, /id="mobile-navigation"/);
  assert.match(page, /document\.body\.style\.overflow = "hidden"/);
  assert.match(page, /window\.addEventListener\("resize", closeOnDesktop\)/);

  assert.match(css, /@media \(max-width: 780px\)/);
  assert.match(css, /@media \(max-width: 420px\)/);
  assert.match(css, /orientation: landscape/);
  assert.match(css, /100dvh/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /\.floating-whatsapp > span \{ display: none; \}/);
  assert.match(css, /\.real-feature-side \{ height: auto; grid-template-columns: 1fr; \}/);
});
