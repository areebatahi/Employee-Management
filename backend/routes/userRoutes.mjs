import express from "express";
const router = express.Router();

import tokenVerification from "../Middleware/tokenVerification.mjs";
import { uploadImage } from "../Middleware/upload.mjs";

import {
  loginUser,
  createUserAccount,
  getUserProfile,
  getAllUsersAccounts,
  deleteUserAccount,
  updateUserAccount,
  isAdmin,
} from "../controller/userController.mjs";

router.post("/user", uploadImage, createUserAccount);
router.post("/user/login", loginUser);
router.get("/user/me", tokenVerification, getUserProfile);
router.get("/user", tokenVerification, getAllUsersAccounts);
router.put("/user/:id", uploadImage, updateUserAccount);
router.delete("/user/:id", deleteUserAccount);
router.get("/isAdmin", tokenVerification, isAdmin);

export default router;
