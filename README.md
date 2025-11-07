# Secure Customer International Payments Portal
CIRCLECI LINK - https://app.circleci.com/pipelines/github/Regardt-van-der-Riet/APDS_FINAL/10/workflows/55ea2ad1-a3de-4ca4-a236-0a1599e3271a
GITHUB REPO - https://github.com/Regardt-van-der-Riet/APDS_FINAL
SONARCLOUD LINK - https://sonarcloud.io/project/overview?id=Regardt-van-der-Riet_APDS_FINAL
YOUTUBE LINK - https://youtu.be/YZZpnfQ1wl8

## Project Overview

This project is a comprehensive secure banking application designed to facilitate international payment transactions between customers and banking institutions. The application implements enterprise-grade security practices including HTTPS encryption, input validation, authentication mechanisms, and protection against common web vulnerabilities such as SQL injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and Distributed Denial of Service (DDoS) attacks.

The system is built using a modern full-stack JavaScript architecture with a React frontend and Node.js/Express backend, utilizing MongoDB as the database solution. The application has been designed following the OWASP (Open Web Application Security Project) security guidelines and implements multiple layers of security controls to ensure data integrity, confidentiality, and availability.

## Academic Context

This project was developed as part of the APDS7311/w (Advanced Programming and Development Strategies) curriculum. The assignment focuses on implementing secure coding practices, DevSecOps principles, continuous integration and deployment pipelines, and comprehensive testing strategies within a real-world banking application context.

## Technology Stack

### Frontend Technologies
- React 18.2.0: A JavaScript library for building user interfaces
- React Router DOM 6.15.0: Declarative routing for React applications
- Axios 1.5.0: Promise-based HTTP client for making API requests
- React Scripts 5.0.1: Configuration and scripts for Create React App

### Backend Technologies
- Node.js: JavaScript runtime environment
- Express 4.18.2: Fast, unopinionated web framework for Node.js
- MongoDB: NoSQL document-oriented database
- Mongoose 7.5.0: MongoDB object modeling tool

### Security Libraries
- Helmet 7.0.0: Secures Express applications by setting various HTTP headers
- bcryptjs 2.4.3: Library for hashing passwords
- jsonwebtoken 9.0.2: Implementation of JSON Web Tokens for authentication
- express-rate-limit 6.10.0: Rate limiting middleware to prevent brute force attacks
- express-brute 1.0.1: Brute-force protection middleware
- express-validator 7.0.1: Middleware for validating and sanitizing user input
- express-mongo-sanitize 2.2.0: Prevents MongoDB operator injection
- hpp 0.2.3: Protection against HTTP Parameter Pollution attacks
- cors 2.8.5: Cross-Origin Resource Sharing configuration

### Development and Testing Tools
- Jest 29.6.4: JavaScript testing framework
- Supertest 6.3.3: HTTP assertion library for testing APIs
- Nodemon 3.0.1: Utility that monitors for file changes and restarts the server
- Concurrently 8.2.0: Runs multiple commands concurrently

### DevOps and Quality Assurance
- CircleCI: Continuous Integration and Continuous Deployment platform
- SonarQube/SonarCloud: Static code analysis and quality assurance tool

## Project File Structure

The project follows a monorepo structure with separate frontend and backend directories. Below is a detailed explanation of each directory and its contents.

### Root Directory
```
ADPS/
├── .circleci/              Contains CircleCI pipeline configuration
├── backend/                Backend API server and business logic
├── frontend/               React frontend application
├── node_modules/           Root level dependencies
├── .gitignore             Specifies files to ignore in version control
├── package.json           Root package configuration and scripts
├── package-lock.json      Locked versions of root dependencies
└── sonar-project.properties  SonarQube project configuration
```

### Backend Directory Structure

The backend directory contains all server-side code, API endpoints, database models, and security configurations.

```
backend/
├── config/                 Configuration files
│   └── database.js        MongoDB connection configuration
├── controllers/            Request handlers and business logic
│   ├── admin.controller.js      Admin-specific operations
│   ├── auth.controller.js       Authentication and user management
│   └── payment.controller.js    Payment processing logic
├── middleware/             Custom middleware functions
│   ├── admin.middleware.js      Admin role verification
│   ├── auth.middleware.js       JWT token verification
│   └── validation.middleware.js Input validation rules
├── models/                 MongoDB schema definitions
│   ├── Admin.model.js          Admin user schema
│   ├── BruteForce.model.js     Brute force attempt tracking
│   ├── Payment.model.js        Payment transaction schema
│   └── User.model.js           Customer user schema
├── routes/                 API endpoint definitions
│   ├── admin.routes.js         Admin API routes
│   ├── auth.routes.js          Authentication routes
│   └── payment.routes.js       Payment routes
├── scripts/                Utility scripts
│   ├── clearBruteForce.js      Clears brute force attempt records
│   ├── createAdmin.js          Creates admin user accounts
│   ├── createTestUser.js       Creates test user accounts
│   └── generate-ssl-cert.js    Generates SSL certificates
├── ssl/                    SSL/TLS certificates
│   ├── server.cert            SSL certificate file
│   └── server.key             SSL private key file
├── tests/                  Test suites
│   ├── admin.test.js          Admin functionality tests
│   ├── auth.test.js           Authentication tests
│   ├── helpers.test.js        Helper function tests
│   ├── models.test.js         Database model tests
│   ├── payment.test.js        Payment processing tests
│   ├── security.test.js       Security feature tests
│   ├── validation.test.js     Input validation tests
│   └── setup.js               Test environment setup
├── app.js                  Express application configuration
├── server.js               HTTPS server initialization
├── jest.config.js          Jest testing configuration
└── package.json            Backend dependencies and scripts
```

