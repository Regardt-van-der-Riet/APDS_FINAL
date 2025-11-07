const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

// Route imports
const authRoutes = require('./routes/auth.routes');
const paymentRoutes = require('./routes/payment.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// ========================
// SECURITY MIDDLEWARE
// ========================

// 1. Helmet - Sets various HTTP headers for security
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    frameguard: {
        action: 'deny' // Protects against Clickjacking
    },
    noSniff: true,
    xssFilter: true
}));

// 2. CORS Configuration - Protects against unauthorized domain access
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'https://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 3. Body parser
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent DoS
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 4. Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 5. Prevent parameter pollution
app.use(hpp());

// 6. Rate limiting - Protection against DDoS and brute force (skip in test environment)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => process.env.NODE_ENV === 'test'
});
app.use('/api/', limiter);

// Stricter rate limiting for authentication routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: 'Too many login attempts, please try again after 15 minutes.',
    skipSuccessfulRequests: true,
    skip: () => process.env.NODE_ENV === 'test'
});

// ========================
// ROUTES
// ========================

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running securely over HTTPS'
    });
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', authLimiter, adminRoutes);

// 404 Handler
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Cannot find ${req.originalUrl} on this server`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

module.exports = app;

