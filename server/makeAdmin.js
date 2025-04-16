const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find any existing user
    const user = await User.findOne();
    
    if (!user) {
      console.log('No users found in the database');
      process.exit(1);
    }

    // Update the user to be an admin
    user.role = 'admin';
    await user.save();

    console.log('User updated to admin successfully:', user);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

makeAdmin(); 