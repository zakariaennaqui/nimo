import express from 'express';
import { 
  createCar, 
  deleteCar, 
  getAllCars, 
  getCar, 
  updateCar,
  getUserCars,
  updateCarAvailability 
} from '../controllers/carController';
import { protect, authorize } from '../middleware/authMiddleware';
import { upload } from '../config/cloudinary';

const carRoutes = express.Router();


carRoutes.get('/', getAllCars);

carRoutes.get('/:id', getCar);

// authorize('renter', 'admin'),
carRoutes.post('/', protect,  upload.array('images', 5), createCar);

carRoutes.put('/:id', protect, authorize('renter', 'admin'), upload.array('images', 5), updateCar);

carRoutes.delete('/:id', protect, authorize('renter', 'admin'), deleteCar);

carRoutes.get('/user/mycars', protect,  getUserCars); //authorize('renter', 'admin'),

carRoutes.patch('/:id/availability', protect, authorize('renter', 'admin'), updateCarAvailability);

export default carRoutes;