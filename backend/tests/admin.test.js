const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Admin = require('../models/Admin.model');

describe('Admin Controller Tests', () => {
    beforeAll(async () => {
        const testDbUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/apds-banking-test';
        await mongoose.connect(testDbUri);
    });

    afterAll(async () => {
        await Admin.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Admin.deleteMany({});
    });

    describe('POST /api/admin/login', () => {
        it('should reject admin login with invalid username format', async () => {
            const response = await request(app)
                .post('/api/admin/login')
                .send({
                    username: 'invalid@admin',
                    password: 'Admin@123'
                });

            expect(response.status).toBe(401);
            expect(response.body.status).toBe('fail');
            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should reject admin login with non-existent admin', async () => {
            const response = await request(app)
                .post('/api/admin/login')
                .send({
                    username: 'nonexistentadmin',
                    password: 'Admin@123'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid credentials');
        });
    });

    describe('GET /api/admin/payments', () => {
        it('should reject unauthenticated requests', async () => {
            const response = await request(app)
                .get('/api/admin/payments');

            expect(response.status).toBe(401);
        });

        it('should reject requests with invalid status filter', async () => {
            const admin = await Admin.create({
                fullName: 'Test Admin',
                username: 'testadmin',
                email: 'test@admin.com',
                password: 'Admin@123',
                role: 'admin'
            });

            const token = require('../middleware/auth.middleware').signToken(admin._id);

            const response = await request(app)
                .get('/api/admin/payments?status=invalid')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid status value');
        });
    });
});

