import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDb';
import path from 'path';
import authRoutes from './routes/authRoutes';
import carRoutes from './routes/carRoutes';

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

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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

// Start server (only in development)
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;