import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminNavbar from '../../components/admin/AdminNavbar';

const SubscribersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'oldest'

  // Mock data for subscribers with current dates
  const [subscribers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      address: '123, Main Street, City',
      subscribedDate: new Date().toISOString().split('T')[0], // Today's date
      subscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString().split('T')[0], // 25 days from today
      subscriptionDetails: {
        items: [
          { name: 'Fresh Milk', quantity: '2L' },
          { name: 'Curd', quantity: '500g' },
          { name: 'Butter', quantity: '100g' }
        ],
        totalAmount: 1200,
        status: 'Active'
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+91 98765 43211',
      address: '456, Park Avenue, City',
      subscribedDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0], // 5 days ago
      subscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], // 5 days from today
      subscriptionDetails: {
        items: [
          { name: 'Fresh Milk', quantity: '1L' },
          { name: 'Curd', quantity: '250g' }
        ],
        totalAmount: 600,
        status: 'Active'
      }
    },
    // Add more mock data as needed
  ]);

  // Calculate remaining days
  const calculateRemainingDays = (endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0); // Reset time to start of day
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOpenDialog = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSubscriber(null);
  };

  // Filter and sort subscribers
  const filteredSubscribers = subscribers
    .filter(subscriber =>
      subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.phone.includes(searchQuery) ||
      subscriber.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.subscribedDate);
      const dateB = new Date(b.subscribedDate);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <AdminNavbar />
      
      <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              color: 'black'
            }}
          >
            Subscribers
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel sx={{ fontFamily: 'cursive' }}>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
                sx={{
                  fontFamily: 'cursive',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    bgcolor: 'white',
                  },
                }}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Search subscribers..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                width: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  bgcolor: 'white',
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'cursive',
                },
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'cursive',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Subscribers Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#FFE4B5' }}>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Address</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Subscribed Date</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Days Remaining</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                  <TableCell sx={{ fontFamily: 'cursive' }}>{subscriber.name}</TableCell>
                  <TableCell sx={{ fontFamily: 'cursive' }}>{subscriber.phone}</TableCell>
                  <TableCell sx={{ fontFamily: 'cursive' }}>{subscriber.address}</TableCell>
                  <TableCell sx={{ fontFamily: 'cursive' }}>{subscriber.subscribedDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${calculateRemainingDays(subscriber.subscriptionEndDate)} days`}
                      color={calculateRemainingDays(subscriber.subscriptionEndDate) <= 7 ? 'error' : 'success'}
                      size="small"
                      sx={{ fontFamily: 'cursive' }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDialog(subscriber)}
                      sx={{ color: '#90EE90' }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Subscription Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            width: '100%',
            maxWidth: '600px'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'cursive', fontWeight: 'bold', textAlign: 'center' }}>
          Subscription Details
        </DialogTitle>
        <DialogContent>
          {selectedSubscriber && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: 'cursive', mb: 2 }}>
                {selectedSubscriber.name}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Contact Information</Typography>
                <Typography sx={{ fontFamily: 'cursive' }}>Email: {selectedSubscriber.email}</Typography>
                <Typography sx={{ fontFamily: 'cursive' }}>Phone: {selectedSubscriber.phone}</Typography>
                <Typography sx={{ fontFamily: 'cursive' }}>Address: {selectedSubscriber.address}</Typography>
                <Typography sx={{ fontFamily: 'cursive' }}>Subscribed Date: {selectedSubscriber.subscribedDate}</Typography>
                <Typography sx={{ fontFamily: 'cursive' }}>Subscription End: {selectedSubscriber.subscriptionEndDate}</Typography>
              </Box>

              <Box>
                <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold', mb: 1 }}>Ordered Items</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'cursive' }}>Item</TableCell>
                      <TableCell sx={{ fontFamily: 'cursive' }}>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedSubscriber.subscriptionDetails.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontFamily: 'cursive' }}>{item.name}</TableCell>
                        <TableCell sx={{ fontFamily: 'cursive' }}>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              bgcolor: '#FFB6C1',
              color: 'black',
              borderRadius: '20px',
              fontFamily: 'cursive',
              '&:hover': {
                bgcolor: '#FF69B4',
              },
              px: 3
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscribersPage; 