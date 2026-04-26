import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaRegEnvelope,
} from "react-icons/fa";
import { FiMapPin, FiSend } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link
              to="/"
              className="text-3xl font-black text-primary tracking-tighter"
            >
              StayEase
            </Link>
            <p className="text-gray-500 leading-relaxed text-sm">
              A premium 6-room boutique experience in the heart of the city.
              Designed for digital nomads and travelers.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-500">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms"
                  className="hover:text-primary transition-colors"
                >
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="hover:text-primary transition-colors"
                >
                  Book a Stay
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Dallas, USA */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3 group">
                <div className="mt-1 text-primary">
                  <FiMapPin size={18} />
                </div>
                <span className="text-sm text-gray-500 leading-snug">
                  123 Luxury Lane, <br />
                  Dallas, TX 75201, USA
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="text-primary">
                  <FaPhoneAlt size={16} />
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  +1 (214) 555-0123
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="text-primary">
                  <FaRegEnvelope size={18} />
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  stay@stayease.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-6">
              Subscribe for exclusive offers.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button className="absolute right-2 top-1.5 bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors">
                <FiSend size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © {currentYear} StayEase Boutique Hotel. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
