import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://operationa2vgroups_db_user:pl8lnOO74Ei9LVTU@ac-6duqcqa-shard-00-00.fg8xboe.mongodb.net:27017,ac-6duqcqa-shard-00-01.fg8xboe.mongodb.net:27017,ac-6duqcqa-shard-00-02.fg8xboe.mongodb.net:27017/water-proofing-admin?replicaSet=atlas-bo8knz-shard-0&tls=true&authSource=admin&retryWrites=true&w=majority");
  const db = mongoose.connection.db;
  const services = await db.collection('services').find({}).toArray();
  const blogs = await db.collection('blogs').find({}).toArray();
  const works = await db.collection('works').find({}).toArray();
  
  console.log("Services:", services.length);
  console.log("Blogs:", blogs.length);
  console.log("Works:", works.length);
  
  if (services.length > 0) {
    console.log("First Service Title:", services[0].title);
  }
  
  await mongoose.disconnect();
}
check();
