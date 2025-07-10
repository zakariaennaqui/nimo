
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/userModel';
import { cloudinary } from '../config/cloudinary';
import Car from '../models/carModel';
import { sendEmail } from '../config/nodeMailer';

// Extend Request interface
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
  file?: Express.Multer.File;
}

// Helper function to generate JWT
const generateToken = (id: string): string => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    { expiresIn: '30d' }
  );
};

// Description    Register user
// EndPoint   POST /api/auth/register
// Access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, phone, isVerified } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Please provide all required fields' });
      return;
    }
    if (!isVerified) {
      res.status(400).json({ success: false, message: 'Please verify your email' });
      return;
    }
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      phone
    }) as { _id: string; name: string; email: string; role: string; profileImage?: string; phone: string };

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Description    Login user
// EndPoint   POST /api/auth/login
// Access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please provide email and password' });
      return;
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password') as {
      [x: string]: any; _id: string; name: string; email: string; role: string; profileImage?: string
    };
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Description    Forgot password - Generate password reset token
// EndPoint   POST /api/auth/forgot-password
// Access  Public
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: 'Please provide an email address' });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Don't reveal whether a user with that email exists for security reasons
    if (!user) {
      res.status(200).json({ 
        success: true, 
        message: 'If a user with that email exists, a password reset link has been sent'
      });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire time (1 hour)
    user.resetPasswordExpire = new Date(Date.now() + 3600000);

    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;
    // Create email message
    const message = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4285f4; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request',
        message,
      });

      res.status(200).json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: 'Email could not be sent'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Description    Verify reset token
// EndPoint   GET /api/auth/verify-reset-token/:token
// Access  Public
export const verifyResetToken = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    // Find user with matching token and valid expiration
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid or expired token' });
      return;
    }

    res.status(200).json({ success: true, message: 'Token is valid' });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Description    Reset password
// EndPoint   POST /api/auth/reset-password
// Access  Public
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      res.status(400).json({ success: false, message: 'Please provide token and new password' });
      return;
    }

    // Password validation
    if (password.length < 8) {
      res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
      return;
    }

    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with matching token and valid expiration
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    }).select('+password');

    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid or expired token' });
      return;
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save user with new password
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Description    Get current user
// EndPoint   GET /api/auth/me
// Access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select('-password');

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Description    Update user profile
// EndPoint   PUT /api/auth/update
// Access  Private
export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const userId = req.user?.id;

    // Find the user to update
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // Update user fields
    if (name) user.name = name;
    if (email) {
      // Check if email is already taken by another user
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        res.status(400).json({ success: false, message: 'Email already in use' });
        return;
      }
      user.email = email;
    }

    // Save updated user
    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Description    Update profile image
// EndPoint   PUT /api/auth/update-image
// Access  Private
export const updateProfileImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!req.file) {
      res.status(400).json({ success: false, message: 'No image uploaded' });
      return;
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'car-rental/profiles',
      width: 500,
      height: 500,
      crop: 'fill'
    });

    // Update profile image
    user.profileImage = result.secure_url;
    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Description    Delete user account
// EndPoint   DELETE /api/auth/delete
// Access  Private
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    // Find the user to delete
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // Delete all cars associated with this user
    await Car.deleteMany({ 'owner._id': userId });

    // Delete profile image from Cloudinary if not default
    if (user.profileImage && user.profileImage !== 'default-profile.jpg') {
      const publicId = user.profileImage.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`car-rental/profiles/${publicId}`);
      }
    }

    // Delete user
    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User and all associated cars deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Description    Logout user
// EndPoint   POST /api/auth/logout
// Access  Private
export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // In a real app, you would handle token invalidation here
    // For JWT, since it's stateless, you would typically handle this client-side

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};