### Frontend Directory Structure

The frontend directory contains the React application, user interface components, and client-side logic.

```
frontend/
├── public/                 Static assets
│   └── index.html         HTML template
├── src/                   Source code
│   ├── components/        Reusable UI components
│   │   ├── Navbar.js         Navigation bar component
│   │   ├── Navbar.css        Navigation bar styles
│   │   └── PrivateRoute.js   Protected route wrapper
│   ├── context/           React context providers
│   │   └── AuthContext.js    Authentication state management
│   ├── pages/             Page components
│   │   ├── AdminDashboard.js  Admin control panel
│   │   ├── Dashboard.js       User dashboard
│   │   ├── Login.js          Login/registration page
│   │   └── Payment.js        Payment form page
│   ├── services/          External service integrations
│   │   └── api.js            API client configuration
│   ├── utils/             Utility functions
│   │   └── validation.js     Client-side validation helpers
│   ├── App.js             Main application component
│   ├── App.css            Application styles
│   ├── index.js           Application entry point
│   └── index.css          Global styles
└── package.json           Frontend dependencies and scripts
```

## Software Requirements

Before beginning the installation process, you must install the following software on your computer. Each installation will be explained step by step.

### Required Software
1. Node.js (version 18.x or higher)
2. MongoDB Community Server (version 6.0 or higher)
3. Git version control system
4. A code editor (Visual Studio Code is recommended)
5. A web browser (Google Chrome or Mozilla Firefox recommended)
6. MongoDB Compass (optional but recommended for database management)

## Detailed Installation Instructions

This section provides comprehensive step-by-step instructions for installing all required software. These instructions assume no prior knowledge of software development or system administration.

### Step 1: Installing Node.js

Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a web browser. It is essential for running both the frontend and backend of this application.

#### For Windows Users

1. Open your web browser and navigate to https://nodejs.org/
2. You will see two download options: LTS (Long Term Support) and Current. Click the button labeled "LTS" which is recommended for most users
3. Once the download completes, locate the downloaded file in your Downloads folder. It will be named something like "node-v18.x.x-x64.msi"
4. Double-click the installer file to begin installation
5. The Node.js Setup Wizard will appear. Click "Next" to continue
6. Read and accept the license agreement by checking the box, then click "Next"
7. Choose the installation location. The default location is usually fine. Click "Next"
8. On the "Custom Setup" page, leave all options as default and click "Next"
9. On the "Tools for Native Modules" page, you can leave the checkbox unchecked. Click "Next"
10. Click "Install" to begin the installation process
11. Wait for the installation to complete, then click "Finish"

#### For macOS Users

1. Open your web browser and navigate to https://nodejs.org/
2. Click the "LTS" (Long Term Support) download button
3. Once downloaded, locate the file in your Downloads folder. It will be named something like "node-v18.x.x.pkg"
4. Double-click the installer package
5. Follow the installation wizard, clicking "Continue" through the introduction screens
6. Accept the license agreement
7. Select the installation location (the default is recommended)
8. Click "Install" and enter your administrator password when prompted
9. Wait for installation to complete and click "Close"

#### For Linux Users

1. Open a terminal window
2. Update your package manager by running: `sudo apt update`
3. Install Node.js by running: `sudo apt install nodejs`
4. Install npm (Node Package Manager) by running: `sudo apt install npm`
5. Verify installation by running: `node --version` and `npm --version`

#### Verifying Node.js Installation

1. Open a command prompt (Windows) or terminal (macOS/Linux)
   - On Windows: Press Windows key + R, type "cmd", and press Enter
   - On macOS: Press Command + Space, type "terminal", and press Enter
   - On Linux: Press Ctrl + Alt + T
2. Type the following command and press Enter: `node --version`
3. You should see output similar to "v18.17.0" indicating Node.js is installed
4. Type the following command and press Enter: `npm --version`
5. You should see output similar to "9.6.7" indicating npm is installed

### Step 2: Installing MongoDB

MongoDB is a document-oriented database that stores data in flexible, JSON-like documents. This application uses MongoDB to store user information, payment records, and administrative data.

#### For Windows Users

1. Navigate to https://www.mongodb.com/try/download/community in your web browser
2. On the MongoDB Community Server download page, ensure the following selections:
   - Version: Select the latest version (7.0 or higher)
   - Platform: Windows
   - Package: msi
