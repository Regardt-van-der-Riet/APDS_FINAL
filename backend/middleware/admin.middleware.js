const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model');

// Protect admin routes
exports.protectAdmin = async (req, res, next) => {
    try {
        let token;

        // Check for token in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in as admin'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

        // Check if admin still exists
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({
                status: 'fail',
                message: 'Admin no longer exists'
            });
        }

        // Check if admin is active
        if (!admin.isActive) {
            return res.status(401).json({
                status: 'fail',
                message: 'Admin account is deactivated'
            });
        }

        // Grant access
        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid token or unauthorized'
        });
    }
};

// Restrict to super admin only
exports.restrictToSuperAdmin = (req, res, next) => {
    if (req.admin.role !== 'super_admin') {
        return res.status(403).json({
            status: 'fail',
            message: 'You do not have permission to perform this action'
        });
    }
    next();
};

