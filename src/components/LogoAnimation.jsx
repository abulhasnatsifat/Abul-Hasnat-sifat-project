import React, { useEffect, useState } from 'react';
import './LogoAnimation.css'; // Create a CSS file for styling

const LogoAnimation = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`logo-animation ${visible ? 'visible' : 'hidden'}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fill="white">HS</text>
      </svg>
    </div>
  );
};

export default LogoAnimation; 