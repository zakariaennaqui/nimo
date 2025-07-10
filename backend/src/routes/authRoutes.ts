import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { 
  register, 
  login, 
  getMe, 
  updateUser, 
  deleteUser,
  updateProfileImage,
  logout,
  forgotPassword,
  verifyResetToken,
  resetPassword
} from '../controllers/authController';
import { upload } from '../config/cloudinary';
import { sendVerificationCode, verifyEmailCode } from '../controllers/verificationController';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Email verification routes
router.post('/send-verification', sendVerificationCode);
router.post('/verify-email', verifyEmailCode);
// For the forgot password feature
router.post('/forgot-password', forgotPassword);
router.get('/verify-reset-token/:token', verifyResetToken);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update', protect, updateUser);
router.put('/update-image', protect, upload.single('profileImage'), updateProfileImage);
router.delete('/delete', protect, deleteUser);
router.post('/logout', protect, logout);

export default router;