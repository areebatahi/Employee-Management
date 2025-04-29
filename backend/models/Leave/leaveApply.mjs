import mongoose from "mongoose";

const leaveApplicationSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  leaveType: { type: String, required: true, enum: ["Sick", "Casual", "Travel", "Other"] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Default status is Pending
});

const LeaveApplication = mongoose.model("LeaveApplication", leaveApplicationSchema);

export default LeaveApplication;