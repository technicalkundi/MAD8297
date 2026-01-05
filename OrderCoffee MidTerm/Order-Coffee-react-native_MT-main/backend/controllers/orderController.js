import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    if (!userId || !items || items.length === 0 || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await Order.create({
      userId,
      items,
      total,
      status: "pending",
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

