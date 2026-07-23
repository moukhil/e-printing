const express = require('express');
const Order = require('../models/order');
const CartItem = require('../models/CartItem');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


// Get logged-in user's orders
router.get('/', authMiddleware, async (req, res) => {
  try {

    console.log("Logged user ID:", req.user.id);

    const orders = await Order.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    console.log("Orders found:", orders);

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Create order for logged-in user
router.post('/', authMiddleware, async (req, res) => {
  try {

    const { items, totalPrice } = req.body;

    const newOrder = new Order({
      user: req.user.id,
      items,
      totalPrice
    });

    const savedOrder = await newOrder.save();


    // Delete only this user's cart items
    await CartItem.deleteMany({
      user: req.user.id
    });


    res.status(201).json(savedOrder);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete only user's order
router.delete('/:id', authMiddleware, async (req, res) => {
  try {

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    await order.deleteOne();

    res.json({
      message: "Order deleted"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;