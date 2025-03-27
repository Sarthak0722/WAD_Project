import React, { useState } from 'react';
import { Box, Container, Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import productImage from '../assets/images/ProductsMilk.png';

// Mock data - in a real app, this would come from an API
const mockProducts = {
  milk: Array(10).fill({
    title: 'Amul milk',
    price: '100',
    image: productImage,
  }),
  yoghurt: Array(10).fill({
    title: 'Amul Yoghurt',
    price: '80',
    image: productImage,
  }),
  butter: Array(10).fill({
    title: 'Amul Butter',
    price: '120',
    image: productImage,
  }),
  cream: Array(10).fill({
    title: 'Amul Cream',
    price: '90',
    image: productImage,
  }),
  'ice-cream': Array(10).fill({
    title: 'Amul Ice Cream',
    price: '150',
    image: productImage,
  }),
  other: Array(10).fill({
    title: 'Other Dairy',
    price: '100',
    image: productImage,
  }),
};

const ProductsPage = () => {
  const { category = 'milk' } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const products = mockProducts[category.toLowerCase()] || [];
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Category Title with Icons */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <RestaurantIcon 
              sx={{ 
                fontSize: 40
              }} 
            />
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'cursive',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              {category}
            </Typography>
            <RestaurantIcon 
              sx={{ 
                fontSize: 40
              }} 
            />
          </Box>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#f0f0f0',
            borderRadius: '25px',
            p: '2px 16px',
            mb: 6,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          <InputBase
            placeholder="Search for your favorite product"
            sx={{
              flex: 1,
              fontFamily: 'cursive',
              fontSize: '1.1rem',
              py: 1
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Products Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 3,
            p: 2,
            bgcolor: '#f5f5f5',
            borderRadius: '16px'
          }}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              price={product.price}
              image={product.image}
              onClick={() => console.log(`Added ${product.title} to cart`)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsPage;