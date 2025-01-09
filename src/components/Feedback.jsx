import { memo, useRef, useEffect, useCallback } from 'react';
import './Feedback.css';

const Feedback = memo(() => {
  const gridRef = useRef(null);
  const observerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const feedback = [
    {
      id: 'tga',
      quote: "We have worked with HS Studio to build a complete new website with quite complex connections with our CRM and accounting functions. The end product is brilliant, a really first class blend of design and functionality.",
      author: "Steven Glibbery",
      company: "TGA Mobility"
    },
    {
      id: 'tsp',
      quote: "HS Studio built our new website and it has been an absolute pleasure working with the whole team. Excellent communication and they built us just an incredible looking website.",
      author: "Nathan Smith",
      company: "Tech SuperPowers"
    },
    {
      id: 'costa',
      quote: "HS Studio are a great team of professionals to work with. They listened to our requirements very closely and delivered complex solutions with detail and outstanding creativity.",
      author: "David Cortes",
      company: "Costa Coffee"
    }
  ];

  const setupObserver = useCallback(() => {
    if (!window.IntersectionObserver) {
      gridRef.current?.querySelectorAll('.feedback-card').forEach(item => {
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

    const items = gridRef.current?.querySelectorAll('.feedback-card');
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
    <section className="feedback" id="feedback" aria-labelledby="feedback-title">
      <div className="container">
        <div className="feedback-content">
          <h2 
            id="feedback-title" 
            className="feedback-title"
          >
            Client Feedback
            <span className="feedback-subtitle">
              We&apos;re collaborators - We build tight-knit partnerships with our clients.
            </span>
          </h2>

          <div 
            className="feedback-grid"
            ref={gridRef}
          >
            {feedback.map(item => (
              <div 
                key={item.id}
                className="feedback-card"
              >
                <blockquote>
                  <p className="feedback-quote">{item.quote}</p>
                  <footer>
                    <cite className="feedback-author">
                      {item.author}
                    </cite>
                    <span className="feedback-company">
                      {item.company}
                    </span>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Feedback.displayName = 'Feedback';

export default Feedback; 