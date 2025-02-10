// src/components/EventCard.jsx
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
      <Link to={`/event/${event._id}`} className="text-blue-600 hover:underline">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;