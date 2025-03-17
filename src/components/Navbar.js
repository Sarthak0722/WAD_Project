import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from './Logo';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  // Profile menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    handleClose();
    window.location.reload(); // Refresh the page to reset all states
  };

  return (
    <Box
      sx={{
        borderBottom: '1px solid #e0e0e0',
        py: 2,
        px: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'white',
      }}
    >
      {/* Left side - Logo and Nav Links */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Logo size={24} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                fontFamily: 'cursive'
              }}
            >
              Home
            </Typography>
          </Box>
        </Link>
        <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography 
            sx={{ 
              cursor: 'pointer',
              fontFamily: 'cursive'
            }}
          >
            Shop
          </Typography>
        </Link>
        <Link to="/subscription" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography 
            sx={{ 
              cursor: 'pointer',
              fontFamily: 'cursive'
            }}
          >
            Subscription
          </Typography>
        </Link>
        <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography 
            sx={{ 
              cursor: 'pointer',
              fontFamily: 'cursive'
            }}
          >
            Contact
          </Typography>
        </Link>
      </Box>

      {/* Right side - Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Link to="/cart" style={{ color: 'inherit' }}>
          <ShoppingCartIcon sx={{ cursor: 'pointer' }} />
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/calendar" style={{ color: 'inherit' }}>
              <CalendarMonthIcon sx={{ cursor: 'pointer' }} />
            </Link>
            <Link to="/order-history" style={{ color: 'inherit' }}>
              <HistoryIcon sx={{ cursor: 'pointer' }} />
            </Link>
            <Box>
              <AccountCircleIcon 
                sx={{ cursor: 'pointer' }}
                onClick={handleProfileClick}
                aria-controls={open ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              />
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'profile-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem sx={{ pointerEvents: 'none' }}>
                  <Typography variant="body2" color="text.secondary">
                    Signed in as <strong>{currentUser?.name}</strong>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </>
        ) : (
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              fontFamily: 'cursive',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'transparent',
              }
            }}
          >
            Login/Register
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;