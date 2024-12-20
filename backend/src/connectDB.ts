import "dotenv/config";
import mongoose, { Connection } from "mongoose";
import { MessageModel, MessageType } from "./api/WebsocketTypes";
import { WebSocketService } from "./connectWS";
import { Campaign } from "./core/models/campaign/campaign-model";
import { CampaignSchema } from "./core/schemas/campaign/campaign-schema";
import { CharacterSchema } from "./core/schemas/character/character-schema";
import { ItemSchema } from "./core/schemas/item/item-schema";
import { NotesSchema } from "./core/schemas/notes/notes-schema";
import { PlayerSchema } from "./core/schemas/player/player-schema";
import { SpellSchema } from "./core/schemas/spell/spell-schema";

// Database connection params
const db_host = process.env.DATABASE_HOST || "localhost";
const db_name = process.env.DATABASE_NAME || "OpenRolePlatform";
const db_port = process.env.DATABASE_PORT || 27017;

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
    this.connect(db_name!).then((db) => {
      this._db = db;
      this._db.model("Campaign", CampaignSchema);
      this._db.model("Player", PlayerSchema);
    });

    WebSocketService.Instance.broadcast({
      type: MessageType.CampaignLoad,
      model: MessageModel.campaign,
      data: undefined,
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
      `mongodb://${db_host}:${db_port}/${database}`,
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
      console.log(`Database ${db_name} closed`);
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
      this._campaignDB.model("Notes", NotesSchema);
      this._loadedCampaign = campaign;
      return true;
    }
    return false;
  }
}
