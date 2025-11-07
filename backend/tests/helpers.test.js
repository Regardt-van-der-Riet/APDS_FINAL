const { validateStatus, validateDate } = require('../controllers/admin.controller');

describe('Helper Functions Tests', () => {
    describe('validateStatus', () => {
        it('should return valid status', () => {
            expect(validateStatus('pending')).toBe('pending');
            expect(validateStatus('verified')).toBe('verified');
            expect(validateStatus('completed')).toBe('completed');
        });

        it('should return null for invalid status', () => {
            expect(validateStatus('invalid')).toBe(null);
        });

        it('should return null for "all"', () => {
            expect(validateStatus('all')).toBe(null);
        });

        it('should handle undefined', () => {
            expect(validateStatus(undefined)).toBe(null);
        });
    });

    describe('validateDate', () => {
        it('should return valid date', () => {
            const result = validateDate('2025-11-07');
            expect(result instanceof Date).toBe(true);
            expect(Number.isNaN(result.getTime())).toBe(false);
        });

        it('should return false for invalid date', () => {
            const result = validateDate('invalid-date');
            expect(result).toBe(false);
        });

        it('should return null for undefined', () => {
            const result = validateDate(undefined);
            expect(result).toBe(null);
        });

        it('should return null for empty string', () => {
            const result = validateDate('');
            expect(result).toBe(null);
        });
    });
});

