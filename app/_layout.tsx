import React from 'react';
import { Stack } from 'expo-router';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#fff' },
            animation: 'slide_from_right',
          }}
        />
      </SafeAreaProvider>
    </CartProvider>
  );
}
