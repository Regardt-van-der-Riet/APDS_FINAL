const User = require('../models/User.model');
const { signToken } = require('../middleware/auth.middleware');

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { username, accountNumber, password } = req.body;

        // Validate inputs to prevent NoSQL injection
        if (!username || typeof username !== 'string' || !/^[a-z0-9_]+$/.test(username)) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            });
        }

        if (!accountNumber || typeof accountNumber !== 'string' || !/^[0-9]{10,16}$/.test(accountNumber)) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            });
        }

        // Find user by username and account number (must match both)
        const user = await User.findOne({ 
            username: username.toLowerCase(), 
            accountNumber: accountNumber 
        }).select('+password');

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

