const Users = require("../models/userModel"); 
const bcrypt = require("bcryptjs");

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

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  userLogin,
};
