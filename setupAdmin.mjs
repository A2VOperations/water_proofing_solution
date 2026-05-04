import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// We define the schema here for a standalone script execution
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  companyTitle: { type: String },
  numbers: { type: [String] },
  address: { type: String }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/water-proofing-admin";

async function setup() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB...");

    // ============================================
    // EDIT THESE VALUES TO ADD YOUR EMAIL & PASSWORD
    // ============================================
    const adminEmail = "vharsh2003new@gmail.com"; 
    const adminPassword = "admin123";
    const adminName = "Admin";
    // ============================================

    const existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
       console.log(`User ${adminEmail} already exists! Skipping creation.`);
       process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    await User.create({
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      companyTitle: "WP Solutions Inc.",
      numbers: [],
    });

    console.log(`✅ Successfully created admin user: ${adminEmail}`);
    console.log(`You can now login at /admin using these credentials.`);
    process.exit(0);
  } catch (error) {
    console.error("Error creating user:", error);
    process.exit(1);
  }
}

setup();
