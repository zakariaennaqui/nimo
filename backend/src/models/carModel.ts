import mongoose, { Document, Model } from 'mongoose';

interface CarSpecs {
  passengers?: number;
  luggage?: number;
  range?: string;
  fuelType?: string;
}

interface AvailableDate {
  start: Date;
  end: Date;
}

interface ICar extends Document {
  name: string;
  images: string[];
  type: string;
  location: string;
  passengers: number;
  transmission: string;
  airConditioning: boolean;
  doors: number;
  price: number;
  category: string;
  description: string;
  features: string[];
  specs: CarSpecs;
  owner: mongoose.Schema.Types.ObjectId;
  availableDates: AvailableDate[];
  isAvailable: boolean;
}

const carSchema = new mongoose.Schema<ICar>({
  name: {
    type: String,
    required: [true, 'Please provide a car name'],
    trim: true
  },
  images: {
    type: [String],
    required: [true, 'Please provide at least one image']
  },
  type: {
    type: String,
    required: [true, 'Please specify car type']
  },
  location: {
    type: String,
    required: [true, 'Please provide location']
  },
  passengers: {
    type: Number,
    required: [true, 'Please specify passenger capacity']
  },
  transmission: {
    type: String,
    required: [true, 'Please specify transmission type']
  },
  airConditioning: {
    type: Boolean,
    default: false
  },
  doors: {
    type: Number,
    required: [true, 'Please specify number of doors']
  },
  price: {
    type: Number,
    required: [true, 'Please specify price per day']
  },
  category: {
    type: String,
    required: [true, 'Please specify car category']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  features: {
    type: [String],
    default: []
  },
  specs: {
    passengers: Number,
    luggage: Number,
    range: String,
    fuelType: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify the car owner']
  },
  availableDates: [
    {
      start: Date,
      end: Date
    }
  ],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Car: Model<ICar> = mongoose.model('Car', carSchema);
export default Car;