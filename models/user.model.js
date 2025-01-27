const mongoose=require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: ObjectId, // Auto-generated ID
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    role: {
      type: String,
      enum: ['customer', 'seller', 'admin', 'manager', 'cashier', 'salesClerk', 'supplier'],
      required: true,
      default: 'customer'
    },
    // isAcrive:[0,1] //in case seller or delete also
    isActive: { type: Boolean, default: true } /////////////////////////////take a look here
  }
  );

const User=mongoose.model("user",UserSchema);
module.exports=User;


