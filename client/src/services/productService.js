import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Get all products (admin)
export const getAllProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/admin/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Get single product
export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Create product (admin)
export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    
    // Ensure image is a string (base64)
    if (!productData.image || typeof productData.image !== 'string') {
      throw new Error('Please provide a valid image');
    }

    const response = await axios.post(API_URL, productData, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Create Product Error:', error.response?.data || error);
    throw error.response?.data || { message: error.message };
  }
};

// Update product (admin)
export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem('token');

    // Ensure image is a string (base64) if provided
    if (productData.image && typeof productData.image !== 'string') {
      throw new Error('Please provide a valid image');
    }

    const response = await axios.put(`${API_URL}/${id}`, productData, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Delete product (admin)
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Delete Product Error:', error.response?.data || error);
    throw error.response?.data || { message: error.message || 'Failed to delete product' };
  }
};

// Helper function to convert image file to base64
const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default {
  getProducts,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}; 