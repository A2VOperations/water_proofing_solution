import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function listDbs() {
  await mongoose.connect(process.env.MONGODB_URI);
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
