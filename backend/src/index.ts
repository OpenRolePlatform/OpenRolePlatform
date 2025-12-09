import cors from "cors";
import "dotenv/config";
import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { connectDB } from "./connectDB";
import { WebSocketService } from "./connectWS";
import { routes } from "./router-main";

const PORT = process.env.BACKEND_PORT || 3001;
const delay = 0;

// initialize express app
const app = express();

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

app.use("/upload", express.static("upload"));

routes(app);

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is listening at http://localhost:${PORT}`);
    });

    const wss = new WebSocketServer({
      server: server,
    });

    new WebSocketService(wss).init();

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
