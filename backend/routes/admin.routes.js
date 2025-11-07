const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { protectAdmin } = require('../middleware/admin.middleware');

// Admin login (public)
router.post('/login', adminController.adminLogin);

// Protected admin routes
router.use(protectAdmin); // All routes below are protected

// Dashboard stats
router.get('/stats', adminController.getDashboardStats);

// Payment management
router.get('/payments', adminController.getAllPayments);
router.get('/payments/pending', adminController.getPendingPayments);
router.patch('/payments/:id/verify', adminController.verifyPayment);
router.patch('/payments/:id/reject', adminController.rejectPayment);

module.exports = router;

