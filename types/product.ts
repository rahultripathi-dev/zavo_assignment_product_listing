export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
  }>;
  inStock: boolean;
  category: string;
} 