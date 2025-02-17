const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const InventorySchema = new Schema({
  branchId: { type: Types.ObjectId, required: true }, 
  products: [
    {
      productId: { type: Types.ObjectId, ref: "Product", required: true },
      stock: { type: Number, default: 0, min: 0 }, 
    }
  ],
  staff: {
    cashier: { type: Types.ObjectId, ref: "user" }, 
    clerk: { type: Types.ObjectId, ref: "user" } 
  },
}, { timestamps: true }); 

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
