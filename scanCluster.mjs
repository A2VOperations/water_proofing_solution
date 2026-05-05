import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function listDbs() {
  await mongoose.connect(
    process.env.MONGODB_URI ||
      "mongodb://rascarewaterproofing_db_user:F6SnJRVtsFH2FB0I@ac-3jsckvi-shard-00-00.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-01.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-02.waur7um.mongodb.net:27017/YOUR_DB_NAME?replicaSet=atlas-jx7a53-shard-0&tls=true&authSource=admin&retryWrites=true&w=majority",
  );
  const admin = mongoose.connection.db.admin();
  const dbs = await admin.listDatabases();
  console.log(
    "Databases in cluster:",
    dbs.databases.map((d) => d.name).join(", "),
  );

  for (const dbInfo of dbs.databases) {
    const db = mongoose.connection.useDb(dbInfo.name);
    const collections = await db.db.listCollections().toArray();
    console.log(
      `DB: ${dbInfo.name} -> Collections:`,
      collections.map((c) => c.name).join(", "),
    );
  }

  await mongoose.disconnect();
}
listDbs();
