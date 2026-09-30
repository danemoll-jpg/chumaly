// Local preview server for the Chumaly site — no installs needed, just Node.js.
//   node server.js        then open http://localhost:8080
// Your phone (on the same Wi-Fi) can open the "Phone" address it prints.
// Form submissions are NOT emailed while testing locally; they're printed here instead.

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = Number(process.env.PORT) || 8080;
const ROOT = path.join(__dirname, "site");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".ico": "image/x-icon",
};

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");

  // Pretend to be the form service: log the submission, then show the thank-you page.
  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      const fields = Object.fromEntries(new URLSearchParams(body));
      delete fields["bot-field"];
      console.log(`\n📬 Test form submission (${fields["form-name"] || "form"}):`);
      console.table(fields);
      res.writeHead(303, { Location: "/thank-you.html" });
      res.end();
    });
    return;
  }

  let file = path.normalize(path.join(ROOT, decodeURIComponent(url.pathname)));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");

  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, "0.0.0.0", () => {
  // Skip 169.254.x.x (unconnected adapters); label each address with its network name.
  const lan = Object.entries(os.networkInterfaces()).flatMap(([name, list]) =>
    list.filter(i => i.family === "IPv4" && !i.internal && !i.address.startsWith("169.254."))
      .map(i => ({ name, ip: i.address })));
  console.log(`\n🌸 Chumaly site is running!`);
  console.log(`   Computer: http://localhost:${PORT}`);
  lan.forEach(({ name, ip }) => console.log(`   Phone via ${name}: http://${ip}:${PORT}`));
  console.log(`   (Use the address on the same network your phone is connected to.)`);
  console.log(`\n   Press Ctrl+C to stop.\n`);
});
