import React from 'react';
import { useRouter } from 'expo-router';
import CartScreen from '../../screens/CartScreen';

export default function Cart() {
  const router = useRouter();
  
  return (
    <CartScreen 
      onGoBack={() => router.back()}
      onContinueShopping={() => router.push('/')}
    />
  );
} 