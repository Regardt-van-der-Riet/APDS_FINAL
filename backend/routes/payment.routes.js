const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { protect } = require('../middleware/auth.middleware');
const { validatePayment } = require('../middleware/validation.middleware');

// All payment routes require authentication
router.use(protect);

// @route   POST /api/payments
// @desc    Create a new payment
// @access  Private
router.post('/', validatePayment, paymentController.createPayment);

// @route   GET /api/payments
// @desc    Get all payments for logged-in user
// @access  Private
router.get('/', paymentController.getUserPayments);

// @route   GET /api/payments/:id
// @desc    Get single payment by ID
// @access  Private
router.get('/:id', paymentController.getPaymentById);

module.exports = router;

