import { useState } from 'react';
import './GmailLogin.css';

const GmailLogin = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Here you would integrate with Gmail OAuth
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email.endsWith('@gmail.com')) {
        throw new Error('Please enter a valid Gmail address');
      }

      onSuccess?.(email);
      onClose?.();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gmail-login-overlay">
      <div className="gmail-login-modal">
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close Gmail login"
        >
          ×
        </button>

        <div className="gmail-login-content">
          <img 
            src="/google-icon.svg" 
            alt="Google" 
            className="google-logo"
          />
          <h2>Sign in with Gmail</h2>
          <p>Enter your Gmail address to continue</p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Gmail address"
                required
                pattern=".*@gmail\.com"
                title="Please enter a valid Gmail address"
                autoComplete="email"
              />
            </div>

            <button 
              type="submit" 
              className="btn-gmail-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-text">
                  <span className="loading-dots"></span>
                  Connecting
                </span>
              ) : (
                'Continue with Gmail'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GmailLogin; 