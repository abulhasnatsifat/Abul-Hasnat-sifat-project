import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import Logo from './Logo';
import './Header.css';

const Header = ({ onNavigate, navigationConfig }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Update hash when URL changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    document.body.classList.toggle('menu-open');
  }, []);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    window.location.hash = sectionId;
    onNavigate?.(sectionId, navigationConfig[sectionId]);
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [onNavigate, navigationConfig, isMenuOpen, toggleMenu]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Logo onNavigate={onNavigate} />
        </div>
        
        <div className="nav-tabs">
          <nav 
            className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
            aria-label="Main navigation"
          >
            <ul>
              <li>
                <a 
                  href="#work" 
                  onClick={(e) => handleNavClick(e, 'work')}
                  aria-current={currentHash === '#work' ? 'page' : undefined}
                >
                  Work
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleNavClick(e, 'services')}
                  aria-current={currentHash === '#services' ? 'page' : undefined}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  onClick={(e) => handleNavClick(e, 'experience')}
                  aria-current={currentHash === '#experience' ? 'page' : undefined}
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  onClick={(e) => handleNavClick(e, 'skills')}
                  aria-current={currentHash === '#skills' ? 'page' : undefined}
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#feedback" 
                  onClick={(e) => handleNavClick(e, 'feedback')}
                  aria-current={currentHash === '#feedback' ? 'page' : undefined}
                >
                  Feedback
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, 'contact')}
                  aria-current={currentHash === '#contact' ? 'page' : undefined}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-actions">
          <button 
            className="btn-login"
            onClick={() => window.location.href = '/login'}
            aria-label="Log in to your account"
          >
            Log in
          </button>
          <button 
            className="btn-signup"
            onClick={() => window.location.href = '/signup'}
            aria-label="Create a new account"
          >
            Sign up
          </button>
          <button 
            className="btn-profile"
            onClick={() => window.location.href = '/profile'}
            aria-label="View your profile"
          >
            <img 
              src="https://ui-avatars.com/api/?name=John+Doe&size=32" 
              alt="" 
              className="profile-icon"
            />
          </button>
          <div 
            className="contact-button"
            role="navigation"
            aria-label="Contact navigation"
          >
            <a 
              href="#contact" 
              className="btn-primary"
              onClick={(e) => handleNavClick(e, 'contact')}
              aria-current={currentHash === '#contact' ? 'page' : undefined}
            >
              Get in touch
            </a>
          </div>
          <div className="menu-logo" onClick={toggleMenu}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              className="menu-icon"
            >
              <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
            </svg>
          </div>
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-haspopup="true"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <button 
            className="exit-button" 
            onClick={toggleMenu} 
            aria-label="Close menu"
          >
            <div className="exit-circle">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                className="exit-icon"
              >
                <path d="M12 10.586l-4.293-4.293-1.414 1.414L10.586 12l-4.293 4.293 1.414 1.414L12 13.414l4.293 4.293 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414z" />
              </svg>
            </div>
          </button>
          
          <nav 
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            <h2 className="nav-heading">Navigations</h2>
            <ul>
              <li>
                <a 
                  href="#work" 
                  onClick={(e) => handleNavClick(e, 'work')}
                  aria-current={currentHash === '#work' ? 'page' : undefined}
                >
                  Work
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleNavClick(e, 'services')}
                  aria-current={currentHash === '#services' ? 'page' : undefined}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  onClick={(e) => handleNavClick(e, 'experience')}
                  aria-current={currentHash === '#experience' ? 'page' : undefined}
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  onClick={(e) => handleNavClick(e, 'skills')}
                  aria-current={currentHash === '#skills' ? 'page' : undefined}
                >
                  Skills
                </a>
              </li>
            </ul>

            <h2 className="nav-heading">Follow Us</h2>
            <div className="social-icons">
              <button 
                className="social-button" 
                onClick={() => window.open('https://facebook.com', '_blank')}
                aria-label="Follow us on Facebook"
              >
                Facebook
              </button>
              <button 
                className="social-button" 
                onClick={() => window.open('https://twitter.com', '_blank')}
                aria-label="Follow us on Twitter"
              >
                Twitter
              </button>
              <button 
                className="social-button" 
                onClick={() => window.open('https://instagram.com', '_blank')}
                aria-label="Follow us on Instagram"
              >
                Instagram
              </button>
            </div>

            <div className="get-in-touch">
              <button 
                className="btn-primary" 
                onClick={() => window.location.href = '#contact'}
                aria-label="Get in touch"
              >
                Get in Touch
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  navigationConfig: PropTypes.object.isRequired,
};

export default Header;