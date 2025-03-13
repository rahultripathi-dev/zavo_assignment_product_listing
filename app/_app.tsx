import React from 'react';
import { CartProvider } from '../context/CartContext';
import { Stack } from 'expo-router';

export default function App() {
  return (
    <CartProvider>
      <Stack />
    </CartProvider>
  );
} 