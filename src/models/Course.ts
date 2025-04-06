import mongoose, { Schema, Document } from 'mongoose';

export interface CourseDocument extends Document {
  title: string;
  description: string;
  thumbnailUrl: string;
  lessons: mongoose.Types.ObjectId[];
  category: string;
  tags: string[];
  requiresPromoCode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<CourseDocument>(
  {
    title: {
      type: String,
      required: [true, 'Название курса обязательно'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Описание курса обязательно'],
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'Изображение курса обязательно'],
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    category: {
      type: String,
      required: [true, 'Категория обязательна'],
    },
    tags: [String],
    requiresPromoCode: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model<CourseDocument>('Course', CourseSchema); 