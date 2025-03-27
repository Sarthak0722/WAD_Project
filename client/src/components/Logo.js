import React from 'react';
import StoreIcon from '@mui/icons-material/Store';
import { Box } from '@mui/material';

const Logo = ({ size = 24 }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: size,
        height: size,
        color: 'primary.main'
      }}
    >
      <StoreIcon sx={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default Logo;