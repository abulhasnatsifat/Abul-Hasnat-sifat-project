import { memo, useEffect, useRef, useCallback } from 'react';
import './Partners.css';

const Partners = memo(() => {
  const gridRef = useRef(null);
  const observerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const partners = [
    { 
      id: 'google',
      name: 'Google',
      logo: '/logos/google.svg',
      width: 120,
      link: 'https://google.com'
    },
    { 
      id: 'microsoft',
      name: 'Microsoft',
      logo: '/logos/microsoft.svg',
      width: 140,
      link: 'https://microsoft.com'
    },
    { 
      id: 'amazon',
      name: 'Amazon',
      logo: '/logos/amazon.svg',
      width: 130,
      link: 'https://amazon.com'
    },
    { 
      id: 'apple',
      name: 'Apple',
      logo: '/logos/apple.svg',
      width: 110,
      link: 'https://apple.com'
    },
    { 
      id: 'meta',
      name: 'Meta',
      logo: '/logos/meta.svg',
      width: 125,
      link: 'https://meta.com'
    },
    { 
      id: 'netflix',
      name: 'Netflix',
      logo: '/logos/netflix.svg',
      width: 135,
      link: 'https://netflix.com'
    }
  ];

  const setupObserver = useCallback(() => {
    if (!window.IntersectionObserver) {
      // Fallback for browsers without IntersectionObserver
      gridRef.current?.querySelectorAll('.partner-item').forEach(item => {
        item.classList.add('fade-in');
      });
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame for smoother animations
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

    const items = gridRef.current?.querySelectorAll('.partner-item');
    items?.forEach((item, index) => {
      // Stagger animations with increasing delay
      item.style.transitionDelay = `${index * 100}ms`;
      observerRef.current?.observe(item);
    });
  }, []);

  useEffect(() => {
    setupObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [setupObserver]);

  return (
    <section className="partners" aria-labelledby="partners-title">
      <div className="container">
        <h2 
          id="partners-title" 
          className="partners-title"
        >
          From ambitious startups to global companies
          <span className="title-accent" aria-hidden="true">
            we partner with great businesses and industry leaders
          </span>
        </h2>

        <div 
          ref={gridRef}
          className="partners-grid"
          role="group"
          aria-label="Our partner companies"
        >
          {partners.map(partner => (
            <a 
              key={partner.id}
              href={partner.link}
              className="partner-item"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${partner.name}'s website`}
            >
              <img 
                src={partner.logo}
                alt={partner.name}
                className="partner-logo"
                loading="lazy"
                width={partner.width}
                height={Math.floor(partner.width * 0.6)}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

Partners.displayName = 'Partners';

export default Partners; 