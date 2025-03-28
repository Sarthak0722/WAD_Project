import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  InputAdornment,
  Chip,
  Autocomplete,
  Avatar,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { getAllProducts, createProduct, updateProduct, deleteProduct, updateStock } from '../../services/productService';
import { useAuth } from '../../contexts/AuthContext';

const AdminHomePage = () => {
  const { token } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['Milk', 'Dairy', 'Ice Cream', 'Yoghurt', 'Butter', 'Cream', 'Cheese', 'Other']);
  const [brands, setBrands] = useState(['AMUL', 'Mother Dairy', 'Nestle', 'Britannia', 'Parag', 'Gokul', 'Govardhan']);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [stockAdjustment, setStockAdjustment] = useState({ type: 'add', amount: 0 });
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    stock: '',
    unit: '',
    image: ''
  });

  const units = ['Litre', 'Kg', 'Piece', 'Pack', 'Box'];

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await getAllProducts(token);
      setInventoryItems(products);
      // Update categories and brands from actual data
      const uniqueCategories = [...new Set(products.map(item => item.category))];
      const uniqueBrands = [...new Set(products.map(item => item.brand))];
      setCategories(uniqueCategories);
      setBrands(uniqueBrands);
    } catch (error) {
      setError(error.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on search query and selected brand
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !selectedBrand || item.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  // Group items by category
  const itemsByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
      setImagePreview(item.image);
      setStockAdjustment({ type: 'add', amount: 0 });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        brand: '',
        category: '',
        price: '',
        stock: '',
        unit: '',
        image: ''
      });
      setImagePreview(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      name: '',
      brand: '',
      category: '',
      price: '',
      stock: '',
      unit: '',
      image: ''
    });
    setImagePreview(null);
  };

  const handleOpenCategoryDialog = () => {
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setNewCategory('');
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prev => [...prev, newCategory]);
      // Switch to the new category tab
      setSelectedTab(categories.length + 1);
    }
    handleCloseCategoryDialog();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData(prev => ({
          ...prev,
          image: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStockAdjustment = (e) => {
    const { name, value } = e.target;
    if (name === 'stockAdjustmentType') {
      setStockAdjustment(prev => ({ ...prev, type: value }));
    } else {
      setStockAdjustment(prev => ({ ...prev, amount: parseInt(value) || 0 }));
    }

    // Calculate new stock value
    const currentStock = editingItem ? editingItem.stock : 0;
    const adjustmentAmount = parseInt(value) || 0;
    const newStock = name === 'stockAdjustmentAmount' 
      ? (stockAdjustment.type === 'add' 
        ? currentStock + adjustmentAmount 
        : currentStock - adjustmentAmount)
      : currentStock;

    setFormData(prev => ({
      ...prev,
      stock: newStock
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name?.trim() || !formData.brand?.trim() || !formData.category?.trim() || 
          !formData.price || !formData.stock || !formData.unit || !formData.image) {
        throw new Error('Please fill in all required fields');
      }

      // Validate and format the data
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        isActive: true,
        createdAt: new Date().toISOString()
      };

      // Add new brand to the list if it doesn't exist
      if (productData.brand && !brands.includes(productData.brand)) {
        setBrands(prev => [...prev, productData.brand]);
      }

      // Add new category to the list if it doesn't exist
      if (productData.category && !categories.includes(productData.category)) {
        setCategories(prev => [...prev, productData.category]);
      }

      if (editingItem) {
        await updateProduct(editingItem._id, productData);
        setSuccessMessage('Product updated successfully');
      } else {
        await createProduct(productData);
        setSuccessMessage('Product added successfully');
      }
      fetchProducts();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error.response?.data?.message || error.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, token);
      setSuccessMessage('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      setError(error.message || 'Error deleting product');
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    // Check if there are any products in this category
    const productsInCategory = inventoryItems.filter(item => item.category === categoryToDelete);
    
    if (productsInCategory.length > 0) {
      setError('Cannot delete category that contains products. Please remove or reassign all products first.');
      return;
    }
    
    setCategories(prev => prev.filter(category => category !== categoryToDelete));
    // If we're on the tab being deleted, switch to All Products
    if (categories[selectedTab - 1] === categoryToDelete) {
      setSelectedTab(0);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <AdminNavbar />
      
      <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
        {/* Header Section with Search and Filter */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              color: 'black'
            }}
          >
            Manage The Inventory
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Search products..."
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
            <Autocomplete
              options={brands}
              value={selectedBrand}
              onChange={handleBrandChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Filter by brand"
                  sx={{
                    width: 200,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                      bgcolor: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      fontFamily: 'cursive',
                    },
                    '& .MuiOutlinedInput-input': {
                      fontFamily: 'cursive',
                    }
                  }}
                />
              )}
            />
            <Button
              variant="contained"
              onClick={() => handleOpenDialog()}
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#90EE90',
                color: 'black',
                borderRadius: '20px',
                fontFamily: 'cursive',
                '&:hover': {
                  bgcolor: '#7BC47F',
                },
              }}
            >
              Add Product
            </Button>
          </Box>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={handleOpenCategoryDialog}
            sx={{
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              mr: 1,
            }}
          >
            <AddIcon />
          </IconButton>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{
              flexGrow: 1,
              '& .MuiTab-root': {
                fontFamily: 'cursive',
                textTransform: 'none',
                fontSize: '1rem',
                color: 'black',
                '&.Mui-selected': {
                  color: 'black',
                  fontWeight: 'bold',
                },
              },
            }}
          >
            <Tab label="All Products" />
            {categories.map((category) => (
              <Tab 
                key={category} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {category}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category);
                      }}
                      style={{
                        cursor: 'pointer',
                        color: 'rgba(0, 0, 0, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '16px',
                        height: '16px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.8)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.4)';
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '12px' }} />
                    </span>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>

        {/* Inventory Table */}
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
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Brand</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Stock</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Unit</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'cursive', color: 'text.secondary' }}>
                      Loading...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (selectedTab === 0 ? filteredItems : itemsByCategory[categories[selectedTab - 1]] || []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'cursive', color: 'text.secondary' }}>
                      Inventory is empty. Please add products.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                (selectedTab === 0 ? filteredItems : itemsByCategory[categories[selectedTab - 1]] || []).map((item) => (
                  <TableRow key={item._id} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                    <TableCell>
                      <Avatar
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 40, height: 40, borderRadius: '8px' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{item.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{item.brand}</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{item.category}</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>₹{item.price}</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{item.stock}</TableCell>
                    <TableCell sx={{ fontFamily: 'cursive' }}>{item.unit}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenDialog(item)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(item._id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Add/Edit Product Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            overflowY: 'auto'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'cursive', pb: 1 }}>
          {editingItem ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              sx={{ 
                mb: 3,
                '& .MuiInputLabel-root': {
                  fontFamily: 'cursive'
                },
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'cursive'
                }
              }}
            />

            <Autocomplete
              freeSolo
              options={brands}
              value={formData.brand}
              onChange={(event, newValue) => {
                setFormData(prev => ({
                  ...prev,
                  brand: newValue || ''
                }));
              }}
              onInputChange={(event, newInputValue) => {
                setFormData(prev => ({
                  ...prev,
                  brand: newInputValue
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  margin="normal"
                  fullWidth
                  sx={{ 
                    mb: 2,
                    '& .MuiInputLabel-root': {
                      fontFamily: 'cursive'
                    },
                    '& .MuiOutlinedInput-root': {
                      fontFamily: 'cursive'
                    }
                  }}
                />
              )}
            />

            <Autocomplete
              freeSolo
              options={categories}
              value={formData.category}
              onChange={(event, newValue) => {
                setFormData(prev => ({
                  ...prev,
                  category: newValue || ''
                }));
              }}
              onInputChange={(event, newInputValue) => {
                setFormData(prev => ({
                  ...prev,
                  category: newInputValue
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  margin="normal"
                  fullWidth
                  sx={{ 
                    mb: 2,
                    '& .MuiInputLabel-root': {
                      fontFamily: 'cursive'
                    },
                    '& .MuiOutlinedInput-root': {
                      fontFamily: 'cursive'
                    }
                  }}
                />
              )}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              inputProps={{ min: 0, step: 0.01 }}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': {
                  fontFamily: 'cursive'
                },
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'cursive'
                }
              }}
            />

            {/* Stock Section */}
            {editingItem ? (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontFamily: 'cursive' }}>
                  Current Stock: {editingItem.stock}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ fontFamily: 'cursive' }}>Action</InputLabel>
                    <Select
                      name="stockAdjustmentType"
                      value={stockAdjustment.type}
                      onChange={handleStockAdjustment}
                      sx={{ fontFamily: 'cursive' }}
                    >
                      <MenuItem value="add">Add</MenuItem>
                      <MenuItem value="subtract">Subtract</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    name="stockAdjustmentAmount"
                    label="Amount"
                    type="number"
                    value={stockAdjustment.amount}
                    onChange={handleStockAdjustment}
                    inputProps={{ min: 0 }}
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontFamily: 'cursive'
                      },
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'cursive'
                      }
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <TextField
                margin="normal"
                fullWidth
                label="Initial Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                inputProps={{ min: 0 }}
                sx={{ 
                  mb: 3,
                  '& .MuiInputLabel-root': {
                    fontFamily: 'cursive'
                  },
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'cursive'
                  }
                }}
              />
            )}

            {/* Unit Selection */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ fontFamily: 'cursive' }}>Unit</InputLabel>
              <Select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                sx={{ 
                  fontFamily: 'cursive',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                }}
              >
                {units.map((unit) => (
                  <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Image Upload */}
            <Box sx={{ mb: 3 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button
                  component="span"
                  variant="outlined"
                  sx={{
                    fontFamily: 'cursive',
                    mb: 2
                  }}
                >
                  Upload Image
                </Button>
              </label>
              {imagePreview && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
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
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !formData.name?.trim() ||
              !formData.brand?.trim() ||
              !formData.category?.trim() ||
              !formData.price ||
              !formData.stock ||
              !formData.unit ||
              !formData.image
            }
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
            {editingItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <DialogTitle sx={{ fontFamily: 'cursive' }}>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ 
              '& .MuiInputLabel-root': {
                fontFamily: 'cursive'
              },
              '& .MuiOutlinedInput-root': {
                fontFamily: 'cursive'
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseCategoryDialog}
            sx={{
              fontFamily: 'cursive',
              color: 'text.secondary'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddCategory}
            disabled={!newCategory}
            sx={{
              fontFamily: 'cursive',
              color: 'primary.main'
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminHomePage;