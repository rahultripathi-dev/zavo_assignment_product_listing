import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import { products } from '../data/products';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products.find(p => p.id === Number(id));
  
  if (!product) return null;
  
  return (
    <ProductDetailsScreen 
      product={product}
      onGoBack={() => router.back()}
    />
  );
} 