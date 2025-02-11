import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { useEffect, useState, useRef } from 'react';
import { Calendar, Loader, MapPin, User, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventById, joinEvent, leaveEvent, deleteEvent } from '../store/actions/eventActions';
import { toast } from 'react-toastify';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  const [event, setEvent] = useState(null);
  const events = useSelector((state) => state.events.events);
  const isLoading = useSelector((state) => state.events.isLoading);
  const authUser = useSelector((state) => state.user.user);
  const [logs, setLogs] = useState([]);

  const [error, setError] = useState(null);
  const isAttending = event?.attendees?.some(
    attendee => attendee._id === authUser?._id
  );

  const isEventFull = event?.attendees?.length >= event?.capacity;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        dispatch(getEventById(id));
      } catch (err) {
        setError(err.message || 'Error fetching event details');
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (events && events.length > 0) {
      setEvent(events[0]);
    }
  }, [events]);

  useEffect(() => {
    if (socket && id && authUser) {
      // Join the socket room
      socket.emit('joinRoom', {
        eventId: id,
        userId: authUser._id
      });

      // Listen for updates
      socket.on('eventUpdate', (updatedEvent) => {
        setEvent(updatedEvent);
      });

      // Add logs for all users' actions
      socket.on('userJoined', (data) => {
        const logMessage = `${data.username} joined the event`;
        setLogs(prevLogs => [{
          message: logMessage,
          timestamp: data.timestamp,
          type: 'join',
          userId: data.userId
        }, ...prevLogs]);
      });

      socket.on('userLeft', (data) => {
        const logMessage = `${data.username} left the event`;
        setLogs(prevLogs => [{
          message: logMessage,
          timestamp: data.timestamp,
          type: 'leave',
          userId: data.userId
        }, ...prevLogs]);
      });

      // Cleanup on unmount
      return () => {
        socket.emit('leaveRoom', {
          eventId: id,
          userId: authUser._id
        });
        socket.off('eventUpdate');
        socket.off('userJoined');
        socket.off('userLeft');
      };
    }
  }, [socket, id, authUser]);

  const handleJoinEvent = async () => {
    if (authUser?.isGuest) {
      toast.error('Guest accounts cannot join events. Please create a full account.');
      return;
    }
    try {
      await dispatch(joinEvent(id));
      // Emit socket event after successful join
      
      
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please log in to join events');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to join event');
      }
      
    }
  };

  const handleLeaveEvent = async () => {
    if (authUser?.isGuest) {
      toast.error('Guest accounts cannot leave events. Please create a full account.');
      return;
    }
    try {
      await dispatch(leaveEvent(id));
      // Emit socket event after successful leave
      
      
    } catch (error) {
      console.error('Error leaving event:', error);
      
    }
  };

  const handleDeleteEvent = async () => {
    try {
      dispatch(deleteEvent(id));
      navigate("/dashboard");
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-lg">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Event Image */}
      {event.imageUrl && (
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg mb-8">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        </div>
      )}

      {/* Event Details */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Event Metadata */}
          <div className="space-y-6">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-6 w-6 mr-3 text-primary" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="h-6 w-6 mr-3 text-primary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="h-6 w-6 mr-3 text-primary" />
              <span>{event.attendees.length} / {event.capacity} attendees</span>
            </div>
            <div className="flex items-center text-gray-700">
              <User className="h-6 w-6 mr-3 text-primary" />
              <span>Hosted by {event.creator.name}</span>
            </div>
          </div>

          {/* Event Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>
        </div>

        
        {/* Attendees Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Attendees</h2>
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
              {event.attendees.length}/{event.capacity}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.attendees?.length > 0 ? (
              event.attendees.map((attendee) => (
                <div
                  key={attendee._id}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {attendee.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      {attendee._id === event.creator._id ? 'Organizer' : 'Attendee'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No attendees yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Event Activity Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Event Activity</h2>
            <span className="text-sm text-gray-500">{logs.length} activities</span>
          </div>
          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${log.type === 'join' ? 'bg-green-50/80' : 'bg-red-50/80'
                    } hover:shadow-sm`}
                >
                  <div className="flex-shrink-0">
                    {log.type === 'join' ? (
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${log.type === 'join' ? 'text-green-700' : 'text-red-700'
                      }`}>
                      {log.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No activity recorded yet</p>
                <p className="text-sm text-gray-400">
                  Activity will appear here when users join or leave the event
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {authUser && authUser._id !== event.creator._id && (
            <button
              onClick={isAttending ? handleLeaveEvent : handleJoinEvent}
              disabled={!isAttending && (isEventFull || authUser.isGuest)}
              className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition-all ${authUser.isGuest
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : isAttending
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : isEventFull
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-primary hover:bg-primary/90 text-white'
                }`}
            >
              {authUser.isGuest
                ? 'Create Account to Join'
                : isAttending
                  ? 'Leave Event'
                  : isEventFull
                    ? 'Event Full'
                    : 'Join Event'}
            </button>
          )}

          {authUser && authUser._id === event.creator._id && (
            <div className="flex gap-4 w-full md:w-auto">
              <Link
                to={`/updateevent/${event._id}`}
                className="w-full md:w-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold text-center transition-all"
              >
                Update Event
              </Link>
              <button
                onClick={handleDeleteEvent}
                className="w-full md:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
              >
                Delete Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;