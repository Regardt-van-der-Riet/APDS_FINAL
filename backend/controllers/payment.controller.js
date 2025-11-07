const Payment = require('../models/Payment.model');

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Private
exports.createPayment = async (req, res) => {
    try {
        const { amount, currency, provider, payeeAccountNumber, payeeName, swiftCode, notes } = req.body;

        // Validate and sanitize enum values to prevent NoSQL injection
        const allowedCurrencies = ['USD', 'EUR', 'GBP', 'ZAR', 'JPY', 'AUD', 'CAD', 'CHF'];
        const allowedProviders = ['SWIFT', 'SEPA', 'ACH', 'WIRE'];

        if (!allowedCurrencies.includes(currency)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid currency'
            });
        }

        if (!allowedProviders.includes(provider)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid provider'
            });
        }

        // Store validated values
        const validatedCurrency = currency;
        const validatedProvider = provider;
        const sanitizedPayeeAccount = payeeAccountNumber.toUpperCase();
        const sanitizedSwiftCode = swiftCode.toUpperCase();

        // Create payment with validated/sanitized values only
        const payment = await Payment.create({
            userId: req.user._id,
            amount,
            currency: validatedCurrency,
            provider: validatedProvider,
            payeeAccountNumber: sanitizedPayeeAccount,
            payeeName,
            swiftCode: sanitizedSwiftCode,
            notes,
            status: 'pending'
        });

        // Populate user information
        await payment.populate('userId', 'fullName username accountNumber');

        res.status(201).json({
            status: 'success',
            message: 'Payment created successfully and pending verification',
            payment
        });
    } catch (error) {
        console.error('Create payment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating payment',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get all payments for logged-in user
// @route   GET /api/payments
// @access  Private
exports.getUserPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .populate('userId', 'fullName username accountNumber');

        res.status(200).json({
            status: 'success',
            results: payments.length,
            payments
        });
    } catch (error) {
        console.error('Get payments error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching payments'
        });
    }
};

// @desc    Get single payment by ID
// @route   GET /api/payments/:id
// @access  Private
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('userId', 'fullName username accountNumber');

        if (!payment) {
            return res.status(404).json({
                status: 'fail',
                message: 'Payment not found'
            });
        }

        // Ensure user can only view their own payments
        if (payment.userId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to view this payment'
            });
        }

        res.status(200).json({
            status: 'success',
            payment
        });
    } catch (error) {
        console.error('Get payment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching payment'
        });
    }
};

