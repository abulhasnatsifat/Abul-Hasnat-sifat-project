import { useState } from 'react';
import Logo from './Logo';
import './Login.css';

const formFields = {
  email: {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    validation: (value) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
      return '';
    }
  },
  password: {
    type: 'password',
    label: 'Password',
    placeholder: '••••••••',
    validation: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return '';
    }
  }
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    const validationError = formFields[name].validation(value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: validationError
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid email');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login attempt:', { ...formData, rememberMe });
      
      window.location.href = '/';
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    // Handle Google login response
    console.log('Google login response:', response);
    // You can add your logic to handle the response here
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Logo onClick={handleLogoClick} />
        </div>
        
        <h1>Welcome back</h1>
        <p className="login-subtitle">Please enter your details</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message" role="alert">{error}</div>}
          
          {Object.entries(formFields).map(([fieldName, field]) => (
            <div className="form-group" key={fieldName}>
              <label htmlFor={fieldName}>{field.label}</label>
              <input
                type={field.type}
                id={fieldName}
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                autoComplete={fieldName === 'email' ? 'email' : 'current-password'}
                aria-describedby={fieldErrors[fieldName] ? `${fieldName}-error` : undefined}
                className={fieldErrors[fieldName] ? 'input-error' : ''}
              />
              {fieldErrors[fieldName] && (
                <div className="field-error" id={`${fieldName}-error`}>
                  {fieldErrors[fieldName]}
                </div>
              )}
            </div>
          ))}

          <div className="form-options">
            <label className="remember-me">
              <input 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                aria-label="Remember me"
              />
              <span>Remember me</span>
            </label>
            <a 
              href="/forgot-password" 
              className="forgot-password"
              onClick={(e) => {
                e.preventDefault();
                console.log('Forgot password clicked');
              }}
            >
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={isLoading || !formData.email || !formData.password}
          >
            {isLoading ? (
              <span className="loading-text">
                <span className="loading-dots"></span>
                Signing in
              </span>
            ) : (
              'Sign in'
            )}
          </button>

          <button 
            type="button" 
            className="btn-google"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </button>
        </form>

        <p className="signup-prompt">
          Don&apos;t have an account?{' '}
          <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login; 