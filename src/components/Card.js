import './Card.css';
import { Modal } from './Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Card = () => {
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [myCreatedEvents, setMyCreatedEvents] = useState([]);
  const [myRegisteredEvents, setMyRegisteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [user, setUser] = useState({ username: '', email: '', userId: '' });
  const [isHomepage, setIsHomepage] = useState(false);
  const [editingEventId, setEditingEventId] = useState(1);
  const [editEventData, setEditEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: ''
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      fetchUserInfo(storedUsername);
    }
    fetchAllEvents();

    // Check if current URL is homepage
    setIsHomepage(window.location.pathname === '/');
  }, []);

  useEffect(() => {
    if (user.id) {
      fetchUserEvents(user.id);
      fetchUserRegisteredEvents(user.d);
    }
  }, [user.id]);
  

  const fetchUserInfo = async (username) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/user/${username}`);
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        console.error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/all`);
      if (response.ok) {
        const events = await response.json();
        setAllEvents(events);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/user/${localStorage.getItem('userId')}`);
      if (response.ok) {
        const createdEvents = await response.json();
        setMyCreatedEvents(createdEvents);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserRegisteredEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/user/${localStorage.getItem('userId')}/registered-events`);
      if (response.ok) {
        const registeredEvents = await response.json();
        setMyRegisteredEvents(registeredEvents);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddEventClick = () => {
    setShowModal(true);
  };

  const handleEditEventClick = (event) => {
    setEditingEventId(event.id);
    setEditEventData({
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      category: event.category
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEventData({
      ...editEventData,
      [name]: value
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/events/${editingEventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editEventData)
      });
      if (response.ok) {
        const updatedEvent = await response.json();
        setMyCreatedEvents((prevEvents) =>
          prevEvents.map((event) => (event.id === editingEventId ? updatedEvent : event))
        );
        setEditingEventId(null);
      } else {
        console.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelEdit = (eventId) => {
    setEditingEventId(null);
    setEditEventData({
      name: '',
      description: '',
      date: '',
      location: '',
      category: ''
    });
  };  

  const handleDelete = (eventId) => {
    // Send a DELETE request to the backend
    fetch(`${BASE_URL}/api/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        // Remove the deleted event from the state
        setMyCreatedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      } else {
        console.error('Failed to delete the event.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  

  const categoryImages = {
        alumini: "/alumini.jpg",
        concert: "/concert.jpg",
        tech: "/tech.jpg",
        get_together: "/gettogether.jpg",
        wedding: "/weddings.jpg",
        other: "/other.jpg",
      };

  const handleRegister = async (eventId) => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID
  
    try {
      const response = await fetch(`${BASE_URL}/api/events/register/${userId}/${localStorage.getItem('eventId')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          eventId
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Successfully registered for the event!');
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Failed to register for the event.');
    }
  };
  

  return (
  <div style={{backgroundColor:'white', padding:'10px 0', marginTop:'-30px'}}>
    <section className="wrapper">
      <div className="event-wrapper">
      {/* Header Section */}
      <div className="header-section">
        <h1>{username}'s Events</h1>
        <p className="date-text">{new Date().toLocaleDateString()}</p>
      </div>

      {/* My Events Section */}
      <div className="my-events-section">
        <h2>Your Events</h2>
        <div className="events-grid">
          {myCreatedEvents.length === 0 ? (
            <p>No Events to show</p>
          ) : (
            myCreatedEvents.map((event, index) => (
              <div key={index} className="event-info-box">
                {editingEventId === event.id ? (
                    <form onSubmit={handleSaveChanges}>
                    <div className="form-group">
                      <label htmlFor="name">Event Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editEventData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description:</label>
                      <textarea
                        id="description"
                        name="description"
                        value={editEventData.description}
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
                        value={editEventData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Location:</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={editEventData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category:</label>
                      <select
                        id="category"
                        name="category"
                        value={editEventData.category}
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
                    <div className="button-group">
                      <button type="submit" className="save-button">Save Changes</button>
                      <button type="button" className="cancel-button" onClick={() => handleCancelEdit(event.id)}>Cancel</button>
                    </div>
                  </form>
                  ):(
                <div className='event-2-info-box' >  
                <div className="date-2-container">
                  <span className="day-display">{new Date(event.date).getDate()}</span>
                  <span className="month-display">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  <div className="event-details">
                    <h3>{event.name}</h3>
                    <p className="event-location">{event.location}</p>
                    <p className="event-category">{event.category}</p>
                    <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                    
                    </div>
                    <div className='button'>
                    <button className="edit-button" onClick={() => handleEditEventClick(event)}> ✏️ </button>
                    <button className="delete-button" onClick={() => handleDelete(event.id)}> 🗑️ </button>
                    </div>
                </div> <div className="image-box">
                  <img src={categoryImages[event.category] || "/default.jpg"} alt={event.name} />
                </div>
                </div>
                )}
                
              </div>
            ))
          )}
        </div>
      </div>

      

      {/* All Events Section */}
      <div className="all-events-section">
        <h2>All Events</h2>
        <div className="events-grid">
          {allEvents.length === 0 ? (
            <p>No Events Available</p>
          ) : (
            allEvents.map((event, index) => (
              <div>
              <div key={index} className="event-info-box">
                
                <div className="date-container">
                  <span className="day-display">{new Date(event.date).getDate()}</span>
                  <span className="month-display">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                <div className="event-details">
                  <h3>{event.name}</h3>
                  <p className="event-location">{event.location}</p>
                </div>
                </div>
                
                
                <div className="image-box">
                  <img src={categoryImages[event.category] || "/default.jpg"} alt={event.name} />
                </div>
              </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="navigation-footer">
        <button className="add-event-button" onClick={handleAddEventClick}>+ Add</button>
      </div>
    </div>
      
      </section>
      <Modal showModal={showModal} setShowModal={setShowModal} userId={user.userId} />
        
    </div>
  );
};
