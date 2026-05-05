import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const uri =
  process.env.MONGODB_URI ||
  "mongodb://rascarewaterproofing_db_user:F6SnJRVtsFH2FB0I@ac-3jsckvi-shard-00-00.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-01.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-02.waur7um.mongodb.net:27017/waterProofing?replicaSet=atlas-jx7a53-shard-0&tls=true&authSource=admin&retryWrites=true&w=majority";

async function checkData() {
  await mongoose.connect(uri);
  console.log("Connected!\n");

  const db = mongoose.connection.db;

  // List all collections
  const collections = await db.listCollections().toArray();
  console.log(
    "Collections:",
    collections.map((c) => c.name).join(", ") || "(none)",
  );

  // Count documents in each collection
  for (const col of collections) {
    const count = await db.collection(col.name).countDocuments();
    console.log(`  ${col.name}: ${count} documents`);
  }

  // Check for admin user
  const users = await db.collection("users").find({}).toArray();
  if (users.length > 0) {
    console.log("\nAdmin user found:", users[0].name, "-", users[0].email);
  } else {
    console.log("\nNo admin user found!");
  }

  await mongoose.disconnect();
}

checkData().catch((err) => {
  console.error(err);
  process.exit(1);
});