3. Click the "Download" button
4. Once downloaded, locate the file in your Downloads folder. It will be named something like "mongodb-windows-x86_64-7.0.x.msi"
5. Double-click the installer to begin installation
6. Click "Next" on the welcome screen
7. Accept the End-User License Agreement and click "Next"
8. Select "Complete" installation type and click "Next"
9. On the "Service Configuration" screen, keep the default settings:
   - Install MongoDB as a Service: Checked
   - Service Name: MongoDB
   - Data Directory: C:\Program Files\MongoDB\Server\7.0\data\
   - Log Directory: C:\Program Files\MongoDB\Server\7.0\log\
10. Click "Next"
11. Optionally install MongoDB Compass (recommended). Keep the checkbox selected and click "Next"
12. Click "Install" to begin the installation
13. Wait for the installation to complete
14. Click "Finish"

#### For macOS Users

1. Open Terminal (Command + Space, type "terminal", press Enter)
2. Install Homebrew if not already installed by running:
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Update Homebrew by running: `brew update`
4. Install MongoDB by running: `brew install mongodb-community`
5. Start MongoDB as a service by running: `brew services start mongodb-community`

#### For Linux Users (Ubuntu/Debian)

1. Open a terminal window
2. Import the MongoDB public GPG key by running:
   ```
   curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
   ```
3. Create a list file for MongoDB by running:
   ```
   echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```
4. Reload the package database: `sudo apt-get update`
5. Install MongoDB: `sudo apt-get install -y mongodb-org`
6. Start MongoDB: `sudo systemctl start mongod`
7. Enable MongoDB to start on boot: `sudo systemctl enable mongod`

#### Verifying MongoDB Installation

1. Open a command prompt or terminal
2. Type: `mongod --version` and press Enter
3. You should see version information confirming MongoDB is installed

### Step 3: Installing Git

Git is a version control system that tracks changes to files and allows you to download (clone) the project code from GitHub.

#### For Windows Users

1. Navigate to https://git-scm.com/download/win in your web browser
2. The download should start automatically. If not, click the download link for the latest version
3. Once downloaded, locate the installer in your Downloads folder
4. Double-click the installer to begin installation
5. Click "Next" through the setup wizard, keeping all default options selected
6. Choose your preferred text editor (Visual Studio Code is recommended if installed)
7. When asked about adjusting your PATH environment, select "Git from the command line and also from 3rd-party software"
8. Continue clicking "Next" through the remaining options, keeping defaults
9. Click "Install" and wait for completion
10. Click "Finish"

#### For macOS Users

1. Open Terminal
2. Type `git --version` and press Enter
3. If Git is not installed, a dialog will appear asking if you want to install developer tools. Click "Install"
4. Alternatively, install Git using Homebrew: `brew install git`

#### For Linux Users

1. Open a terminal
2. Update package list: `sudo apt update`
3. Install Git: `sudo apt install git`

#### Verifying Git Installation

1. Open a command prompt or terminal
2. Type: `git --version` and press Enter
3. You should see output similar to "git version 2.x.x"

### Step 4: Installing Visual Studio Code (Optional but Recommended)

Visual Studio Code is a free, powerful code editor that makes it easier to view and edit the project files.

#### For All Operating Systems

1. Navigate to https://code.visualstudio.com/
2. Click the download button for your operating system
3. Once downloaded, run the installer
4. Follow the installation wizard, accepting default options
5. On Windows, ensure the following options are checked:
   - Add "Open with Code" action to Windows Explorer file context menu
   - Add "Open with Code" action to Windows Explorer directory context menu
   - Add to PATH
6. Complete the installation

### Step 5: Installing MongoDB Compass (Optional but Recommended)

MongoDB Compass is a graphical user interface for MongoDB that makes it easier to view and manage your database without using command-line tools.

1. Navigate to https://www.mongodb.com/try/download/compass
2. Select your operating system
3. Click "Download"
4. Run the installer once downloaded
5. Follow the installation wizard

## Project Setup and Configuration

After installing all required software, follow these steps to set up the project on your local machine.

### CRITICAL SETUP CHECKLIST

Before you can run and use the application, you MUST complete ALL of the following steps in order:

1. Clone the repository from GitHub
2. Install all project dependencies (npm packages)
3. Generate SSL certificates for HTTPS
4. Create the `.env` configuration file with database connection settings
5. Verify MongoDB is running
6. Run the admin creation script (creates admin account with username: admin, password: Admin@123)
7. Run the user creation script (creates customer account with username: johnsmith, password: Password@123)
8. Start the backend and frontend servers
9. Open your browser and log in using the credentials from steps 6 and 7

Steps 6 and 7 are REQUIRED. Without these accounts, you will not be able to log in or use any features of the application.

### Step 1: Clone the Repository from GitHub

Cloning means downloading a complete copy of the project code to your computer.

1. Open a command prompt (Windows) or terminal (macOS/Linux)
2. Navigate to the location where you want to store the project. For example:
   - On Windows: `cd C:\Users\YourUsername\Documents`
   - On macOS/Linux: `cd ~/Documents`
