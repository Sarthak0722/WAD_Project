import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  InputBase, 
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Grid,
  Divider,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SortIcon from '@mui/icons-material/Sort';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getProducts } from '../services/productService';

const ProductsPage = () => {
  const { category = 'milk' } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await getProducts();
      const categoryProducts = allProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
      setProducts(categoryProducts);
      
      // Extract unique brands
      const uniqueBrands = [...new Set(categoryProducts.map(product => product.brand))];
      setBrands(uniqueBrands);
      
      // Initialize selected variants
      const initialSelectedVariants = {};
      categoryProducts.forEach(product => {
        initialSelectedVariants[product._id] = product.variants[0];
      });
      setSelectedVariants(initialSelectedVariants);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVariantChange = (productId, variant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variant
    }));
  };

  const getMinPrice = (product) => {
    return Math.min(...product.variants.map(v => v.price));
  };

  const filteredAndSortedProducts = products
    .filter(product =>
      (searchQuery === '' || 
       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.brand.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedBrand === 'all' || product.brand === selectedBrand)
    )
    .sort((a, b) => {
      if (sortOrder === 'none') return 0;
      const priceA = getMinPrice(a);
      const priceB = getMinPrice(b);
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          bgcolor: 'white' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          bgcolor: 'white' 
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
        {/* Header Section with Title and Controls */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          mb: 3,
          gap: 2
        }}>
          {/* Category Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantIcon sx={{ fontSize: 28 }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'cursive',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              {category}
            </Typography>
          </Box>

          {/* Controls Section */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ 
              minWidth: { sm: '400px' },
              alignItems: 'center'
            }}
          >
            {/* Brand Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                displayEmpty
                sx={{ 
                  height: '36px',
                  fontFamily: 'cursive',
                  bgcolor: 'white',
                  '& .MuiSelect-select': { 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }
                }}
              >
                <MenuItem value="all">
                  <FilterAltIcon fontSize="small" />
                  All Brands
                </MenuItem>
                {brands.map(brand => (
                  <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort by Price */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                displayEmpty
                sx={{ 
                  height: '36px',
                  fontFamily: 'cursive',
                  bgcolor: 'white',
                  '& .MuiSelect-select': { 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }
                }}
              >
                <MenuItem value="none">
                  <SortIcon fontSize="small" />
                  Price: None
                </MenuItem>
                <MenuItem value="asc">Price: Low to High</MenuItem>
                <MenuItem value="desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>

            {/* Search Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'white',
                borderRadius: '4px',
                border: '1px solid #ccc',
                height: '36px',
                width: { xs: '100%', sm: '160px' }
              }}
            >
              <InputBase
                placeholder="Search..."
                sx={{
                  flex: 1,
                  fontSize: '0.9rem',
                  pl: 1
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton size="small" sx={{ p: '4px' }}>
                <SearchIcon fontSize="small" />
              </IconButton>
            </Box>
          </Stack>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={1.5}>
          {filteredAndSortedProducts.map((product) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={product._id}>
              <Card 
          sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 1.5,
                  boxShadow: 1,
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
              image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'contain', p: 1 }}
                />
                <CardContent sx={{ flexGrow: 1, p: 1.25, pb: 0.5 }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    sx={{ 
                      fontFamily: 'cursive', 
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      mb: 0.25,
                      lineHeight: 1.2
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontFamily: 'cursive',
                      fontSize: '0.8rem',
                      mb: 0.5
                    }}
                  >
                    {product.brand}
                  </Typography>
                  <Divider sx={{ my: 0.5 }} />
                  
                  {/* Variant Selection */}
                  <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
                    <InputLabel sx={{ fontFamily: 'cursive', fontSize: '0.85rem' }}>Size</InputLabel>
                    <Select
                      value={selectedVariants[product._id] || ''}
                      onChange={(e) => handleVariantChange(product._id, e.target.value)}
                      sx={{ 
                        fontFamily: 'cursive',
                        fontSize: '0.85rem',
                        '.MuiSelect-select': { 
                          py: 0.75
                        }
                      }}
                    >
                      {product.variants.map((variant, index) => (
                        <MenuItem 
                          key={index} 
                          value={variant}
                          sx={{ 
                            fontFamily: 'cursive',
                            fontSize: '0.85rem'
                          }}
                        >
                          {variant.quantity} {variant.unit} - ₹{variant.price}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Stock Status */}
                  {selectedVariants[product._id] && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 0.75,
                        fontFamily: 'cursive',
                        fontSize: '0.7rem',
                        color: selectedVariants[product._id].stock > 0 ? 'success.main' : 'error.main'
                      }}
                    >
                      {selectedVariants[product._id].stock > 0 
                        ? `In Stock (${selectedVariants[product._id].stock})` 
                        : 'Out of Stock'}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ p: 1.25, pt: 0.5 }}>
                  <Button 
                    fullWidth 
                    variant="contained"
                    size="small"
                    disabled={!selectedVariants[product._id] || selectedVariants[product._id].stock === 0}
                    sx={{
                      bgcolor: '#90EE90',
                      color: 'black',
                      fontFamily: 'cursive',
                      fontSize: '0.8rem',
                      py: 0.5,
                      '&:hover': {
                        bgcolor: '#7BC47F',
                      },
                      '&.Mui-disabled': {
                        bgcolor: '#E0E0E0',
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No Products Found */}
        {filteredAndSortedProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'cursive',
                color: 'text.secondary' 
              }}
            >
              No products found
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductsPage;