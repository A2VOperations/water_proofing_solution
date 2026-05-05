import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function check() {
  await mongoose.connect(
    process.env.MONGODB_URI ||
      "mongodb://rascarewaterproofing_db_user:F6SnJRVtsFH2FB0I@ac-3jsckvi-shard-00-00.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-01.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-02.waur7um.mongodb.net:27017/YOUR_DB_NAME?replicaSet=atlas-jx7a53-shard-0&tls=true&authSource=admin&retryWrites=true&w=majority",
  );
  const db = mongoose.connection.db;
  const services = await db.collection("services").find({}).toArray();
  const blogs = await db.collection("blogs").find({}).toArray();
  const works = await db.collection("works").find({}).toArray();

  console.log("Services:", services.length);
  console.log("Blogs:", blogs.length);
  console.log("Works:", works.length);

  if (services.length > 0) {
    console.log("First Service Title:", services[0].title);
  }

  await mongoose.disconnect();
}
check();
