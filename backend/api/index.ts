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

// Middleware - Configure CORS properly
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000', 
    'https://nimo-mu.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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