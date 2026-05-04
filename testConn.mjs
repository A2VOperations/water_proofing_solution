import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
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
