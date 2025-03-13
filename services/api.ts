import { Product } from '../types/product';

// Base API URL
const API_URL = 'https://jsonplaceholder.typicode.com';

// Add delay to simulate real-world network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateProductFromPost = (post: any): Product => {
  // Generate a random price between 50 and 500
  const price = Math.floor(Math.random() * 450) + 50;
  
  // Select a random category
  const categories = ['Audio', 'Computing', 'Wearables', 'Smartphones', 'Accessories'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  // Generate a random image URL
  const imageNum = Math.floor(Math.random() * 10) + 1;
  const image = `https://picsum.photos/id/${200 + imageNum}/500/500`;
  
  // Create specs
  const specs: Record<string, string> = {
    'batteryLife': `${Math.floor(Math.random() * 20) + 5} hours`,
    'connectivity': 'Bluetooth 5.0',
    'weight': `${Math.floor(Math.random() * 200) + 100}g`,
    'dimensions': `${Math.floor(Math.random() * 10) + 5} x ${Math.floor(Math.random() * 10) + 5} cm`,
    'warranty': '1 year'
  };
  
  // Create reviews
  const reviewCount = Math.floor(Math.random() * 3) + 1;
  const reviews = Array.from({ length: reviewCount }, () => ({
    user: `User${Math.floor(Math.random() * 1000)}`,
    rating: Math.floor(Math.random() * 5) + 1,
    comment: `This is a ${Math.random() > 0.5 ? 'great' : 'decent'} product. ${post.body.split('.')[0]}.`
  }));

  return {
    id: post.id,
    name: post.title.charAt(0).toUpperCase() + post.title.slice(1),
    price: price,
    image: image,
    description: post.body,
    specs: specs,
    reviews: reviews,
    inStock: Math.random() > 0.2,
    category: category
  };
};

export const api = {
  getProducts: async (): Promise<Product[]> => {
    await delay(1000);
    const response = await fetch(`${API_URL}/posts?_limit=10`);
    const posts = await response.json();
    return posts.map(generateProductFromPost);
  },
  
  getProduct: async (id: number): Promise<Product> => {
    await delay(800);
    const response = await fetch(`${API_URL}/posts/${id}`);
    const post = await response.json();
    return generateProductFromPost(post);
  }
}; 