3. Clone the repository by typing the following command and pressing Enter:
   ```
   git clone https://github.com/Regardt-van-der-Riet/APDS_FINAL.git
   ```
4. Wait for the download to complete. You will see progress messages as files are downloaded
5. Once complete, navigate into the project directory:
   ```
   cd APDS_FINAL
   ```

### Step 2: Install Project Dependencies

Dependencies are external libraries and packages that the project needs to function. npm (Node Package Manager) will download and install these automatically.

#### Installing All Dependencies at Once

From the root directory of the project (APDS_FINAL), run the following command:

```
npm run install-all
```

This command will install dependencies for the root project, the backend, and the frontend in sequence. The process may take several minutes depending on your internet connection speed.

#### Alternative: Installing Dependencies Separately

If the above command does not work, you can install dependencies manually for each part of the project:

1. Install root dependencies:
   ```
   npm install
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   cd ..
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   cd ..
   ```

### Step 3: Generate SSL Certificates

SSL (Secure Sockets Layer) certificates are required for HTTPS encryption, which protects data transmitted between the client and server. This project requires SSL certificates to run.

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Generate the SSL certificates by running:
   ```
   npm run generate-cert
   ```

3. You will see a message indicating that SSL certificates have been generated successfully. The certificates will be stored in the `backend/ssl/` directory
4. Return to the root directory:
   ```
   cd ..
   ```

Note: The generated certificates are self-signed and should only be used for development purposes. Production deployments require certificates from a trusted Certificate Authority.

### Step 4: MongoDB Database Configuration

The application needs to connect to a MongoDB database. You must create a configuration file that tells the application where to find the database and how to connect to it.

#### Creating the Environment Configuration File

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a new file named `.env` in the backend directory. You can do this in several ways:
   - Using a text editor: Right-click in the backend folder, select "New > Text Document", name it `.env` (note the dot at the beginning)
   - Using command line on Windows: `type nul > .env`
   - Using command line on macOS/Linux: `touch .env`

3. Open the `.env` file in a text editor (Visual Studio Code or Notepad)

4. Add the following configuration lines to the file:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/apds_payments
JWT_SECRET=your_very_long_and_secure_random_string_here_at_least_32_characters
JWT_EXPIRE=7d
CORS_ORIGIN=https://localhost:3000
SSL_KEY_PATH=./ssl/server.key
SSL_CERT_PATH=./ssl/server.cert
```

5. Replace `your_very_long_and_secure_random_string_here_at_least_32_characters` with a randomly generated secure string. You can generate a random string by:
   - Visiting https://www.random.org/strings/ and generating a random string
   - Using a password generator
   - Typing a long random sequence of letters, numbers, and special characters

6. Save the file and close it

#### Understanding the Environment Variables

- `NODE_ENV`: Specifies the environment (development, production, or test)
- `PORT`: The port number on which the backend server will run
- `MONGODB_URI`: The connection string for MongoDB. The format is `mongodb://localhost:27017/database_name`
  - `localhost`: The MongoDB server location (on your local machine)
  - `27017`: The default MongoDB port
  - `apds_payments`: The name of the database (will be created automatically)
- `JWT_SECRET`: A secret key used to encrypt and decrypt authentication tokens. Must be kept confidential
- `JWT_EXPIRE`: How long authentication tokens remain valid before expiring
- `CORS_ORIGIN`: Which frontend URL is allowed to access the backend API
- `SSL_KEY_PATH`: Location of the SSL private key file
- `SSL_CERT_PATH`: Location of the SSL certificate file

### Step 5: Initialize the Database and Create Users

This is a CRITICAL step. Before you can use the application, you MUST populate the database with at least one admin account and one customer account. Without these accounts, you will not be able to log in to the application.

#### Verifying MongoDB is Running

Before creating users, ensure that MongoDB is running on your system.

1. Open a new command prompt or terminal window
2. Check if MongoDB is running:
   - On Windows: Open Task Manager (Ctrl + Shift + Esc), go to the "Services" tab, and look for "MongoDB"
   - On macOS: Run `brew services list` and check if mongodb-community is started
   - On Linux: Run `sudo systemctl status mongod`

3. If MongoDB is not running, start it:
   - On Windows: MongoDB usually starts automatically as a service. If not, search for "Services" in the Start menu, find "MongoDB", right-click it, and select "Start"
   - On macOS: Run `brew services start mongodb-community`
   - On Linux: Run `sudo systemctl start mongod`

4. Verify MongoDB is accepting connections:
   - Open a command prompt or terminal
   - Type `mongosh` (or `mongo` on older versions) and press Enter
   - If you see a MongoDB shell prompt, MongoDB is running correctly
   - Type `exit` to close the MongoDB shell

#### Creating an Admin User (REQUIRED)

The application includes an automated script that creates an administrative user account with pre-configured credentials. You MUST run this script to create an admin account that can access the admin dashboard.

1. Ensure you are in the backend directory. If you are in the root project directory, navigate to backend:
   ```
   cd backend
   ```

