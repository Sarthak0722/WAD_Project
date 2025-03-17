import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
    promoCode,
    cartTotal,
  } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();

  const handlePromoCode = () => {
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
        <Navbar />
        <Container
          maxWidth="md"
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}
        >
          <ShoppingBagIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Your Cart is Empty
          </Typography>
          <Typography
            sx={{
              fontFamily: 'cursive',
              color: 'text.secondary',
              textAlign: 'center',
              fontSize: '1.1rem'
            }}
          >
            Looks like you haven't added anything to your cart yet.
            Browse our exciting collection of dairy products!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/shop')}
            sx={{
              bgcolor: '#b2ebf2',
              color: 'black',
              py: 1.5,
              px: 4,
              borderRadius: '25px',
              fontFamily: 'cursive',
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#81d4fa',
              },
              mt: 2
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          {/* Promo Code Section */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flex: 1,
              maxWidth: 400,
              bgcolor: '#f0f0f0',
              borderRadius: 25,
              p: 1,
            }}
          >
            <TextField
              placeholder="Apply promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              variant="standard"
              sx={{
                flex: 1,
                '& .MuiInput-root': {
                  fontFamily: 'cursive',
                  fontSize: '1.1rem',
                  pl: 2,
                  '&:before, &:after': { display: 'none' }
                }
              }}
            />
            <Button
              onClick={handlePromoCode}
              sx={{
                bgcolor: '#FFE4B5',
                color: 'black',
                borderRadius: 25,
                px: 3,
                '&:hover': { bgcolor: '#FFD700' },
                fontFamily: 'cursive'
              }}
            >
              apply
            </Button>
          </Box>

          {/* Cart Header - Centered */}
          <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <ShoppingCartIcon sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
              My Cart
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
              ({cartTotal.itemCount} items)
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} /> {/* Spacer for symmetry */}
        </Box>

        {/* Cart Items Table Header */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
            gap: 2,
            mb: 2,
            px: 3,
          }}
        >
          <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>item</Typography>
          <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>price</Typography>
          <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>quantity</Typography>
          <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>total</Typography>
          <Box /> {/* Space for delete button */}
        </Box>

        {/* Cart Items */}
        <Box sx={{ mb: 4 }}>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                gap: 2,
                alignItems: 'center',
                bgcolor: '#b2ebf2',
                borderRadius: '16px',
                p: 3,
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />
                <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: 'cursive' }}>
                {item.price} rs
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  sx={{ bgcolor: '#f5f5f5' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ fontFamily: 'cursive', mx: 2 }}>
                  {item.quantity}
                </Typography>
                <IconButton
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  sx={{ bgcolor: '#f5f5f5' }}
                >
                  <AddIcon />
                </IconButton>
                <Typography sx={{ fontFamily: 'cursive', ml: 1 }}>ltr</Typography>
              </Box>
              <Typography sx={{ fontFamily: 'cursive' }}>
                {(item.price * item.quantity).toFixed(1)}
              </Typography>
              <IconButton
                onClick={() => removeFromCart(item.id)}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        {/* Cart Summary */}
        <Box sx={{ maxWidth: 400, ml: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontFamily: 'cursive' }}>Subtotal</Typography>
            <Typography sx={{ fontFamily: 'cursive' }}>{cartTotal.subtotal.toFixed(1)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontFamily: 'cursive' }}>Delivery charges</Typography>
            <Typography sx={{ fontFamily: 'cursive' }}>{cartTotal.deliveryCharges}</Typography>
          </Box>
          {cartTotal.discount > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontFamily: 'cursive' }}>
                  Discount ({promoCode})
                </Typography>
                <IconButton
                  size="small"
                  onClick={removePromoCode}
                  sx={{ color: 'error.main', p: 0 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography sx={{ fontFamily: 'cursive', color: 'error.main' }}>
                -{cartTotal.discount.toFixed(1)}
              </Typography>
            </Box>
          )}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
              Grand total
            </Typography>
            <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
              {cartTotal.grandTotal.toFixed(1)}
            </Typography>
          </Box>
          <Button
            fullWidth
            sx={{
              bgcolor: '#90EE90',
              color: 'black',
              py: 1.5,
              borderRadius: '16px',
              fontFamily: 'cursive',
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#98FB98',
              },
            }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to payment
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CartPage;