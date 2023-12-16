const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware.authenticate);

router.post('/apply', leaveController.applyLeave);
router.get('/history', leaveController.leaveHistory);

module.exports = router;
