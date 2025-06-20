import express from "express";
import { applyForLeave, getLeaveApplications } from "../controller/userLeaves.mjs";

const router = express.Router();

router.post('/apply', applyForLeave);
router.get('/applications', getLeaveApplications);
 
export default router;