import { Request, Response } from 'express';
import Verification from '../models/verificationModel';
import User from '../models/userModel';
import { sendVerificationEmail } from '../config/nodeMailer';

// Generate a random 6-digit verification code
const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Send email verification code
// @route   POST /api/auth/send-verification
// @access  Public
// ==========================================> Send email verification code
export const sendVerificationCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    console.log("🛑 Incoming request body:", req.body);

    if (!email) {
      res.status(400).json({ success: false, message: 'Please provide an email address' });
      return;
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'Email is already registered' });
      return;
    }

    // Generate a new verification code
    const verificationCode = generateVerificationCode();

    // Remove any existing verification codes for this email
    await Verification.deleteMany({ email });

    // Create a new verification document
    await Verification.create({
      email,
      code: verificationCode
    });

    // Send the verification code via email
    const emailSent = await sendVerificationEmail(email, verificationCode);

    if (emailSent) {
      res.status(200).json({ 
        success: true, 
        message: 'Verification code sent to your email' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send verification email' 
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Verify email code
// @route   POST /api/auth/verify-email
// @access  Public
// ==========================================> Verify email code

export const verifyEmailCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      res.status(400).json({ success: false, message: 'Please provide email and verification code' });
      return;
    }

    // Find the verification document
    const verification = await Verification.findOne({ email, code });

    if (!verification) {
      res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
      return;
    }

    // If verification is successful, delete the verification document
    await Verification.deleteOne({ _id: verification._id });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      verified: true
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};