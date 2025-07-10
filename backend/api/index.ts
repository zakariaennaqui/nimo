import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../src/config/connectDb';
import authRoutes from '../src/routes/authRoutes';
import carRoutes from '../src/routes/carRoutes';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const MONGO_DB_URI = process.env.MONGODB_URI;
if (!MONGO_DB_URI) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}
connectDB(MONGO_DB_URI);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Car Rental API is running!');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

export default app;