import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ title, icon }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/products/${title.toLowerCase()}`)}
      sx={{
        bgcolor: '#b2ebf2',
        borderRadius: '16px',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        width: '150px',
        height: '150px',
        '&:hover': {
          bgcolor: '#81d4fa',
          transform: 'scale(1.02)',
          transition: 'all 0.2s ease-in-out',
        },
      }}
    >
      <img
        src={icon}
        alt={title}
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'contain',
          marginBottom: '12px'
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'cursive',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default CategoryCard;