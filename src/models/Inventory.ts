
import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  productId: mongoose.Types.ObjectId; // Reference to the Product ID
  quantity: number;
  batchNumber: string; // Unique batch number
  expiryDate: Date; // Only applies to perishable items
  status: "In Stock" | "Sold" | "On Discount" | "Expired" | "Donated"; 
  storeLocation: string; // Which store location is this inventory stored in?
}

const InventorySchema = new Schema<IInventory>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  batchNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ["In Stock", "Sold", "On Discount", "Expired", "Donated"], default: "In Stock" },
  storeLocation: { type: String, required: true, default: "Toronto" },
});

export const Inventory = mongoose.models.Inventory as mongoose.Model<IInventory> || mongoose.model<IInventory>("Inventory", InventorySchema);
