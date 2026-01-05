const router = require('express').Router();
const auth = require('../middleware/auth');
const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product');

router.use(auth);

router.get('/', async (req, res) => {
  const items = await Cart.find({ user_id: req.user.id }).populate('product_id');
  const detailed = items.map(i => ({
    id: i._id,
    product: i.product_id,
    quantity: i.quantity,
    lineTotal: i.quantity * (i.product_id?.price || 0),
  }));
  const total = detailed.reduce((s, i) => s + i.lineTotal, 0);
  res.json({ items: detailed, total });
});

router.post('/', async (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  const product = await Product.findById(product_id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const existing = await Cart.findOne({ user_id: req.user.id, product_id });
  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return res.json(existing);
  }
  const item = await Cart.create({ user_id: req.user.id, product_id, quantity });
  res.status(201).json(item);
});

router.patch('/:id', async (req, res) => {
  const { quantity } = req.body;
  const item = await Cart.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user.id },
    { $set: { quantity } },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Cart.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
});

module.exports = router;









