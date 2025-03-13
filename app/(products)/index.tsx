import { Redirect } from 'expo-router';

export default function ProductsIndex() {
  // Redirect to home if someone navigates to /products directly
  return <Redirect href="/" />;
} 