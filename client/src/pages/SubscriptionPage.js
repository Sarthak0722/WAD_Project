import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  useTheme,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert,
  DialogContentText,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  CardMedia
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { getProducts } from '../services/productService';

const SubscriptionPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(user?.isSubscribed || false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      // Filter only milk products and get the first variant
      const milkProducts = data
        .filter(product => product.category.toLowerCase() === 'milk')
        .map(product => ({
          ...product,
          defaultVariant: product.variants[0] || { price: 0, quantity: 1, unit: 'L' }
        }));
      setProducts(milkProducts);
      
      // Initialize selected products with quantity 0
      const initialSelected = {};
      milkProducts.forEach(product => {
        initialSelected[product._id] = { 
          quantity: 0, 
          price: product.defaultVariant.price,
          name: product.name
        };
      });
      setSelectedProducts(initialSelected);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubscriptionAmount = () => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const remainingDays = lastDayOfMonth.getDate() - today.getDate() + 1;

    let totalAmount = 0;
    Object.entries(selectedProducts).forEach(([_, data]) => {
      if (data.quantity > 0) {
        const dailyAmount = data.quantity * data.price;
        totalAmount += dailyAmount * remainingDays;
      }
    });

    return totalAmount.toFixed(2);
  };

  const calculateDailyAmount = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  const handleQuantityChange = (productId, change) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: Math.max(0, prev[productId].quantity + change)
      }
    }));
  };

  const handleBuySubscription = () => {
    const subscriptionAmount = parseFloat(calculateSubscriptionAmount());
    if (subscriptionAmount === 0) {
      alert('Please select at least one product');
      return;
    }

    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const remainingDays = lastDayOfMonth.getDate() - today.getDate() + 1;

    // Add subscription to cart
    addToCart({
      id: 'subscription',
      title: 'Monthly Milk Subscription',
      price: subscriptionAmount,
      image: '/images/subscription.jpeg',
      quantity: 1,
      products: Object.entries(selectedProducts)
        .filter(([_, data]) => data.quantity > 0)
        .map(([productId, data]) => ({
          id: productId,
          name: data.name,
          quantity: data.quantity,
          price: data.price,
          dailyAmount: calculateDailyAmount(data.quantity, data.price),
          remainingDays
        }))
    });
    navigate('/cart');
  };

  if (isSubscribed) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center'
            }}
          >
            You are already subscribed!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/shop')}
            sx={{
              bgcolor: '#4CAF50',
              color: 'white',
              '&:hover': {
                bgcolor: '#45a049'
              },
              fontFamily: 'cursive',
              py: 1.5,
              px: 4,
              display: 'block',
              mx: 'auto'
            }}
          >
            Continue Shopping
          </Button>
        </Container>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'cursive',
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Create Your Monthly Subscription
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: '#f5f5f5',
            mb: 4
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Select Products for Daily Delivery
          </Typography>
          <Typography
            sx={{
              fontFamily: 'cursive',
              mb: 3,
              color: 'text.secondary'
            }}
          >
            Choose the products you want to receive daily. The subscription amount will be calculated based on the remaining days in this month.
          </Typography>

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: selectedProducts[product._id]?.quantity > 0 ? '#e3f2fd' : 'white'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'contain', p: 2 }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'cursive',
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'cursive',
                        color: 'text.secondary'
                      }}
                    >
                      ₹{product.defaultVariant.price} per {product.defaultVariant.unit}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <IconButton
                      onClick={() => handleQuantityChange(product._id, -1)}
                      disabled={selectedProducts[product._id]?.quantity === 0}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2, fontFamily: 'cursive' }}>
                      {selectedProducts[product._id]?.quantity || 0} {product.defaultVariant.unit}
                    </Typography>
                    <IconButton onClick={() => handleQuantityChange(product._id, 1)}>
                      <AddIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: '#f5f5f5'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Subscription Summary
          </Typography>
          <Stack spacing={2} sx={{ mb: 3 }}>
            {Object.entries(selectedProducts).map(([productId, data]) => {
              if (data.quantity > 0) {
                const product = products.find(p => p._id === productId);
                const dailyAmount = calculateDailyAmount(data.quantity, data.price);
                return (
                  <Box
                    key={productId}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography sx={{ fontFamily: 'cursive' }}>
                      {product.name} ({data.quantity} {product.defaultVariant.unit}/day)
                    </Typography>
                    <Typography sx={{ fontFamily: 'cursive' }}>
                      ₹{dailyAmount}/day
                    </Typography>
                  </Box>
                );
              }
              return null;
            })}
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              mb: 3
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontFamily: 'cursive' }}>
                Remaining days in this month
              </Typography>
              <Typography sx={{ fontFamily: 'cursive' }}>
                {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate() + 1} days
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                sx={{
                  fontFamily: 'cursive',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                Total Monthly Subscription
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'cursive',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                ₹{calculateSubscriptionAmount()}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleBuySubscription}
            fullWidth
            sx={{
              bgcolor: '#4CAF50',
              color: 'white',
              '&:hover': {
                bgcolor: '#45a049'
              },
              fontFamily: 'cursive',
              py: 1.5
            }}
          >
            Add to Cart
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default SubscriptionPage; 