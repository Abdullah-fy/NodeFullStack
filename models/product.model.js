const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const ProductSchema = new Schema({
    _id:{ type: String, required: true}, 
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
        type: String, 
        required: true, 
        enum: ['forHer', 'forHim']
    },
    images: { type: [String], required: true }, // Array of image URLs
    stockQuantity: { type: Number, required: true },
    sellerinfo: { 
        id: { type: String, ref: 'User' }, 
        name: { type: String } 
    }
}, { timestamps: true });  // added time stamp

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
