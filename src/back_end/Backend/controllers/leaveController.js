const express = require('express');
const jwt = require('jsonwebtoken');
const Leave = require('../models/Leave');
const User = require('../models/User');

const router = express.Router();

// Apply for leave
router.post('/apply-leave', async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const userId = req.user.userId; // Extract user ID from the JWT token

    // Create a new leave request
    const leave = new Leave({
      userId,
      startDate,
      endDate,
      reason,
    });

    // Save the leave request to the database
    await leave.save();

    res.status(201).json({ message: 'Leave applied successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get leave status for the authenticated user
router.get('/leave-status', async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from the JWT token

    // Find leave requests for the user
    const leaveStatus = await Leave.find({ userId }).select('startDate endDate reason status');

    res.status(200).json({ leaveStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get leave history for the authenticated user
router.get('/leave-history', async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from the JWT token

    // Find all leave requests for the user
    const leaveHistory = await Leave.find({ userId }).select('startDate endDate reason status');

    res.status(200).json({ leaveHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
