import React, { useState } from 'react';
import './Modal.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Modal = ({ showModal, setShowModal, userId }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: '',
    userId: localStorage.getItem('userId') // Include userId here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  // Get the current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/events/${localStorage.getItem('userId')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Event created:', result);
        setEventData({
          name: '',
          description: '',
          date: '',
          location: '',
          category: '',
          userId: userId // Reset userId
        });
        setShowModal(false);
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`modal ${showModal ? 'show' : 'hide'}`} onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Event</h2>
          <span className="closeMark" onClick={() => setShowModal(false)}>&times;</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Event Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Event Name"
              value={eventData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              value={eventData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="YYYY-MM-DD"
              value={eventData.date}
              onChange={handleChange}
              required
              min={today} // Disable dates before today
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Event Location"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="alumini">Alumini Meets</option>
              <option value="concert">Concert</option>
              <option value="tech">Tech Seminar</option>
              <option value="get_together">Get Together</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="submit-button">Create Event</button>
            <button type="button" className="close-button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};
