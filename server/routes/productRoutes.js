const express = require('express');
const router = express.Router();
const {
  getProducts,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin routes
router.get('/admin/all', protect, authorize('admin'), getAllProducts);
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);
router.patch('/:id/stock', protect, authorize('admin'), updateStock);

module.exports = router; 