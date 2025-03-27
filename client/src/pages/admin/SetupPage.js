import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Switch,
  TextField,
  Button,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  InputAdornment,
  Avatar,
  Alert,
  Snackbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AdminNavbar from '../../components/admin/AdminNavbar';

const SetupPage = () => {
  // Delivery Settings State
  const [deliverySettings, setDeliverySettings] = useState({
    isDeliveryAvailable: true,
    deliveryRange: 10,
    deliveryCharges: 40,
  });

  // Offers State
  const [offers, setOffers] = useState([
    {
      id: 1,
      name: 'New Year Special',
      startDate: '2024-02-20T10:00',
      endDate: '2024-03-20T23:59',
      discount: 15,
      promoCode: 'NEW2024',
      bannerImage: 'offer1.jpg',
    },
  ]);

  // Dialog States
  const [openOfferDialog, setOpenOfferDialog] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offerFormData, setOfferFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    discount: '',
    promoCode: '',
    bannerImage: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteOfferId, setDeleteOfferId] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Handle Delivery Settings Change
  const handleDeliverySettingChange = (event) => {
    const { name, value, checked } = event.target;
    const newSettings = {
      ...deliverySettings,
      [name]: name === 'isDeliveryAvailable' ? checked : value
    };
    setDeliverySettings(newSettings);
  };

  // Apply Delivery Settings
  const handleApplyDeliverySettings = () => {
    // Here you would typically save to backend
    console.log('Applying delivery settings:', deliverySettings);
    setShowSuccessAlert(true);
  };

  // Handle Offer Dialog
  const handleOpenOfferDialog = (offer = null) => {
    if (offer) {
      setSelectedOffer(offer);
      setOfferFormData(offer);
      setImagePreview(offer.bannerImage);
    } else {
      setSelectedOffer(null);
      setOfferFormData({
        name: '',
        startDate: '',
        endDate: '',
        discount: '',
        promoCode: '',
        bannerImage: '',
      });
      setImagePreview(null);
    }
    setOpenOfferDialog(true);
  };

  const handleCloseOfferDialog = () => {
    setOpenOfferDialog(false);
    setSelectedOffer(null);
    setOfferFormData({
      name: '',
      startDate: '',
      endDate: '',
      discount: '',
      promoCode: '',
      bannerImage: '',
    });
    setImagePreview(null);
  };

  // Handle Offer Form Changes
  const handleOfferInputChange = (event) => {
    const { name, value } = event.target;
    setOfferFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setOfferFormData(prev => ({
          ...prev,
          bannerImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Offer
  const handleSaveOffer = () => {
    if (selectedOffer) {
      setOffers(prev => prev.map(offer => 
        offer.id === selectedOffer.id ? { ...offerFormData, id: offer.id } : offer
      ));
    } else {
      setOffers(prev => [...prev, { ...offerFormData, id: prev.length + 1 }]);
    }
    handleCloseOfferDialog();
  };

  // Delete Offer with Confirmation
  const handleConfirmDelete = () => {
    setOffers(prev => prev.filter(offer => offer.id !== deleteOfferId));
    handleCloseDeleteDialog();
  };

  // Handle Delete Dialog
  const handleOpenDeleteDialog = (offerId) => {
    setDeleteOfferId(offerId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteOfferId(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <AdminNavbar />
      
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccessAlert(false)} 
          severity="success" 
          sx={{ width: '100%', fontFamily: 'cursive' }}
        >
          Delivery settings applied successfully!
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
          Setup
        </Typography>

        {/* Delivery Settings Section */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
          <Typography variant="h5" sx={{ fontFamily: 'cursive', mb: 3 }}>
            Delivery Setup
          </Typography>
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontFamily: 'cursive', mr: 2 }}>
                  Delivery Available
                </Typography>
                <Switch
                  checked={deliverySettings.isDeliveryAvailable}
                  onChange={handleDeliverySettingChange}
                  name="isDeliveryAvailable"
                  color="success"
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Delivery Range"
                type="number"
                name="deliveryRange"
                value={deliverySettings.deliveryRange}
                onChange={handleDeliverySettingChange}
                disabled={!deliverySettings.isDeliveryAvailable}
                InputProps={{
                  endAdornment: <InputAdornment position="end">km</InputAdornment>,
                }}
                sx={{
                  '& .MuiInputLabel-root': { fontFamily: 'cursive' },
                  '& .MuiOutlinedInput-root': { fontFamily: 'cursive' }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Delivery Charges"
                type="number"
                name="deliveryCharges"
                value={deliverySettings.deliveryCharges}
                onChange={handleDeliverySettingChange}
                disabled={!deliverySettings.isDeliveryAvailable}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{
                  '& .MuiInputLabel-root': { fontFamily: 'cursive' },
                  '& .MuiOutlinedInput-root': { fontFamily: 'cursive' }
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleApplyDeliverySettings}
              sx={{
                bgcolor: '#90EE90',
                color: 'black',
                fontFamily: 'cursive',
                '&:hover': {
                  bgcolor: '#7BC47F',
                },
              }}
            >
              Apply
            </Button>
          </Box>
        </Paper>

        {/* Offers Section */}
        <Paper sx={{ p: 3, borderRadius: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: 'cursive' }}>
              Offers Setup
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenOfferDialog()}
              sx={{
                bgcolor: '#90EE90',
                color: 'black',
                fontFamily: 'cursive',
                '&:hover': {
                  bgcolor: '#7BC47F',
                },
              }}
            >
              Add New Offer
            </Button>
          </Box>

          {offers.length === 0 ? (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                py: 4
              }}
            >
              <Typography 
                sx={{ 
                  fontFamily: 'cursive', 
                  color: 'text.secondary',
                  mb: 2 
                }}
              >
                No offers available
              </Typography>
              <Typography 
                sx={{ 
                  fontFamily: 'cursive', 
                  color: 'text.secondary' 
                }}
              >
                Click the 'Add New Offer' button to create your first offer
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#FFE4B5' }}>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Banner</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Duration</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Discount</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Promo Code</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer.id} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                      <TableCell>
                        <Avatar
                          src={offer.bannerImage}
                          alt={offer.name}
                          variant="rounded"
                          sx={{ width: 60, height: 40 }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'cursive' }}>{offer.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'cursive' }}>
                        {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'cursive' }}>{offer.discount}%</TableCell>
                      <TableCell sx={{ fontFamily: 'cursive' }}>{offer.promoCode}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenOfferDialog(offer)}
                          sx={{ color: '#90EE90' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenDeleteDialog(offer.id)}
                          sx={{ color: '#FFB6C1' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>

      {/* Add/Edit Offer Dialog */}
      <Dialog
        open={openOfferDialog}
        onClose={handleCloseOfferDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            width: '100%',
            maxWidth: '600px'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'cursive', fontWeight: 'bold', textAlign: 'center' }}>
          {selectedOffer ? 'Edit Offer' : 'Add New Offer'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Offer Name"
              name="name"
              value={offerFormData.name}
              onChange={handleOfferInputChange}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': { fontFamily: 'cursive' },
                '& .MuiOutlinedInput-root': { fontFamily: 'cursive' }
              }}
            />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date & Time"
                  type="datetime-local"
                  name="startDate"
                  value={offerFormData.startDate}
                  onChange={handleOfferInputChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiInputLabel-root': { fontFamily: 'cursive' },
                    '& .MuiOutlinedInput-root': { fontFamily: 'cursive' }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="End Date & Time"
                  type="datetime-local"
                  name="endDate"
                  value={offerFormData.endDate}
                  onChange={handleOfferInputChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiInputLabel-root': { fontFamily: 'cursive' },
                    '& .MuiOutlinedInput-root': { fontFamily: 'cursive' }
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Discount Percentage"
                  type="number"
                  name="discount"
                  value={offerFormData.discount}
                  onChange={handleOfferInputChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  sx={{
                    '& .MuiInputLabel-root': { fontFamily: 'cursive' },
                    '& .MuiOutlinedInput-root': { fontFamily: 'cursive' }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Promo Code"
                  name="promoCode"
                  value={offerFormData.promoCode}
                  onChange={handleOfferInputChange}
                  sx={{
                    '& .MuiInputLabel-root': { fontFamily: 'cursive' },
                    '& .MuiOutlinedInput-root': { fontFamily: 'cursive' }
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="banner-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="banner-image-upload">
                <Button
                  component="span"
                  variant="outlined"
                  sx={{
                    width: '100%',
                    fontFamily: 'cursive',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  {imagePreview ? 'Change Banner Image' : 'Upload Banner Image'}
                </Button>
              </label>
              {imagePreview && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={imagePreview}
                    alt="Banner Preview"
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px', borderRadius: '8px' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button
            onClick={handleCloseOfferDialog}
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
            Cancel
          </Button>
          <Button
            onClick={handleSaveOffer}
            disabled={!offerFormData.name || !offerFormData.startDate || !offerFormData.endDate || !offerFormData.discount || !offerFormData.promoCode}
            sx={{
              bgcolor: '#90EE90',
              color: 'black',
              borderRadius: '20px',
              fontFamily: 'cursive',
              '&:hover': {
                bgcolor: '#7BC47F',
              },
              px: 3
            }}
          >
            {selectedOffer ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'cursive', textAlign: 'center' }}>
          Delete Offer
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: 'cursive', textAlign: 'center' }}>
            Are you sure you want to delete this offer?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{
              bgcolor: '#90EE90',
              color: 'black',
              borderRadius: '20px',
              fontFamily: 'cursive',
              '&:hover': {
                bgcolor: '#7BC47F',
              },
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
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
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SetupPage; 