const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const { Product } = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function run() {
  await mongoose.connect(MONGODB_URI);

  const sampleProducts = [
    {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones with 30h battery life.',
      price: 99.99,
      image_url: 'https://images.unsplash.com/photo-1518443952240-7a9855f0f0a2?q=80&w=1200&auto=format&fit=crop',
      category: 'Electronics',
      stock: 50,
    },
    {
      name: 'Smart Watch',
      description: 'Fitness tracking, heart-rate monitor, and notifications.',
      price: 79.5,
      image_url: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1200&auto=format&fit=crop',
      category: 'Wearables',
      stock: 120,
    },
    {
      name: 'Running Shoes',
      description: 'Lightweight shoes for daily training and comfort.',
      price: 59.0,
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      category: 'Fashion',
      stock: 200,
    },
    {
      name: 'Gaming Keyboard',
      description: 'Mechanical keyboard with RGB backlight and blue switches.',
      price: 49.99,
      image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
      category: 'Electronics',
      stock: 80,
    },
    {
      name: 'Coffee Maker',
      description: 'Programmable drip coffee maker with thermal carafe.',
      price: 69.99,
      image_url: 'https://images.unsplash.com/photo-1506818144585-78f91f0bcca4?q=80&w=1200&auto=format&fit=crop',
      category: 'Home & Kitchen',
      stock: 60,
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable waterproof speaker with deep bass.',
      price: 39.99,
      image_url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
      category: 'Electronics',
      stock: 150,
    },
    {
      name: 'Backpack',
      description: 'Durable 25L backpack with laptop compartment.',
      price: 35.0,
      image_url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop',
      category: 'Fashion',
      stock: 90,
    },
    {
      name: 'Sunglasses',
      description: 'UV400 polarized sunglasses for men and women.',
      price: 24.99,
      image_url: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop',
      category: 'Accessories',
      stock: 140,
    },
  ];

  while (sampleProducts.length < 20) {
    const idx = sampleProducts.length + 1;
    sampleProducts.push({
      name: `Sample Product ${idx}`,
      description: 'A great product for your daily needs.',
      price: Number((Math.random() * 100 + 10).toFixed(2)),
      image_url: 'https://picsum.photos/seed/' + idx + '/600',
      category: ['Electronics', 'Fashion', 'Home & Kitchen', 'Accessories'][idx % 4],
      stock: Math.floor(Math.random() * 200) + 1,
    });
  }

  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} products.`);
  } else if (count < 20) {
    const need = 20 - count;
    await Product.insertMany(sampleProducts.slice(0, need));
    console.log(`Added ${need} more products (total now 20).`);
  } else {
    console.log(`Products already exist (${count}). No changes.`);
  }

  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});


