import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ title, price, image }) => {
  const { addToCart, hasSubscription } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // If user is not subscribed and doesn't have subscription in cart, redirect to subscription page
    if (!user?.isSubscribed && !hasSubscription()) {
      navigate('/subscription');
      return;
    }

    // Add product to cart
    addToCart({ title, price: parseFloat(price), image });
    navigate('/cart');
  };

  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        borderRadius: '16px',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: '140px',
          height: '140px',
          objectFit: 'contain',
          marginBottom: '16px'
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'cursive',
          fontWeight: 'bold',
          mb: 1,
          fontSize: '1.1rem',
          textAlign: 'center'
        }}
      >
        {title}
      </Typography>
      <Typography
        color="error"
        sx={{
          fontFamily: 'cursive',
          mb: 2,
          fontSize: '1rem'
        }}
      >
        {price} rs / ltr
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: 'white',
          color: 'black',
          textTransform: 'none',
          fontFamily: 'cursive',
          '&:hover': {
            bgcolor: '#f5f5f5',
          },
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          width: '100%',
          py: 1
        }}
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </Box>
  );
};

export default ProductCard;