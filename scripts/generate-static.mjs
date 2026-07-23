import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workerPath = path.resolve(__dirname, "../dist/server/index.js");

const { default: worker } = await import(`file://${workerPath}`);

const response = await worker.fetch(
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
  }
);

if (response.ok) {
  const html = await response.text();
  const indexPath = path.resolve(__dirname, "../dist/client/index.html");
  await writeFile(indexPath, html, "utf8");
  console.log("Successfully generated dist/client/index.html!");
} else {
  console.error("Failed to render static HTML:", response.status, response.statusText);
  process.exit(1);
}
