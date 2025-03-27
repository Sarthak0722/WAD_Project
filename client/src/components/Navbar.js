import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from './Logo';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinkStyle = (path) => ({
    cursor: 'pointer',
    fontFamily: 'cursive',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: isActive(path) ? '#1976d2' : 'inherit',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '2px',
      bottom: -4,
      left: 0,
      backgroundColor: '#1976d2',
      transform: isActive(path) ? 'scaleX(1)' : 'scaleX(0)',
      transition: 'transform 0.3s ease-in-out'
    },
    '&:hover:after': {
      transform: 'scaleX(1)'
    }
  });

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
        py: 2,
        px: { xs: 2, md: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Left side - Logo and Nav Links */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Logo size={32} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800,
                fontFamily: 'cursive',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Home
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
          <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography sx={navLinkStyle('/shop')}>
              Shop
            </Typography>
          </Link>
          <Link to="/subscription" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography sx={navLinkStyle('/subscription')}>
              Subscription
            </Typography>
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography sx={navLinkStyle('/contact')}>
              Contact
            </Typography>
          </Link>
        </Box>
      </Box>

      {/* Right side - Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
        <Link to="/cart" style={{ color: 'inherit' }}>
          <ShoppingCartIcon 
            sx={{ 
              cursor: 'pointer',
              fontSize: '28px',
              transition: 'color 0.2s ease',
              '&:hover': { color: '#1976d2' }
            }} 
          />
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/subscription" style={{ color: 'inherit' }}>
              <CalendarMonthIcon 
                sx={{ 
                  cursor: 'pointer',
                  fontSize: '28px',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#1976d2' }
                }} 
              />
            </Link>
            <Link to="/order-history" style={{ color: 'inherit' }}>
              <HistoryIcon 
                sx={{ 
                  cursor: 'pointer',
                  fontSize: '28px',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#1976d2' }
                }} 
              />
            </Link>
            <Box>
              <AccountCircleIcon 
                sx={{ 
                  cursor: 'pointer',
                  fontSize: '28px',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#1976d2' }
                }}
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
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    borderRadius: '12px',
                    minWidth: '200px'
                  }
                }}
              >
                <MenuItem sx={{ pointerEvents: 'none' }}>
                  <Typography variant="body2" color="text.secondary">
                    Signed in as <strong>{currentUser?.name}</strong>
                  </Typography>
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout}
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: 'error.lighter'
                    }
                  }}
                >
                  Logout
                </MenuItem>
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
              fontWeight: 'bold',
              px: 3,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
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