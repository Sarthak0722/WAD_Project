import React from 'react';
import { Container, Box, Typography, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import cowImage from '../assets/images/Cow.png';
import Navbar from '../components/Navbar';

const HomePage = () => {
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#f5f5f5',
                  borderRadius: '25px',
                  p: 1,
                  pl: 3,
                  flex: 1,
                }}
              >
                <InputBase
                  placeholder="What are you looking for?"
                  sx={{ flex: 1 }}
                />
                <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#b2ebf2',
                  color: 'black',
                  borderRadius: '25px',
                  px: 4,
                  '&:hover': {
                    bgcolor: '#81d4fa',
                  },
                  fontFamily: 'cursive'
                }}
              >
                Search
              </Button>
            </Box>
          </Box>

          {/* Right side - Cow Image */}
          <Box sx={{ maxWidth: '400px' }}>
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