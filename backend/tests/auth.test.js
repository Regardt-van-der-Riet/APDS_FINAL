const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User.model');

describe('Auth Controller Tests', () => {
    // Test database connection
    beforeAll(async () => {
        const testDbUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/apds-banking-test';
        await mongoose.connect(testDbUri);
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('POST /api/auth/login', () => {
        it('should reject login with invalid username format', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'invalid@user',
                    accountNumber: '1234567890',
                    password: 'Password@123'
                });

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('fail');
        });

        it('should reject login with invalid account number format', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    accountNumber: 'invalid',
                    password: 'Password@123'
                });

            expect(response.status).toBe(400);
            expect(response.body.status).toBe('fail');
        });

        it('should reject login with non-existent user', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'nonexistent',
                    accountNumber: '1234567890',
                    password: 'Password@123'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
});

