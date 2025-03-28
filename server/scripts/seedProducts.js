const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

// Load env vars
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  // Milk Products
  {
    name: 'Full Cream Milk',
    brand: 'AMUL',
    category: 'Milk',
    price: 60,
    stock: 100,
    unit: 'Litre',
    image: 'https://example.com/milk1.jpg',
    description: 'Fresh full cream milk from AMUL'
  },
  {
    name: 'Toned Milk',
    brand: 'Mother Dairy',
    category: 'Milk',
    price: 55,
    stock: 150,
    unit: 'Litre',
    image: 'https://example.com/milk2.jpg',
    description: 'Fresh toned milk from Mother Dairy'
  },
  {
    name: 'Double Toned Milk',
    brand: 'Nestle',
    category: 'Milk',
    price: 50,
    stock: 80,
    unit: 'Litre',
    image: 'https://example.com/milk3.jpg',
    description: 'Double toned milk from Nestle'
  },
  {
    name: 'Skimmed Milk',
    brand: 'Britannia',
    category: 'Milk',
    price: 45,
    stock: 120,
    unit: 'Litre',
    image: 'https://example.com/milk4.jpg',
    description: 'Skimmed milk from Britannia'
  },
  {
    name: 'A2 Milk',
    brand: 'Amul',
    category: 'Milk',
    price: 80,
    stock: 60,
    unit: 'Litre',
    image: 'https://example.com/milk5.jpg',
    description: 'A2 milk from Amul'
  },
  // Butter Products
  {
    name: 'Salted Butter',
    brand: 'Amul',
    category: 'Butter',
    price: 120,
    stock: 50,
    unit: 'Pack',
    image: 'https://example.com/butter1.jpg',
    description: 'Salted butter from Amul'
  },
  {
    name: 'Unsalted Butter',
    brand: 'Mother Dairy',
    category: 'Butter',
    price: 110,
    stock: 40,
    unit: 'Pack',
    image: 'https://example.com/butter2.jpg',
    description: 'Unsalted butter from Mother Dairy'
  },
  {
    name: 'Cultured Butter',
    brand: 'Nestle',
    category: 'Butter',
    price: 150,
    stock: 30,
    unit: 'Pack',
    image: 'https://example.com/butter3.jpg',
    description: 'Cultured butter from Nestle'
  },
  // Curd Products
  {
    name: 'Plain Curd',
    brand: 'Amul',
    category: 'Dairy',
    price: 40,
    stock: 80,
    unit: 'Kg',
    image: 'https://example.com/curd1.jpg',
    description: 'Plain curd from Amul'
  },
  {
    name: 'Sweet Curd',
    brand: 'Mother Dairy',
    category: 'Dairy',
    price: 45,
    stock: 60,
    unit: 'Kg',
    image: 'https://example.com/curd2.jpg',
    description: 'Sweet curd from Mother Dairy'
  },
  {
    name: 'Greek Yogurt',
    brand: 'Nestle',
    category: 'Dairy',
    price: 120,
    stock: 40,
    unit: 'Pack',
    image: 'https://example.com/curd3.jpg',
    description: 'Greek yogurt from Nestle'
  },
  // Ice Cream Products
  {
    name: 'Vanilla Ice Cream',
    brand: 'Amul',
    category: 'Ice Cream',
    price: 150,
    stock: 50,
    unit: 'Pack',
    image: 'https://example.com/icecream1.jpg',
    description: 'Vanilla ice cream from Amul'
  },
  {
    name: 'Chocolate Ice Cream',
    brand: 'Mother Dairy',
    category: 'Ice Cream',
    price: 160,
    stock: 45,
    unit: 'Pack',
    image: 'https://example.com/icecream2.jpg',
    description: 'Chocolate ice cream from Mother Dairy'
  },
  {
    name: 'Strawberry Ice Cream',
    brand: 'Nestle',
    category: 'Ice Cream',
    price: 170,
    stock: 40,
    unit: 'Pack',
    image: 'https://example.com/icecream3.jpg',
    description: 'Strawberry ice cream from Nestle'
  },
  // Cheese Products
  {
    name: 'Cheddar Cheese',
    brand: 'Amul',
    category: 'Cheese',
    price: 200,
    stock: 30,
    unit: 'Pack',
    image: 'https://example.com/cheese1.jpg',
    description: 'Cheddar cheese from Amul'
  },
  {
    name: 'Mozzarella Cheese',
    brand: 'Mother Dairy',
    category: 'Cheese',
    price: 180,
    stock: 35,
    unit: 'Pack',
    image: 'https://example.com/cheese2.jpg',
    description: 'Mozzarella cheese from Mother Dairy'
  },
  {
    name: 'Processed Cheese',
    brand: 'Nestle',
    category: 'Cheese',
    price: 150,
    stock: 40,
    unit: 'Pack',
    image: 'https://example.com/cheese3.jpg',
    description: 'Processed cheese from Nestle'
  },
  // Cream Products
  {
    name: 'Fresh Cream',
    brand: 'Amul',
    category: 'Cream',
    price: 90,
    stock: 60,
    unit: 'Pack',
    image: 'https://example.com/cream1.jpg',
    description: 'Fresh cream from Amul'
  },
  {
    name: 'Whipping Cream',
    brand: 'Mother Dairy',
    category: 'Cream',
    price: 100,
    stock: 50,
    unit: 'Pack',
    image: 'https://example.com/cream2.jpg',
    description: 'Whipping cream from Mother Dairy'
  },
  {
    name: 'Sour Cream',
    brand: 'Nestle',
    category: 'Cream',
    price: 110,
    stock: 45,
    unit: 'Pack',
    image: 'https://example.com/cream3.jpg',
    description: 'Sour cream from Nestle'
  },
  // Yogurt Products
  {
    name: 'Plain Yogurt',
    brand: 'Amul',
    category: 'Yoghurt',
    price: 80,
    stock: 70,
    unit: 'Pack',
    image: 'https://example.com/yogurt1.jpg',
    description: 'Plain yogurt from Amul'
  },
  {
    name: 'Fruit Yogurt',
    brand: 'Mother Dairy',
    category: 'Yoghurt',
    price: 90,
    stock: 60,
    unit: 'Pack',
    image: 'https://example.com/yogurt2.jpg',
    description: 'Fruit yogurt from Mother Dairy'
  },
  {
    name: 'Greek Yogurt',
    brand: 'Nestle',
    category: 'Yoghurt',
    price: 120,
    stock: 50,
    unit: 'Pack',
    image: 'https://example.com/yogurt3.jpg',
    description: 'Greek yogurt from Nestle'
  }
];

// Function to seed products
const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    await Product.insertMany(products);
    
    console.log('Products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seed function
seedProducts(); 