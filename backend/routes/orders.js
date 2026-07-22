const express = require('express');
const Order = require('../models/order');
const CartItem = require('../models/CartItem');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    const newOrder = new Order({ items, totalPrice });
    const savedOrder = await newOrder.save();

    await CartItem.deleteMany({});

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
