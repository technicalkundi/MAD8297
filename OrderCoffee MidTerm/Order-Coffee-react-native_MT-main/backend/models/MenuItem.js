import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  sizes: {
    small: { type: Number },
    medium: { type: Number },
    large: { type: Number },
  },
  inStock: { type: Boolean, default: true },
  image: { type: String },
  featured: { type: Boolean, default: false },
});

export default mongoose.model("MenuItem", menuSchema);