2. Run the admin creation script:
   ```
   node scripts/createAdmin.js
   ```

3. The script will automatically create an admin user with the following credentials:
   - Username: `admin`
   - Password: `Admin@123`
   - Email: `admin@apdsbanking.com`
   - Role: `super_admin`

4. After running the script, you should see output similar to this:
   ```
   MongoDB connected successfully
   Admin user created successfully!
   Username: admin
   Password: Admin@123
   Email: admin@apdsbanking.com
   Role: super_admin
   IMPORTANT: Change the password after first login!
   ```

5. IMPORTANT NOTES:
   - If you see "Admin user already exists", this means the admin account has already been created and you can skip this step
   - Write down or save these credentials in a secure location as you will need them to log in
   - The password `Admin@123` is a default password for testing purposes
   - In a production environment, you should change this password immediately after first login

#### Creating a Customer User (REQUIRED)

The application also includes a script to create a test customer user account. You MUST run this script to create at least one customer account for testing the payment functionality.

1. Ensure you are still in the backend directory:
   ```
   cd backend
   ```
   (Skip this if you are already in the backend directory from the previous step)

2. Run the test user creation script:
   ```
   node scripts/createTestUser.js
   ```

3. The script will automatically create a customer user with the following credentials:
   - Full Name: `John Smith`
   - Username: `johnsmith`
   - Password: `Password@123`
   - ID Number: `8905125432109`
   - Account Number: `9876543210123`

4. After running the script, you should see output similar to this:
   ```
   MongoDB connected successfully
   Test user created successfully!
   Username: johnsmith
   Password: Password@123
   Account Number: 9876543210123
   ```

5. IMPORTANT NOTES:
   - If you see "User johnsmith already exists", the script will automatically delete and recreate the user with the default credentials
   - Write down or save these credentials as you will need them to log in as a customer
   - The password `Password@123` is for testing purposes only

#### Understanding the Two User Types

The application has two distinct user types with different access levels:

1. ADMIN USER
   - Can access the admin dashboard at the `/admin` route
   - Can view all pending payments from all customers
   - Can verify and approve payment transactions
   - Can view all registered customer accounts
   - Cannot create payment transactions

2. CUSTOMER USER
   - Can access the customer dashboard at the `/dashboard` route
   - Can create new international payment transactions
   - Can view their own payment history
   - Can see the status of their submitted payments
   - Cannot access admin functions

#### Verification That Users Were Created Successfully

To verify that the users were created successfully in the database:

Method 1: Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Click on the `apds_payments` database in the left sidebar
4. You should see collections named `admins` and `users`
5. Click on the `admins` collection - you should see one document with username "admin"
6. Click on the `users` collection - you should see one document with username "johnsmith"

Method 2: Using MongoDB Shell (Command Line)
1. Open a command prompt or terminal
2. Type `mongosh` (or `mongo` on older versions) and press Enter
3. Type `use apds_payments` and press Enter
4. Type `db.admins.find()` and press Enter - you should see the admin user document
5. Type `db.users.find()` and press Enter - you should see the customer user document
6. Type `exit` to close the MongoDB shell

#### What to Do If Script Execution Fails

If you encounter errors when running the scripts, try the following troubleshooting steps:

1. Verify MongoDB is running (see "Verifying MongoDB is Running" above)

2. Check your `.env` file in the backend directory to ensure `MONGODB_URI` is correctly set:
   ```
   MONGODB_URI=mongodb://localhost:27017/apds_payments
   ```

3. Ensure you installed all backend dependencies:
   ```
   cd backend
   npm install
   ```

4. Check for error messages:
   - "MongoDB connection error" - MongoDB is not running or connection string is incorrect
   - "Module not found" - Dependencies are not installed
   - "Cannot find module" - You are not in the correct directory

5. If problems persist, manually check MongoDB:
   ```
   mongosh
   show dbs
   use apds_payments
   show collections
   exit
   ```

#### Creating Additional Test Users (Optional)

If you want to create additional test users with different credentials, you can modify the `createTestUser.js` script:

1. Navigate to `backend/scripts/createTestUser.js`
2. Edit the script with different values:
   - Change `fullName` to a different name
   - Change `idNumber` to a different 13-digit number
   - Change `accountNumber` to a different 10-16 digit number
   - Change `username` to a different username
   - Change `password` to a different password
3. Save the file and run `node scripts/createTestUser.js` again

Remember: Each username, ID number, and account number must be unique in the database.

#### Quick Reference: Default Login Credentials

After running both scripts, you will have the following accounts ready to use:

ADMIN ACCOUNT
```
Username: admin
Password: Admin@123
Access: Admin Dashboard
URL: https://localhost:3000/admin
```

CUSTOMER ACCOUNT
```
Username: johnsmith
Password: Password@123
Access: Customer Dashboard
URL: https://localhost:3000/dashboard
```

IMPORTANT: Save these credentials as you will need them to log in and test the application.

### Step 6: Running the Application

The application consists of two parts that must run simultaneously: the backend API server and the frontend React application.

