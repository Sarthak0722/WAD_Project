const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// @desc    Get all active products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
});

// @desc    Get all products (including inactive)
// @route   GET /api/products/admin/all
// @access  Private/Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, brand, category, variants, image } = req.body;

    // Validate required fields
    if (!name || !brand || !category || !variants || !image) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Parse variants if it's a string
    let parsedVariants;
    try {
      parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
      
      // Validate variants structure
      if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
        throw new Error('At least one variant is required');
      }

      // Validate each variant
      parsedVariants.forEach(variant => {
        if (!variant.quantity || !variant.unit || !variant.price || !variant.stock) {
          throw new Error('Each variant must have quantity, unit, price, and stock');
        }
      });
    } catch (error) {
      res.status(400);
      throw new Error(`Invalid variants data: ${error.message}`);
    }

    const product = await Product.create({
      name: name.trim(),
      brand: brand.trim(),
      category: category.trim(),
      image,
      variants: parsedVariants,
      isActive: true
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, brand, category, variants, image } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Parse variants if it's a string
    let parsedVariants;
    try {
      parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
      
      // Validate variants structure
      if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
        throw new Error('At least one variant is required');
      }

      // Validate each variant
      parsedVariants.forEach(variant => {
        if (!variant.quantity || !variant.unit || !variant.price || !variant.stock) {
          throw new Error('Each variant must have quantity, unit, price, and stock');
        }
      });
    } catch (error) {
      res.status(400);
      throw new Error(`Invalid variants data: ${error.message}`);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name?.trim(),
        brand: brand?.trim(),
        category: category?.trim(),
        image: image || product.image,
        variants: parsedVariants
      },
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

module.exports = {
  getProducts,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}; 