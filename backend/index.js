import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import complaintRoutes from './routes/complaintRoute.js';
import studentRoute from './routes/studentRoute.js';
import adminbRoute from './routes/adminRoute.js';

// import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// App initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
connectDB();

// API routes
app.use('/api/student', studentRoute);
app.use('/api/admin', adminRouter);
app.use('/api/complaints', complaintRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Grievana Backend Running');
});

// Error handling middleware
// app.use(notFound);
// app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
