import { memo, useRef, useEffect, useCallback } from 'react';
import './Contact.css';

const Contact = memo(() => {
  const methodsRef = useRef(null);
  const observerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const setupObserver = useCallback(() => {
    if (!window.IntersectionObserver) {
      methodsRef.current?.querySelectorAll('.contact-method').forEach(item => {
        item.classList.add('fade-in');
      });
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animationFrameRef.current = requestAnimationFrame(() => {
              entry.target.classList.add('fade-in');
            });
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    const items = methodsRef.current?.querySelectorAll('.contact-method');
    items?.forEach((item, index) => {
      item.style.transitionDelay = `${index * 100}ms`;
      observerRef.current?.observe(item);
    });
  }, []);

  useEffect(() => {
    setupObserver();
    return () => {
      observerRef.current?.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [setupObserver]);

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-content">
          <h2 
            id="contact-title" 
            className="contact-title"
          >
            Let&apos;s start with a conversation about how we can help you!
            <span className="contact-subtitle">Get in touch, we&apos;re a nice bunch.</span>
          </h2>

          <div 
            className="contact-info"
            ref={methodsRef}
          >
            <div className="contact-method">
              <h3>Call us</h3>
              <a 
                href="tel:+442071128285" 
                className="contact-link"
                aria-label="Call us at 0207 112 82 85"
              >
                0207 112 82 85
              </a>
            </div>

            <div className="contact-method">
              <h3>Email us</h3>
              <a 
                href="mailto:contact@example.com" 
                className="contact-link"
                aria-label="Email us at contact@example.com"
              >
                contact@example.com
              </a>
            </div>

            <div className="contact-method">
              <h3>Visit us</h3>
              <address className="contact-address">
                18 Soho Square,<br />
                London, W1D 3QL,<br />
                United Kingdom
              </address>
            </div>
          </div>

          <div className="contact-cta">
            <a href="#contact-form" className="btn-primary">
              Let&apos;s talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact; 