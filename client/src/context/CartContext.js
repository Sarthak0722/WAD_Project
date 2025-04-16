import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const deliveryCharges = 30;

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if it's a subscription item
      if (product.id === 'subscription') {
        // Remove any existing subscription items
        const filteredItems = prevItems.filter(item => item.id !== 'subscription');
        return [...filteredItems, { ...product, quantity: 1 }];
      }
      
      // For regular items
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, id: Date.now() }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    removePromoCode();
  };

  const applyPromoCode = (code) => {
    if (code === 'FLAT10') {
      setPromoCode(code);
      setDiscount(10);
    } else {
      removePromoCode();
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscount(0);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    // Skip subscription items in subtotal calculation
    if (item.id === 'subscription') return sum;
    return sum + (item.price * item.quantity);
  }, 0);

  const subscriptionTotal = cartItems.reduce((sum, item) => {
    // Only include subscription items
    if (item.id === 'subscription') return sum + item.price;
    return sum;
  }, 0);

  const discountAmount = (subtotal * discount) / 100;
  const grandTotal = subtotal + subscriptionTotal + deliveryCharges - discountAmount;

  const cartTotal = {
    subtotal,
    subscriptionTotal,
    deliveryCharges,
    discount: discountAmount,
    total: grandTotal,
    itemCount: cartItems.reduce((sum, item) => {
      // Don't count subscription items in item count
      if (item.id === 'subscription') return sum;
      return sum + item.quantity;
    }, 0)
  };

  // Helper function to check if cart has subscription
  const hasSubscription = () => {
    return cartItems.some(item => item.id === 'subscription');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        promoCode,
        applyPromoCode,
        removePromoCode,
        cartTotal,
        deliveryCharges,
        hasSubscription
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;