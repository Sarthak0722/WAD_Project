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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const grandTotal = subtotal + deliveryCharges - discountAmount;

  const cartTotal = {
    subtotal,
    deliveryCharges,
    discount: discountAmount,
    total: subtotal + deliveryCharges - discountAmount,
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
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
        deliveryCharges
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;