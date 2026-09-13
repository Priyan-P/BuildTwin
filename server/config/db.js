const mongoose = require('mongoose');

let isConnected = false;
let useMockStore = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buildtwin', {
      serverSelectionTimeoutMS: 2500
    });
    isConnected = true;
    console.log(`[BuildTwin Server] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[BuildTwin Server] MongoDB Connection Notice: Could not connect to local MongoDB (${error.message}).`);
    console.warn(`[BuildTwin Server] Enabling Intelligent In-Memory Storage Engine for seamless offline demonstration!`);
    useMockStore = true;
  }
};

const getDbState = () => ({ isConnected, useMockStore });

module.exports = { connectDB, getDbState };
