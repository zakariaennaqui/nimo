import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import Car from '../models/carModel';
import { cloudinary } from '../config/cloudinary';
import mongoose from 'mongoose';

// Define our custom request type that properly extends Express Request
interface AuthRequest extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
  user?: {
    id: string;
    role: string;
  };
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

// Helper function to safely get files array from request
const getFilesArray = (req: AuthRequest): Express.Multer.File[] => {
  if (!req.files) return [];
  if (Array.isArray(req.files)) return req.files;
  return Object.values(req.files).flat();
};

// Helper function to parse car data from request
const parseCarData = (req: AuthRequest) => {
  const carData: any = { ...req.body };
  
  // Set owner to current user
  if (req.user?.id) {
    carData.owner = req.user.id;
  }

  // Handle uploaded images
  const files = getFilesArray(req);
  if (files.length > 0) {
    carData.images = files.map((file: any) => file.path);
  }

  // Parse specs
  if (req.body.specs) {
    try {
      carData.specs = typeof req.body.specs === 'string' 
        ? JSON.parse(req.body.specs) 
        : req.body.specs;
    } catch (e) {
      carData.specs = {
        passengers: req.body['specs[passengers]'],
        luggage: req.body['specs[luggage]'],
        range: req.body['specs[range]'],
        fuelType: req.body['specs[fuelType]']
      };
    }
  }

  // Convert boolean fields
  if (req.body.airConditioning !== undefined) {
    carData.airConditioning = req.body.airConditioning === 'true';
  }

  // Convert numeric fields
  const numericFields = ['passengers', 'doors', 'price'];
  numericFields.forEach(field => {
    if (req.body[field]) {
      carData[field] = Number(req.body[field]);
    }
  });

  // Convert features to array
  if (req.body.features) {
    carData.features = Array.isArray(req.body.features)
      ? req.body.features
      : [req.body.features];
  }

  return carData;
};

// Get all cars
export const getAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    // Build query object
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Car.find(JSON.parse(queryStr)).populate('owner', 'name email profileImage');

    // Sorting
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const cars = await query;

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

export const getCar = async (req: Request, res: Response): Promise<void> => {
  try {
    // Trim any whitespace or newline characters from the ID
    const carId = req.params.id.trim();
    
    // Validate if the ID is in the proper ObjectId format
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid car ID format' 
      });
      return;
    }
    
    const car = await Car.findById(carId).populate('owner', 'name email profileImage');
    
    if (!car) {
      res.status(404).json({ success: false, message: 'Car not found' });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Create new car
export const createCar = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const carData = parseCarData(req);
    const car = await Car.create(carData);
    
    res.status(201).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Update car
export const updateCar = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let car = await Car.findById(req.params.id);
    
    if (!car) {
      res.status(404).json({ success: false, message: 'Car not found' });
      return;
    }
    
    // Check ownership
    if (car.owner.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Not authorized to update this car' });
      return;
    }
    
    const carData = parseCarData(req);
    
    // Delete old images if new ones are uploaded
    const files = getFilesArray(req);
    if (files.length > 0) {
      try {
        await Promise.all(
          car.images.map(async (image) => {
            const publicId = image.split('/').pop()?.split('.')[0];
            if (publicId) {
              await cloudinary.uploader.destroy(`car-rental/${publicId}`);
            }
          })
        );
      } catch (error) {
        console.error('Error deleting old images:', error);
      }
    }
    
    car = await Car.findByIdAndUpdate(req.params.id, carData, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Delete car
export const deleteCar = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      res.status(404).json({ success: false, message: 'Car not found' });
      return;
    }
    
    // Check ownership
    if (car.owner.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Not authorized to delete this car' });
      return;
    }
    
    // Delete images from Cloudinary
    try {
      await Promise.all(
        car.images.map(async (image) => {
          const publicId = image.split('/').pop()?.split('.')[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`car-rental/${publicId}`);
          }
        })
      );
    } catch (error) {
      console.error('Error deleting images:', error);
    }
    
    await car.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Get all cars for the current user
export const getUserCars = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const cars = await Car.find({ owner: userId }).populate('owner', 'name email profileImage');
    
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Update car availability
export const updateCarAvailability = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isAvailable, startDate, endDate } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const car = await Car.findOne({ _id: id, owner: userId });

    if (!car) {
      res.status(404).json({ success: false, message: 'Car not found or not owned by user' });
      return;
    }

    // Update availability status
    if (typeof isAvailable === 'boolean') {
      car.isAvailable = isAvailable;
    }

    // Update available dates if provided
    if (startDate && endDate) {
      car.availableDates.push({
        start: new Date(startDate),
        end: new Date(endDate)
      });
    }

    await car.save();
    
    res.status(200).json({
      success: true,
      data: car,
      message: `Car availability updated successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};