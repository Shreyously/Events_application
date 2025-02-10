import React from 'react';
import { Calendar, Users, HandHelping, MessageCircle, Linkedin, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center pt-24 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EventX?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of event creators who have successfully brought their visions to life
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Calendar,
              title: "Create Events",
              description: "Start planning your next event in minutes with our intuitive tools",
              action: "Start Creating"
            },
            {
              icon: Users,
              title: "Connect",
              description: "Build your community and reach the right audience",
              action: "Find Your Audience"
            },
            {
              icon: HandHelping,
              title: "Get Support",
              description: "Access our 24/7 support team for guidance and assistance",
              action: "Contact Support"
            },
            {
              icon: MessageCircle,
              title: "Join Community",
              description: "Connect with other event creators and share experiences",
              action: "Join Now"
            }
          ].map((card, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 mb-6">{card.description}</p>
              <button className="text-purple-600 font-medium hover:text-purple-800 transition-colors">
                {card.action} →
              </button>
            </div>
          ))}
        </div>

        {/* Minimal Social Footer */}
        <div className="mt-20 py-8 border-t border-gray-200">
          <div className="flex justify-center items-center space-x-8">
            <a 
              href="https://www.linkedin.com/in/shrey-ghodke-957b3a239/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-600 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com/Shreyously"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-600 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://x.com/shreyouslyy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-600 transition-colors"
              aria-label="X (Twitter) Profile"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} Created by Shrey Ghodke
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;