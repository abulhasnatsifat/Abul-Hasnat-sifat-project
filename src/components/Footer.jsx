import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = memo(({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://instagram.com',
      icon: 'instagram'
    },
    { 
      name: 'Facebook', 
      url: 'https://facebook.com',
      icon: 'facebook'
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com',
      icon: 'twitter'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com',
      icon: 'linkedin'
    }
  ];

  const navLinks = [
    { name: 'Work', url: '#work' },
    { name: 'Services', url: '#services' },
    { name: 'Experience', url: '#experience' },
    { name: 'Skills', url: '#skills' },
    { name: 'Feedback', url: '#feedback' },
    { name: 'Contact', url: '#contact' }
  ];

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    onNavigate?.(sectionId);
  }, [onNavigate]);

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a 
              href="/" 
              className="footer-logo"
              aria-label="HS Studio - Return to homepage"
            >
              <span className="logo-main">HS</span>
              <span className="logo-tagline">Studio</span>
            </a>
            <p className="footer-copyright">
              © {currentYear} HS Studio Ltd · All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms & Conditions</a>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <h3>Navigation</h3>
            <ul>
              {navLinks.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.url}
                    onClick={(e) => handleNavClick(e, link.url.slice(1))}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-social">
            <h3>Follow us</h3>
            <ul>
              {socialLinks.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${link.icon}`}
                    aria-label={`Follow us on ${link.name}`}
                  >
                    <span className="sr-only">
                      Follow us on {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Get in touch</h3>
            <address>
              <a 
                href="tel:+442071128285"
                aria-label="Call us at 0207 112 82 85"
              >
                +44 207 112 82 85
              </a>
              <a 
                href="mailto:contact@example.com"
                aria-label="Email us at contact@example.com"
              >
                contact@example.com
              </a>
              <p>
                HS Studio, 18 Soho Square,<br />
                London, W1D 3QL,<br />
                United Kingdom
              </p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.propTypes = {
  onNavigate: PropTypes.func
};

Footer.displayName = 'Footer';

export default Footer; 