const router = require('express').Router();
const auth = require('../middleware/auth');
const { User } = require('../models/User');

router.use(auth);

router.get('/me', async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

router.put('/me', async (req, res) => {
  const { name, address, phone, avatar } = req.body;
  const toUpdate = { name, address, phone };
  if (avatar) toUpdate.avatar = avatar;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: toUpdate },
    { new: true }
  ).select('-password');
  res.json(user);
});

module.exports = router;






