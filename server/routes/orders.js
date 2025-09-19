import { Router } from "express";
import Order from "../models/order.js";

const router = Router();

// Bestellung anlegen
router.post("/", async (req, res) => {
  try {
    const { items, customer } = req.body;
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = await Order.create({ items, customer, total });
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// (Optional) alle Bestellungen ansehen – hilfreich in Postman/Admin
router.get("/", async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
