const { body, validationResult } = require('express-validator');

// Validation error handler
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// Login validation rules
exports.validateLogin = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .matches(/^[a-z0-9_]+$/).withMessage('Invalid username format')
        .toLowerCase(),
    
    body('accountNumber')
        .trim()
        .notEmpty().withMessage('Account number is required')
        .matches(/^[0-9]{10,16}$/).withMessage('Invalid account number format')
        .isNumeric().withMessage('Account number must contain only numbers'),
    
    body('password')
        .notEmpty().withMessage('Password is required'),
    
    exports.handleValidationErrors
];

// Payment validation rules - Input Whitelisting with RegEx
exports.validatePayment = [
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isFloat({ min: 0.01, max: 1000000 }).withMessage('Amount must be between 0.01 and 1,000,000')
        .matches(/^\d+(\.\d{1,2})?$/).withMessage('Amount must be a valid number with up to 2 decimal places'),
    
    body('currency')
        .trim()
        .notEmpty().withMessage('Currency is required')
        .matches(/^[A-Z]{3}$/).withMessage('Currency must be a 3-letter code')
        .isIn(['USD', 'EUR', 'GBP', 'ZAR', 'JPY', 'AUD', 'CAD', 'CHF']).withMessage('Invalid currency'),
    
    body('provider')
        .trim()
        .notEmpty().withMessage('Provider is required')
        .matches(/^[A-Z]+$/).withMessage('Provider must contain only uppercase letters')
        .isIn(['SWIFT', 'SEPA', 'ACH', 'WIRE']).withMessage('Invalid provider'),
    
    body('payeeAccountNumber')
        .trim()
        .notEmpty().withMessage('Payee account number is required')
        .matches(/^[A-Z0-9]{8,34}$/).withMessage('Payee account number must be alphanumeric and between 8-34 characters')
        .toUpperCase(),
    
    body('payeeName')
        .trim()
        .notEmpty().withMessage('Payee name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Payee name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s'-]+$/).withMessage('Payee name can only contain letters, spaces, hyphens, and apostrophes'),
    
    body('swiftCode')
        .trim()
        .notEmpty().withMessage('SWIFT code is required')
        .matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/).withMessage('Invalid SWIFT/BIC code format (8 or 11 characters)')
        .toUpperCase(),
    
    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
        .matches(/^[a-zA-Z0-9\s.,!?'-]*$/).withMessage('Notes contain invalid characters'),
    
    exports.handleValidationErrors
];

