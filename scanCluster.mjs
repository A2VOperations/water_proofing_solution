import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function listDbs() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://operationa2vgroups_db_user:pl8lnOO74Ei9LVTU@ac-6duqcqa-shard-00-00.fg8xboe.mongodb.net:27017,ac-6duqcqa-shard-00-01.fg8xboe.mongodb.net:27017,ac-6duqcqa-shard-00-02.fg8xboe.mongodb.net:27017/water-proofing-admin?replicaSet=atlas-bo8knz-shard-0&tls=true&authSource=admin&retryWrites=true&w=majority");
  const admin = mongoose.connection.db.admin();
  const dbs = await admin.listDatabases();
  console.log("Databases in cluster:", dbs.databases.map(d => d.name).join(', '));
  
  for (const dbInfo of dbs.databases) {
    const db = mongoose.connection.useDb(dbInfo.name);
    const collections = await db.db.listCollections().toArray();
    console.log(`DB: ${dbInfo.name} -> Collections:`, collections.map(c => c.name).join(', '));
  }
  
  await mongoose.disconnect();
}
listDbs();
