import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();
const MONGO_URL = "mongodb://localhost:27017";

client.connectWithUri(MONGO_URL);

const db = client.database("Deno");

export default db;
