const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sslDir = path.join(__dirname, '..', 'ssl');

// Create ssl directory if it doesn't exist
if (!fs.existsSync(sslDir)) {
    fs.mkdirSync(sslDir, { recursive: true });
    console.log('✅ Created ssl directory');
}

const keyPath = path.join(sslDir, 'server.key');
const certPath = path.join(sslDir, 'server.cert');

// Check if certificates already exist
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    console.log('⚠️  SSL certificates already exist!');
    console.log('   If you want to regenerate them, delete the files first:');
    console.log(`   - ${keyPath}`);
    console.log(`   - ${certPath}`);
    process.exit(0);
}

try {
    console.log('🔐 Generating self-signed SSL certificate...');
    
    const command = `openssl req -nodes -new -x509 -keyout "${keyPath}" -out "${certPath}" -days 365 -subj "/C=ZA/ST=Gauteng/L=Johannesburg/O=APDS Banking/OU=Development/CN=localhost"`;
    
    execSync(command, { stdio: 'inherit' });
    
    console.log('✅ SSL certificates generated successfully!');
    console.log(`   Key:  ${keyPath}`);
    console.log(`   Cert: ${certPath}`);
    console.log('\n⚠️  Note: These are self-signed certificates for development only.');
    console.log('   Your browser will show a security warning - this is expected.');
    console.log('   For production, use proper SSL certificates from a CA like Let\'s Encrypt.\n');
} catch (error) {
    console.error('❌ Error generating SSL certificates:', error.message);
    console.error('\nMake sure OpenSSL is installed on your system:');
    console.error('  - Windows: Download from https://slproweb.com/products/Win32OpenSSL.html');
    console.error('  - macOS: brew install openssl');
    console.error('  - Linux: sudo apt-get install openssl');
    process.exit(1);
}

