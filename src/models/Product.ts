import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  sku: string; // Unique identifier for a product variation
  productName: string;
  category: string;
  barcode: string; // Barcode used for scanning at checkout
  price: number;
  description: string;
  isPerishable: boolean; // Whether the product has an expiry date
}

const ProductSchema = new Schema<IProduct>({
  sku: { type: String, required: true, unique: true },
  productName: { type: String, required: true , unique: true},
  category: { type: String, required: true },
  barcode: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  isPerishable: { type: Boolean, default: false },
});

export const Product = mongoose.models.Product as mongoose.Model<IProduct>|| mongoose.model<IProduct>("Product", ProductSchema);
