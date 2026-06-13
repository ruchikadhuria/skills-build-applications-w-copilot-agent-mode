import mongoose from 'mongoose';

import { connectDatabase, disconnectDatabase } from '../config/database';

// Seed the octofit_db database with test data
async function seed(): Promise<void> {
  await connectDatabase();

  // Placeholder seed implementation for initial exercise checks.
  console.log('Seeding Octofit test data...');

  await disconnectDatabase();
}

seed().catch(async (error: unknown) => {
  console.error('Seed failed:', error);
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  process.exit(1);
});