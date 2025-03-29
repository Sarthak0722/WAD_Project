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
  Collapse,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { getAllProducts, createProduct, updateProduct, deleteProduct, updateStock } from '../../services/productService';
import { useAuth } from '../../contexts/AuthContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  const [imagePreview, setImagePreview] = useState('');
  const [stockAdjustment, setStockAdjustment] = useState({ type: 'add', amount: 0 });
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    baseUnit: '',
    variants: [],
    image: ''
  });

  const units = ['ml', 'L', 'g', 'kg', 'piece', 'pack'];

  const [currentVariant, setCurrentVariant] = useState({
    quantity: '',
    unit: '',
    price: '',
    stock: ''
  });

  const [expandedRows, setExpandedRows] = useState(new Set());

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
        baseUnit: '',
        variants: [],
        image: ''
      });
      setImagePreview('');
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
      baseUnit: '',
      variants: [],
      image: ''
    });
    setImagePreview('');
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
        setImagePreview(reader.result);
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

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setCurrentVariant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddVariant = () => {
    if (currentVariant.quantity && currentVariant.unit && currentVariant.price && currentVariant.stock) {
      setFormData(prev => ({
        ...prev,
        variants: [...prev.variants, {
          ...currentVariant,
          quantity: Number(currentVariant.quantity),
          price: Number(currentVariant.price),
          stock: Number(currentVariant.stock)
        }]
      }));
      setCurrentVariant({
        quantity: '',
        unit: '',
        price: '',
        stock: ''
      });
    }
  };

  const handleRemoveVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name?.trim() || !formData.brand?.trim() || !formData.category?.trim() || 
          !formData.variants.length || !selectedImage) {
        throw new Error('Please fill in all required fields and add at least one variant');
      }

      const productData = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        category: formData.category.trim(),
        variants: formData.variants,
        image: imagePreview // Use the base64 string directly
      };

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
      setError(error.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!token) {
        setError('You must be logged in to delete products');
        return;
      }

      // Show confirmation dialog
      if (!window.confirm('Are you sure you want to delete this product?')) {
        return;
      }

      await deleteProduct(id);
      setSuccessMessage('Product deleted successfully');
      await fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.message || 'Error deleting product. Please try again.');
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

  const handleRowExpand = (productId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
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
                label={category}
              />
            ))}
          </Tabs>
        </Box>

        {/* Product Table */}
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#FFE4B5' }}>
                <TableCell sx={{ width: '48px' }}>{/* For expand/collapse */}</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Brand</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'cursive', color: 'text.secondary' }}>
                      Loading...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (selectedTab === 0 ? filteredItems : itemsByCategory[categories[selectedTab - 1]] || []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'cursive', color: 'text.secondary' }}>
                      Inventory is empty. Please add products.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                (selectedTab === 0 ? filteredItems : itemsByCategory[categories[selectedTab - 1]] || []).map((item) => (
                  <React.Fragment key={item._id}>
                    <TableRow>
                      <TableCell sx={{ width: '48px' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleRowExpand(item._id)}
                        >
                          {expandedRows.has(item._id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
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
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(item)}
                          sx={{ color: 'primary.main' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(item._id)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={expandedRows.has(item._id)} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" sx={{ fontFamily: 'cursive' }}>
                              Variants
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>Unit</TableCell>
                                  <TableCell>Price</TableCell>
                                  <TableCell>Stock</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item.variants.map((variant, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{variant.quantity}</TableCell>
                                    <TableCell>{variant.unit}</TableCell>
                                    <TableCell>₹{variant.price}</TableCell>
                                    <TableCell>{variant.stock}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
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
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: 'cursive' }}>
          {editingItem ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
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

            {/* Category Selection */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ fontFamily: 'cursive' }}>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                sx={{ 
                  fontFamily: 'cursive',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Variants Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'cursive' }}>
                Product Variants
              </Typography>

              {/* Add New Variant */}
              <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontFamily: 'cursive' }}>
                  Add New Variant
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={currentVariant.quantity}
                    onChange={handleVariantChange}
                    sx={{ flex: 1 }}
                    inputProps={{ min: 0 }}
                  />
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Unit</InputLabel>
                    <Select
                      name="unit"
                      value={currentVariant.unit}
                      onChange={handleVariantChange}
                    >
                      {units.map((unit) => (
                        <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={currentVariant.price}
                    onChange={handleVariantChange}
                    sx={{ flex: 1 }}
                    inputProps={{ min: 0 }}
                  />
                  <TextField
                    label="Stock"
                    name="stock"
                    type="number"
                    value={currentVariant.stock}
                    onChange={handleVariantChange}
                    sx={{ flex: 1 }}
                    inputProps={{ min: 0 }}
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={handleAddVariant}
                  disabled={!currentVariant.quantity || !currentVariant.unit || !currentVariant.price || !currentVariant.stock}
                  sx={{
                    bgcolor: '#90EE90',
                    color: 'black',
                    '&:hover': { bgcolor: '#7BC47F' },
                    '&.Mui-disabled': { bgcolor: '#E0E0E0' }
                  }}
                >
                  Add Variant
                </Button>
              </Box>

              {/* Variants List */}
              {formData.variants.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontFamily: 'cursive' }}>
                    Current Variants
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Unit</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Stock</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formData.variants.map((variant, index) => (
                          <TableRow key={index}>
                            <TableCell>{variant.quantity}</TableCell>
                            <TableCell>{variant.unit}</TableCell>
                            <TableCell>₹{variant.price}</TableCell>
                            <TableCell>{variant.stock}</TableCell>
                            <TableCell>
                              <IconButton
                                size="small"
                                onClick={() => handleRemoveVariant(index)}
                                sx={{ color: 'error.main' }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>

            {/* Image Upload */}
            <Box sx={{ mt: 2, mb: 2 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
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
                      maxWidth: '200px',
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
              !formData.variants.length ||
              !selectedImage
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