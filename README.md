# Grievana: Complaint Registration and Management System

## Overview

Grievana is a full-stack web application designed to streamline the process of registering and managing complaints. It provides a user-friendly interface for students to submit complaints and a comprehensive dashboard for administrators to track, manage, and resolve them. The project is built with a modern MERN stack, featuring a React frontend and a Node.js/Express backend, with MongoDB for data storage.

## Key Features

### For Students:
- **User Authentication:** Secure registration and login functionality.
- **Complaint Submission:** Easily register new complaints with details and attachments.
- **Dashboard:** View the status of submitted complaints (pending, in-progress, resolved).
- **Profile Management:** Update personal information.
- **Contact Admin:** A dedicated section to contact administrators.

### For Administrators:
- **Admin Dashboard:** A central hub for managing the entire system.
- **User Management:** View and manage all registered users.
- **Complaint Management:** Track, update, and categorize all user complaints.
- **Analytics:** Visualize complaint statistics and trends.
- **Contact Messages:** View and respond to messages from users.

## Tech Stack

- **Frontend:**
  - React (with Vite)
  - Axios (for API requests)
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

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.