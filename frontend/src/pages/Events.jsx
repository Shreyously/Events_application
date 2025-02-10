import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Search, SlidersHorizontal, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../store/actions/eventActions';

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    dateRange: '',
    sortBy: '',
    capacityStatus: '',
  });
  const [filteredEvents, setFilteredEvents] = useState([]);
  // const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  // Filtering logic remains the same
  useEffect(() => {
    let result = [...events];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(event => event.category === filters.category);
    }

    // Apply date range filter
    if (filters.dateRange) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const eventDate = new Date();

      switch (filters.dateRange) {
        case 'upcoming':
          result = result.filter(event => new Date(event.date) >= today);
          break;
        case 'week':
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          result = result.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate <= nextWeek;
          });
          break;
        case 'month':
          const nextMonth = new Date(today);
          nextMonth.setMonth(today.getMonth() + 1);
          result = result.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate <= nextMonth;
          });
          break;
        default:
          break;
      }
    }

    // Apply capacity status filter
    if (filters.capacityStatus) {
      result = result.filter(event => {
        const occupancyRate = event.attendees.length / event.capacity;
        switch (filters.capacityStatus) {
          case 'available':
            return occupancyRate < 0.8; // Less than 80% full
          case 'almostFull':
            return occupancyRate >= 0.8 && occupancyRate < 1; // 80% to 99% full
          case 'full':
            return occupancyRate >= 1; // 100% full
          default:
            return true;
        }
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'popular':
          result.sort((a, b) => b.attendees.length - a.attendees.length);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'capacity':
          result.sort((a, b) => b.capacity - a.capacity);
          break;
        default:
          break;
      }
    }

    setFilteredEvents(result);


  }, [events, searchTerm, filters]);

  // const FilterButton = ({ label, isActive }) => (
  //   <div className={`px-4 py-2 rounded-full transition-all duration-300 ${isActive
  //       ? 'bg-blue-600 text-white shadow-lg transform scale-105'
  //       : 'bg-white text-gray-600 hover:bg-gray-50'
  //     }`}>
  //     {label}
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Search for Events
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find and join the most exciting events happening around you
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl mx-auto transform transition-all duration-300 hover:scale-102">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-blue-600 transition-colors duration-300"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <X className="h-6 w-6" /> : <SlidersHorizontal className="h-6 w-6" />}
            </button>
          </div>

          {/* Modern Filter Section */}
          <div className={`transition-all duration-300 ease-in-out ${showFilters ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none'
            }`}>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  >
                    <option value="">All Categories</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="networking">Networking</option>
                    <option value="social">Social</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Other filters with same styling */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Time Frame</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  >
                    <option value="">Any Time</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Sort By</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  >
                    <option value="">Sort By</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="capacity">Largest Capacity</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Availability</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    value={filters.capacityStatus}
                    onChange={(e) => setFilters({ ...filters, capacityStatus: e.target.value })}
                  >
                    <option value="">All</option>
                    <option value="available">Available</option>
                    <option value="almostFull">Almost Full</option>
                    <option value="full">Full</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {event.imageUrl && (
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={event.imageUrl}
                      alt={event.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                    {event.attendees.length >= event.capacity && (
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                        Full
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {event.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-500" />
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span>{event.attendees.length} / {event.capacity}</span>
                          <span>{Math.round((event.attendees.length / event.capacity) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                            style={{ width: `${(event.attendees.length / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-medium">No events found matching your criteria</p>
              <p className="text-gray-400">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;