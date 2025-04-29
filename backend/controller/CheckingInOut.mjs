import CheckInOut from '../models/CheakInOut/cheackinout.mjs'; // Import model

// Controller for handling Check-In logs
const checkIn = async (req, res) => {
  const { employeeName, checkInTime } = req.body;

  try {
    // Save the check-in record
    const newCheckIn = new CheckInOut({
      employeeName,
      checkInTime,
      checkOutTime: null, // Initially, no check-out time
    });

    await newCheckIn.save();
    res.status(200).send({ message: 'Check-In data saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving Check-In data', error });
  }
};

// Controller for handling Check-Out logs
const checkOut = async (req, res) => {
  const { employeeName, checkOutTime } = req.body;

  try {
    // Find the last check-in record for this employee that hasn't been checked out yet
    const checkInData = await CheckInOut.findOne({ employeeName, checkOutTime: null });

    if (!checkInData) {
      return res.status(400).send({ message: 'No active Check-In found' });
    }

    // Set the check-out time and save the record
    checkInData.checkOutTime = checkOutTime;
    await checkInData.save();
    res.status(200).send({ message: 'Check-Out data saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving Check-Out data', error });
  }
};

// Controller to get Check-In/Check-Out history
const getCheckInOutHistory = async (req, res) => {
  const { employeeName } = req.query;

  if (!employeeName) {
    return res.status(400).json({ message: "Employee name is required" });
  }

  try {
    const history = await CheckInOut.find({ employeeName });
    if (!history.length) {
      return res.status(404).json({ message: 'No history found for this employee' });
    }
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error });
  }
};


// Controller to get Check-In/Check-Out status
const getCheckInOutStatus = async (req, res) => {
  const { employeeName } = req.query;

  try {
    // Fetch the latest check-in and check-out times
    const latestCheckIn = await CheckInOut.findOne({ employeeName }).sort({ checkInTime: -1 });

    if (!latestCheckIn) {
      return res.status(404).json({ message: 'No check-in record found for this employee' });
    }

    res.status(200).json({
      checkInTime: latestCheckIn.checkInTime,
      checkOutTime: latestCheckIn.checkOutTime || null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching status', error });
  }
};

export { checkIn, checkOut, getCheckInOutHistory, getCheckInOutStatus };
