const User = require('../models/user.model'); // Import the User model
const mongoose = require('mongoose');

async function createUser(firstName, lastName, email, password, role) {
  try {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password,
      role
    });
    const savedUser = await newUser.save();
    console.log('User created:', savedUser);
    const claims = {
        sub: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
    }
    return claims;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Read a user by email
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

// Update a user's information
async function updateUser(id, updateData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    console.log('User updated:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete a user by ID
async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    console.log('User deleted:', deletedUser);
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Get all users
async function getAllUsers() {
  try {
    const users = await User.find(); // Fetch all users from the database
    console.log('All users fetched:', users);
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers
};