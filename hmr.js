// Connect to WebSocket
const socket = new WebSocket('ws://localhost:8080');

// Handle WebSocket messages
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "update" && message.file === "app.js") {
        console.log("app.js updated, reloading...");
        // Dynamically re-import the updated module (app.js)
        import(`./app.js?cache-bust=${Date.now()}`)
            .then((module) => {
                console.log("Module reloaded successfully");
                // Re-render or use the updated module here
            })
            .catch((err) => console.error("Failed to reload the module", err));
    }
};
