import { memo, useEffect, useRef, useCallback } from 'react';
import './Experience.css';

const Experience = memo(() => {
  const statsRef = useRef(null);
  const observerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const stats = [
    {
      id: 'reviews',
      number: '250+',
      label: 'Five-Star Reviews',
      description: 'From satisfied clients'
    },
    {
      id: 'experts',
      number: '10+',
      label: 'In-House Experts',
      description: 'Dedicated specialists'
    },
    {
      id: 'experience',
      number: '19+',
      label: 'Years Experience',
      description: 'In digital innovation'
    }
  ];

  const setupObserver = useCallback(() => {
    if (!window.IntersectionObserver) {
      statsRef.current?.querySelectorAll('.stat-item').forEach(item => {
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

    const items = statsRef.current?.querySelectorAll('.stat-item');
    items?.forEach((item, index) => {
      item.style.transitionDelay = `${index * 150}ms`;
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
    <section className="experience" aria-labelledby="experience-title" id="experience">
     
      <div className="container">
        <div className="experience-content">
          <h2 
            id="experience-title" 
            className="experience-title"
          >
            Let our experienced team elevate 
            <span className="title-highlight">your digital goals</span>
          </h2>

          <div 
            className="experience-stats" 
            ref={statsRef}
            aria-label="Our achievements"
          >
            {stats.map(stat => (
              <div 
                key={stat.id}
                className="stat-item"
                role="figure"
                aria-label={`${stat.label}: ${stat.number}`}
              >
                <span className="stat-number">{stat.number}</span>
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
          </div>

          <p className="experience-description">
            We have successfully completed over 300+ projects from a variety of industries. 
            In our team, designers work alongside developers and digital strategists, 
            we believe this is our winning recipe for creating digital products that make an impact.
          </p>

          <div className="experience-tagline">
          <h2 
            id="contact-title" 
            className="contact-title"
          >
           Crafting digital <br/>
experiences

            <span className="contact-subtitle">since 2004</span>
          </h2>

            <div className="background-overlay">
        <h1 className="background-text">HS Studio</h1>
      </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience; 