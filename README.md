# Grievana: Complaint Registration and Management System

## Overview

Grievana is a full-stack web application designed to streamline the process of registering and managing complaints. It provides a user-friendly interface for students to submit complaints and a comprehensive dashboard for administrators to track, manage, and resolve them. The project is built with a modern MERN stack, featuring a React frontend and a Node.js/Express backend, with MongoDB for data storage.

## The Problem It Solves

Traditional complaint management systems often suffer from several critical issues:

- **Inefficient Paper-Based Processes:** Manual complaint submission and tracking leads to delays, lost documents, and poor visibility into resolution status
- **Lack of Anonymity:** Students may hesitate to report issues due to fear of retaliation or identification
- **Poor Categorization and Prioritization:** Without automated systems, complaints are often not properly categorized or prioritized based on urgency
- **Limited Analytics:** Administrators lack insights into complaint trends, making it difficult to identify systemic issues
- **No Centralized Management:** Complaints are scattered across different channels, making it hard to get a complete picture

**Grievana addresses these challenges by:**

- **Digital Transformation:** Converting paper-based processes to a modern web application for faster, more reliable complaint submission and tracking
- **Anonymous Submission:** Providing students with the option to submit complaints anonymously, encouraging more honest feedback
- **Automated Intelligence:** Using AI-powered categorization and priority assignment to ensure complaints are handled appropriately
- **Real-Time Analytics:** Offering administrators comprehensive dashboards with charts and statistics to identify patterns and improve institutional response
- **Centralized Platform:** Creating a single, unified system for all complaint management, from submission to resolution
- **Enhanced Security:** Implementing JWT authentication and role-based access control to protect sensitive information
- **Mobile-Friendly Interface:** Ensuring accessibility across devices for better user experience

This system makes complaint management **faster, safer, and more transparent**, ultimately leading to better institutional outcomes and improved student satisfaction.

## Challenges I Ran Into

Building Grievana presented several technical challenges that required creative solutions:

### CORS Configuration Issues
**Problem:** Initial setup had CORS errors preventing the React frontend from communicating with the Express backend during development.
**Solution:** Configured CORS middleware in Express with proper origin settings and credentials handling:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### JWT Token Management for Anonymous Users
**Problem:** The anonymous complaint feature required handling users without traditional authentication while maintaining security.
**Solution:** Implemented conditional authentication middleware that checks for anonymous flags and creates temporary sessions:
```javascript
const protect = (req, res, next) => {
  if (req.body.sendAnonymously) {
    req.user = { isAnonymous: true };
    return next();
  }
  // Normal JWT verification for authenticated users
};
```

### File Upload Security and Storage
**Problem:** Ensuring secure file uploads with proper validation and storage management.
**Solution:** Used Multer with Sharp for image processing and validation:
```javascript
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'));
  }
});
```

### MongoDB Connection Reliability
**Problem:** Database connection drops in production environment affecting application stability.
**Solution:** Implemented connection retry logic and proper error handling:
```javascript
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  retryWrites: true
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
```

### Chart.js Integration with Dynamic Data
**Problem:** Rendering charts with real-time complaint data required proper data formatting and responsive design.
**Solution:** Created reusable chart components with proper data transformation:
```javascript
const chartData = {
  labels: categories.map(cat => cat.name),
  datasets: [{
    data: categories.map(cat => cat.count),
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
  }]
};
```

### Testing Setup with Jest and Supertest
**Problem:** Configuring end-to-end testing for API routes with authentication and database mocking.
**Solution:** Set up test environment with in-memory database and proper cleanup:
```javascript
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterEach(async () => {
  await Complaint.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});
```

These challenges helped improve the codebase's robustness, security, and maintainability, making Grievana more reliable for real-world deployment.

## Key Features

### For Students:
- **User Authentication:** Secure registration and login functionality.
- **Complaint Submission:** Easily register new complaints with details and attachments.
- **Anonymous Complaint Submission:** Option to submit complaints anonymously without revealing user identity.
- **Dashboard:** View the status of submitted complaints (pending, in-progress, resolved).
- **Profile Management:** Update personal information.

### For Administrators:
- **Admin Dashboard:** A central hub for managing the entire system.
- **User Management:** View and manage all registered users.
- **Complaint Management:** Track, update, and categorize all user complaints.
- **Analytics:** Visualize complaint statistics and trends.

## Tech Stack

- **Frontend:**
  - React (with Vite)
  - Axios (for API requests)
  - Chart.js and React-Chartjs-2 (for data visualization)
  - CSS (with potential for a framework like Tailwind CSS or Material-UI)

- **Backend:**
  - Node.js & Express
  - MongoDB (with Mongoose)
  - JSON Web Tokens (JWT) for authentication
  - Multer for file uploads

## Project Structure

The project is organized into two main directories:
- `frontend/`: Contains the React application.
- `backend/`: Contains the Node.js/Express server.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/anup2702/Grievana-Complaint-Reg-Mang
   ```
2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```
3. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Environment Variables:**
   - Create a `.env` file in the `backend` directory and add the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

### Running the Application

1. **Start the backend server:**
   ```sh
   cd backend
   npm start
   ```
2. **Start the frontend development server:**
   ```sh
   cd ../frontend
   npm run dev
   ```

## Testing

The backend includes unit and integration tests using Jest and Supertest.

To run the tests:

```sh
cd backend
npm test
```
