import worker from "../dist/server/index.js";

export default async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = new URL(req.url, `${protocol}://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        for (const v of value) headers.append(key, v);
      } else if (typeof value === "string") {
        headers.set(key, value);
      }
    }

    const webRequest = new Request(url.href, {
      method: req.method,
      headers,
    });

    const env = {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    };
    const ctx = {
      waitUntil() {},
      passThroughOnException() {},
    };

    const response = await worker.fetch(webRequest, env, ctx);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const bodyBuffer = await response.arrayBuffer();
    res.end(Buffer.from(bodyBuffer));
  } catch (err) {
    console.error("Vercel handler error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error: " + (err?.message || String(err)));
  }
}
