import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  InputBase, 
  Button,
  Autocomplete,
  TextField,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import cowImage from '../assets/images/Cow.png';
import Navbar from '../components/Navbar';
import { getProducts } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const allProducts = await getProducts();
      setProducts(allProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) return;

    const foundProduct = products.find(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (foundProduct) {
      navigate(`/products/${foundProduct.category.toLowerCase()}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getSearchSuggestions = () => {
    return products.map(product => ({
      label: `${product.name} - ${product.brand}`,
      category: product.category
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left side content */}
          <Box sx={{ maxWidth: '600px' }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                fontFamily: 'cursive'
              }}
            >
              Get best quality Milk and Milk Products delivered at home
            </Typography>
            <Typography 
              sx={{ 
                color: 'text.secondary',
                mb: 4,
                fontFamily: 'cursive'
              }}
            >
              Browse by category, brand or deal
            </Typography>

            {/* Search Box */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Autocomplete
                freeSolo
                options={getSearchSuggestions()}
                fullWidth
                value={searchQuery}
                open={searchQuery.length > 0}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSearchQuery(typeof newValue === 'string' ? newValue : newValue.label);
                    if (typeof newValue !== 'string') {
                      navigate(`/products/${newValue.category.toLowerCase()}`);
                    }
                  }
                }}
                onInputChange={(event, newInputValue) => {
                  setSearchQuery(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="What are you looking for?"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#f5f5f5',
                        borderRadius: '25px',
                        pl: 3,
                        '& fieldset': {
                          border: 'none'
                        }
                      },
                      '& .MuiOutlinedInput-input': {
                        fontFamily: 'cursive'
                      }
                    }}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Box 
                    component="li" 
                    {...props}
                    sx={{ 
                      fontFamily: 'cursive',
                      py: 1,
                      px: 2
                    }}
                  >
                    {option.label}
                  </Box>
                )}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  bgcolor: '#b2ebf2',
                  color: 'black',
                  borderRadius: '25px',
                  px: 4,
                  '&:hover': {
                    bgcolor: '#81d4fa',
                  },
                  fontFamily: 'cursive',
                  whiteSpace: 'nowrap'
                }}
              >
                Search
              </Button>
            </Box>
          </Box>

          {/* Right side - Cow Image */}
          <Box 
            sx={{ 
              maxWidth: '400px',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <img
              src={cowImage}
              alt="Dairy Cow"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;