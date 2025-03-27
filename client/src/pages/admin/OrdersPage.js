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
  IconButton,
  Collapse,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Alert,
  Snackbar,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import AdminNavbar from '../../components/admin/AdminNavbar';

// Sample data - replace with actual data from your backend
const initialOrders = [
  {
    id: 1,
    customerName: 'John Doe',
    phoneNo: '+91 9876543210',
    address: '123 Main St, City, State - 123456',
    orderDate: '2024-02-20T10:30',
    items: [
      { name: 'Fresh Milk', quantity: 2, price: 60 },
      { name: 'Curd', quantity: 1, price: 40 },
    ],
    status: 'live',
    totalAmount: 160,
    discount: 10, // percentage
    promoCode: 'NEW2024',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    phoneNo: '+91 9876543211',
    address: '456 Park Ave, City, State - 123457',
    orderDate: '2024-02-20T09:15',
    items: [
      { name: 'Butter', quantity: 1, price: 50 },
      { name: 'Paneer', quantity: 2, price: 80 },
    ],
    status: 'live',
    totalAmount: 210,
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    phoneNo: '+91 9876543212',
    address: '789 Lake View, City, State - 123458',
    orderDate: '2024-02-20T11:45',
    items: [
      { name: 'Premium Milk', quantity: 3, price: 75 },
      { name: 'Greek Yogurt', quantity: 2, price: 65 },
      { name: 'Cheese', quantity: 1, price: 120 },
    ],
    status: 'live',
    totalAmount: 400,
    discount: 15, // percentage
    promoCode: 'PREMIUM15',
  },
];

const Row = ({ order, onStatusChange }) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('');

  const handleStatusChange = () => {
    setOpenDialog(true);
  };

  const handleConfirmStatus = () => {
    onStatusChange(order.id, deliveryStatus);
    setOpenDialog(false);
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, '&:hover': { bgcolor: '#f5f5f5' } }}>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ fontFamily: 'cursive' }}>{order.customerName}</TableCell>
        <TableCell sx={{ fontFamily: 'cursive' }}>{order.phoneNo}</TableCell>
        <TableCell sx={{ fontFamily: 'cursive' }}>{new Date(order.orderDate).toLocaleString()}</TableCell>
        <TableCell sx={{ fontFamily: 'cursive' }}>₹{order.totalAmount}</TableCell>
        <TableCell>
          {order.status === 'live' ? (
            <Button
              variant="contained"
              onClick={handleStatusChange}
              sx={{
                bgcolor: '#90EE90',
                color: 'black',
                fontFamily: 'cursive',
                '&:hover': { bgcolor: '#7BC47F' },
              }}
            >
              Update Status
            </Button>
          ) : (
            <Chip
              icon={order.status === 'delivered' ? <CheckCircleIcon /> : <CancelIcon />}
              label={order.status === 'delivered' ? 'Delivered' : 'Not Delivered'}
              color={order.status === 'delivered' ? 'success' : 'error'}
              sx={{ fontFamily: 'cursive' }}
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontFamily: 'cursive' }}>
                Order Details
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#FFE4B5' }}>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Item</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Quantity</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontFamily: 'cursive' }}>{item.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'cursive' }}>{item.quantity}</TableCell>
                      <TableCell sx={{ fontFamily: 'cursive' }}>₹{item.price}</TableCell>
                      <TableCell sx={{ fontFamily: 'cursive' }}>₹{item.quantity * item.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Box sx={{ mt: 2, borderTop: '1px dashed #ccc', pt: 2 }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography sx={{ fontFamily: 'cursive' }}>Subtotal:</Typography>
                              <Typography sx={{ fontFamily: 'cursive' }}>₹{order.totalAmount}</Typography>
                            </Box>
                          </Grid>
                          {order.discount > 0 && (
                            <Grid item xs={12}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography sx={{ fontFamily: 'cursive' }}>
                                  Discount ({order.discount}%):
                                  {order.promoCode && (
                                    <span style={{ color: '#666', marginLeft: '8px' }}>
                                      (Promo: {order.promoCode})
                                    </span>
                                  )}
                                </Typography>
                                <Typography sx={{ fontFamily: 'cursive', color: 'error.main' }}>
                                  -₹{(order.totalAmount * order.discount / 100).toFixed(2)}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          <Grid item xs={12}>
                            <Box sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              mt: 1,
                              pt: 1,
                              borderTop: '2px solid #000',
                              fontWeight: 'bold'
                            }}>
                              <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                                Amount to Collect:
                              </Typography>
                              <Typography sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                                ₹{(order.totalAmount - (order.totalAmount * (order.discount || 0) / 100)).toFixed(2)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography
                variant="subtitle1"
                sx={{ mt: 2, fontFamily: 'cursive', fontWeight: 'bold' }}
              >
                Delivery Address:
              </Typography>
              <Typography sx={{ fontFamily: 'cursive' }}>
                {order.address}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'cursive', textAlign: 'center' }}>
          Update Order Status
        </DialogTitle>
        <DialogContent>
          <RadioGroup
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
          >
            <FormControlLabel
              value="delivered"
              control={<Radio />}
              label="Delivered"
              sx={{ fontFamily: 'cursive' }}
            />
            <FormControlLabel
              value="not_delivered"
              control={<Radio />}
              label="Not Delivered"
              sx={{ fontFamily: 'cursive' }}
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              bgcolor: '#FFB6C1',
              color: 'black',
              borderRadius: '20px',
              fontFamily: 'cursive',
              '&:hover': { bgcolor: '#FF69B4' },
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmStatus}
            disabled={!deliveryStatus}
            sx={{
              bgcolor: '#90EE90',
              color: 'black',
              borderRadius: '20px',
              fontFamily: 'cursive',
              '&:hover': { bgcolor: '#7BC47F' },
              px: 3
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' or 'asc'

  const handleStatusChange = (orderId, status) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: status === 'delivered' ? 'delivered' : 'not_delivered' }
          : order
      )
    );
    setAlertMessage(`Order ${status === 'delivered' ? 'delivered' : 'not delivered'} successfully!`);
    setShowAlert(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const liveOrders = orders.filter(order => order.status === 'live');
  
  const pastOrders = orders
    .filter(order => order.status !== 'live')
    .filter(order => 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNo.includes(searchTerm) ||
      new Date(order.orderDate).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <AdminNavbar />

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: '100%', fontFamily: 'cursive' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'cursive',
            fontWeight: 'bold',
            color: 'black',
            mb: 4
          }}
        >
          Orders
        </Typography>

        {/* Live Orders Section */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
          <Typography variant="h5" sx={{ fontFamily: 'cursive', mb: 3 }}>
            Live Orders
          </Typography>
          
          {liveOrders.length === 0 ? (
            <Typography sx={{ fontFamily: 'cursive', textAlign: 'center', color: 'text.secondary', py: 3 }}>
              No live orders at the moment
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#FFE4B5' }}>
                    <TableCell sx={{ width: '50px' }} />
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Customer Name</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Order Date</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Total Amount</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {liveOrders.map((order) => (
                    <Row key={order.id} order={order} onStatusChange={handleStatusChange} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Past Orders Section */}
        <Paper sx={{ p: 3, borderRadius: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'cursive' }}>
              Past Orders
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                placeholder="Search orders..."
                value={searchTerm}
                onChange={handleSearch}
                size="small"
                sx={{
                  width: '250px',
                  '& .MuiInputBase-root': {
                    fontFamily: 'cursive',
                    borderRadius: '20px',
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
              <Button
                variant="outlined"
                onClick={toggleSortOrder}
                startIcon={<SortIcon />}
                sx={{
                  fontFamily: 'cursive',
                  borderRadius: '20px',
                  borderColor: '#90EE90',
                  color: 'black',
                  '&:hover': {
                    borderColor: '#7BC47F',
                    bgcolor: 'rgba(144, 238, 144, 0.1)',
                  }
                }}
              >
                Date {sortOrder === 'desc' ? '(Newest)' : '(Oldest)'}
              </Button>
            </Box>
          </Box>

          {pastOrders.length === 0 ? (
            <Typography sx={{ fontFamily: 'cursive', textAlign: 'center', color: 'text.secondary', py: 3 }}>
              {searchTerm ? 'No orders match your search' : 'No past orders to display'}
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#FFE4B5' }}>
                    <TableCell sx={{ width: '50px' }} />
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Customer Name</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Order Date</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Total Amount</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pastOrders.map((order) => (
                    <Row key={order.id} order={order} onStatusChange={handleStatusChange} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default OrdersPage; 