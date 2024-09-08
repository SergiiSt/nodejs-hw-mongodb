import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=MyCluster`;
    await mongoose.connect(DB_HOST);
    console.log('Mongodb connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};
