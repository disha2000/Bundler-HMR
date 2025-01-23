const fs = require("fs");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

const fileToWatch = path.join(__dirname, "app.js");

// WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket running on port 8080");

const sentTheUpdate = () => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "update", file: "app.js" }));
        }
    });
};

// Watch the file for changes
fs.watch(fileToWatch, () => {
    console.log("File has been changed, notifying the clients...");
    sentTheUpdate();
});

// Serve static files, including `app.js`
http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

    // Ensure that we serve app.js correctly regardless of query parameters
    if (req.url.includes("app.js")) {
        filePath = path.join(__dirname, "app.js");
    }

    const extname = path.extname(filePath);
    let contentType = "text/html"; // Default to HTML
    if (extname === ".js") {
        contentType = "application/javascript";
    } else if (extname === ".css") {
        contentType = "text/css";
    } else if (extname === ".json") {
        contentType = "application/json";
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("<h1>404 Not Found</h1>");
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
}).listen(1235, () => console.log("HTTP server running on http://localhost:1235"));
