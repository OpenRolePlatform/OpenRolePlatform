import "dotenv/config";
import mongoose from "mongoose";

const dbHost = process.env.DB_HOST;
var dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

mongoose.set("strictQuery", true);

export var campaignDB = mongoose.createConnection(
  `mongodb://${dbHost}:${dbPort}/${dbName}`
);
// export var campaignDB;

export default function connectCampaignDB(database: string) {
  //mongoose.disconnect();
  //dbName = database === null ? dbName : database;
  campaignDB = mongoose.createConnection(
    `mongodb://${dbHost}:${dbPort}/${database}`
  );

  if (
    campaignDB.once("open", () => {
      console.log(`Database connection successfully to ${database}`);
    })
  )
    return true;
  return false;
}
