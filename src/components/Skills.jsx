import { memo, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Skills.css';

const Skills = memo(({ skills, title = "We're good at" }) => {
  const gridRef = useRef(null);
  const observerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const setupObserver = useCallback(() => {
    if (!window.IntersectionObserver) {
      gridRef.current?.querySelectorAll('.skill-item').forEach(item => {
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

    const items = gridRef.current?.querySelectorAll('.skill-item');
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
    <section className="skills" aria-labelledby="skills-title" id="skills">
      <div className="container">
        <div className="skills-content">
          <h2 id="skills-title" className="skills-title">{title}</h2>

          <div className="skills-grid" ref={gridRef}>
            {skills.map(skill => (
              <div key={skill.id} className="skill-item">
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

Skills.displayName = 'Skills';

export default Skills; 