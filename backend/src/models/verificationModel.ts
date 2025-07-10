import mongoose, { Schema, Document } from 'mongoose';

export interface IVerification extends Document {
  email: string;
  code: string;
  codeCreatedAt: Date;
}

const VerificationSchema: Schema = new Schema({
  email: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  codeCreatedAt: {
    type: Date,
    default: Date.now,
    expires: 600 // Automatically expire documents after 10 minutes (600 seconds)
  }
});

export default mongoose.model<IVerification>('Verification', VerificationSchema);
