import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit API is running',
    endpoints: ['/api/health', '/api/users/', '/api/activities/']
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Baseline route handlers for Octofit logic tier resources.
app.get('/api/users/', (_req, res) => {
  res.json({ resource: 'users', items: [], count: 0 });
});

app.get('/api/teams/', (_req, res) => {
  res.json({ resource: 'teams', items: [], count: 0 });
});

app.get('/api/activities/', (_req, res) => {
  res.json({ resource: 'activities', items: [], count: 0 });
});

app.get('/api/leaderboard/', (_req, res) => {
  res.json({ resource: 'leaderboard', items: [], count: 0 });
});

app.get('/api/workouts/', (_req, res) => {
  res.json({ resource: 'workouts', items: [], count: 0 });
});

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.get('/api/config', (_req, res) => {
  res.json({ baseUrl, port });
});

async function startServer() {
  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`OctoFit backend running on ${baseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
