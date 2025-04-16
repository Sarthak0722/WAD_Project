const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { updateSubscription } = require('../controllers/subscriptionController');

// Subscription routes
router.put('/update', protect, updateSubscription);

module.exports = router; 