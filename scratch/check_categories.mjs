import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkCategories() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const services = await db.collection("services").find({}).toArray();
  
  const categories = [...new Set(services.map(s => s.category))];
  console.log("Unique Categories:", categories);

  await mongoose.disconnect();
}
checkCategories();
