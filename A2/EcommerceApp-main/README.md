# E-Commerce App (Assignment 2)

Monorepo with React Native (Expo) frontend and Express + MongoDB backend.

## Repo Structure

```
A2/
└── ecommerce-app/
    ├── frontend/          React Native Expo app
    └── backend/           Express.js server (MongoDB)
```

## Prerequisites
- Node.js 18+
- npm
- MongoDB (local) or MongoDB Atlas
- Expo Go app on device (optional) or Android Emulator / iOS Simulator

## Backend (Express + MongoDB)

1) Install deps
```
cd backend
npm install
```

2) Environment
Create `.env` in `backend` (same folder as `package.json`):
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=3000
JWT_SECRET=please_change_me
```

3) Run server
```
npm run dev
```
- Server: `http://localhost:3000`
- Health check: `GET /health`

### API Overview
- Auth: `POST /api/auth/signup`, `POST /api/auth/login`
- Products: `GET /api/products`, `GET /api/products/:id`
- Cart (auth): `GET /api/cart`, `POST /api/cart`, `PATCH /api/cart/:id`, `DELETE /api/cart/:id`
- Orders (auth): `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id`
- Users (auth): `GET /api/users/me`, `PUT /api/users/me`

## Frontend (React Native + Expo)

1) Install deps
```
cd frontend
npm install
```

2) Configure backend URL
- Default is `http://10.0.2.2:3000` (Android emulator). For physical device, replace with your machine IP.
- You can set env var in `app.config.js` or `.env` via `EXPO_PUBLIC_API_URL`.

3) Run app
```
npm run start
```
- Press `a` for Android, `w` for web, or scan QR for device.

## Database Setup (MongoDB)
- Install MongoDB locally or use MongoDB Atlas.
- Update `MONGODB_URI` accordingly.

### Collections (Schema)
- Products: name, description, price, image_url, category, stock
- Users: name, email, password (bcrypt), address, phone
- Orders: user_id, items[{product_id, quantity, price}], total_amount, status, order_date
- Cart: user_id, product_id, quantity

## Navigation
- Bottom Tabs: Home, Categories, Cart, Profile
- Stack: Home -> ProductDetails -> Checkout -> OrderConfirmation

## Notes
- UI: React Native Paper.
- Animations: react-native-animatable.
- Axios for API calls.
- For auth, persist token (AsyncStorage/SecureStore) and set Authorization header.

## Screenshots
Add screenshots of each screen here before submission.

## Frontend-Backend Communication
- App sends HTTP requests with Axios to Express endpoints.
- Express queries MongoDB via Mongoose and returns JSON.

## Troubleshooting
- Android emulator cannot reach `localhost`; use `10.0.2.2`.
- If MongoDB connection fails, verify `MONGODB_URI` and that mongod is running.







