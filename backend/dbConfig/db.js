import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://rascarewaterproofing_db_user:F6SnJRVtsFH2FB0I@ac-3jsckvi-shard-00-00.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-01.waur7um.mongodb.net:27017,ac-3jsckvi-shard-00-02.waur7um.mongodb.net:27017/waterProofing?replicaSet=atlas-jx7a53-shard-0&tls=true&authSource=admin&retryWrites=true&w=majority";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log(
          "Successfully connected to MongoDB:",
          MONGODB_URI.includes("mongodb.net") ? "ATLAS" : "LOCAL/OTHER",
        );
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error.message);
        if (error.message.includes("IP isn't whitelisted")) {
          console.error(
            "👉 TIP: Make sure your current IP address is whitelisted in MongoDB Atlas.",
          );
        }
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
