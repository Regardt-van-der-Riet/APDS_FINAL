const mongoose = require('mongoose');
const User = require('../models/User.model');
const Admin = require('../models/Admin.model');
const Payment = require('../models/Payment.model');

describe('Model Tests', () => {
    beforeAll(async () => {
        const testDbUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/apds-banking-test';
        await mongoose.connect(testDbUri);
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Admin.deleteMany({});
        await Payment.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Admin.deleteMany({});
        await Payment.deleteMany({});
    });

    describe('User Model', () => {
        it('should hash password before saving', async () => {
            const user = await User.create({
                fullName: 'Test User',
                username: 'testuser',
                idNumber: '1234567890123',
                accountNumber: '1234567890',
                password: 'Password@123'
            });

            expect(user.password).not.toBe('Password@123');
            expect(user.password).toMatch(/^\$2a\$/);
        });

        it('should compare passwords correctly', async () => {
            const user = await User.create({
                fullName: 'Test User',
                username: 'testuser',
                idNumber: '1234567890123',
                accountNumber: '1234567890',
                password: 'Password@123'
            });

            const userWithPassword = await User.findById(user._id).select('+password');
            const isMatch = await userWithPassword.comparePassword('Password@123');
            const isNotMatch = await userWithPassword.comparePassword('WrongPassword');

            expect(isMatch).toBe(true);
            expect(isNotMatch).toBe(false);
        });
    });

    describe('Admin Model', () => {
        it('should hash password before saving', async () => {
            const admin = await Admin.create({
                fullName: 'Test Admin',
                username: 'testadmin',
                email: 'test@admin.com',
                password: 'Admin@123'
            });

            expect(admin.password).not.toBe('Admin@123');
            expect(admin.password).toMatch(/^\$2a\$/);
        });

        it('should have correct default role', async () => {
            const admin = await Admin.create({
                fullName: 'Test Admin',
                username: 'testadmin',
                email: 'test@admin.com',
                password: 'Admin@123'
            });

            expect(admin.role).toBe('admin');
            expect(admin.isActive).toBe(true);
        });
    });

    describe('Payment Model', () => {
        it('should generate transaction reference automatically', async () => {
            const user = await User.create({
                fullName: 'Test User',
                username: 'testuser',
                idNumber: '1234567890123',
                accountNumber: '1234567890',
                password: 'Password@123'
            });

            const payment = await Payment.create({
                userId: user._id,
                amount: 100,
                currency: 'USD',
                provider: 'SWIFT',
                payeeAccountNumber: 'TEST1234567890',
                payeeName: 'Test Payee',
                swiftCode: 'ABCDUS33'
            });

            expect(payment.transactionReference).toBeDefined();
            expect(payment.transactionReference).toMatch(/^TXN\d+/);
        });

        it('should have correct default status', async () => {
            const user = await User.create({
                fullName: 'Test User',
                username: 'testuser',
                idNumber: '1234567890123',
                accountNumber: '1234567890',
                password: 'Password@123'
            });

            const payment = await Payment.create({
                userId: user._id,
                amount: 100,
                currency: 'USD',
                provider: 'SWIFT',
                payeeAccountNumber: 'TEST1234567890',
                payeeName: 'Test Payee',
                swiftCode: 'ABCDUS33'
            });

            expect(payment.status).toBe('pending');
        });
    });
});

