import cors from "cors";
import "dotenv/config";
import express from "express";
import { db } from "./connectDB";
import {
  getCharacterStats,
  getHpStats,
  getOtherCharacterStats,
  getSkillsStats,
  putCharacterStats,
  putHpStats,
  putOtherCharacterStats,
  putSkillsStats,
} from "./router-controller";

// initialize express app
const PORT = process.env.PORT || 3001;
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

app.use(cors()); // enable `CORS` for all routes
app.use(express.json()); // enable parsing of json request body
app.use(express.urlencoded({ extended: true }));
app.use(setCorsHeaders);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "OpenRolePlatform database loaded successfully" });
});

app.put("/putCharacterStats", putCharacterStats);
app.put("/getCharacterStats", getCharacterStats);
app.put("/putOtherCharacterStats", putOtherCharacterStats);
app.put("/getOtherCharacterStats", getOtherCharacterStats);
app.put("/putHpStats", putHpStats);
app.put("/getHpStats", getHpStats);
app.put("/putSkillsStats", putSkillsStats);
app.put("/getSkillsStats", getSkillsStats);

// start the server
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
