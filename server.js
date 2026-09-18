import http from "node:http";
import { readFileSync } from "node:fs";

const PORT = 3001;

const server = http.createServer((req, res) => {
  // These headers allow the Vite frontend to call the local API during development.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/api/health") {
    res.end(JSON.stringify({ ok: true, service: "TechHub API" }));
    return;
  }

  if (req.method === "GET" && req.url === "/") {
    res.end(
      JSON.stringify({
        ok: true,
        service: "TechHub API",
        health: "/api/health",
      }),
    );
    return;
  }

  if (
    req.method === "POST" &&
    (req.url === "/api/newsletter" || req.url === "/api/contact")
  ) {
    // The small API accepts JSON bodies without requiring an external framework.
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body || "{}");
        if (req.url === "/api/newsletter") {
          if (!String(data.email || "").includes("@")) {
            res.statusCode = 400;
            res.end(
              JSON.stringify({
                ok: false,
                message: "Please enter a valid email.",
              }),
            );
            return;
          }
          res.end(
            JSON.stringify({ ok: true, message: "Subscribed successfully." }),
          );
          return;
        }
        if (!data.message) {
          res.statusCode = 400;
          res.end(
            JSON.stringify({ ok: false, message: "Message is required." }),
          );
          return;
        }
        res.end(JSON.stringify({ ok: true, message: "Message received." }));
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, message: "Invalid JSON." }));
      }
    });
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ ok: false, message: "Not found" }));
});

server.listen(PORT, () =>
  console.log(`TechHub API running on http://localhost:${PORT}`),
);
