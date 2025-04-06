import mongoose, { Schema, Document } from 'mongoose';

export interface PromoCodeDocument extends Document {
  code: string;
  description: string;
  courses: mongoose.Types.ObjectId[];
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PromoCodeSchema = new Schema<PromoCodeDocument>(
  {
    code: {
      type: String,
      required: [true, 'Код обязателен'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Описание обязательно'],
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PromoCode || mongoose.model<PromoCodeDocument>('PromoCode', PromoCodeSchema); 