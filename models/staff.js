const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const StaffSchema = new mongoose.Schema({
    _id: { 
      type: mongoose.Schema.Types.ObjectId, auto: true
  },
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    email: { type: String, required: true, unique: true, validate: [validator.isEmail, 'Invalid email'] },
    password: { type: String, required: true, minlenght: 8 }, 
    role: {
      type: String,
      enum: ['cashier','clerk'],
      required: true,
    },
    isActive: { type: Boolean, default: true }
  }
  );

  const staff  = mongoose.model("staff", StaffSchema );
  module.exports = staff;