import "https://deno.land/x/dotenv/load.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const dbURI = Deno.env.get("DATABASE_HOST") || "mongodb://localhost:27017";
const dbName = Deno.env.get("DATABASE_NAME") || "Deno";

class Database {
  public client: MongoClient;

  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = dbURI;
    this.client = {} as MongoClient;
  }

  connect() {
    const client = new MongoClient();
    client.connectWithUri(this.url);
    this.client = client;
  }

  get findDatabase() {
    return this.client.database(this.dbName);
  }
}

const connectionDatabase = new Database(dbName, dbURI);

connectionDatabase.connect();

export default connectionDatabase;
