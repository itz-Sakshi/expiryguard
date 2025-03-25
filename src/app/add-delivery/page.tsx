"use client";

import { motion } from "motion/react";
import React from "react";

import { useForm } from "react-hook-form"; // For form validation
import { useState, useEffect } from "react";
import axios from "axios"; // Axios for making HTTP requests
import { useDebounceCallback } from "usehooks-ts"; // Import the useDebounceCallback hook
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { IProduct } from "@/models/Product";
import { dbConnect } from "@/lib/dbConnect";

const AddDelivery = () => {
  const [productList, setProductList] = useState<IProduct[]>([]); // Store the list of products fetched from backend
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null); // Store selected product
  const [qrCode, setQrCode] = useState(""); // Store QR code data
  const [productName, setProductName] = useState(""); // Search query
  const [showCreateProductForm, setShowCreateProductForm] = useState(false); // Flag to show the "Add New Product" form
  const [showProductList, setShowProductList] = useState(true);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      productName: "",
      expiryDate: "",
      batchNumber: "",
      quantity: 0,
      storeLocation: "",
    },
  });
  const { setValue } = form;

  const debouncedSearch = useDebounceCallback(setProductName, 10);

  const fieldStyles = {
    color: "white",
    border: "1px solid white",
    padding: "10px",
    borderRadius: "16px",
  };

  useEffect(() => {
    const getProducts = async () => {
      if (productName) {
        setShowProductList(true);
        try {
          const response = await axios.get(
            `/api/get-products?query=${productName}`
          );
          setProductList(response.data.products); // Set the products to the state
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };
    getProducts();
  }, [productName]);

  // Handle product selection from dropdown
  const handleProductSelect = (product: IProduct) => {
    setSelectedProduct(product);

    setValue("productName", product.productName, { shouldValidate: true });
    console.log("After setValue:", form.getValues("productName"));
    setShowProductList(false);
  };

  // Handle manual product entry
  const handleAddNewProduct = () => {
    setShowCreateProductForm(true); // Show the form to create a new product
  };

  // Function to trigger the print dialog for the QR code
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write("<html><body>");
      printWindow.document.write("<h2>QR Code</h2>");
      printWindow.document.write(
        '<img src="' + qrCode + '" width="200" height="200" />'
      );
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await dbConnect();
      const response = await axios.post("/api/add-delivery", data); // Send delivery data to backend

      if (response.status === 200) {
        setQrCode(response.data.qrCode); // Set the QR code from the response
        alert("Delivery Added Successfully!");
      } else {
        alert("Failed to add delivery");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Error submitting the delivery data.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 max-w-lg mx-auto mb-5 mt-20"
      >
        <h1 className="text-2xl font-bold mb-4">Add New Delivery</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Product Name Input */}
            <div className="relative">
              <FormField
                name="productName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>

                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedSearch(e.target.value);
                      }}
                      style={fieldStyles}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {productList.length > 0 &&
                !showCreateProductForm &&
                showProductList &&
                productName && (
                  <ul className="absolute top-full left-0 w-full bg-gray-900 border shadow-lg">
                    {productList
                      .filter((product) =>
                        product.productName
                          .toLowerCase()
                          .startsWith(productName.toLowerCase())
                      )
                      .map((product) => (
                        <li
                          key={product.sku}
                          onClick={() => handleProductSelect(product)}
                          className="cursor-pointer p-2 hover:bg-gray-200"
                        >
                          {product.productName}
                        </li>
                      ))}
                  </ul>
                )}
            </div>

            {/* Expiry Date Input */}
            <FormField
              name="expiryDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <Input
                    type="date"
                    {...field}
                    name="expiryDate"
                    style={fieldStyles}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Batch Number Input */}
            <FormField
              name="batchNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch Number</FormLabel>
                  <Input
                    type="string"
                    {...field}
                    name="batchNumber"
                    style={fieldStyles}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity Input */}
            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    {...field}
                    name="quantity"
                    style={fieldStyles}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Store Location Input */}
            <FormField
              name="storeLocation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Location</FormLabel>
                  <Input
                    type="string"
                    {...field}
                    name="storeLocation"
                    style={fieldStyles}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                className="bg-gray-400 text-black py-2 px-4 rounded-[16px] m-auto mt-2 hover:bg-white hover:text-black"
              >
                Add Delivery
              </Button>
            </div>

            <div className="flex justify-center items-center gap-3">
              {/* Add New Product Button */}
              <p>Cannot find your product?</p>
              <Button
                type="button"
                onClick={handleAddNewProduct}
                className="bg-transparent text-white py-2 px-4 rounded-[16px] m-0 inline hover:bg-white hover:text-black"
              >
                Add New Product 🔗
              </Button>
            </div>
          </form>
        </Form>

        {/* Show QR code if generated */}
        {qrCode && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Generated QR Code:</h3>
            <Image
              id="print-section"
              src={qrCode}
              width={200} // You can adjust the width as needed
              height={200} // You can adjust the height as needed
              alt="QR Code"
            />
            {/* Add Print Button */}
            <Button
              type="button"
              onClick={handlePrint}
              className="bg-gray-500 text-white py-2 px-4 rounded mt-2 m-auto content-center flex justify-items-center"
            >
              Print QR Code
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AddDelivery;
