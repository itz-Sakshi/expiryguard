import mongoose, { Schema, Document } from "mongoose";

interface IStoreLocation extends Document {
  name: string; // Name of the store location
  address: string; // Physical address of the store
}

const StoreLocationSchema = new Schema<IStoreLocation>({
  name: { type: String, required: true, default: "Longos" },
  address: { type: String, required: true, default: "Toronto" },
});

export const StoreLocation = mongoose.models.StoreLocation as mongoose.Model<IStoreLocation> || mongoose.model<IStoreLocation>("StoreLocation", StoreLocationSchema);
