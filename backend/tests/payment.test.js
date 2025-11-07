const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Payment = require('../models/Payment.model');
const User = require('../models/User.model');

describe('Payment Controller Tests', () => {
    beforeAll(async () => {
        const testDbUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/apds-banking-test';
        await mongoose.connect(testDbUri);
    });

    afterAll(async () => {
        await Payment.deleteMany({});
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Payment.deleteMany({});
        await User.deleteMany({});
    });

    describe('POST /api/payments', () => {
        it('should reject payment creation without authentication', async () => {
            const response = await request(app)
                .post('/api/payments')
                .send({
                    amount: 100,
                    currency: 'USD',
                    provider: 'SWIFT',
                    payeeAccountNumber: 'TEST1234567890',
                    payeeName: 'Test Payee',
                    swiftCode: 'ABCDUS33'
                });

            expect(response.status).toBe(401);
        });

        it('should reject payment with invalid currency', async () => {
            const user = await User.create({
                fullName: 'Test User',
                username: 'testuser',
                idNumber: '1234567890123',
                accountNumber: '1234567890',
                password: 'Password@123'
            });

            const token = require('../middleware/auth.middleware').signToken(user._id);

            const response = await request(app)
                .post('/api/payments')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    amount: 100,
                    currency: 'INVALID',
                    provider: 'SWIFT',
                    payeeAccountNumber: 'TEST1234567890',
                    payeeName: 'Test Payee',
                    swiftCode: 'ABCDUS33'
                });

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('fail');
        });

        it('should reject payment with invalid provider', async () => {
            const user = await User.create({
                fullName: 'Test User',
                username: 'testuser',
                idNumber: '1234567890123',
                accountNumber: '1234567890',
                password: 'Password@123'
            });

            const token = require('../middleware/auth.middleware').signToken(user._id);

            const response = await request(app)
                .post('/api/payments')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    amount: 100,
                    currency: 'USD',
                    provider: 'INVALID',
                    payeeAccountNumber: 'TEST1234567890',
                    payeeName: 'Test Payee',
                    swiftCode: 'ABCDUS33'
                });

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('fail');
        });
    });

    describe('GET /api/payments', () => {
        it('should reject requests without authentication', async () => {
            const response = await request(app)
                .get('/api/payments');

            expect(response.status).toBe(401);
        });
    });
});

