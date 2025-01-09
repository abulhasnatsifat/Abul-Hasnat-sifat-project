import { useState } from 'react';
import Logo from './Logo';
import './SignUp.css';
import { GoogleLogin } from 'react-google-login';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Please fill in all fields');
      }

      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid email');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = '/';
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async (response) => {
    console.log('Google sign-up response:', response);
    // Here you can handle the response and send the data to your backend
    // For example, you might want to extract the user information and create an account
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <Logo onClick={() => window.location.href = '/'} />
        </div>
        
        <h1>Create your account</h1>
        <p className="signup-subtitle">Join our community today</p>

        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="error-message" role="alert">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              autoComplete="new-password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-text">
                <span className="loading-dots"></span>
                Creating account
              </span>
            ) : (
              'Create account'
            )}
          </button>

          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Sign up with Google"
            onSuccess={handleGoogleSignUp}
            onFailure={(response) => console.log('Google sign-up failed:', response)}
            cookiePolicy={'single_host_origin'}
            className="btn-google"
          />
        </form>

        <p className="login-prompt">
          Already have an account?{' '}
          <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp; 