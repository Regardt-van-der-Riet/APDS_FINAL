const mongoose = require('mongoose');
const BruteForce = require('../models/BruteForce.model');
require('dotenv').config();

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apds-banking', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Clear brute force records
const clearBruteForce = async () => {
    try {
        await connectDB();

        const result = await BruteForce.deleteMany({});
        
        console.log('✅ Brute force protection cleared!');
        console.log(`Deleted ${result.deletedCount} records`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('You can now try logging in again!');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error clearing brute force records:', error.message);
        process.exit(1);
    }
};

// Run the script
clearBruteForce();

