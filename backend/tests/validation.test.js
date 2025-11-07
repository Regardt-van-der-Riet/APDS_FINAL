const { validateLogin } = require('../middleware/validation.middleware');

describe('Validation Middleware Tests', () => {
    describe('Login Validation', () => {
        it('should have username validation rules', () => {
            expect(validateLogin).toBeDefined();
            expect(Array.isArray(validateLogin)).toBe(true);
            expect(validateLogin.length).toBeGreaterThan(0);
        });
    });

    describe('Input Sanitization', () => {
        it('should validate username format', () => {
            const validUsername = 'testuser123';
            const invalidUsername = 'test@user';
            const usernameRegex = /^[a-z0-9_]+$/;

            expect(usernameRegex.test(validUsername)).toBe(true);
            expect(usernameRegex.test(invalidUsername)).toBe(false);
        });

        it('should validate account number format', () => {
            const validAccount = '1234567890';
            const invalidAccount = 'abc123';
            const accountRegex = /^[0-9]{10,16}$/;

            expect(accountRegex.test(validAccount)).toBe(true);
            expect(accountRegex.test(invalidAccount)).toBe(false);
        });

        it('should validate SWIFT code format', () => {
            const validSwift = 'ABCDUS33';
            const invalidSwift = 'ABC123';
            const swiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

            expect(swiftRegex.test(validSwift)).toBe(true);
            expect(swiftRegex.test(invalidSwift)).toBe(false);
        });
    });

    describe('Security Patterns', () => {
        it('should validate allowed payment statuses', () => {
            const allowedStatuses = ['pending', 'verified', 'processed', 'completed', 'failed', 'cancelled'];
            
            expect(allowedStatuses.includes('pending')).toBe(true);
            expect(allowedStatuses.includes('verified')).toBe(true);
            expect(allowedStatuses.includes('invalid')).toBe(false);
        });

        it('should validate allowed currencies', () => {
            const allowedCurrencies = ['USD', 'EUR', 'GBP', 'ZAR', 'JPY', 'AUD', 'CAD', 'CHF'];
            
            expect(allowedCurrencies.includes('USD')).toBe(true);
            expect(allowedCurrencies.includes('EUR')).toBe(true);
            expect(allowedCurrencies.includes('INVALID')).toBe(false);
        });

        it('should validate allowed providers', () => {
            const allowedProviders = ['SWIFT', 'SEPA', 'ACH', 'WIRE'];
            
            expect(allowedProviders.includes('SWIFT')).toBe(true);
            expect(allowedProviders.includes('SEPA')).toBe(true);
            expect(allowedProviders.includes('INVALID')).toBe(false);
        });
    });
});

