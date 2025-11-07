const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateLogin } = require('../middleware/validation.middleware');
const ExpressBrute = require('express-brute');
const MongooseStore = require('express-brute-mongoose');
const BruteForceSchema = require('../models/BruteForce.model');

// Configure Express Brute with MongoDB store for DDoS/Brute Force protection
const store = new MongooseStore(BruteForceSchema);

const bruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 5 * 60 * 1000, // 5 minutes
    maxWait: 60 * 60 * 1000, // 1 hour
    failCallback: function (req, res, next, nextValidRequestDate) {
        res.status(429).json({
            status: 'fail',
            message: `Too many failed attempts. Please try again after ${new Date(nextValidRequestDate).toLocaleTimeString()}`
        });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', bruteforce.prevent, validateLogin, authController.login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authController.protect, authController.getMe);

module.exports = router;

