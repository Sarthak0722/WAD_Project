const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createNewAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing user with this email
    await User.deleteOne({ email: 'admin1@example.com' });
    console.log('Deleted existing user with email admin1@example.com');

    // Create new admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin1@example.com',
      password: 'Admin123@',
      phone: '1234567890',
      address: 'Admin Address',
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

createNewAdmin(); 