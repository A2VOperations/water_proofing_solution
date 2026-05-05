import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const uri =
  process.env.MONGODB_URI ||
  "mongodb://rascarewaterproofing_db_user:F6SnJRVtsFH2FB0I@ac-3jsckvi-shard-00-00.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-01.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-02.waur7um.mongodb.net:27017/waterProofing?replicaSet=atlas-jx7a53-shard-0&tls=true&authSource=admin&retryWrites=true&w=majority";
console.log("Connecting to:", uri.replace(/:([^@]+)@/, ":****@"));

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connection successful!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection failed:", err);
    process.exit(1);
  });
