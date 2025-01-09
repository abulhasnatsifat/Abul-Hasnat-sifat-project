import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Web Design",
      description: "Custom website design and development for businesses and organizations.",
      caseStudy: "Romans & Partners",
      image: "https://images.unsplash.com/photo-1613909207039-6b173b755fdd?w=800&h=1000&fit=crop"
    },
    {
      id: 2,
      title: "E-commerce",
      description: "Scalable online stores with seamless checkout experiences.",
      caseStudy: "Alveena Casa",
      image: "https://images.unsplash.com/photo-1612442443556-09b5b309e637?w=800&h=1000&fit=crop"
    },
    {
      id: 3,
      title: "Digital Products",
      description: "User-centered digital products that solve real problems.",
      caseStudy: "Fudli App",
      image: "https://images.unsplash.com/photo-1614790871804-fe037bdc1214?w=800&h=1000&fit=crop"
    },
    {
      id: 4,
      title: "Brand Identity",
      description: "Strategic brand design that connects with your audience.",
      caseStudy: "Learning Library",
      image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?w=800&h=1000&fit=crop"
    }
  ];

  return (
    <section className="services">
      <div className="container">
        <h2 className="services-title">
          Our team of experts<br />can help you with...
        </h2>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-image">
                <img src={service.image} alt={service.title} loading="lazy" />
                <div className="service-overlay">
                  <span>{service.description}</span>
                </div>
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-case">
                  Latest Project: <span>{service.caseStudy}</span>
                </p>
                <a href={`/services/${service.title.toLowerCase().replace(' ', '-')}`} className="service-link">
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 8L4 8M9 5L12 8L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 