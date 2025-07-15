# Grievana Project

## Overview
Grievana is a full-stack application designed to manage and track complaints efficiently. The project consists of a React frontend (using Vite) and a Node.js/Express backend with MongoDB for data storage.

## Technologies Used
- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose

## Progress So Far
- **Frontend:**
  - Initialized with Vite and React.
  - Basic project structure set up with components, pages, and sections.
  - ESLint configured for code quality.
  - .gitignore updated to hide sensitive files (e.g., .env).
- **Backend:**
  - Node.js/Express server initialized.
  - MongoDB connection set up using environment variables for security.
  - Basic folder structure: config, controllers, middleware, routes, models.
  - .gitignore created to hide sensitive files (e.g., .env, config.js).

## Security
- Credentials and sensitive configuration are managed using environment variables and are excluded from version control via .gitignore.

## How to Run
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```
2. **Install dependencies:**
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`
3. **Set up environment variables:**
   - Create `.env` files in both frontend and backend directories as needed.
4. **Run the development servers:**
   - Frontend: `npm run dev`
   - Backend: `npm start`

---
Feel free to contribute or suggest improvements!
