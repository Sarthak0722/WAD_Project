const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, 'Please add quantity for variant']
  },
  unit: {
    type: String,
    required: [true, 'Please add unit for variant'],
    enum: ['ml', 'L', 'g', 'kg', 'piece', 'pack']
  },
  price: {
    type: Number,
    required: [true, 'Please add price for variant'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock for variant'],
    min: [0, 'Stock cannot be negative']
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Please add an image']
  },
  variants: {
    type: [variantSchema],
    required: true,
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one variant is required'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 