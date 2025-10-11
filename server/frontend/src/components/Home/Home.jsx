import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import car_dealership from '../assets/car_dealership.jpg';

const Home = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card" style={{ width: '50%', marginTop: '50px', alignSelf: 'center' }}>
          <img src={car_dealership} className="card-img-top" alt="Car Dealership" />
          <div className="banner">
            <h5>Welcome to our Dealerships!</h5>
            <Link 
              to="/dealers" 
              className="btn" 
              style={{ backgroundColor: 'aqua', margin: '10px' }}
            >
              View Dealerships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;