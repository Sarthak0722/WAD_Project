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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AdminNavbar from '../../components/admin/AdminNavbar';

const AdminHomePage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['Milk', 'Dairy', 'Ice Cream', 'Yoghurt']);
  const [brands, setBrands] = useState(['AMUL', 'Mother Dairy', 'Nestle', 'Britannia']);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [stockAdjustment, setStockAdjustment] = useState({ type: 'add', amount: 0 });

  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: 'Fresh Milk',
      brand: 'AMUL',
      category: 'Milk',
      price: 60,
      stock: 100,
      unit: 'Litre',
      image: 'milk.jpeg'
    },
    {
      id: 2,
      name: 'Curd',
      brand: 'Mother Dairy',
      category: 'Dairy',
      price: 40,
      stock: 50,
      unit: 'Kg',
      image: 'curd.jpeg'
    },
    {
      id: 3,
      name: 'Butter',
      brand: 'AMUL',
      category: 'Dairy',
      price: 120,
      stock: 40,
      unit: 'Pack',
      image: 'butter.jpeg'
    },
    {
      id: 4,
      name: 'Vanilla Ice Cream',
      brand: 'Mother Dairy',
      category: 'Ice Cream',
      price: 150,
      stock: 35,
      unit: 'Pack',
      image: 'vanilla-ice-cream.jpeg'
    },
  ]);

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

  // Remove the static brands array and calculate it from inventory
  const availableBrands = [...new Set(inventoryItems.map(item => item.brand))];

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
      setStockAdjustment({ type: 'add', amount: 0 }); // Reset stock adjustment
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
      setCategories([...categories, newCategory]);
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
        setFormData(prev => ({
          ...prev,
          image: reader.result
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

  const handleSubmit = () => {
    if (editingItem) {
      setInventoryItems(prev =>
        prev.map(item =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      );
    } else {
      // Add new brand if it doesn't exist
      if (!brands.includes(formData.brand)) {
        setBrands([...brands, formData.brand]);
      }
      setInventoryItems(prev => [
        ...prev,
        {
          id: prev.length + 1,
          ...formData
        }
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setInventoryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleDeleteCategory = (categoryToDelete) => {
    // Check if there are any products in this category
    const productsInCategory = inventoryItems.filter(item => item.category === categoryToDelete);
    
    if (productsInCategory.length > 0) {
      alert('Cannot delete category that contains products. Please remove or reassign all products first.');
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              color: 'black'
            }}
          >
            Inventory Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
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
              options={availableBrands}
              value={selectedBrand}
              onChange={handleBrandChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Filter by Brand"
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
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
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
              Add New Item
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
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category);
                      }}
                      sx={{
                        color: 'rgba(0, 0, 0, 0.4)',
                        padding: 0,
                        width: '16px',
                        height: '16px',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: 'rgba(0, 0, 0, 0.8)',
                        },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '12px' }} />
                    </IconButton>
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
              {(selectedTab === 0 ? filteredItems : itemsByCategory[categories[selectedTab - 1]] || []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'cursive', color: 'text.secondary' }}>
                      Inventory is empty. Please add products.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                (selectedTab === 0 ? filteredItems : itemsByCategory[categories[selectedTab - 1]] || []).map((item) => (
                  <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
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
                        sx={{ color: '#90EE90' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(item.id)}
                        sx={{ color: '#FFB6C1' }}
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

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'cursive', fontWeight: 'bold', textAlign: 'center' }}>
          {editingItem ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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

            <TextField
              margin="normal"
              fullWidth
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
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
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ fontFamily: 'cursive' }}>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Category"
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

            {editingItem ? (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontFamily: 'cursive', mb: 1 }}>
                  Current Stock: {editingItem.stock}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <FormControl sx={{ width: '30%' }}>
                    <InputLabel sx={{ fontFamily: 'cursive' }}>Action</InputLabel>
                    <Select
                      name="stockAdjustmentType"
                      value={stockAdjustment.type}
                      onChange={handleStockAdjustment}
                      label="Action"
                      sx={{ 
                        fontFamily: 'cursive',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                      }}
                    >
                      <MenuItem value="add">Add</MenuItem>
                      <MenuItem value="remove">Remove</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    margin="normal"
                    label="Amount"
                    name="stockAdjustmentAmount"
                    type="number"
                    value={stockAdjustment.amount}
                    onChange={handleStockAdjustment}
                    inputProps={{ min: 0 }}
                    sx={{ 
                      width: '70%',
                      '& .MuiInputLabel-root': {
                        fontFamily: 'cursive'
                      },
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'cursive'
                      }
                    }}
                  />
                </Box>
                <Typography sx={{ fontFamily: 'cursive', mt: 1, fontWeight: 'bold' }}>
                  New Stock: {formData.stock}
                </Typography>
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

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ fontFamily: 'cursive' }}>Unit</InputLabel>
              <Select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                label="Unit"
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

            <Box sx={{ mb: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
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
                  {imagePreview ? 'Change Image' : 'Upload Image'}
                </Button>
              </label>
              {imagePreview && (
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    src={imagePreview}
                    alt="Preview"
                    sx={{ width: 100, height: 100, borderRadius: '8px' }}
                  />
                </Box>
              )}
            </Box>
          </Box>
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
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.name || !formData.brand || !formData.category || !formData.price || !formData.stock || !formData.unit || !formData.image}
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
      <Dialog
        open={openCategoryDialog}
        onClose={handleCloseCategoryDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'cursive', fontWeight: 'bold', textAlign: 'center' }}>
          Add New Category
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ 
              mt: 2,
              '& .MuiInputLabel-root': {
                fontFamily: 'cursive'
              },
              '& .MuiOutlinedInput-root': {
                fontFamily: 'cursive'
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button
            onClick={handleCloseCategoryDialog}
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
            onClick={handleAddCategory}
            disabled={!newCategory}
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminHomePage;