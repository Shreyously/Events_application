import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Activity, TrendingUp, Clock, Award, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../store/actions/eventActions';

function EventDashboard() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const isLoading = useSelector((state) => state.events.isLoading);
  const authUser = useSelector((state) => state.user.user);

  const [activeTab, setActiveTab] = useState('hosting');
  const [createdEvents, setCreatedEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllEvents());
    setIsVisible(true);
  }, [dispatch]);

  useEffect(() => {
    if (events?.length > 0 && authUser?._id) {
      const userCreatedEvents = events.filter((event) => 
        event.creator?._id?.toString() === authUser._id?.toString()
      );
      
      const userAttendingEvents = events.filter((event) => 
        event.attendees?.some(attendee => 
          attendee._id?.toString() === authUser._id?.toString()
        )
      );

      setCreatedEvents(userCreatedEvents);
      setAttendingEvents(userAttendingEvents);
    }
  }, [events, authUser]);

  const getUpcomingEvents = (eventsList) => {
    return eventsList.filter(event => new Date(event.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  };

  const getStats = (eventsList) => {
    const totalAttendees = eventsList.reduce((sum, event) => sum + event.attendees.length, 0);
    const upcomingCount = eventsList.filter(event => new Date(event.date) > new Date()).length;
    const categories = [...new Set(eventsList.map(event => event.category))].length;
    
    return { totalAttendees, upcomingCount, categories };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute top-0 w-full h-full rounded-full border-4 border-blue-200 animate-pulse"></div>
            <div className="absolute top-0 w-full h-full rounded-full border-t-4 border-blue-600 animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 animate-pulse">Preparing your dashboard...</p>
        </div>
      </div>
    );
  }

  const currentEvents = activeTab === 'hosting' ? createdEvents : attendingEvents;
  const stats = getStats(currentEvents);
  const upcomingEvents = getUpcomingEvents(currentEvents);

  const StatCard = ({ icon: Icon, label, value, color, delay }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-700 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg transform transition-transform hover:scale-110 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Quick Stats */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <div className={`transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {authUser?.name || 'User'} ✨
              </h1>
              <p className="text-gray-600 mt-2">Here's what's happening with your events</p>
            </div>
            <div className={`flex space-x-2 transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
              {['hosting', 'attending'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105
                    ${activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              icon={Users} 
              label="Total Attendees" 
              value={stats.totalAttendees}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
              delay={100}
            />
            <StatCard 
              icon={Calendar} 
              label="Upcoming Events" 
              value={stats.upcomingCount}
              color="bg-gradient-to-br from-green-500 to-emerald-600"
              delay={200}
            />
            <StatCard 
              icon={Activity} 
              label="Event Categories" 
              value={stats.categories}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
              delay={300}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events Section */}
          <div className={`lg:col-span-2 transform transition-all duration-700 delay-300 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Upcoming Events
                </h2>
                <Link 
                  to="/events" 
                  className="text-blue-600 hover:text-blue-700 flex items-center group"
                >
                  View all 
                  <ChevronRight className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <Link
                      key={event._id}
                      to={`/events/${event._id}`}
                      className={`flex items-center p-4 rounded-lg transition-all duration-500 transform hover:scale-102
                        bg-gradient-to-r hover:from-blue-50 hover:to-transparent
                        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
                        <Calendar className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                          <MapPin className="h-4 w-4 ml-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {event.attendees.length}/{event.capacity}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12 bg-blue-50/50 rounded-lg">
                    <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-3 animate-bounce" />
                    <p className="text-gray-600">No upcoming events</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className={`space-y-8 transform transition-all duration-700 delay-500
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/createevent"
                  className="block px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-102 transform transition-all duration-300"
                >
                  Create New Event
                </Link>
                <Link
                  to="/events"
                  className="block px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-102 transform transition-all duration-300"
                >
                  Browse Events
                </Link>
              </div>
            </div>

            {/* Event Categories */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                Categories Overview
              </h2>
              <div className="space-y-3">
                {currentEvents.length > 0 ? (
                  Object.entries(
                    currentEvents.reduce((acc, event) => {
                      acc[event.category] = (acc[event.category] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([category, count], index) => (
                    <div 
                      key={category} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      <span className="text-gray-600">{category || 'Uncategorized'}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {count}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600 py-4">No events to categorize</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDashboard;