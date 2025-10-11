import React from 'react';
import Header from '../Header/Header';

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2>Contact Us</h2>
        <p>
          Have questions or need assistance? We're here to help!
        </p>
        
        <div className="row">
          <div className="col-md-6">
            <h4>Get in Touch</h4>
            <p><strong>Email:</strong> support@dealershipnetwork.com</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
          </div>
          
          <div className="col-md-6">
            <h4>Business Address</h4>
            <p>
              123 Business Avenue<br/>
              Suite 100<br/>
              New York, NY 10001
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4>Feedback</h4>
          <p>
            We value your feedback! Please let us know how we can improve 
            our platform to better serve you and the dealership community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;