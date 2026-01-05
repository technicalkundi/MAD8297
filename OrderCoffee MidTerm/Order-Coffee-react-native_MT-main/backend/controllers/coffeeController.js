import MenuItem from "../models/MenuItem.js";

export const getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRandomItem = async (req, res) => {
  try {
    const items = await MenuItem.find({ inStock: true });
    if (items.length === 0) {
      return res.status(404).json({ message: "No items in stock" });
    }
    const random = items[Math.floor(Math.random() * items.length)];
    res.json(random);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

