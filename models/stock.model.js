const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const SupplierOrderSchema  = new Schema({
  managerId: { type: Types.ObjectId, ref: 'User', required: true }, // Ref to Manager (Sup Admin)
  supplierId: { type: Types.ObjectId, ref: 'User', required: true },
  productId: { type: Types.ObjectId, ref: 'Product', required: true },
  requestedQuantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true
  },
}, { timestamps: true }); // /////////////////////////////timestamps

const SupplierOrder  = mongoose.model("SupplierOrder", SupplierOrderSchema );
module.exports = SupplierOrder;