#### Option 1: Running Both Frontend and Backend Together

From the root directory of the project (APDS_FINAL), run:

```
npm run dev
```

This command will start both the backend server and the frontend application at the same time. You will see console output from both services.

#### Option 2: Running Frontend and Backend Separately

If you prefer to run the services in separate terminal windows:

1. Open a command prompt or terminal, navigate to the project directory, and start the backend:
   ```
   cd backend
   npm start
   ```

2. Open a second command prompt or terminal, navigate to the project directory, and start the frontend:
   ```
   cd frontend
   npm start
   ```

   Note: On Windows, you may need to use `npm run start:windows` instead

#### Accessing the Application

1. The backend API server will be running at: https://localhost:5000
2. The frontend application will be running at: https://localhost:3000

3. Open your web browser and navigate to: https://localhost:3000

4. You will see a security warning because the SSL certificate is self-signed. This is normal for development:
   - On Chrome: Click "Advanced" then "Proceed to localhost (unsafe)"
   - On Firefox: Click "Advanced" then "Accept the Risk and Continue"
   - On Safari: Click "Show Details" then "visit this website"

5. You should now see the application login/registration page

#### Logging In to the Application

Now that the application is running, you need to log in using the accounts you created in Step 5.

LOGGING IN AS A CUSTOMER USER:

1. On the login page at https://localhost:3000, enter the following credentials:
   - Username: `johnsmith`
   - Password: `Password@123`

2. Click the "Login" button

3. After successful login, you will be redirected to the customer dashboard at https://localhost:3000/dashboard

4. From the dashboard, you can:
   - Create new international payment transactions
   - View your payment history
   - See the status of submitted payments

LOGGING IN AS AN ADMIN USER:

1. If you are currently logged in as a customer, click "Logout" in the navigation bar

2. On the login page at https://localhost:3000, enter the following credentials:
   - Username: `admin`
   - Password: `Admin@123`

3. Click the "Login" button

4. After successful login, you will be redirected to the admin dashboard at https://localhost:3000/admin

5. From the admin dashboard, you can:
   - View all pending payment transactions from all customers
   - Verify and approve payments
   - View all registered customer accounts
   - Monitor system activity

IMPORTANT NOTES ABOUT LOGGING IN:

1. The username and password are case-sensitive. Make sure you type them exactly as shown
2. If you see "Invalid credentials" error, double-check that:
   - You ran both the createAdmin.js and createTestUser.js scripts successfully
   - MongoDB is running
   - You typed the username and password correctly
3. Each user type (customer vs admin) has access to different features
4. You cannot access admin features when logged in as a customer, and vice versa
5. The authentication token expires after 7 days, after which you will need to log in again

#### Stopping the Application

To stop the application:
1. Go to the command prompt or terminal window where the application is running
2. Press `Ctrl + C` (on Windows/Linux) or `Command + C` (on macOS)
3. If prompted to terminate the batch job, type `Y` and press Enter

## CircleCI Configuration and Setup

CircleCI is a continuous integration and continuous deployment platform that automatically builds, tests, and validates your code whenever changes are made. This section explains how to set up CircleCI for this project.

### Understanding the CI/CD Pipeline

The project includes a CircleCI configuration file located at `.circleci/config.yml`. This file defines a DevSecOps pipeline that includes:

1. Security checks: Runs npm audit to identify vulnerable dependencies
2. Backend build and test: Validates backend code and runs tests
3. Frontend build and test: Validates frontend code and builds production assets
4. Code quality analysis: Integrates with SonarQube for static code analysis
5. Dependency checks: Identifies outdated packages
6. SSL validation: Ensures SSL certificates are properly configured

### Setting Up CircleCI

#### Step 1: Create a CircleCI Account

1. Navigate to https://circleci.com/ in your web browser
2. Click "Sign Up" in the top right corner
3. Choose "Sign up with GitHub" to connect your GitHub account
4. Authorize CircleCI to access your GitHub repositories
5. Complete your profile information

#### Step 2: Add Your Project to CircleCI

1. After logging in, you will see your CircleCI dashboard
2. Click "Projects" in the left sidebar
3. Find your repository "APDS_FINAL" in the list
4. Click "Set Up Project" next to your repository
5. CircleCI will detect the `.circleci/config.yml` file automatically
6. Click "Start Building"
7. CircleCI will begin running your pipeline

#### Step 3: Configure Environment Variables

The pipeline requires certain environment variables to function properly, particularly for SonarQube integration.

1. In the CircleCI dashboard, go to your project
2. Click on "Project Settings" (gear icon)
3. Click "Environment Variables" in the left sidebar
4. Add the following environment variables by clicking "Add Environment Variable":

   Variable Name: `SONAR_TOKEN`
   Value: (You will get this from SonarQube setup in the next section)

   Variable Name: `SONAR_PROJECT_KEY`
   Value: `APDS_FINAL`

   Variable Name: `SONAR_ORGANIZATION`
   Value: `regardt-van-der-riet` (or your SonarCloud organization)

#### Understanding the Pipeline Workflow

