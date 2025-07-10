import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage with SVG-safe handling
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isSvg = file.mimetype === 'image/svg+xml';
    console.log('Is SVG:', isSvg); // Debug log

    return {
      folder: 'car-rental',
      allowed_formats: ['jpg', 'png', 'jpeg', 'svg', 'webp'],
      ...(isSvg ? {} : {
        transformation: [{ width: 500, height: 300, crop: 'limit' }]
      })
    };
  }
});


// Create multer upload middleware
export const upload = multer({ storage });

// Export cloudinary for direct operations
export { cloudinary };
