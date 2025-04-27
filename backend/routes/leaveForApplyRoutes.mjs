import express from 'express';
import { applyForLeave } from '../controller/userLeaves.mjs';

const router = express.Router();

router.post('/apply', applyForLeave);

export default router;
