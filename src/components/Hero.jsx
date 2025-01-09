import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">We Create</span>
            <span className="hero-title-line">Digital Products</span>
            <span className="hero-title-line">That Work</span>
          </h1>

          <div className="hero-stats">
            <div className="stat">
     
              <span className="stat-label">10+
                Years Experience</span>
            </div>
            <div className="stat">
        
              <span className="stat-label">50+
                Projects Delivered</span>
            </div>
            <div className="stat">
     
              <span className="stat-label">15
                Industry Awards</span>
            </div>
          </div>

          <p className="hero-description">
            We are a digital design studio specializing in branding, web design, and digital experiences.
          </p>

          <div className="hero-cta">
            <a href="/work" className="btn-primary">View Our Work</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 