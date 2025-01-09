import { useEffect, useCallback, useState, useRef } from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import Services from './components/Services'
import CreativeAgency from './components/CreativeAgency'
import Partners from './components/Partners'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import LogoAnimation from './components/LogoAnimation'
import ClientFeedback from './components/ClientFeedback'
import { skillsData } from './data/skillsData'
import './App.css'

// Add navigation configuration
const navigationConfig = {
  about: {
    id: 'about',
    offset: 16,
    threshold: 1
  },
  work: {
    id: 'work',
    offset: 16,
    threshold: 1
  },
  services: {
    id: 'services',
    offset: 16,
    threshold: 1
  },
  experience: {
    id: 'experience',
    offset: 32,
    threshold: 2,
    timeout: 1200
  },
  skills: {
    id: 'skills',
    offset: 24,
    threshold: 2,
    timeout: 1000
  },
  testimonials: {
    id: 'testimonials',
    offset: 24,
    threshold: 2,
    timeout: 1000
  },
  feedback: {
    id: 'feedback',
    offset: 24,
    threshold: 2,
    timeout: 1000
  },
  contact: {
    id: 'contact',
    offset: 16,
    threshold: 1,
    timeout: 800
  }
};

function App() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const errorTimeoutRef = useRef(null);

  // Auto-hide error after 5 seconds
  useEffect(() => {
    if (hasError) {
      // Clear any existing timeout
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }

      errorTimeoutRef.current = setTimeout(() => {
        setHasError(false);
        setErrorMessage('');
      }, 5000);

      return () => {
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
      };
    }
  }, [hasError, errorMessage]);

  const handleDismissError = useCallback((e) => {
    e.stopPropagation(); // Prevent event bubbling
    setHasError(false);
    setErrorMessage('');
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
  }, []);

  const handleSkipLinkFocus = useCallback((e) => {
    e.preventDefault();
    
    try {
      const mainContent = document.getElementById('main-content');
      
      if (!mainContent) {
        throw new Error('Main content section not found');
      }

      // Reset error state on successful navigation
      setHasError(false);
      setErrorMessage('');

      // Focus first, then scroll to prevent focus jumping
      mainContent.focus();
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        mainContent.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    } catch (error) {
      console.error('Error handling skip link:', error);
      setHasError(true);
      setErrorMessage(error.message || 'Error navigating to main content');
      // Fallback to default behavior if something goes wrong
      window.location.hash = 'main-content';
    }
  }, []);

  useEffect(() => {
    const skipLink = document.querySelector('.skip-link');
    
    if (!skipLink) {
      console.warn('Skip link element not found');
      return;
    }

    skipLink.addEventListener('click', handleSkipLinkFocus);
    
    // Cleanup function
    return () => {
      skipLink.removeEventListener('click', handleSkipLinkFocus);
    };
  }, [handleSkipLinkFocus]);

  const scrollToSection = useCallback((id, options = {}) => {
    try {
      const sectionConfig = navigationConfig[id] || {};
      const {
        offset = sectionConfig.offset || 16,
        threshold = sectionConfig.threshold || 1,
        timeout = sectionConfig.timeout || 1000,
        behavior = 'smooth'
      } = options;

      const element = document.getElementById(id);
      if (!element) {
        console.warn(`Section with id "${id}" not found`);
        return;
      }

      // Handle keyboard navigation
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          element.removeAttribute('tabindex');
          document.removeEventListener('keydown', handleKeyDown);
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      // Get header height with fallback and custom offset
      const headerOffset = (parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height'), 
        10
      ) || 73) + offset;

      // Calculate position with scroll offset and viewport height check
      const elementPosition = element.getBoundingClientRect().top;
      const scrollOffset = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const elementHeight = element.offsetHeight;
      
      // Adjust scroll position if element is taller than viewport
      const offsetPosition = Math.max(0, elementPosition + scrollOffset - (
        elementHeight > viewportHeight ? 0 : headerOffset
      ));

      // Handle scroll completion and focus management
      const handleScrollComplete = () => {
        const previousFocus = document.activeElement;
        
        // Set focus without affecting scroll
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
        
        // Verify and adjust final scroll position if needed
        const finalPosition = window.scrollY || document.documentElement.scrollTop;
        if (Math.abs(finalPosition - offsetPosition) > threshold) {
          window.scrollTo(0, offsetPosition);
        }

        // Cleanup tabindex and restore focus on blur
        element.addEventListener('blur', () => {
          element.removeAttribute('tabindex');
          document.removeEventListener('keydown', handleKeyDown);
          if (previousFocus instanceof HTMLElement) {
            previousFocus.focus();
          }
        }, { once: true });
      };

      // Use Promise-based scrolling with timeout fallback
      const scrollPromise = new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => reject(new Error('Scroll timeout')), timeout);

        const handleScrollEnd = () => {
          clearTimeout(timeoutId);
          window.removeEventListener('scroll', handleScrollEnd);
          resolve();
        };

        if ('scrollBehavior' in document.documentElement.style) {
          window.addEventListener('scroll', handleScrollEnd, { once: true });
          window.scrollTo({
            top: offsetPosition,
            behavior
          }).catch(() => {
            window.removeEventListener('scroll', handleScrollEnd);
            window.scrollTo(0, offsetPosition);
            resolve();
          });
        } else {
          window.scrollTo(0, offsetPosition);
          handleScrollEnd();
        }
      });

      // Handle scroll completion
      scrollPromise
        .then(() => {
          requestAnimationFrame(handleScrollComplete);
        })
        .catch((error) => {
          console.warn('Smooth scroll failed:', error);
          window.scrollTo(0, offsetPosition);
          handleScrollComplete();
        });

    } catch (error) {
      console.error('Error scrolling to section:', error);
    }
  }, []);

  return (
    <div className="app" role="document">
      <LogoAnimation />
      {hasError && (
        <div 
          role="alert" 
          className="error-message"
          aria-live="polite"
        >
          <span className="error-text">{errorMessage}</span>
          <button 
            type="button"
            className="error-close"
            onClick={handleDismissError}
            aria-label="Dismiss error message"
          >
            ×
          </button>
        </div>
      )}
      <a 
        href="#main-content" 
        className="skip-link"
        role="navigation"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      {window.location.pathname === '/login' ? (
        <Login />
      ) : window.location.pathname === '/signup' ? (
        <SignUp />
      ) : window.location.pathname === '/profile' ? (
        <Profile />
      ) : (
        <>
          <Header 
            onNavigate={scrollToSection} 
            navigationConfig={navigationConfig}
          />
          <main 
            id="main-content" 
            className="main" 
            style={{ paddingTop: 'var(--header-height)' }}
            tabIndex="-1"
            role="main"
            aria-label="Main content"
          >
            <Hero />
            <Work />
            <Services />
            <CreativeAgency />
            <Partners />
            <Experience />
            <Skills skills={skillsData} />
            <ClientFeedback />
            <Contact />
            <div 
              className="section-spacer" 
              aria-hidden="true" 
              role="presentation"
            />
          </main>
          <Footer 
            onNavigate={scrollToSection} 
            navigationConfig={navigationConfig}
          />
        </>
      )}
    </div>
  );
}

export default App;
