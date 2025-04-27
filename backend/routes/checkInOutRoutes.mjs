import express from 'express';
import { checkIn, checkOut, getCheckInOutHistory, getCheckInOutStatus } from '../controller/CheckingInOut.mjs'

const router = express.Router();


router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/history', getCheckInOutHistory);
router.get('/checkstatus', getCheckInOutStatus);
  
export default router;
