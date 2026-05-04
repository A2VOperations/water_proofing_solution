import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI || "mongodb://operationa2vgroups_db_user:pl8lnOO74Ei9LVTU@ac-6duqcqa-shard-00-00.fg8xboe.mongodb.net:27017,ac-6duqcqa-shard-00-01.fg8xboe.mongodb.net:27017,ac-6duqcqa-shard-00-02.fg8xboe.mongodb.net:27017/water-proofing-admin?replicaSet=atlas-bo8knz-shard-0&tls=true&authSource=admin&retryWrites=true&w=majority";
console.log("Connecting to:", uri.replace(/:([^@]+)@/, ":****@"));

mongoose.connect(uri)
  .then(() => {
    console.log("Connection successful!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection failed:", err);
    process.exit(1);
  });
