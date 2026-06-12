import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
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
