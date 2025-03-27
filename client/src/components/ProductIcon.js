import React from 'react';
import { SvgIcon } from '@mui/material';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import EggIcon from '@mui/icons-material/EggAlt';
import CakeIcon from '@mui/icons-material/Cake';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Custom Yogurt Icon
const YogurtIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12,2C8.13,2,5,5.13,5,9c0,1.3,0.37,2.5,1,3.53v7.05C6,20.92,7.08,22,8.42,22h7.16c1.34,0,2.42-1.08,2.42-2.42v-7.05 c0.63-1.03,1-2.23,1-3.53C19,5.13,15.87,2,12,2z M16,19.58c0,0.23-0.19,0.42-0.42,0.42H8.42C8.19,20,8,19.81,8,19.58V14h8V19.58z M16.66,11.45L16,11.87V12H8v-0.13l-0.66-0.42C6.5,10.78,6,9.94,6,9c0-3.31,2.69-6,6-6s6,2.69,6,6 C18,9.94,17.5,10.78,16.66,11.45z" />
    <path d="M12,4c-2.76,0-5,2.24-5,5c0,0.28,0.03,0.55,0.07,0.82h9.86C16.97,9.55,17,9.28,17,9C17,6.24,14.76,4,12,4z" />
  </SvgIcon>
);

const ProductIcon = ({ category, size = 24, color = 'primary' }) => {
  const iconProps = {
    sx: { 
      fontSize: size,
      color: color
    }
  };

  const getIconByCategory = (category) => {
    const normalizedCategory = category?.toLowerCase() || '';
    
    switch (normalizedCategory) {
      case 'yogurt':
      case 'curd':
        return <YogurtIcon {...iconProps} />;
      case 'milk':
      case 'buttermilk':
      case 'lassi':
        return <LocalDrinkIcon {...iconProps} />;
      case 'ice cream':
        return <IcecreamIcon {...iconProps} />;
      case 'dessert':
      case 'sweet':
        return <CakeIcon {...iconProps} />;
      case 'paneer':
      case 'cheese':
        return <EggIcon {...iconProps} />;
      case 'food':
      case 'snack':
        return <RamenDiningIcon {...iconProps} />;
      default:
        return <RestaurantIcon {...iconProps} />;
    }
  };

  return getIconByCategory(category);
};

export default ProductIcon; 