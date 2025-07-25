// scripts/seedAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config({ path: '.env' });

const { MONGODB_URI } = process.env;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined. Please check your .env.local file.');
  process.exit(1);
}

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL, role: 'admin' });

    if (existingAdmin) {
      console.log(`ℹ️ Admin user '${ADMIN_EMAIL}' already exists. Skipping creation.`);
    } else {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

      const adminUser = new User({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
        mfaEnabled: false,
      });

      await adminUser.save();
      console.log(`✅ Admin user '${ADMIN_EMAIL}' created successfully.`);
    }
  } catch (err) {
    console.error('❌ Error seeding admin user:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seedAdmin();
