import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';
import { getProducts } from '../services/productService';

// Import placeholder images
import milkIcon from '../assets/images/MilkProductPage.png';
import yoghurtIcon from '../assets/images/yoghurtPP.png';
import butterIcon from '../assets/images/ButterPP.png';
import creamIcon from '../assets/images/CreamPP.png';
import iceCreamIcon from '../assets/images/IceCreamPP.png';
import otherIcon from '../assets/images/OtherdairyPP.png';

// Map category names to their respective icons
const categoryIcons = {
  'Milk': milkIcon,
  'Yoghurt': yoghurtIcon,
  'Butter': butterIcon,
  'Cream': creamIcon,
  'Ice-Cream': iceCreamIcon,
  'Other': otherIcon
};

const ShopPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      // Extract unique categories from products
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/${category.toLowerCase()}`);
  };

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
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: 4, 
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 4,
            fontFamily: 'cursive',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'capitalize'
          }}
        >
          Our Product Categories
        </Typography>
        
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3 }}
          sx={{ 
            maxWidth: { xs: '100%', sm: '600px', md: '800px' },
            justifyContent: 'center'
          }}
        >
          {categories.map((category, index) => (
            <Grid 
              item 
              xs={6} 
              sm={4} 
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box 
                sx={{ 
                  width: { xs: '140px', sm: '160px' },
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <CategoryCard
                  title={category}
                  icon={categoryIcons[category] || otherIcon}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ShopPage;