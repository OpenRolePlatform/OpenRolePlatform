import expressWs, { Application } from "express-ws";
import { runInNewContext } from "vm";

class WebSocketServce {
  private ws: expressWs.Instance;

  constructor(ws: expressWs.Instance) {
    this.ws = ws;
  }


  /**
   * init
   */
  public init() {
    this.ws.app.ws("/ws", (ws, req) => {
      ws.
    })
  }
}
