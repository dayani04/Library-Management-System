const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.status(200).json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch user profile using JWT
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;  // This comes from the token
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);  // Send user data as response
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving user profile" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to retrieve users" });
  }
};

const addUser = async (req, res) => {
  const { name, email, age, address, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({ 
      name, 
      email, 
      age, 
      address, 
      password: hashedPassword 
    });

    await user.save();
    return res.status(201).json({ message: "User added successfully", user });
  } catch (err) {
    console.error("Error saving user:", err);
    return res.status(500).json({ message: "Failed to add user", error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Unable to update user details" });
    }
    return res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating user details" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting user" });
  }
};


const getUserByEmail = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving user details" });
  }
};


module.exports = {
  userLogin,
  getUserProfile,
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
};
