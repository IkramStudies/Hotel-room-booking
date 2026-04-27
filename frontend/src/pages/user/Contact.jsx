import React from "react";
import { FaPhoneAlt, FaRegEnvelope, FaClock } from "react-icons/fa";
import { FiMapPin, FiSend } from "react-icons/fi";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form logic here
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 md:py-20 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <header className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-500 text-lg">
            Have questions about your stay in Dallas? Our team is here to ensure
            your experience at StayEase is seamless.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiMapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Our Location</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  123 Luxury Lane, <br />
                  Dallas, TX 75201, USA
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FaPhoneAlt size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Phone & Email</h3>
                <p className="text-gray-500 text-sm font-medium">
                  +1 (214) 555-0123
                </p>
                <p className="text-gray-500 text-sm">stay@stayease.com</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FaClock size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Concierge Hours
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Mon - Sun: 24 Hours <br />
                  <span className="text-xs italic">(Front Desk Service)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Subject
                  </label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Reservation Support</option>
                    <option>Group Bookings</option>
                    <option>Event Hosting</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Tell us how we can help..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Optional: Map Placeholder */}
        <div className="mt-16 w-full h-[400px] bg-gray-200 rounded-3xl overflow-hidden relative border border-gray-100 shadow-inner">
          {/* You can replace this div with a real Google Maps iframe */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <FiMapPin
                size={40}
                className="text-primary mx-auto mb-2 opacity-50"
              />
              <p className="text-gray-400 font-medium tracking-tight">
                Interactive Map Integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
