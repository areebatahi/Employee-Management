import mongoose from 'mongoose';

const checkInOutSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  checkInTime: { type: Date, required: true },
  checkOutTime: { type: Date, default: null },
});

const CheckInOut = mongoose.model('CheckInOut', checkInOutSchema);

export default CheckInOut;
