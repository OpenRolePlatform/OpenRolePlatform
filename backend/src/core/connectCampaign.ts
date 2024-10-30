import "dotenv/config";
import mongoose from "mongoose";

const dbHost = process.env.DB_HOST;
var dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

mongoose.set("strictQuery", true);

var campaignDB;

export default async function connectCampaignDB(database: string) {
  if (campaignDB !== undefined) {
    await mongoose.connection.close();
  }
  campaignDB = mongoose.createConnection(
    `mongodb://${dbHost}:${dbPort}/${database}`
  );
  mongoose.connect(`mongodb://${dbHost}:${dbPort}/${database}`);
  if (
    campaignDB.once("open", () => {
      console.log(`Database connection successfully to ${database}`);
    })
  ) {
    return true;
  }
  return false;
}
