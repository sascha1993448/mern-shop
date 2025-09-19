import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";

dotenv.config();

const data = [
  {
    title: "Kaffee Tasse",
    description: "Keramiktasse 300ml",
    price: 9.9,
    imageUrl: "https://picsum.photos/seed/mug/400/300",
    stock: 50
  },
  {
    title: "Notizbuch A5",
    description: "80 Seiten, liniert",
    price: 6.5,
    imageUrl: "https://picsum.photos/seed/notebook/400/300",
    stock: 100
  },
  {
    title: "Kugelschreiber",
    description: "Schwarz, 0.5mm",
    price: 2.2,
    imageUrl: "https://picsum.photos/seed/pen/400/300",
    stock: 200
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(data);
    console.log("Seeded products:", data.length);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
})();
