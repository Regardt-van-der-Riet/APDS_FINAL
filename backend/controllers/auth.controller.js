const User = require('../models/User.model');
const { signToken } = require('../middleware/auth.middleware');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { fullName, idNumber, accountNumber, username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { username },
                { idNumber },
                { accountNumber }
            ]
        });

        if (existingUser) {
            let field = 'User';
            if (existingUser.username === username) field = 'Username';
            else if (existingUser.idNumber === idNumber) field = 'ID number';
            else if (existingUser.accountNumber === accountNumber) field = 'Account number';

            return res.status(400).json({
                status: 'fail',
                message: `${field} already exists`
            });
        }

        // Create new user (password will be hashed automatically by the pre-save hook)
        const user = await User.create({
            fullName,
            idNumber,
            accountNumber,
            username,
            password
        });

        // Generate JWT token
        const token = signToken(user._id);

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                accountNumber: user.accountNumber
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error registering user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { username, accountNumber, password } = req.body;

        // Find user by username and account number (must match both)
        const user = await User.findOne({ username, accountNumber }).select('+password');

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save({ validateBeforeSave: false });

        // Generate JWT token
        const token = signToken(user._id);

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                accountNumber: user.accountNumber
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error logging in',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user data'
        });
    }
};

// Middleware to protect routes (imported from auth.middleware.js)
exports.protect = require('../middleware/auth.middleware').protect;

