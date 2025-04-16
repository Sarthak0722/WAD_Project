const User = require('../models/User');

// @desc    Update user subscription status
// @route   PUT /api/subscription/update
// @access  Private
exports.updateSubscription = async (req, res) => {
  try {
    const { userId, isSubscribed } = req.body;

    // Validate input
    if (!userId || typeof isSubscribed !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid user ID and subscription status'
      });
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { isSubscribed },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscription status updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isSubscribed: user.isSubscribed
      }
    });
  } catch (error) {
    console.error('Subscription update error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating subscription'
    });
  }
}; 