import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import subscriptionService from '../services/subscriptionService';
import './Subscription.css';

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError('');
      const updatedUser = await subscriptionService.subscribe();
      setUser(updatedUser);
      navigate('/dashboard'); // Redirect to dashboard after successful subscription
    } catch (err) {
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  if (user?.isSubscribed) {
    return null; // Don't show subscription component if user is already subscribed
  }

  return (
    <div className="subscription-container">
      <div className="subscription-card">
        <h2>Upgrade to Premium</h2>
        <div className="subscription-features">
          <ul>
            <li>✓ Access to all premium content</li>
            <li>✓ Ad-free experience</li>
            <li>✓ Priority support</li>
            <li>✓ Exclusive features</li>
          </ul>
        </div>
        <div className="subscription-actions">
          <button
            className="subscribe-button"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>
          <button
            className="skip-button"
            onClick={handleSkip}
            disabled={loading}
          >
            Skip for Now
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Subscription; 