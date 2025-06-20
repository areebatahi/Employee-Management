import mongoose from "mongoose";

const LeaveApplicationSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  leaveType: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending" }, // New field
});

export default mongoose.model("LeaveApplication", LeaveApplicationSchema);
