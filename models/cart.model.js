const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const CartSchema = new Schema({
  customerId: { type: Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: true },
      sellerId: { type: Types.ObjectId, ref: 'User', required: true }, /////////////////// Ref to Seller (تعديل هنا)
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
}, { timestamps: true }); /////////////////////////////////////timestamps

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
