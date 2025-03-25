"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Gift, Tag, ImageDownIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const initialSuggestions = [
  {
    productName: 'Dole Bananas',
    quantity: 150,
    storeLocation: 'Toronto',
    batchNumber: 'F2468',
    expiryDate: '2025-05-20',
    status: 'In Stock',
    suggestion: 'Put on discount due to upcoming expiry.',
    imageUrl: '/images/bananas.png'
  },
  {
    productName: 'Milk 1L',
    quantity: 120,
    storeLocation: 'Toronto',
    batchNumber: 'K2468',
    expiryDate: '2025-03-25',
    status: 'In Stock',
    suggestion: 'Donate excess stock before spoilage.',
    imageUrl: '/images/milk.jpeg'
  },
  {
    productName: 'Oreo Cookies',
    quantity: 90,
    storeLocation: 'Toronto',
    batchNumber: 'N2468',
    expiryDate: '2025-06-01',
    status: 'In Stock',
    suggestion: 'Offer a discount to clear stock and save in time.',
    imageUrl: '/images/oreo.jpeg'
  },
  {
    productName: 'Pepsi 500ml',
    quantity: 170,
    storeLocation: 'Toronto',
    batchNumber: 'Q2468',
    expiryDate: '2025-12-15',
    status: 'In Stock',
    suggestion: 'Promote with buy-one-get-one-free offer.',
    imageUrl: '/images/pepsi.jpeg'
  },
  {
    productName: 'Nestle Pure Life Water 1L',
    quantity: 180,
    storeLocation: 'Toronto',
    batchNumber: 'M1357',
    expiryDate: '2026-03-30',
    status: 'In Stock',
    suggestion: 'Consider bundling with other beverages.',
    imageUrl: '/images/water.jpeg'
  }
];

const ActionsPage = () => {
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const router = useRouter();

  const handleIgnore = (index: number) => {
    const updatedSuggestions = suggestions.filter((_, i) => i !== index);
    setSuggestions(updatedSuggestions);
  };

  const handleNavigate = (path: string) => {
    router.push(`/actions/${path}`);
  };

  return (
    <div className="absolute p-8 flex flex-wrap justify-center gap-9 mt-15 z-1000">
      {suggestions.map((item, index) => (
        <Card key={index} className="shadow-lg rounded-[16px] border border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center text-xl justify-center gap-2 h-20 text-red-500">
              <AlertCircle className="text-yellow-500 mb-6" /> {item.suggestion}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={item.imageUrl}
              width={100}
              height={100}
              alt={item.productName}
              className="w-40 h-40 object-cover mb-4 rounded-lg"
            />
            <p>
              <strong>Product:</strong> {item.productName}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Store Location:</strong> {item.storeLocation}
            </p>
            <p>
              <strong>Expiry Date:</strong> {item.expiryDate}
            </p>
            <div className="flex gap-4 mt-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleNavigate('discount')}
              >
                <Tag /> Discount
              </Button>
              <Button
                variant="destructive"
                className="flex items-center gap-2"
                onClick={() => handleNavigate('donate')}
              >
                <Gift /> Donate
              </Button>
              <Button
                variant="default"
                className="flex items-center gap-2"
                onClick={() => handleIgnore(index)}
              >
                <ImageDownIcon /> Ignore
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {suggestions.length === 0 && (
        <p className="text-center col-span-full">No suggestions available</p>
      )}
    </div>
  );
};

export default ActionsPage;
