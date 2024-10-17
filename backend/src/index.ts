import cors from "cors";
import "dotenv/config";
import express from "express";
import { db } from "./connectDB";
import { routes } from "./router-controller";

// initialize express app
const PORT = process.env.PORT || 3001;
const app = express();
const delay = 0;

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
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
