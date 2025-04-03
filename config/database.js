import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);
let db;

async function conectarDB() {
    await client.connect();
    db = client.db("cine");
    console.log("Conectado a MongoDB");
}

export { conectarDB, client, db };