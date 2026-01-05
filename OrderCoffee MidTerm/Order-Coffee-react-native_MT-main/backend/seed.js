import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "./models/MenuItem.js";

dotenv.config();

const coffeeData = [
  {
    name: "Espresso",
    category: "Hot Coffee",
    description: "Rich, full-bodied espresso with a smooth crema on top.",
    price: 3.50,
    sizes: { small: 3.50, medium: 4.00, large: 4.50 },
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400",
    featured: true,
    inStock: true,
  },
  {
    name: "Cappuccino",
    category: "Hot Coffee",
    description: "Espresso with steamed milk and a layer of foam.",
    price: 4.50,
    sizes: { small: 4.50, medium: 5.00, large: 5.50 },
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
    featured: true,
    inStock: true,
  },
  {
    name: "Latte",
    category: "Hot Coffee",
    description: "Smooth espresso with steamed milk and a light foam layer.",
    price: 4.75,
    sizes: { small: 4.75, medium: 5.25, large: 5.75 },
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400",
    featured: true,
    inStock: true,
  },
  {
    name: "Americano",
    category: "Hot Coffee",
    description: "Espresso shots topped with hot water for a smooth, rich taste.",
    price: 3.75,
    sizes: { small: 3.75, medium: 4.25, large: 4.75 },
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400",
    featured: false,
    inStock: true,
  },
  {
    name: "Mocha",
    category: "Hot Coffee",
    description: "Espresso with steamed milk, chocolate syrup, and whipped cream.",
    price: 5.25,
    sizes: { small: 5.25, medium: 5.75, large: 6.25 },
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400",
    featured: true,
    inStock: true,
  },
  {
    name: "Iced Coffee",
    category: "Cold Coffee",
    description: "Chilled coffee served over ice for a refreshing pick-me-up.",
    price: 4.00,
    sizes: { small: 4.00, medium: 4.50, large: 5.00 },
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    featured: false,
    inStock: true,
  },
  {
    name: "Iced Latte",
    category: "Cold Coffee",
    description: "Espresso with cold milk and ice, smooth and refreshing.",
    price: 4.75,
    sizes: { small: 4.75, medium: 5.25, large: 5.75 },
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400",
    featured: false,
    inStock: true,
  },
  {
    name: "Caramel Macchiato",
    category: "Hot Coffee",
    description: "Espresso with vanilla-flavored syrup, steamed milk, and caramel drizzle.",
    price: 5.50,
    sizes: { small: 5.50, medium: 6.00, large: 6.50 },
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400",
    featured: true,
    inStock: true,
  },
  {
    name: "Frappuccino",
    category: "Cold Coffee",
    description: "Blended coffee drink with ice, milk, and your choice of flavors.",
    price: 5.75,
    sizes: { small: 5.75, medium: 6.25, large: 6.75 },
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    featured: false,
    inStock: true,
  },
  {
    name: "Cold Brew",
    category: "Cold Coffee",
    description: "Smooth, cold-brewed coffee with a naturally sweet flavor.",
    price: 4.50,
    sizes: { small: 4.50, medium: 5.00, large: 5.50 },
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400",
    featured: false,
    inStock: true,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing items
    await MenuItem.deleteMany({});
    console.log("Cleared existing menu items");

    // Insert new items
    await MenuItem.insertMany(coffeeData);
    console.log("Seeded database with coffee items");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();

