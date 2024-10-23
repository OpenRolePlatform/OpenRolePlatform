import cors from "cors";
import "dotenv/config";
import express from "express";
import { WebSocket } from "ws";
import { db } from "./connectDB";
import { routes } from "./router-controller";
import { WebSocketService } from "./WebSocketServices";
const PORT = process.env.PORT || 3001;
const delay = 0;

// initialize express app
const app = express();
db;

function setCorsHeaders(req: any, res: any, next: () => void) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}

app.use(function (req, res, next) {
  setTimeout(next, delay);
});

app.use(cors()); // enable `CORS` for all routes
app.use(express.json()); // enable parsing of json request body
app.use(express.urlencoded({ extended: true }));
app.use(setCorsHeaders);

routes(app);

// start the server
const server = app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({
  server: server,
});

new WebSocketService(wss).init();
