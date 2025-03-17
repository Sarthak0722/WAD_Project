import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Navbar from '../components/Navbar';

// Import placeholder images
import milkIcon from '../assets/images/MilkProductPage.png';
import yoghurtIcon from '../assets/images/yoghurtPP.png';
import butterIcon from '../assets/images/ButterPP.png';
import creamIcon from '../assets/images/CreamPP.png';
import iceCreamIcon from '../assets/images/IceCreamPP.png';
import otherIcon from '../assets/images/OtherdairyPP.png';
import productImage from '../assets/images/ProductsMilk.png';

const categories = [
  { title: 'Milk', icon: milkIcon },
  { title: 'Yoghurt', icon: yoghurtIcon },
  { title: 'Butter', icon: butterIcon },
  { title: 'Cream', icon: creamIcon },
  { title: 'Ice-Cream', icon: iceCreamIcon },
  { title: 'Other', icon: otherIcon },
];

const specialOffers = [
  {
    title: 'Milk',
    subtitle: 'By Amul',
    discount: '10% Off At 59 only',
    image: productImage,
  },
  {
    title: 'Milk',
    subtitle: 'By Amul',
    discount: '10% Off At 59 only',
    image: productImage,
  },
];

const trendingProducts = Array(8).fill({
  title: 'Amul milk',
  price: '100',
  image: productImage,
});

const ShopPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Categories */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {categories.map((category, index) => (
            <Grid item key={index}>
              <CategoryCard
                title={category.title}
                icon={category.icon}
                onClick={() => console.log(`Clicked ${category.title}`)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid - Special Offers and Trending Products side by side */}
        <Grid container spacing={3}>
          {/* Special Offers Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                bgcolor: '#D3D3D3',
                py: 1.5,
                px: 3,
                borderRadius: '25px',
                display: 'inline-block',
                fontFamily: 'cursive',
                mb: 3,
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              Special Offers
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {specialOffers.map((offer, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#b2ebf2',
                    borderRadius: '16px',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  <Typography variant="h6" sx={{ fontFamily: 'cursive', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {offer.title}
                  </Typography>
                  <Typography sx={{ fontFamily: 'cursive', color: 'text.secondary', fontSize: '1rem' }}>
                    {offer.subtitle}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'contain'
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          bgcolor: '#FFE4B5',
                          p: 1,
                          borderRadius: '8px',
                          display: 'inline-block',
                          fontFamily: 'cursive',
                          fontSize: '0.9rem',
                          mb: 1
                        }}
                      >
                        {offer.discount}
                      </Typography>
                      <button
                        style={{
                          backgroundColor: '#f5f5f5',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontFamily: 'cursive',
                          display: 'block',
                          marginTop: '8px'
                        }}
                      >
                        BUY NOW
                      </button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Trending Products Section */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h5"
              sx={{
                bgcolor: '#D3D3D3',
                py: 1.5,
                px: 3,
                borderRadius: '25px',
                display: 'inline-block',
                fontFamily: 'cursive',
                mb: 3,
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              <LocalFireDepartmentIcon sx={{ mr: 1, color: 'error.main' }} />
              Trending Products
            </Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: '16px' }}>
              <Grid container spacing={3}>
                {trendingProducts.map((product, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <ProductCard
                      title={product.title}
                      price={product.price}
                      image={product.image}
                      onClick={() => console.log(`Added ${product.title} to cart`)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShopPage;