import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl bg-white rounded-2xl shadow-2xl p-10 sm:p-12 lg:p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-cover bg-center"></div>
        
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-8 relative z-10">
          About <span className="text-blue-600">EventX</span>
        </h1>

        <div className="space-y-6 text-gray-700 relative z-10">
          <p className="text-lg leading-relaxed text-center">
            Welcome to <span className="font-semibold text-blue-600">EventX</span>, your ultimate platform for creating, managing, and discovering events. Whether you're looking to attend a conference, host a meetup, or organize a social gathering, EventX streamlines the process and connects you with the right audience.
          </p>

          <div className="border-l-4 border-blue-600 pl-4">
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-lg leading-relaxed mt-2">
              Our mission is to empower event organizers and attendees with seamless tools to create and participate in engaging experiences. We believe in fostering connections, simplifying event management, and bringing communities together.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <h2 className="text-2xl font-bold text-gray-900">What We Offer</h2>
            <ul className="list-disc list-inside space-y-3 text-lg mt-2">
              <li>✨ Effortless event creation and management</li>
              <li>🛠 Intuitive dashboard for tracking your events</li>
              <li>🤝 Real-time attendee interactions and updates</li>
              <li>🔔 Instant notifications for event updates</li>
            </ul>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <h2 className="text-2xl font-bold text-gray-900">Join Us</h2>
            <p className="text-lg leading-relaxed mt-2">
              Whether you're an event organizer or an attendee, EventX offers a seamless and engaging experience. Join our growing community today and take your event management to the next level!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;