const router = require('express').Router();
const auth = require('../middleware/auth');
const { Order } = require('../models/Order');
const { Cart } = require('../models/Cart');

router.use(auth);

router.post('/', async (req, res) => {
  const cartItems = await Cart.find({ user_id: req.user.id }).populate('product_id');
  if (cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty' });
  const items = cartItems.map(ci => ({
    product_id: ci.product_id._id,
    quantity: ci.quantity,
    price: ci.product_id.price,
  }));
  const total = items.reduce((s, i) => s + i.quantity * i.price, 0);
  const order = await Order.create({ user_id: req.user.id, items, total_amount: total, status: 'placed' });
  await Cart.deleteMany({ user_id: req.user.id });
  res.status(201).json(order);
});

router.get('/', async (req, res) => {
  const orders = await Order.find({ user_id: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json(order);
});

module.exports = router;









