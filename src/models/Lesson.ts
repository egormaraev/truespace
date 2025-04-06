import mongoose, { Schema, Document } from 'mongoose';

export interface LessonDocument extends Document {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  course: mongoose.Types.ObjectId;
  duration: number; // в секундах
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<LessonDocument>(
  {
    title: {
      type: String,
      required: [true, 'Название урока обязательно'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Описание урока обязательно'],
    },
    videoUrl: {
      type: String,
      required: [true, 'URL видео обязателен'],
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'Изображение урока обязательно'],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Курс обязателен'],
    },
    duration: {
      type: Number,
      required: [true, 'Длительность обязательна'],
    },
    order: {
      type: Number,
      required: [true, 'Порядок обязателен'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model<LessonDocument>('Lesson', LessonSchema); 