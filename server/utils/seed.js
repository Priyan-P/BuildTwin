const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Project = require('../models/Project');
const Utility = require('../models/Utility');
const ProjectVersion = require('../models/ProjectVersion');
const Booking = require('../models/Booking');
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const ContactMessage = require('../models/ContactMessage');
const {
  mockUsers,
  mockProjects,
  mockUtilities,
  mockVersions,
  mockBookings,
  mockMessages,
  mockNotifications,
  mockContactMessages
} = require('./mockStore');

dotenv.config();

const seedDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buildtwin';
    console.log(`Connecting to MongoDB at ${connStr}...`);
    await mongoose.connect(connStr);
    console.log('Connected! Clearing old collections...');

    await User.deleteMany({});
    await Project.deleteMany({});
    await Utility.deleteMany({});
    await ProjectVersion.deleteMany({});
    await Booking.deleteMany({});
    await Message.deleteMany({});
    await Notification.deleteMany({});
    await ContactMessage.deleteMany({});

    console.log('Inserting seed users...');
    await User.insertMany(mockUsers);

    console.log('Inserting seed projects...');
    await Project.insertMany(mockProjects);

    console.log('Inserting seed utilities...');
    await Utility.insertMany(mockUtilities);

    console.log('Inserting seed project versions...');
    await ProjectVersion.insertMany(mockVersions);

    console.log('Inserting seed bookings...');
    await Booking.insertMany(mockBookings);

    console.log('Inserting seed messages...');
    await Message.insertMany(mockMessages);

    console.log('Inserting seed notifications...');
    await Notification.insertMany(mockNotifications);

    console.log('Inserting seed contact messages...');
    await ContactMessage.insertMany(mockContactMessages);

    console.log('SUCCESS: Database successfully seeded with BuildTwin demo dataset!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
