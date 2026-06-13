import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(mongoUri);
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

export { mongoUri };