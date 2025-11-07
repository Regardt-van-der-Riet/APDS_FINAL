const mongoose = require('mongoose');
const Admin = require('../models/Admin.model');
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

// Create admin user
const createAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        
        if (existingAdmin) {
            console.log('❌ Admin user already exists!');
            console.log('Username:', existingAdmin.username);
            console.log('Email:', existingAdmin.email);
            process.exit(0);
        }

        // Create new admin
        const admin = await Admin.create({
            fullName: 'System Administrator',
            username: 'admin',
            email: 'admin@apdsbanking.com',
            password: 'Admin@123', // Change this in production!
            role: 'super_admin',
            isActive: true
        });

        console.log('✅ Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Username: admin');
        console.log('Password: Admin@123');
        console.log('Email:', admin.email);
        console.log('Role:', admin.role);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  IMPORTANT: Change the password after first login!');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        process.exit(1);
    }
};

// Run the script
createAdmin();

