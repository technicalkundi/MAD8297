# ☕ Coffee Shop App - React Native + Node.js

A full-stack coffee ordering application built with React Native (Expo) and Node.js/Express/MongoDB, similar to Starbucks.

## 📋 Features

- **Home Screen**: Browse coffee menu with categories, featured items, and "Surprise Me" option
- **Coffee Details**: View coffee details with size options (Small, Medium, Large) and pricing
- **Shopping Cart**: Add items to cart, remove items, and checkout
- **User Authentication**: Sign up and login functionality
- **Order History**: View past orders in profile
- **Modern UI**: Clean, Starbucks-inspired design

## 📁 Project Structure

```
mid_term/
├── frontend/                 # React Native Expo App
│   ├── app/
│   │   ├── context/          # Context providers (Auth, Cart)
│   │   ├── navigation/       # Navigation setup
│   │   ├── screens/          # All screens
│   │   └── ...
│   ├── config/
│   │   └── api.js           # API base URL configuration
│   ├── App.js
│   ├── package.json
│   └── ...
├── backend/                  # Node.js Express Server
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── controllers/         # Route controllers
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   ├── seed.js              # Database seed script
│   ├── .env                 # Environment variables
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (or Android Studio/iOS Simulator)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create or edit `.env` file in the `backend` directory
   - Add your MongoDB connection string and JWT secret:
   ```env
   MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/coffee_shop_db?retryWrites=true&w=majority
   PORT=3000
   JWT_SECRET=your-secret-key-here
   ```

4. **Seed the database (populate with sample coffee items):**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

   The backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API base URL:**
   - Open `frontend/config/api.js`
   - Update the `BASE_URL` to your backend server address
   - **For physical device testing**, use your computer's local IP address:
     - Windows: Run `ipconfig` in CMD and find IPv4 Address
     - Mac/Linux: Run `ifconfig` and find your IP
     - Example: `export const BASE_URL = "http://192.168.1.100:3000";`
   - **For emulator/simulator**: Use `http://localhost:3000` or `http://10.0.2.2:3000` (Android)

4. **Start the Expo development server:**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on your device:**
   - Scan the QR code with Expo Go app (iOS) or Camera app (Android)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 🔧 Configuration

### Finding Your Local IP Address

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" under your network adapter
```

**Mac/Linux:**
```bash
ifconfig
# Look for "inet" address (usually starts with 192.168.x.x or 10.0.x.x)
```

Update `frontend/config/api.js` with your IP:
```javascript
export const BASE_URL = "http://YOUR_IP_ADDRESS:3000";
```

## 📱 API Endpoints

### Coffee/Menu
- `GET /api/coffee` - Get all coffee items
- `GET /api/coffee/random` - Get a random coffee item

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:userId` - Get user's orders

## 🗄️ Database Models

### User
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)

### MenuItem
- `name` (String, required)
- `category` (String, required)
- `description` (String)
- `price` (Number, required)
- `sizes` (Object with small, medium, large prices)
- `image` (String, URL)
- `featured` (Boolean)
- `inStock` (Boolean)

### Order
- `userId` (ObjectId, ref: User)
- `items` (Array of items with name, size, price, quantity)
- `total` (Number, required)
- `status` (String, default: "pending")
- `createdAt` (Date)

## 🎨 Screens

1. **HomeScreen**: Featured coffees, categories, menu items, "Surprise Me" button
2. **CoffeeDetailScreen**: Item details, size selection, add to cart
3. **CartScreen**: View cart items, remove items, checkout
4. **LoginScreen**: User login
5. **SignupScreen**: User registration
6. **ProfileScreen**: User info, order history, logout

## 🐛 Troubleshooting

### Backend Issues

1. **MongoDB Connection Error:**
   - Verify your MongoDB connection string in `.env`
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure your network allows MongoDB connections

2. **Port Already in Use:**
   - Change PORT in `.env` file
   - Or kill the process using port 3000

### Frontend Issues

1. **Cannot Connect to Backend:**
   - Verify `BASE_URL` in `frontend/config/api.js`
   - Ensure backend server is running
   - Check if both devices are on the same network
   - For Android emulator, use `http://10.0.2.2:3000`
   - For iOS simulator, use `http://localhost:3000`

2. **Expo App Not Loading:**
   - Clear Expo cache: `expo start -c`
   - Restart Expo development server
   - Check if your device and computer are on the same Wi-Fi network

## 📝 Sample Test Credentials

After seeding, you can create your own account through the Signup screen.

## 🛠️ Development

### Backend
- Uses Express.js for API routes
- MongoDB with Mongoose for database
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React Native with Expo
- React Navigation for routing
- Context API for state management
- Fetch API for HTTP requests

## 📄 License

This project is for educational purposes.

## 🙏 Credits

Built with:
- React Native & Expo
- Node.js & Express
- MongoDB & Mongoose
- React Navigation

---

**Happy Coding! ☕**

