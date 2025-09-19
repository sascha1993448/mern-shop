import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        title: String,
        price: Number,
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    customer: {
      name: { type: String, required: true },
      email: String,
      address: String
    },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, default: "placed" } // placed | shipped | cancelled
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
