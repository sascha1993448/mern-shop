import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productsRouter from "./routes/products.js"; // 👈 Import hinzugefügt

const app = express();

// während des Tests offen lassen; später whitelisten (siehe A5)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes einhängen 👇
app.use("/api/products", productsRouter); // 👈 Router-Mount hinzugefügt

// Healthcheck
app.get("/health", (_req, res) => res.send("ok"));

// Mongo verbinden (robust – Server bleibt auch bei Fehlern online)
const MONGO = process.env.MONGO_URL || process.env.MONGODB_URI;
async function connectMongo() {
  if (!MONGO) {
    console.warn("⚠️  Keine MONGO_URL/MONGODB_URI gesetzt – starte ohne DB");
    return;
  }
  try {
    await mongoose.connect(MONGO);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo connect failed:", err.message);
  }
}
connectMongo();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("🚀 API listening on", PORT));
