import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  useTheme,
  Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SubscriptionPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isSubscribed, setIsSubscribed] = useState(true); // This would come from your auth/subscription context

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Mock delivery data - in a real app, this would come from your backend
  const deliveryStatus = {
    1: true,  // delivered
    2: false, // not delivered
    3: true,
    4: true,
    5: false,
    6: false,
    7: true,
  };

  const handleBuySubscription = () => {
    // Add subscription to cart
    addToCart({
      id: 'subscription',
      title: 'Monthly Milk Subscription',
      price: 999,
      image: '/milk-subscription.png',
      quantity: 1
    });
    // Navigate to cart
    navigate('/cart');
  };

  const handleCancelSubscription = () => {
    setIsSubscribed(false);
  };

  const getDeliveryIcon = (day) => {
    if (!deliveryStatus.hasOwnProperty(day)) return null;
    
    return deliveryStatus[day] ? (
      <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
    ) : (
      <CancelIcon sx={{ color: 'error.main', fontSize: 20 }} />
    );
  };

  if (!isSubscribed) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Subscribe for Daily Delivery
          </Typography>
          <Typography
            sx={{
              fontFamily: 'cursive',
              fontSize: '1.2rem',
              color: 'text.secondary',
              mb: 4
            }}
          >
            Get fresh dairy products delivered to your doorstep every morning!
            Subscribe now and enjoy:
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontFamily: 'cursive',
                fontSize: '1.1rem',
                mb: 1
              }}
            >
              • Fresh milk delivered daily
            </Typography>
            <Typography
              sx={{
                fontFamily: 'cursive',
                fontSize: '1.1rem',
                mb: 1
              }}
            >
              • No delivery charges
            </Typography>
            <Typography
              sx={{
                fontFamily: 'cursive',
                fontSize: '1.1rem',
                mb: 1
              }}
            >
              • Flexible delivery schedule
            </Typography>
            <Typography
              sx={{
                fontFamily: 'cursive',
                fontSize: '1.1rem',
                mb: 1
              }}
            >
              • Cancel anytime
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleBuySubscription}
            sx={{
              bgcolor: '#b2ebf2',
              color: 'black',
              py: 2,
              px: 4,
              borderRadius: '25px',
              fontFamily: 'cursive',
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#81d4fa',
              },
            }}
          >
            Buy Subscription
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Header with Title and Actions */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Box>
            <Typography sx={{ fontFamily: 'cursive', fontSize: '1.1rem', mb: 1 }}>
              Start date: 01/01/2024
            </Typography>
            <Typography sx={{ fontFamily: 'cursive', fontSize: '1.1rem' }}>
              End date: 01/02/2024
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Monthly subscription calendar
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#90EE90',
                color: 'black',
                py: 1,
                px: 3,
                borderRadius: '20px',
                fontFamily: 'cursive',
                '&:hover': {
                  bgcolor: '#7BC47F',
                },
              }}
            >
              Edit subscription
            </Button>
            <Button
              variant="contained"
              onClick={handleCancelSubscription}
              sx={{
                bgcolor: '#FFB6C1',
                color: 'black',
                py: 1,
                px: 3,
                borderRadius: '20px',
                fontFamily: 'cursive',
                '&:hover': {
                  bgcolor: '#FF69B4',
                },
              }}
            >
              Cancel subscription
            </Button>
          </Stack>
        </Box>

        {/* Calendar */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: '24px',
            overflow: 'hidden',
            bgcolor: 'white',
          }}
        >
          {/* Month and Year */}
          <Box sx={{ textAlign: 'right', p: 2 }}>
            <Typography
              sx={{
                fontFamily: 'cursive',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              January 2024
            </Typography>
          </Box>

          {/* Days of Week Header */}
          <Grid
            container
            sx={{
              bgcolor: '#FFE4B5',
              borderRadius: '16px 16px 0 0',
              mb: 1
            }}
          >
            {daysOfWeek.map((day) => (
              <Grid
                item
                key={day}
                xs
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRight: '1px solid rgba(0,0,0,0.1)',
                  '&:last-child': {
                    borderRight: 'none'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'cursive',
                    fontWeight: 'bold'
                  }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Calendar Grid */}
          <Box sx={{ p: 1 }}>
            {[...Array(5)].map((_, weekIndex) => (
              <Grid
                container
                key={weekIndex}
                sx={{
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  '&:last-child': {
                    borderBottom: 'none'
                  }
                }}
              >
                {[...Array(7)].map((__, dayIndex) => {
                  const day = weekIndex * 7 + dayIndex + 1;
                  return (
                    <Grid
                      item
                      xs
                      key={dayIndex}
                      sx={{
                        height: 80,
                        p: 1,
                        borderRight: '1px solid rgba(0,0,0,0.1)',
                        '&:last-child': {
                          borderRight: 'none'
                        },
                        bgcolor: '#E0FFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                    >
                      {day <= 31 && (
                        <>
                          <Typography
                            sx={{
                              fontFamily: 'cursive',
                              fontSize: '1.2rem',
                              fontWeight: 'bold'
                            }}
                          >
                            {day}
                          </Typography>
                          {getDeliveryIcon(day)}
                        </>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SubscriptionPage; 