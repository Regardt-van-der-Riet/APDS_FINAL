const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app');
const connectDB = require('./config/database');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Check if SSL certificates exist
const sslKeyPath = path.join(__dirname, process.env.SSL_KEY_PATH || './ssl/server.key');
const sslCertPath = path.join(__dirname, process.env.SSL_CERT_PATH || './ssl/server.cert');

if (!fs.existsSync(sslKeyPath) || !fs.existsSync(sslCertPath)) {
    console.error('SSL certificates not found! Please run: npm run generate-cert');
    console.error(`Looking for:\n  Key: ${sslKeyPath}\n  Cert: ${sslCertPath}`);
    process.exit(1);
}

// SSL Options
const sslOptions = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath)
};

// Create HTTPS server
const server = https.createServer(sslOptions, app);

server.listen(PORT, () => {
    console.log(`🔒 Secure server running on https://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🗄️  Database: ${process.env.MONGODB_URI}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});

