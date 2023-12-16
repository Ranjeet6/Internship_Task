const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.use(authMiddleware); // Apply authentication middleware to the routes below

router.get('/user-profile', authController.getUserProfile);

module.exports = router;
