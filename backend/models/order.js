const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      fileUrl: String,
      filename: String,
      paperType: String,
      color: String,
      copies: Number,
      price: Number,
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Order', orderSchema);