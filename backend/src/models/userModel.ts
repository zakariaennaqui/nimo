import mongoose, { Document, Model } from 'mongoose';
import validator from 'validator';
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  phone: string;
  role: 'user' | 'renter';
  joinedDate: Date;
  responseRate: number;
  responseTime: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  phone: {
    type: String,
    required: false

  },
  profileImage: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    enum: ['user', 'renter'],
    default: 'user'
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  responseRate: {
    type: Number,
    default: 0
  },
  responseTime: {
    type: String,
    default: 'N/A'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});



const User: Model<IUser> = mongoose.model('User', userSchema);
export default User;