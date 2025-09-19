// server/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Health
app.get('/health', (_req, res) => res.send('ok'));

// --- Mongo: optional verbinden, aber NICHT crashen ---
const MONGO = process.env.MONGO_URL || process.env.MONGODB_URI;

async function connectMongo() {
  if (!MONGO) {
    console.warn('⚠️  Keine MONGO_URL/MONGODB_URI gesetzt – starte ohne DB');
    return;
  }
  try {
    await mongoose.connect(MONGO);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ Mongo connect failed:', err.message);
    // NICHT process.exit(); wir bleiben am Leben, damit /health funktioniert
  }
}
connectMongo();

// Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 API listening on port ${PORT}`);
});
