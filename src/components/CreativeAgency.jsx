import { useEffect, useRef, useCallback, memo } from 'react';
import './CreativeAgency.css';

const CreativeAgency = memo(() => {
  const statsRef = useRef(null);
  const partnerStatsRef = useRef(null);
  const observerRef = useRef(null);
  
  const stats = [
    { 
      id: 'projects',
      number: '300+', 
      label: 'Successful Projects', 
      description: 'Delivered worldwide' 
    },
    { 
      id: 'awards',
      number: '15+', 
      label: 'Industry Awards', 
      description: 'For excellence in design' 
    }
  ];

  const partnerStats = [
    { 
      id: 'experience',
      number: '20+', 
      label: 'Years Experience', 
      description: 'In digital innovation' 
    },
    { 
      id: 'clients',
      number: '500+', 
      label: 'Happy Clients', 
      description: 'Across the globe' 
    }
  ];

  const setupObserver = useCallback(() => {
    if (!window.IntersectionObserver) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('animate-in');
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

    document.querySelectorAll('.stat-item').forEach(el => {
      observerRef.current?.observe(el);
    });
  }, []);

  useEffect(() => {
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    if (supportsIntersectionObserver) {
      setupObserver();
    } else {
      requestAnimationFrame(() => {
        document.querySelectorAll('.stat-item').forEach(el => {
          el.classList.add('animate-in');
        });
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [setupObserver]);

  const renderStats = useCallback((statsData, sectionLabel) => (
    statsData.map(stat => (
      <div 
        key={`${sectionLabel}-${stat.id}`}
        className="stat-item"
        role="figure"
        aria-label={`${stat.label}: ${stat.number}`}
      >
        <span className="stat-number">{stat.number}</span>
        <div className="stat-info">
          <span className="stat-label">{stat.label}</span>
          <span className="stat-description">{stat.description}</span>
        </div>
      </div>
    ))
  ), []);

  return (
    <section className="creative-agency" id="about">
      <div className="container">
        <div className="agency-content">
          <h2 className="agency-title">
            Creative Agency
            <span className="title-accent" aria-hidden="true">Built for Growth</span>
          </h2>
          
          <p className="agency-description">
            We're an award-winning creative agency based in London, focused on delivering 
            exceptional digital experiences through E-Commerce, Web Design, Digital Products, 
            and Strategic Branding solutions.
          </p>
          
          <div 
            className="agency-stats" 
            ref={statsRef} 
            aria-label="Agency statistics"
          >
            {renderStats(stats, 'agency')}
          </div>
        </div>

        <div className="agency-partner">
          <h2 className="partner-title">
            Your Digital Partner
            <span className="title-accent" aria-hidden="true">for Success</span>
          </h2>
          
          <p className="partner-description">
            We collaborate with ambitious brands and people to create transformative 
            digital solutions. Our strategic approach and technical expertise help 
            businesses achieve sustainable growth and meaningful impact.
          </p>
          
          <div 
            className="partner-stats" 
            ref={partnerStatsRef}
            aria-label="Partner statistics"
          >
            {renderStats(partnerStats, 'partner')}
          </div>
        </div>
      </div>
    </section>
  );
});

CreativeAgency.displayName = 'CreativeAgency';

export default CreativeAgency; 