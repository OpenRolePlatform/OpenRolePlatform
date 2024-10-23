import { IncomingMessage } from "http";
import { Server, WebSocket } from "ws";

export class WebSocketService {
  private static _instance: WebSocketService;

  private wss: Server<typeof WebSocket, typeof IncomingMessage>;

  constructor(wss: Server<typeof WebSocket, typeof IncomingMessage>) {
    if (WebSocketService._instance) return;
    WebSocketService._instance = this;
    this.wss = wss;
  }

  public static get Instance(): WebSocketService {
    return this._instance;
  }

  /**
   * init
   */
  public init() {
    console.log("init websocket");

    this.wss.on("connection", (ws) => {
      ws.on("open", (ws) => {
        console.log("WebSocket Open");
      });
      ws.on("message", (ws) => {
        console.log("WebSocket message");
      });
      /* setInterval(() => {
        ws.send("message");
      }, 100); */
    });
  }

  public broadcast(message) {
    // Broadcast the message to all connected clients
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}
