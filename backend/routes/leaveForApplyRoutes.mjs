// routes/leaveRoutes.js
import express from "express";
import { applyForLeave, getLeaveApplications } from "../controller/userLeaves.mjs";
const router = express.Router();

router.post("/apply", applyForLeave);
router.get("/list", getLeaveApplications);

export default router;