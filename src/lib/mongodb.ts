import mongoose from 'mongoose';

// Глобальный интерфейс для кэша подключения MongoDB
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Глобальная переменная для кэширования соединения
const globalWithMongoose = global as typeof global & {
  mongoose: MongooseCache;
};

if (!process.env.MONGODB_URI) {
  throw new Error('Пожалуйста, определите переменную MONGODB_URI в .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Глобальное соединение с MongoDB.
 */
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect; 