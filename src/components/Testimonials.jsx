import { memo, useRef, useEffect, useCallback } from 'react';
import './Testimonials.css';

const Testimonials = memo(() => {
  const gridRef = useRef(null);
  const observerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const setupObserver = useCallback(() => {
    if (!window.IntersectionObserver) {
      gridRef.current?.querySelectorAll('.testimonial-card').forEach(item => {
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

    const items = gridRef.current?.querySelectorAll('.testimonial-card');
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

  const testimonials = [
    {
      id: 'tga',
      quote: "We have worked with HS Studio to build a complete new website with quite complex connections. The end product is brilliant, a really first class blend of design and functionality.",
      author: "Steven Glibbery",
      company: "TGA Mobility"
    },
    {
      id: 'tsp',
      quote: "HS Studio built our new website and it has been an absolute pleasure working with the whole team. They built us just an incredible looking website.",
      author: "Nathan Smith",
      company: "Tech SuperPowers"
    },
    {
      id: 'costa',
      quote: "HS Studio are a great team of professionals. They delivered complex solutions with detail and outstanding creativity to deadlines other agencies could not meet.",
      author: "David Cortes",
      company: "Costa Coffee"
    }
  ];

  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="testimonials-content">
          <h2 
            id="testimonials-title" 
            className="testimonials-title"
          >
            Client Feedback
            <span className="testimonials-subtitle">
              We&apos;re collaborators - We build tight-knit partnerships with our clients.
            </span>
          </h2>

          <div 
            className="testimonials-grid"
            ref={gridRef}
          >
            {testimonials.map(testimonial => (
              <div 
                key={testimonial.id}
                className="testimonial-card"
              >
                <blockquote>
                  <p className="testimonial-quote">{testimonial.quote}</p>
                  <footer>
                    <cite className="testimonial-author">
                      {testimonial.author}
                    </cite>
                    <span className="testimonial-company">
                      {testimonial.company}
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

Testimonials.displayName = 'Testimonials';

export default Testimonials; 