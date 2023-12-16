const express = require('express');
const leaveController = require('../controllers/leaveController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply-leave', authMiddleware, leaveController.applyLeave);
router.get('/leave-status', authMiddleware, leaveController.leaveStatus);
router.get('/leave-history', authMiddleware, leaveController.leaveHistory);

module.exports = router;
