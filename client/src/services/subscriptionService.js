import api from './api';

const subscriptionService = {
  subscribe: async () => {
    try {
      const response = await api.put('/users/subscribe');
      if (response.data.success) {
        // Update local storage with new user data
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser = { ...currentUser, isSubscribed: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      } else {
        throw new Error(response.data.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      throw error.response?.data || { message: 'Subscription failed' };
    }
  },

  checkSubscription: () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user ? user.isSubscribed : false;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  }
};

export default subscriptionService; 