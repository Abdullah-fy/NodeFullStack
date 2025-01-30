const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const OrderSchema = new Schema({
  customerId: { type: String, ref: 'User', required: true },
  items: [
    {
      productId: { type: String, ref: 'Product', required: true },
      sellerId: { type: String, ref: 'User', required: true }, ////////// Ref to Seller (تعديل هنا)
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, 
      itemStatus: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending',
        required: true
      }
    }
  ],
  paymentDetails: {
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'canceled'],
      default: 'pending',
      required: true
    },
    shippingAddress: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
      required: true
    }
  }
}, { timestamps: true }); 
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
