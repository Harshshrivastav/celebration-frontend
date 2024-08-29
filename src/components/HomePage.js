import React from 'react';
import './Hero.css';
import './Stats.css';
import './Properties.css';
import FooterBar  from './FooterBar';
import { Element } from 'react-scroll';

const HomePage = () => {
  const venues = ["Sayaji Hotel","Jehan Numa Palace","JW Marriott Pune","Taj Lands End","Hyatt Regency Ahmedabad","he Leela Palace Chennai"]
  const places = ["Indore", "Bhopal", "Pune", "Mumbai", "Ahmedabad", "Chennai"]

  return (
    <>
      {/* Hero Section */}
      <Element name="hero_section">
        <section className="hero">
        <div className="container">
          <h1>Celebrate with US</h1>
          <p>Celebrate Every Moment, Your Way & Make Every Occasion Unforgettable</p>
          
          <div className="image-container">
            <img src="./get_together.jpg" alt="Property placeholder" />
            <div className="search-bar">
              <select>
              <option>Category</option>
              <option>Conference</option>
              <option>Exhibition</option>
              <option>Festival</option>
              <option>Fundraiser</option>
              <option>Hackathon</option>
              <option>Meetup</option>
              <option>Networking Event</option>
              <option>Panel Discussion</option>
              <option>Product Launch</option>
              <option>Seminar</option>
              <option>Social Gathering</option>
              <option>Training Session</option>
              <option>Trade Show</option>
              <option>Webcast</option>
              <option>Webinar</option>
              </select>
              <select>
                <option>Location</option>
                <option>Agra</option>
                <option>Ahmedabad</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Hyderabad</option>
                <option>Indore</option>
                <option>Kolkata</option>
                <option>Lucknow</option>
                <option>Madurai</option>
                <option>Meerut</option>
                <option>Nashik</option>
                <option>Pune</option>
                <option>Surat</option>
                <option>Thane</option>
                <option>Vadodara</option>
                <option>Varanasi</option>
              </select>
              <select>
                <option>Max Price</option>
                <option>$500</option>
                <option>$1000</option>
                <option>$2000</option>
              </select>
              <button className="search-button">Search</button>
            </div>
          </div>
        </div>
      </section>
      </Element>

      {/* Stats Section */}
      <Element name="stats">
        <section className="stats">
          <div className="container">
            <div className="stat-item">
              <h2>500+</h2>
              <p>Happy clients</p>
            </div>
            <div className="stat-item">
              <h2>200+</h2>
              <p>Events</p>
            </div>
            <div className="stat-item">
              <h2>10+</h2>
              <p>Years experience</p>
            </div>
            <div className="stat-item">
              <h2>25+</h2>
              <p>Awards winning</p>
            </div>
          </div>
        </section>
      </Element>

      
     

      {/* Properties Section */}
      <Element name="properties">
        <section className="properties">
          <div className="container">
            <h2>Our venues</h2>
            <div className="property-types">
              <button>Wedding</button>
              <button>Conference</button>
              <button>Party</button>
            </div>
            <div className="property-list">
              {Array(6).fill().map((_, i) => (
                <div className="property-card" key={i}>
                  <img src={`./venues/venue${i + 1}.png`} alt={`Venue ${i + 1}`} />
                  <h3>{venues[i]}</h3>
                  <p>{ places[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Element>

      <FooterBar />
     
    </>
  );
}

export default HomePage;
