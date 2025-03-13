# Product Listing App

A simple React Native application that allows users to view a list of products and see their details on a separate screen.

## Features

- View a list of products with images and details
- Smart search functionality:
  - Search products by name or category
  - Shows "No products found" message with search term when no results
  - Clear search with one tap
- Shopping cart features:
  - Add products to cart (only if not already added)
  - View cart items count badge
  - Toast notifications for cart actions
- Product details:
  - View full product information
  - Image gallery with zoom
  - Add to cart feature
- Toast notifications:
  - Success messages for cart actions
  - Error messages for failed operations
  - Network status updates

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/product-listing-app.git
   cd product-listing-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the app:
   ```
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web

## Technologies Used

- React Native
- Expo
- AsyncStorage for persistence
- React Native Toast Message
- Expo Router for navigation
- Context API for state management  

## Project Structure

- `App.js`: Main application file with navigation and toast setup
- `services/api.js`: API integration for products
- `screens/HomeScreen.js`: Home screen with product list, search and cart
- `screens/ProductDetailsScreen.js`: Product details screen with cart actions
- `context/CartContext.js`: Cart state management
