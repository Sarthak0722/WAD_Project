const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createFreshAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete any existing admin users
    await User.deleteMany({ role: 'admin' });
    console.log('Deleted existing admin users');

    // Create new admin user
    const admin = await User.create({
      name: 'System Admin',
      email: 'sysadmin@dairy.com',
      password: 'Admin@1234',
      phone: '1234567890',
      address: 'System Admin Address',
      role: 'admin',
      isSubscribed: false
    });

    console.log('New admin user created successfully:', admin);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createFreshAdmin(); 