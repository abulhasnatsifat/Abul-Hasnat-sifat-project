import './Work.css';
import { useState } from 'react';

const Work = () => {
  const [showLatestFirst, setShowLatestFirst] = useState(true);

  const projects = [
    {
      id: 1,
      title: "Romans & Partners",
      category: "Web Design",
      subCategory: "Development",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
      year: "2023"
    },
    {
      id: 2,
      title: "Alveena Casa",
      category: "E-Commerce",
      subCategory: "Development",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
      year: "2023"
    },
    {
      id: 3,
      title: "Fudli App",
      category: "Digital Product",
      subCategory: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop",
      year: "2022"
    },
    {
      id: 4,
      title: "Re-Core Pilates",
      category: "Web Design",
      subCategory: "Development",
      image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=500&fit=crop",
      year: "2022"
    }
  ];

  const toggleSortOrder = () => {
    setShowLatestFirst(!showLatestFirst);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    return showLatestFirst ? b.year.localeCompare(a.year) : a.year.localeCompare(b.year);
  });

  return (
    <section className="work">
      <div className="work-container">
        <div className="work-header">
          <h2 className="work-title">Selected Work <span>{sortedProjects.length}</span></h2>
          <p className="work-subtitle">
            A selection of our latest work, showcasing our expertise in design and development.
          </p>
          <button onClick={toggleSortOrder} className="sort-button">
            {showLatestFirst ? 'Show Oldest First' : 'Show Latest First'}
          </button>
        </div>

        <div className="work-grid">
          {sortedProjects.map((project) => (
            <div key={project.id} className="work-item">
              <a href={`/case-studies/${project.id}`} className="work-link">
                <div className="work-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="work-image-overlay">
                    <span>View Project</span>
                  </div>
                </div>
                <div className="work-content">
                  <div className="work-content-header">
                    <h3 className="work-item-title">{project.title}</h3>
                    <span className="work-year">{project.year}</span>
                  </div>
                  <div className="work-categories">
                    <span className="category">{project.category}</span>
                    <span className="divider">•</span>
                    <span className="sub-category">{project.subCategory}</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="work-cta">
          <a href="/case-studies" className="btn-primary">View All Projects</a>
        </div>
      </div>
    </section>
  );
};

export default Work; 