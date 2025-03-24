import { IProduct, Product } from "@/models/Product";
import {Inventory } from "@/models/Inventory";
import QRCode from "qrcode";
import { dbConnect } from "@/lib/dbConnect"; 

// Utility function to generate QR code
async function generateQRCode(product: IProduct, expiryDate: Date, batchNumber: string): Promise<string> {
  const qrData = {
   id: product.id,
   expiryDate: expiryDate,
   batchNumber
  };
  return await QRCode.toDataURL(JSON.stringify(qrData));
}

export async function POST(request: Request) {
  await dbConnect(); // Ensure database connection

  try {
    const data = await request.json(); // Parse incoming data

    const { productName, expiryDate, batchNumber, quantity, storeLocation } = data;

    // find product (same name, expiry date, batch number)
    const product: any = await Product.findOne({ productName });

    
    const qrCode = await generateQRCode(product, expiryDate, batchNumber); // Generate QR code for the product batch

    

    // Add or update inventory
    let inventory = await Inventory.findOne({ productId: product._id, batchNumber, expiryDate });

    if (inventory) {
      // If inventory exists, add the quantity
      inventory.quantity += Number(quantity);
    } else {
      // If inventory doesn't exist, create a new inventory entry
      inventory = new Inventory({
        productId: product._id, // Reference to product's ObjectId
        quantity,
        batchNumber,
        expiryDate,
        storeLocation,
      });
    }

    await inventory.save(); // Save inventory record

    // Send success response with the generated QR code and product info
    return Response.json({
      message: "Delivery added successfully",
      product,
      inventory,
      qrCode: qrCode, // Return the generated QR code
    });

  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: error, message: "Error adding delivery" }, { status: 500 });
  }
}
