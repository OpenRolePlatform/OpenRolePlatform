import "dotenv/config";
import mongoose from "mongoose";

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

mongoose.set("strictQuery", true);

export const db = mongoose.createConnection(
  `mongodb://${dbHost}:${dbPort}/${dbName}`
);

// Check DB Connection
db.once("open", () => {
  (async () => {
    /* const data = await mongoose?.connection?.db?.admin().command({
      listDatabases: 1,
    }); */
    const dbList = await db.listDatabases();
    console.log("List of databases: ");
    console.log(dbList);
  })();
  console.log(`Database connection successfully to ${dbName}`);
});
