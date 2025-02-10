import { useEffect } from 'react';
import { Calendar, MapPin, Users, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../store/actions/eventActions';

function Home() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const recentEvents = Array.isArray(events)
    ? [...events].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-100/20 rounded-bl-[100px]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Moments,{' '}
              <span className="text-primary">Share Experiences</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover and join amazing events or create your own. Connect with people
              who share your passions and create unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="btn btn-primary btn-lg group"
              >
                Explore Events
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/createevent"
                className="btn btn-outline btn-lg"
              >
                Host an Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
              <p className="text-gray-600 mt-2">Don't miss out on these exciting events</p>
            </div>
            <Link
              to="/events"
              className="text-primary hover:text-primary/80 flex items-center gap-2 font-semibold"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentEvents.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={event.imageUrl || 'https://via.placeholder.com/400x225'}
                      alt={event.name}
                      className="w-full h-48 object-cover rounded-t-2xl transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary transition-all duration-300 ease-in-out group-hover:scale-110">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors group-hover:text-primary duration-300">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3">
                    {/* Date */}
                    <div className="flex items-center text-gray-500 transition-opacity duration-300 group-hover:opacity-100">
                      <Calendar className="h-5 w-5 mr-2 text-primary/70 transition-transform duration-300 group-hover:rotate-6" />
                      {new Date(event.date).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-500 transition-opacity duration-300 group-hover:opacity-100">
                      <MapPin className="h-5 w-5 mr-2 text-primary/70 transition-transform duration-300 group-hover:-rotate-6" />
                      {event.location}
                    </div>

                    {/* Attendees Progress Bar */}
                    <div className="flex items-center gap-4 text-gray-600">
                      <Users className="h-6 w-6 text-primary/80 transition-transform duration-300 group-hover:scale-110" />
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">
                            {event.attendees.length} / {event.capacity}
                          </span>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="relative w-full bg-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
                          <div
                            className="bg-gradient-to-r from-primary to-primary/90 rounded-full h-2 transition-all duration-500"
                            style={{
                              width: `${event.capacity > 0
                                  ? (event.attendees.length / event.capacity) * 100
                                  : 0
                                }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-rose-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Event?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Share your passion with others. Create an event and connect with people who
            share your interests.
          </p>
          <Link
            to="/createevent"
            className="inline-flex items-center px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;