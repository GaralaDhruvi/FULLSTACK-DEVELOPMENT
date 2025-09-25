const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (so app.css can be loaded)
app.use(express.static(__dirname));

// Path to your log file
const logFilePath = path.join(__dirname, "error.log");

// Route to view log
app.get("/", (req, res) => {
  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res
        .status(500)
        .send("<h2 style='color:red;'>⚠️ Could not read log file. File may be missing or inaccessible.</h2>");
    }

    // Process log lines and wrap with CSS classes
    const lines = data.split("\n").map(line => {
      if (line.includes("ERROR")) return `<div class="error">${line}</div>`;
      if (line.includes("WARNING")) return `<div class="warning">${line}</div>`;
      if (line.includes("INFO")) return `<div class="info">${line}</div>`;
      if (line.includes("CRITICAL")) return `<div class="critical">${line}</div>`;
      return `<div>${line}</div>`;
    }).join("");

    // Send HTML with external CSS
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Log Viewer</title>
        <link rel="stylesheet" href="/app.css">
      </head>
      <body>
        <h1> Server Log Viewer</h1>
        <div class="log-box">
          ${lines}
        </div>
      </body>
      </html>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
