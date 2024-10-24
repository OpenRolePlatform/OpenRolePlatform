/* import expressWs, { Application } from "express-ws";

function broadcast(message) {
  // Broadcast the message to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    const payload = JSON.parse(message).payload;
    const current = payload.current;
    const route = current.route;
    const backendPayload = current.backendPayload;
    switch (route) {
      case "/putCharacterStats":
        if (putCharacterStats(backendPayload)) {
          broadcast(current);
        }
        break;
      case "/putOtherCharacterStats":
        if (putOtherCharacterStats(backendPayload)) {
          broadcast(current);
        }
        break;
      case "/putHpStats":
        if (putHpStats(backendPayload)) {
          broadcast(current);
        }
        break;
      case "/putSkillsStats":
        if (putSkillsStats(backendPayload)) {
          broadcast(current);
        }
        break;
    }
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

function wsRoutes(ws: expressWs.Instance) {
  ws.app.ws();
} */

// //https://www.geeksforgeeks.org/real-time-updates-with-websockets-and-react-hooks/
