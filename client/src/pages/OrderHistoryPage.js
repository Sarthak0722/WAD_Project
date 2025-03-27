import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Paper,
  Chip,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Tooltip,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Navbar from '../components/Navbar';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    if (!status) return <PendingIcon sx={{ color: 'warning.main' }} />;
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'processing':
        return <PendingIcon sx={{ color: 'warning.main' }} />;
      case 'cancelled':
        return <CancelIcon sx={{ color: 'error.main' }} />;
      case 'shipping':
        return <LocalShippingIcon sx={{ color: 'info.main' }} />;
      default:
        return <PendingIcon sx={{ color: 'warning.main' }} />;
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'warning';
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'shipping':
        return 'info';
      default:
        return 'warning';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery
      ? order.items.some(item =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;
    const matchesStatus = statusFilter === 'all' || order.status?.toLowerCase() === statusFilter;
    const matchesDate = (!startDate || new Date(order.date) >= startDate) &&
      (!endDate || new Date(order.date) <= endDate);
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Empty state
  if (orders.length === 0) {
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
          <HistoryIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            No Order History
          </Typography>
          <Typography
            sx={{
              fontFamily: 'cursive',
              color: 'text.secondary',
              textAlign: 'center',
              fontSize: '1.1rem'
            }}
          >
            You haven't placed any orders yet.
            Start shopping to create your first order!
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
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <HistoryIcon sx={{ fontSize: 40 }} />
            <Typography variant="h3" sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
              Order History
            </Typography>
            <HistoryIcon sx={{ fontSize: 40 }} />
          </Box>
        </Box>

        {/* Filters */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Orders</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="shipping">Shipping</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label="From Date"
                  value={startDate}
                  onChange={setStartDate}
                  sx={{ flex: 1 }}
                />
                <DatePicker
                  label="To Date"
                  value={endDate}
                  onChange={setEndDate}
                  sx={{ flex: 1 }}
                />
              </Box>
            </LocalizationProvider>
          </Grid>
        </Grid>

        {/* Orders List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredOrders.map((order) => (
            <Paper
              key={order.id}
              elevation={2}
              sx={{
                p: 3,
                borderRadius: '16px',
                bgcolor: '#f8f9fa',
                '&:hover': {
                  bgcolor: '#f0f1f2',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                  Order #{order.id}
                </Typography>
                <Chip
                  icon={getStatusIcon(order.status)}
                  label={order.status?.toUpperCase()}
                  color={getStatusColor(order.status)}
                  variant="outlined"
                />
              </Box>
              {order.items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                    p: 2,
                    bgcolor: '#b2ebf2',
                    borderRadius: '12px'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontFamily: 'cursive', color: 'text.secondary' }}>
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                    ₹{item.price}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography sx={{ fontFamily: 'cursive', color: 'text.secondary' }}>
                  Ordered on {new Date(order.date).toLocaleDateString()}
                </Typography>
                <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                  Total: ₹{order.total}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {filteredOrders.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography sx={{ fontFamily: 'cursive', color: 'text.secondary' }}>
              No orders found matching your filters
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default OrderHistoryPage; 