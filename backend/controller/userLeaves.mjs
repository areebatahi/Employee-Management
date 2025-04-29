import LeaveApplication from "../models/Leave/leaveApply.mjs";

const applyForLeave = async (req, res) => {
  const { leaveType, startDate, endDate, reason, employeeName } = req.body;

  // Check if reason is provided
  if (!reason || reason.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Reason is required for the leave application.",
    });
  }

  try {
    const newLeaveApplication = new LeaveApplication({
      leaveType,
      startDate,
      endDate,
      reason,
      employeeName,
    });

    await newLeaveApplication.save();
    res.status(201).json({
      success: true,
      message: "Leave application submitted successfully",
      leave: newLeaveApplication,
    });
  } catch (error) {
    console.error("Error submitting leave application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit leave application",
    });
  }
};

const getLeaveApplications = async (req, res) => {
  const { employeeName } = req.query;

  try {
    const leaves = await LeaveApplication.find({ employeeName });
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error fetching leave applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leave applications",
    });
  }
};

export { applyForLeave, getLeaveApplications };
