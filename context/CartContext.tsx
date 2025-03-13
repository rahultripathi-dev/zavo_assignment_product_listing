import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/product';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => void;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: () => {},
  clearCart: async () => {},
  isLoading: false,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from storage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to storage', error);
      }
    };

    if (!isLoading) {
      saveCart();
    }
  }, [cart, isLoading]);

  const addToCart = async (product: Product) => {
    setIsLoading(true);
    try {
      // Check if product is already in cart
      if (!cart.some(item => item.id === product.id)) {
        setCart([...cart, product]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      setCart([]);
      await AsyncStorage.removeItem('cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}; 