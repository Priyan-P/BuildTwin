const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: '../.env' });

const createAdmin = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      'mongodb://127.0.0.1:27017/buildtwin';

    await mongoose.connect(mongoUri);

    console.log('MongoDB connected');

    const email = 'admin@buildtwin.demo';

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log('User already exists:');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);

      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        existingAdmin.status = 'active';
        await existingAdmin.save();
        console.log('Existing account changed to ADMIN.');
      }

      await mongoose.disconnect();
      return;
    }

    const admin = await User.create({
      name: 'Marcus Sterling (System Administrator)',
      email: email,
      password: 'admin123',
      phone: '+1 (555) 999-0000',
      role: 'admin',
      status: 'active'
    });

    console.log('');
    console.log('================================');
    console.log('ADMIN ACCOUNT CREATED');
    console.log('================================');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('Status:', admin.status);
    console.log('================================');

    await mongoose.disconnect();

  } catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
  }
};

createAdmin();