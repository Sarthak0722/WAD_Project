const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
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
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price cannot be negative']
    },
    stock: {
      type: Number,
      required: [true, 'Please add initial stock'],
      min: [0, 'Stock cannot be negative']
    },
    unit: {
      type: String,
      required: [true, 'Please add a unit'],
      enum: {
        values: ['Litre', 'Kg', 'Piece', 'Pack', 'Box'],
        message: '{VALUE} is not a valid unit'
      }
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema); 