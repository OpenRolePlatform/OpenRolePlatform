import "dotenv/config";
import mongoose, { Connection } from "mongoose";
import { Campaign } from "./core/models/campaign/campaign-model";
import { CampaignSchema } from "./core/schemas/campaign/campaign-schema";
import { CharacterSchema } from "./core/schemas/character/character-schema";
import { ItemSchema } from "./core/schemas/item/item-schema";
import { PlayerSchema } from "./core/schemas/player/player-schema";
import { SpellSchema } from "./core/schemas/spell/spell-schema";

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

mongoose.set("strictQuery", true);

export class ConnectionsManager {
  static _instance: ConnectionsManager;

  private _db: Connection;

  private _campaignDB: Connection;

  private _loadedCampaign: Campaign | undefined;

  /**
   * Constructs the connection manager and connects to the main database
   */
  constructor() {
    if (ConnectionsManager._instance) return;
    ConnectionsManager._instance = this;
    this.connect(dbName!).then((db) => {
      this._db = db;
      this._db.model("Campaign", CampaignSchema);
      this._db.model("Player", PlayerSchema);
    });
  }

  public static get Instance(): ConnectionsManager {
    if (!ConnectionsManager._instance) {
      ConnectionsManager._instance = new ConnectionsManager();
    }
    return ConnectionsManager._instance;
  }

  public get db(): Connection {
    return this._db;
  }

  public get campaignDB(): Connection {
    return this._campaignDB;
  }

  public get campaign(): Campaign | undefined {
    return this._loadedCampaign;
  }

  /**
   * Create a connection to one database
   * @param database name of the database to connect
   * @returns the created connection
   */
  private async connect(database: string) {
    const db = mongoose.createConnection(
      `mongodb://${dbHost}:${dbPort}/${database}`,
      {
        dbName: database,
      }
    );
    db.once("open", () => {
      console.log(`Database connection successfully to ${database}`);
    });
    db.on("error", (err) => {
      console.error(`Database ${database} Error: `, err);
    });
    db.once("close", () => {
      console.log(`Database ${dbName} closed`);
    });
    return db;
  }

  /**
   * Connects to the campaign database, sets the models and stores the campaign
   * @param campaign campaign to load
   * @returns true if loaded, false otherwise
   */
  public async connectCampaign(campaign: Campaign | undefined) {
    if (campaign === this.campaign) return true;
    if (campaign) {
      if (this._campaignDB) {
        await this._campaignDB.close();
        this._loadedCampaign = undefined;
      }
      this._campaignDB = await this.connect(campaign._id!);

      this._campaignDB.model("Character", CharacterSchema);
      this._campaignDB.model("Spell", SpellSchema);
      this._campaignDB.model("Item", ItemSchema);
      this._campaignDB.model("Player", PlayerSchema);
      this._loadedCampaign = campaign;
      return true;
    }
    return false;
  }
}
