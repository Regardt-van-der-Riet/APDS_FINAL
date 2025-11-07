const Admin = require('../models/Admin.model');
const Payment = require('../models/Payment.model');
const { signToken } = require('../middleware/auth.middleware');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate username format to prevent NoSQL injection
        if (!username || typeof username !== 'string' || !/^[a-z0-9_]+$/i.test(username)) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            });
        }

        // Find admin by username (sanitized)
        const admin = await Admin.findOne({ username: username.toLowerCase() }).select('+password');

        if (!admin) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            });
        }

        // Check if admin is active
        if (!admin.isActive) {
            return res.status(401).json({
                status: 'fail',
                message: 'Admin account is deactivated'
            });
        }

        // Check password
        const isPasswordCorrect = await admin.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            });
        }

        // Update last login
        admin.lastLogin = Date.now();
        await admin.save({ validateBeforeSave: false });

        // Generate JWT token
        const token = signToken(admin._id);

        res.status(200).json({
            status: 'success',
            message: 'Admin logged in successfully',
            token,
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error logging in'
        });
    }
};

// @desc    Get all pending payments
// @route   GET /api/admin/payments/pending
// @access  Private (Admin)
exports.getPendingPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ status: 'pending' })
            .sort({ createdAt: -1 })
            .populate('userId', 'fullName username accountNumber');

        res.status(200).json({
            status: 'success',
            results: payments.length,
            payments
        });
    } catch (error) {
        console.error('Get pending payments error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching pending payments'
        });
    }
};

// @desc    Get all payments (with filters)
// @route   GET /api/admin/payments
// @access  Private (Admin)
exports.getAllPayments = async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;
        
        let query = {};
        
        // Validate and filter by status (prevent NoSQL injection)
        const allowedStatuses = ['pending', 'verified', 'processed', 'completed', 'failed', 'cancelled'];
        if (status && status !== 'all') {
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Invalid status value'
                });
            }
            query.status = status;
        }
        
        // Validate and filter by date range (prevent NoSQL injection)
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                const start = new Date(startDate);
                if (isNaN(start.getTime())) {
                    return res.status(400).json({
                        status: 'fail',
                        message: 'Invalid start date'
                    });
                }
                query.createdAt.$gte = start;
            }
            if (endDate) {
                const end = new Date(endDate);
                if (isNaN(end.getTime())) {
                    return res.status(400).json({
                        status: 'fail',
                        message: 'Invalid end date'
                    });
                }
                query.createdAt.$lte = end;
            }
        }

        const payments = await Payment.find(query)
            .sort({ createdAt: -1 })
            .populate('userId', 'fullName username accountNumber');

        res.status(200).json({
            status: 'success',
            results: payments.length,
            payments
        });
    } catch (error) {
        console.error('Get all payments error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching payments'
        });
    }
};

// @desc    Verify a payment
// @route   PATCH /api/admin/payments/:id/verify
// @access  Private (Admin)
exports.verifyPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                status: 'fail',
                message: 'Payment not found'
            });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({
                status: 'fail',
                message: `Payment is already ${payment.status}`
            });
        }

        payment.status = 'verified';
        payment.processedAt = Date.now();
        await payment.save();

        await payment.populate('userId', 'fullName username accountNumber');

        res.status(200).json({
            status: 'success',
            message: 'Payment verified successfully',
            payment
        });
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error verifying payment'
        });
    }
};

// @desc    Reject a payment
// @route   PATCH /api/admin/payments/:id/reject
// @access  Private (Admin)
exports.rejectPayment = async (req, res) => {
    try {
        const { reason } = req.body;
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                status: 'fail',
                message: 'Payment not found'
            });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({
                status: 'fail',
                message: `Payment is already ${payment.status}`
            });
        }

        payment.status = 'failed';
        payment.processedAt = Date.now();
        if (reason) {
            // Clean the reason to only include allowed characters
            const cleanReason = reason.replaceAll(/[^a-zA-Z0-9\s.,!?'-]/g, '');
            payment.notes = payment.notes 
                ? `${payment.notes}. Rejected - ${cleanReason}` 
                : `Rejected - ${cleanReason}`;
        }
        await payment.save();

        await payment.populate('userId', 'fullName username accountNumber');

        res.status(200).json({
            status: 'success',
            message: 'Payment rejected',
            payment
        });
    } catch (error) {
        console.error('Reject payment error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error rejecting payment'
        });
    }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res) => {
    try {
        const totalPayments = await Payment.countDocuments();
        const pendingPayments = await Payment.countDocuments({ status: 'pending' });
        const verifiedPayments = await Payment.countDocuments({ status: 'verified' });
        const failedPayments = await Payment.countDocuments({ status: 'failed' });

        // Get total amount processed
        const totalAmountResult = await Payment.aggregate([
            { $match: { status: { $in: ['verified', 'processed', 'completed'] } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].total : 0;

        res.status(200).json({
            status: 'success',
            stats: {
                totalPayments,
                pendingPayments,
                verifiedPayments,
                failedPayments,
                totalAmount
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching statistics'
        });
    }
};

