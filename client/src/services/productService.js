import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get all products (public)
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching products' };
  }
};

// Get all products (admin only)
export const getAllProducts = async (token) => {
  try {
    const response = await api.get('/products/admin/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching products' };
  }
};

// Get single product
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching product' };
  }
};

// Create product (admin only)
export const createProduct = async (productData) => {
  try {
    // Ensure all required fields are present
    const requiredFields = ['name', 'brand', 'category', 'price', 'stock', 'unit', 'image'];
    const missingFields = requiredFields.filter(field => !productData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate image data
    if (!productData.image.startsWith('data:image')) {
      throw new Error('Invalid image format. Please upload a valid image.');
    }

    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw { message: error.message || 'Error creating product' };
  }
};

// Update product (admin only)
export const updateProduct = async (id, productData) => {
  try {
    // Validate image data if it's being updated
    if (productData.image && !productData.image.startsWith('data:image')) {
      throw new Error('Invalid image format. Please upload a valid image.');
    }

    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw { message: error.message || 'Error updating product' };
  }
};

// Delete product (admin only)
export const deleteProduct = async (id, token) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting product' };
  }
};

// Update product stock (admin only)
export const updateStock = async (id, stock, token) => {
  try {
    const response = await api.patch(`/products/${id}/stock`, { stock });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating stock' };
  }
}; 