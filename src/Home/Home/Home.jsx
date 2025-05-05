import React, { useState, useEffect } from 'react';
import doctor from '../../images/dr3.jpg'; // Import your image file
import './Home.css'; // Import your external CSS file
import { useNavigate } from 'react-router-dom';


// Import image files
import img1 from '../../images/LungLife_banner_Web.jpg';
import img2 from '../../images/apollo_proHealth_banner_web-674e93659a7ea.jpg';
import img3 from '../../images/doctor-utilizing-advanced-digital-tablet-260nw-2481904799.webp';
import img4 from '../../images/i.jpg';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index
  const images = [img1, img2, img3, img4]; // Array of images
  const navigate = useNavigate();

  const login = () => {
    navigate('/LOGIN');
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
    }, 3000); // 5000ms = 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="homepage-container">
      <div className="image-slider">
        <img src={images[currentIndex]} alt="slider" className="slider-image" />
        
      </div>

      
    </div>
  );
};

export default Home;
