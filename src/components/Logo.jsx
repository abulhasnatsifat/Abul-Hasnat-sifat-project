import { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Logo = ({ onNavigate }) => {
  const scrollTimeoutRef = useRef(null);
  const clickTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  const handleClick = useCallback((e) => {
    try {
      const isHomePage = window.location.pathname === '/';
      
      if (isHomePage) {
        e.preventDefault();
        e.stopPropagation();

        // Prevent multiple clicks during scroll
        if (isScrollingRef.current || clickTimeoutRef.current) {
          return;
        }
        
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const isAtTop = scrollY < 50;
        
        if (isAtTop) {
          onNavigate?.('feedback', { 
            offset: 24,
            behavior: 'smooth',
            threshold: 2
          });
        } else {
          isScrollingRef.current = true;

          // Create scroll promise with timeout
          const scrollPromise = new Promise((resolve, reject) => {
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }
            
            scrollTimeoutRef.current = setTimeout(() => {
              reject(new Error('Scroll timeout'));
            }, 1000);

            if ('scrollBehavior' in document.documentElement.style) {
              window.scrollTo({ 
                top: 0, 
                behavior: 'smooth'
              }).finally(() => {
                if (scrollTimeoutRef.current) {
                  clearTimeout(scrollTimeoutRef.current);
                }
                resolve();
              });
            } else {
              window.scrollTo(0, 0);
              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
              }
              resolve();
            }
          });

          // Handle URL update after scroll
          scrollPromise
            .then(() => {
              try {
                window.history.replaceState(null, '', '/');
              } catch (historyError) {
                console.warn('Could not update URL:', historyError);
              }
            })
            .catch((error) => {
              console.warn('Scroll failed:', error);
              window.scrollTo(0, 0);
            })
            .finally(() => {
              isScrollingRef.current = false;
              clickTimeoutRef.current = setTimeout(() => {
                clickTimeoutRef.current = null;
              }, 100);
            });
        }
      }
    } catch (error) {
      console.error('Error handling logo click:', error);
      isScrollingRef.current = false;
    }
  }, [onNavigate]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <a 
      href="/" 
      className="logo-text" 
      aria-label="HS Studio - Return to homepage or view our feedback"
      onClick={handleClick}
      role="banner"
      aria-current={window.location.pathname === '/' ? 'page' : undefined}
    >
      <span className="logo-main">HS</span>
      <span 
        className="logo-tagline" 
        aria-hidden="true"
        data-text="Studio"
      >
        Studio
      </span>
    </a>
  );
};

Logo.propTypes = {
  onNavigate: PropTypes.func
};

Logo.displayName = 'Logo';

export default Logo; 