const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    avatar: { type: String, default: '' }, // Add avatar field
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = { User };





