const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    _id: { type: String, required: true}, // we will do it easilly
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


// middleware to hash the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();


  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    this.salt = salt;

    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;