import "dotenv/config";
import mongoose, { Connection } from "mongoose";

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

export class CampaignManager {
  private static _instance: CampaignManager;

  private db: Connection;

  constructor() {
    if (CampaignManager._instance) return;
    CampaignManager._instance = this;
  }

  public static get Instance(): CampaignManager {
    return this._instance;
  }

  public static get db(): Connection {
    return this.db;
  }

  /**
   * init
   */
  public async connect(name: string) {
    if (this.db) await this.db.close();
    this.db = mongoose.createConnection(
      `mongodb://${dbHost}:${dbPort}/${name}`
    );

    await mongoose.connection.useDb(name);
    return true;
  }
}