When you push code to GitHub, CircleCI will automatically:

1. Check out your code from the repository
2. Install all dependencies
3. Run security audits on both frontend and backend
4. Execute all tests
5. Build the frontend for production
6. Run SonarQube analysis for code quality
7. Validate SSL configuration

You can view the progress and results of each step in the CircleCI dashboard.

## SonarQube Configuration and Setup

SonarQube is a code quality and security analysis tool that identifies bugs, code smells, and security vulnerabilities. This project uses SonarCloud, the cloud-based version of SonarQube.

### Understanding Code Quality Analysis

The project includes a SonarQube configuration file (`sonar-project.properties`) that defines:

- Project identification and metadata
- Source code paths to analyze
- Files and directories to exclude from analysis
- Test coverage report locations
- Language settings
- Code quality standards

### Setting Up SonarCloud

#### Step 1: Create a SonarCloud Account

1. Navigate to https://sonarcloud.io/ in your web browser
2. Click "Log in" or "Start Free" in the top right corner
3. Choose "With GitHub" to connect with your GitHub account
4. Authorize SonarCloud to access your GitHub account
5. Complete your organization setup

#### Step 2: Import Your Project

1. After logging in, click the "+" icon in the top right
2. Select "Analyze new project"
3. Select your GitHub organization
4. Find and select the "APDS_FINAL" repository
5. Click "Set Up"

#### Step 3: Configure the Project

1. Choose "With CircleCI" as your CI method (or "Other" if you prefer manual setup)
2. SonarCloud will display your project key and organization
3. Copy the project key and organization name (you will need these for CircleCI)

#### Step 4: Generate an Authentication Token

1. In SonarCloud, click your user icon in the top right
2. Select "My Account"
3. Click on the "Security" tab
4. Under "Generate Tokens":
   - Enter a name: "APDS_FINAL_CircleCI"
   - Select an expiration time (choose "No expiration" for continuous use)
   - Click "Generate"
5. Copy the generated token immediately (you will not be able to see it again)
6. Add this token to CircleCI as the `SONAR_TOKEN` environment variable (see CircleCI setup)

#### Step 5: Configure Quality Gates

Quality Gates are conditions that your code must meet to pass the quality check.

1. In SonarCloud, go to your project dashboard
2. Click "Project Settings" at the bottom left
3. Click "Quality Gate" in the left menu
4. Select the quality gate you want to use (the default "Sonar way" is recommended)
5. You can customize the conditions if needed:
   - Coverage: Percentage of code covered by tests
   - Duplications: Percentage of duplicated code
   - Maintainability Rating: Technical debt ratio
   - Reliability Rating: Bug density
   - Security Rating: Vulnerability density

### Running SonarQube Analysis Locally

You can also run SonarQube analysis on your local machine without using CircleCI.

#### Installing SonarScanner

1. Download SonarScanner from https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/
2. Extract the downloaded archive to a location on your computer
3. Add the `bin` directory to your system PATH:
   - On Windows: Search for "Environment Variables", edit Path, add the sonar-scanner bin directory
   - On macOS/Linux: Add to ~/.bash_profile or ~/.zshrc: `export PATH=$PATH:/path/to/sonar-scanner/bin`

#### Running the Analysis

1. Open a command prompt or terminal
2. Navigate to your project directory:
   ```
   cd path/to/APDS_FINAL
   ```

3. Run the SonarScanner with your authentication token:
   ```
   sonar-scanner -Dsonar.login=YOUR_SONAR_TOKEN
   ```

4. Wait for the analysis to complete
5. View the results in SonarCloud by visiting: https://sonarcloud.io/dashboard?id=APDS_FINAL

### Understanding SonarQube Results

After analysis, SonarCloud provides several metrics:

1. Bugs: Issues that represent errors in code that could cause runtime failures
2. Vulnerabilities: Security issues that could be exploited by attackers
3. Code Smells: Maintainability issues that make code harder to understand or modify
4. Coverage: Percentage of code executed by automated tests
5. Duplications: Blocks of code that are repeated
6. Security Hotspots: Sensitive code that requires manual review

Each issue is categorized by severity:
- Blocker: Must be fixed immediately
- Critical: Should be fixed as soon as possible
- Major: Should be reviewed and fixed
- Minor: Cosmetic issues with low impact
- Info: Informational notices

## Testing the Application

The project includes comprehensive test suites for both backend and frontend components.

### Running Backend Tests

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Run all tests with coverage:
   ```
   npm test
   ```

3. View the coverage report:
   - Open `backend/coverage/lcov-report/index.html` in your web browser
   - This shows which parts of the code are tested and which are not

### Running Frontend Tests

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Run tests:
   ```
   npm test
   ```

3. Press `a` to run all tests, or `q` to quit

### Running All Tests

From the root directory, you can run all tests for both frontend and backend:

```
npm test
```

## Application Features and Functionality

### User Registration and Authentication

The application implements secure user registration and authentication with the following features:

