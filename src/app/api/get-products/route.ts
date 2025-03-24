import { Product } from "@/models/Product"; // Assuming Product model is available
import { dbConnect } from "@/lib/dbConnect";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() || ""; // Get the search query from the URL

  try {
    
    // Find products whose names start with the query string
    const products = await Product.find({
      productName: { $regex: `^${query}`, $options: "i" }, // Case-insensitive search for products starting with query
    });

    return Response.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json({ error: "Error fetching products" }, { status: 500 });
  }
}
