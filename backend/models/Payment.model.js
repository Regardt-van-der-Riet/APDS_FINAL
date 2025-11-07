const mongoose = require('mongoose');
const crypto = require('crypto');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please provide payment amount'],
        min: [0.01, 'Amount must be greater than 0'],
        max: [1000000, 'Amount cannot exceed 1,000,000']
    },
    currency: {
        type: String,
        required: [true, 'Please provide currency'],
        enum: ['USD', 'EUR', 'GBP', 'ZAR', 'JPY', 'AUD', 'CAD', 'CHF'],
        default: 'USD'
    },
    provider: {
        type: String,
        required: [true, 'Please provide payment provider'],
        enum: ['SWIFT', 'SEPA', 'ACH', 'WIRE'],
        default: 'SWIFT'
    },
    payeeAccountNumber: {
        type: String,
        required: [true, 'Please provide payee account number'],
        trim: true,
        match: [/^[A-Z0-9]{8,34}$/, 'Invalid payee account number format (IBAN or standard account number)']
    },
    payeeName: {
        type: String,
        required: [true, 'Please provide payee name'],
        trim: true,
        minlength: [2, 'Payee name must be at least 2 characters'],
        maxlength: [100, 'Payee name cannot exceed 100 characters'],
        match: [/^[a-zA-Z\s'-]+$/, 'Payee name can only contain letters, spaces, hyphens, and apostrophes']
    },
    swiftCode: {
        type: String,
        required: [true, 'Please provide SWIFT code'],
        trim: true,
        uppercase: true,
        match: [/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Invalid SWIFT/BIC code format']
    },
    status: {
        type: String,
        enum: ['pending', 'verified', 'processed', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    },
    transactionReference: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    processedAt: {
        type: Date
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters'],
        match: [/^[a-zA-Z0-9\s.,!?'-]*$/, 'Notes contain invalid characters']
    }
});

// Generate unique transaction reference before saving
paymentSchema.pre('save', function(next) {
    if (!this.transactionReference) {
        const timestamp = Date.now();
        // Use crypto.randomInt for cryptographically secure random numbers
        const random = crypto.randomInt(0, 10000).toString().padStart(4, '0');
        this.transactionReference = `TXN${timestamp}${random}`;
    }
    next();
});

// Index for efficient queries
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ transactionReference: 1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);

