// // src/controllers/imageController.ts
// import { Request, Response } from 'express';
// import { cloudinary } from '../config/cloudinary';

// export const uploadImage = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // req.file is added by multer, contains the uploaded file info
//     if (!req.file) {
//        res.status(400).json({ success: false, message: 'No file uploaded' });
//        return;
//     }

//     // Return the Cloudinary details
//      res.status(200).json({
//       success: true,
//       imageUrl: req.file.path,
//       publicId: req.file.filename
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//      res.status(500).json({
//       success: false,
//       message: 'Error uploading image'
//     });
//   }
// };