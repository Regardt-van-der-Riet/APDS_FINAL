const mongoose = require('mongoose');
const User = require('../models/User.model');
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

// Create test user
const createTestUser = async () => {
    try {
        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ username: 'johnsmith' });
        
        if (existingUser) {
            console.log('❌ User "johnsmith" already exists!');
            console.log('Deleting and recreating...');
            await User.deleteOne({ username: 'johnsmith' });
        }

        // Create new test user
        const user = await User.create({
            fullName: 'John Smith',
            idNumber: '8905125432109',
            accountNumber: '9876543210123',
            username: 'johnsmith',
            password: 'Password@123', // Will be hashed automatically
        });

        console.log('✅ Test user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Username: johnsmith');
        console.log('Password: Password@123');
        console.log('Account Number: 9876543210123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating user:', error.message);
        process.exit(1);
    }
};

// Run the script
createTestUser();

