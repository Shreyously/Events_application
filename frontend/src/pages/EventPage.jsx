// src/pages/EventPage.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from the backend
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
      <p className="text-gray-600 mb-2"><strong>Attendees:</strong> {event.attendees.length}</p>
    </div>
  );
};

export default EventPage;