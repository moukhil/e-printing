const express = require('express');
const CartItem = require('../models/CartItem');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get logged-in user's cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const items = await CartItem.find({
      user: req.user.id
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add item to logged-in user's cart
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newItem = new CartItem({
      user: req.user.id,
      fileUrl: req.body.fileUrl,
      filename: req.body.filename,
      paperType: req.body.paperType,
      color: req.body.color,
      copies: req.body.copies,
      price: req.body.price
    });

    const saved = await newItem.save();

    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete only user's own cart item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {

    const item = await CartItem.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    await item.deleteOne();

    res.json({
      message: 'Item removed'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;