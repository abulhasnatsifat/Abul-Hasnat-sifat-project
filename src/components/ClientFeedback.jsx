import { useState, useEffect } from 'react';
import './ClientFeedback.css';

const ClientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    total: 0,
    distribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }
  });

  // Enhanced mock feedback data with more entries
  const mockFeedbacks = [
    {
      id: 1,
      clientName: "John Doe",
      company: "Tech Corp",
      feedback: "Exceptional work! The attention to detail was impressive.",
      rating: 5,
      image: "/client1.jpg",
      position: "CEO"
    },
    {
      id: 2,
      clientName: "Sarah Smith",
      company: "Design Studio",
      feedback: "Great communication and delivered on time. Would definitely work with them again!",
      rating: 4.5,
      image: "/client2.jpg",
      position: "Creative Director"
    },
    {
      id: 3,
      clientName: "Michael Chen",
      company: "Innovation Labs",
      feedback: "Their expertise in modern technologies helped transform our project.",
      rating: 5,
      image: "/client3.jpg",
      position: "CTO"
    },
    {
      id: 4,
      clientName: "Emma Wilson",
      company: "Digital Solutions",
      feedback: "Professional, creative, and always going above and beyond expectations.",
      rating: 4.8,
      image: "/client4.jpg",
      position: "Project Manager"
    }
  ];

  useEffect(() => {
    // Calculate rating statistics
    const calculateRatingStats = (feedbacks) => {
      const stats = {
        average: 0,
        total: feedbacks.length,
        distribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0
        }
      };

      let sum = 0;
      feedbacks.forEach(feedback => {
        const roundedRating = Math.floor(feedback.rating);
        sum += feedback.rating;
        stats.distribution[roundedRating] = (stats.distribution[roundedRating] || 0) + 1;
      });

      stats.average = sum / feedbacks.length;
      return stats;
    };

    const timer = setTimeout(() => {
      setFeedbacks(mockFeedbacks);
      setRatingStats(calculateRatingStats(mockFeedbacks));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="feedback" className="feedback-section">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        
        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="rating-overview">
            <div className="average-rating">
              <span className="rating-number">{ratingStats.average.toFixed(1)}</span>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <span 
                    key={index}
                    className={`star ${index < Math.round(ratingStats.average) ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="total-ratings">Based on {ratingStats.total} reviews</span>
            </div>
            <div className="rating-bars">
              {Object.entries(ratingStats.distribution)
                .sort(([a], [b]) => b - a)
                .map(([rating, count]) => (
                  <div key={rating} className="rating-bar-item">
                    <span className="rating-label">{rating} stars</span>
                    <div className="rating-bar-container">
                      <div 
                        className="rating-bar-fill"
                        style={{
                          width: `${(count / ratingStats.total) * 100}%`
                        }}
                      />
                    </div>
                    <span className="rating-count">{count}</span>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Existing Feedback Grid */}
        <div className="feedback-grid">
          {feedbacks.map((feedback, index) => (
            <div 
              key={feedback.id} 
              className="feedback-card"
              style={{ 
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="client-info">
                <img 
                  src={feedback.image} 
                  alt={feedback.clientName} 
                  className="client-image"
                  onError={(e) => {
                    e.target.src = '/default-avatar.jpg'; // Fallback image
                  }}
                />
                <div className="client-details">
                  <h3>{feedback.clientName}</h3>
                  <p className="client-position">{feedback.position}</p>
                  <p className="client-company">{feedback.company}</p>
                </div>
              </div>
              <div className="rating" aria-label={`Rating: ${feedback.rating} out of 5 stars`}>
                {[...Array(5)].map((_, index) => (
                  <span 
                    key={index}
                    className={`star ${index < feedback.rating ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="feedback-text">{feedback.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientFeedback; 