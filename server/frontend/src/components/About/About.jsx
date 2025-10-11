import React from 'react';
import Header from '../Header/Header';

const About = () => {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2>About Us</h2>
        <p>
          Welcome to our Dealership Network! We are a comprehensive platform 
          connecting customers with trusted car dealerships across the country.
        </p>
        <p>
          Our mission is to provide transparent, reliable information about 
          dealerships and enable customers to make informed decisions through 
          genuine reviews and ratings.
        </p>
        <p>
          Features:
        </p>
        <ul>
          <li>Browse dealerships by location</li>
          <li>Read authentic customer reviews</li>
          <li>Advanced sentiment analysis of reviews</li>
          <li>Secure user registration and login</li>
        </ul>
      </div>
    </div>
  );
};

export default About;