1. Password hashing using bcrypt with 12 salt rounds
2. JWT (JSON Web Token) based authentication
3. Token expiration after 7 days
4. Brute force protection with rate limiting
5. Input validation and sanitization

Users must provide:
- Full name (2-100 characters, letters only)
- ID number (exactly 13 digits)
- Account number (10-16 digits)
- Username (3-30 characters, lowercase alphanumeric)
- Password (minimum 8 characters)

### Payment Processing

The payment system allows users to create international payment transactions with:

1. Support for multiple currencies: USD, EUR, GBP, ZAR, JPY, AUD, CAD, CHF
2. Multiple payment providers: SWIFT, SEPA, ACH, WIRE
3. Comprehensive validation of:
   - Payee account numbers (IBAN format)
   - SWIFT/BIC codes
   - Payment amounts (0.01 to 1,000,000)
   - Payee names
4. Automatic transaction reference generation
5. Payment status tracking (pending, verified, processed, completed, failed, cancelled)

### Admin Dashboard

Administrators have access to additional functionality:

1. View all pending payments
2. Verify and approve payments
3. View all user accounts
4. Monitor system activity
5. Access transaction history

### Security Features

The application implements multiple layers of security:

1. HTTPS encryption for all communications
2. Helmet middleware for HTTP header security
3. CORS (Cross-Origin Resource Sharing) protection
4. Rate limiting to prevent DDoS attacks
5. Brute force protection for authentication endpoints
6. Input validation and sanitization
7. MongoDB injection prevention
8. HTTP Parameter Pollution prevention
9. JWT-based stateless authentication
10. Password hashing with bcrypt

## Troubleshooting Common Issues

### Issue: MongoDB Connection Failed

Solution:
1. Verify MongoDB is running
2. Check that the MONGODB_URI in your `.env` file is correct
3. Ensure no other application is using port 27017
4. Try restarting MongoDB service

### Issue: SSL Certificate Errors

Solution:
1. Ensure SSL certificates have been generated using `npm run generate-cert`
2. Check that the `backend/ssl/` directory contains `server.cert` and `server.key`
3. Verify the SSL_KEY_PATH and SSL_CERT_PATH in your `.env` file are correct

### Issue: Port Already in Use

Solution:
1. Change the PORT in your `.env` file to a different number (e.g., 5001)
2. Update the proxy in `frontend/package.json` to match the new port
3. Or find and stop the process using the port:
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
   - macOS/Linux: `lsof -ti:5000 | xargs kill -9`

### Issue: Dependencies Installation Fails

Solution:
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` folders and `package-lock.json` files
3. Run `npm install` again
4. If errors persist, check your internet connection

### Issue: Frontend Cannot Connect to Backend

Solution:
1. Verify both frontend and backend are running
2. Check that the proxy setting in `frontend/package.json` matches your backend URL
3. Ensure CORS_ORIGIN in backend `.env` file matches your frontend URL
4. Check browser console for specific error messages

### Issue: SonarQube Analysis Fails

Solution:
1. Verify your SONAR_TOKEN is correctly set in CircleCI
2. Check that your project key and organization are correct
3. Ensure the `sonar-project.properties` file has not been modified incorrectly
4. Check SonarCloud project settings

## Security Best Practices

When deploying this application to production, consider the following security enhancements:

1. Use environment-specific configuration files
2. Obtain SSL certificates from a trusted Certificate Authority
3. Implement proper logging and monitoring
4. Set up database backups
5. Configure firewall rules to restrict access
6. Use strong, unique passwords for all accounts
7. Regularly update dependencies to patch security vulnerabilities
8. Implement additional rate limiting for production environments
9. Use a reverse proxy (nginx or Apache) in front of the application
10. Enable MongoDB authentication and authorization
11. Implement audit logging for all transactions
12. Set up intrusion detection systems
13. Conduct regular security assessments and penetration testing

## Academic References and Security Standards

This project adheres to industry-standard security practices and guidelines including:

1. OWASP Top 10 Web Application Security Risks
   - https://owasp.org/www-project-top-ten/
2. OWASP Secure Coding Practices
   - https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/
3. PCI DSS (Payment Card Industry Data Security Standard)
   - https://www.pcisecuritystandards.org/
4. ISO/IEC 27001 Information Security Management
5. NIST Cybersecurity Framework
   - https://www.nist.gov/cyberframework

## Project Contributors

This project was developed as part of the APDS7311/w Advanced Programming and Development Strategies course.

## Repository Information

Project Repository: https://github.com/Regardt-van-der-Riet/APDS_FINAL

To clone this repository, use the following command:
```
git clone https://github.com/Regardt-van-der-Riet/APDS_FINAL.git
```

## License

This project is developed for academic purposes as part of the APDS7311/w curriculum.

## Conclusion

This comprehensive guide provides all necessary information to install, configure, and run the Secure Customer International Payments Portal. The application demonstrates enterprise-grade security practices, modern web development techniques, and DevSecOps principles through automated testing and continuous integration pipelines.

For additional support or questions regarding the setup process, refer to the official documentation of the respective technologies or consult with your course instructor.

