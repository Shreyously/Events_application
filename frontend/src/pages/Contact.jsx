import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl bg-white rounded-2xl shadow-2xl p-10 sm:p-12 lg:p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-cover bg-center"></div>

        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-8 relative z-10">
          Contact <span className="text-blue-600">EventX</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 relative z-10">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-lg leading-relaxed">
              Have questions or need assistance? We're here to help! Reach out to us via email, phone, or visit our office.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-blue-600" />
                <span className="text-lg">support@eventx.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-blue-600" />
                <span className="text-lg">+1 (987) 654-3210</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="text-lg">456 Event Blvd, Metropolis, USA</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;