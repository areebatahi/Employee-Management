import bcrypt from "bcrypt";
import User from "../models/user/index.mjs";
import "dotenv/config";
import JWT from "jsonwebtoken";
import userSchema from "../schema/userSchema.mjs";
import chalk from "chalk";
import uploadToCloudinary from '../config/cloudinary.mjs';

// =============================================
// ✅ LOGIN USER
// =============================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// =============================================
// ✅ CREATE USER ACCOUNT
// =============================================
const createUserAccount = async (req, res) => {
  console.log(chalk.bgCyan("Incoming call to signup API"));

  try {
    let profileImageUrl = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      profileImageUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: "Profile image is required" });
    }

    const user = await userSchema.validateAsync({
      ...req.body,
      profileImage: profileImageUrl,
    });

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await User.create({
      ...user,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
        error: error.message,
      });
    }

    console.error(chalk.bgRed("Signup Error:"), error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// =============================================
// ✅ GET LOGGED-IN USER PROFILE
// =============================================
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    res.status(200).json({
      status: 200,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        profileImage: user.profileImage,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// =============================================
// ✅ GET ALL USERS (ADMIN ONLY)
// =============================================
const getAllUsersAccounts = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err, status: 400 });
  }
};

// =============================================
// ✅ DELETE USER
// =============================================
const deleteUserAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err, status: 400 });
  }
};

// =============================================
// ✅ UPDATE USER
// =============================================
const updateUserAccount = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      req.body.profileImage = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(400).json({ error: err, status: 400 });
  }
};

// =============================================
// ✅ CHECK ADMIN
// =============================================
const isAdmin = async (req, res) => {
  const { id: userId } = req.user;
  const { role } = await User.findById(userId);

  if (role !== "admin") {
    console.log("❌ user is not an admin");
    return res.status(401).json({
      success: false,
      message: "❌ user is not an admin",
      isAdmin: false,
    });
  }

  res.status(200).json({
    success: true,
    message: "✔ user is an admin",
    isAdmin: true,
  });
  console.log("✔ user is an admin");
};

// =============================================
// ✅ EXPORTS
// =============================================
export {
  loginUser,
  createUserAccount,
  getUserProfile,
  getAllUsersAccounts,
  deleteUserAccount,
  updateUserAccount,
  isAdmin,
};
