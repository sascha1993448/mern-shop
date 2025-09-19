import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (_req, res) => res.json({ ok: true, message: "API running" }));

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Server on http://localhost:${process.env.PORT || 4000}`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
