import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="hero-section">
        <h1>About Us</h1>
        <p>Your trusted partner in innovation and excellence.</p>
      </div>

      <div className="content-section">
        <section className="section our-story">
          <div className="text-content">
            <h2>Our Story</h2>
            <p>
              We started our journey with a simple idea: to create a platform that empowers people and businesses to achieve their goals. Over the years, we have grown into a leading company in our industry, known for our commitment to quality, innovation, and customer satisfaction.
            </p>
          </div>
          <div className="image-content">
            <img src="./tech.jpg" alt="Our Story" />
          </div>
        </section>

        <section className="section mission-vision">
          <div className="text-content">
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide top-notch products and services that enhance the lives of our customers and contribute to the betterment of society. We strive to be at the forefront of innovation, always pushing the boundaries of what’s possible.
            </p>
          </div>
          <div className="image-content">
            <img src="./tech.jpg" alt="Our Mission" />
          </div>
        </section>

        <section className="section mission-vision">
          <div className="text-content">
            <h2>Our Vision</h2>
            <p>
              We envision a world where technology and creativity come together to create solutions that are not only efficient but also sustainable and impactful. We aim to be a global leader, known for our integrity, excellence, and dedication to making a positive difference.
            </p>
          </div>
          <div className="image-content">
            <img src="./tech.jpg" alt="Our Vision" />
          </div>
        </section>

       

        <section className="section contact-us">
          <h2>Contact Us</h2>
          <p>
            We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
          </p>
          <div className="contact-details">
            <p>Email: <a href="mailto:contact@yourcompany.com">contact@yourcompany.com</a></p>
            <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
            <p>Address: 1234 Your Street, Your City, Your Country</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
