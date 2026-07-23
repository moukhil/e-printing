const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  fileUrl: { type: String, required: true },
  filename: { type: String, required: true },
  paperType: { type: String, required: true },
  color: { type: String, required: true },
  copies: { type: Number, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);