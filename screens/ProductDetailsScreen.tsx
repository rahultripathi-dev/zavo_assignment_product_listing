import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import StatusBarManager from '../components/StatusBarManager';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from '../components/Toast';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const SPACING = 20;
const HEADER_HEIGHT = 60;

const ProductDetailsScreen = (props) => {
  const product = props.product;
  console.log('ProductDetailsScreen received product:', product);
  const navigation = props.navigation;
  const onGoBack = props.onGoBack || (navigation ? () => navigation.goBack() : null);
  
  const insets = useSafeAreaInsets();
  const { cart, addToCart } = useCart();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Check if product is already in cart
  const isInCart = useMemo(() => {
    return product ? cart.some(item => item.id === product.id) : false;
  }, [cart, product]);
  
  // Improved header animations
  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp'
  });
  
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp'
  });



  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (product) {
      console.log('Product reviews:', product.reviews);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart(product);
      // Show toast instead of Alert
      setToastVisible(true);
    } else {
      // Show message if product is out of stock
      setToastMessage('Sorry, this product is out of stock');
      setToastType('error');
      setToastVisible(true);
    }
  };

  const handleGoToCheckout = () => {
    router.push('/cart');
  };

  const handleBackPress = () => {
    if (onGoBack) {
      onGoBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  // Add loading UI
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <StatusBarManager 
          style="dark-content"
          backgroundColor="#FFFFFF"
        />
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={[styles.container, styles.centered]}>
        <StatusBarManager 
          style="dark-content"
          backgroundColor="#FFFFFF"
        />
        <Ionicons name="alert-circle-outline" size={64} color="#ff3b30" />
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
     
      
      {/* Header background with animated opacity */}
      <Animated.View 
        style={[
          styles.headerBackground,
          { 
            opacity: headerBackgroundOpacity,
            height: HEADER_HEIGHT + insets.top 
          }
        ]}
      />
      
      {/* Header content */}
      <View 
        style={[
          styles.header,
          { paddingTop: insets.top }
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Animated.Text
          style={[
            styles.headerTitle,
            { opacity: headerTitleOpacity }
          ]}
          numberOfLines={1}
        >
          {product?.name}
        </Animated.Text>
        
        <View style={{ width: 40 }} /> {/* Empty view for balance */}
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={[styles.imageContainer, { marginTop: insets.top }]}>
          <Image
            source={{ uri: product?.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'transparent']}
            style={styles.imageGradient}
          />
        </View>

        <Animated.View 
          style={[
            styles.detailsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }]
            }
          ]}
        >
          <View style={styles.productInfoHeader}>
            <View style={styles.productNamePriceContainer}>
              <Text style={styles.productName} numberOfLines={2}>
                {product?.name}
              </Text>
              <Text style={styles.productPrice}>
                ${product?.price.toFixed(2)}
              </Text>
            </View>
            <View style={[
              styles.categoryBadge, 
              !product?.inStock && styles.outOfStockBadge
            ]}>
              <Text style={styles.categoryText}>
                {product?.inStock ? product?.category : 'Out of Stock'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {product?.description}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specsContainer}>
            {Object.entries(product?.specs || {}).map(([key, value]) => (
              <View key={key} style={styles.specItem}>
                <Text style={styles.specKey}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Text style={styles.specValue}>{String(value)}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Reviews</Text>
          {!product?.reviews || product.reviews.length === 0 ? (
            <Text style={styles.noReviewsText}>No reviews yet</Text>
          ) : (
            product.reviews.map((review, index) => (
              <View key={index} style={styles.reviewContainer}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Ionicons
                        key={i}
                        name={i < review.rating ? "star" : "star-outline"}
                        size={16}
                        color="#FFD700"
                        style={styles.starIcon}
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))
          )}
          
          <View style={{ height: 100 }} />
        </Animated.View>
      </Animated.ScrollView>

      {/* Fixed bottom bar with single button based on cart status */}
      <View 
        style={[
          styles.bottomBar,
          { paddingBottom: insets.bottom || 20 }
        ]}
      >
        {isInCart ? (
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleGoToCheckout}
          >
            <Ionicons name="cart" size={20} color="#fff" style={styles.cartIcon} />
            <Text style={styles.addToCartText}>Go to Checkout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              !product?.inStock && styles.disabledButton
            ]}
            onPress={handleAddToCart}
            disabled={!product?.inStock}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" style={styles.cartIcon} />
            <Text style={styles.addToCartText}>
              {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Toast component */}
      <Toast
        visible={toastVisible}
        message={toastMessage || `${product?.name} added to cart!`}
        type={toastType || 'success'}
        duration={2000}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20, // Ensure enough space at the bottom
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A1A1A',
    zIndex: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING,
    zIndex: 11,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  imageContainer: {
    width: width,
    height: height * 0.5,
    position: 'relative',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -30,
    paddingHorizontal: SPACING,
    paddingTop: SPACING,
  },
  productInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productNamePriceContainer: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    flexShrink: 1,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0066cc',
  },
  categoryBadge: {
    backgroundColor: '#e6f2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  outOfStockBadge: {
    backgroundColor: '#ffebe6',
  },
  categoryText: {
    color: '#0066cc',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 20,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'left',
  },
  specsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  specKey: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  reviewContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginLeft: 2,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  noReviewsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: SPACING,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 999,
  },
  addToCartButton: {
    backgroundColor: '#0066cc',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButton: {
    backgroundColor: '#FF9800', // Orange color for checkout
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  cartIcon: {
    marginRight: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductDetailsScreen; 