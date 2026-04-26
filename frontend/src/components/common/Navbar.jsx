import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = (path) =>
    location.pathname === path
      ? "text-primary font-bold text-lg"
      : "text-gray-700 hover:text-primary transition-colors text-lg";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-black text-primary tracking-tighter"
        >
          StayEase
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-medium">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/rooms" className={navLinkClass("/rooms")}>
            Rooms
          </Link>
          <Link to="/booking" className={navLinkClass("/booking")}>
            Book Now
          </Link>
          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
          <Link to="/login" className={navLinkClass("/login")}>
            Login
          </Link>
        </div>

        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 flex flex-col gap-4 p-6 md:hidden shadow-xl animate-in slide-in-from-top-2 duration-200">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg ${navLinkClass("/")}`}
          >
            Home
          </Link>
          <Link
            to="/rooms"
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg ${navLinkClass("/rooms")}`}
          >
            Rooms
          </Link>
          <Link
            to="/booking"
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg ${navLinkClass("/booking")}`}
          >
            Book Now
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg ${navLinkClass("/contact")}`}
          >
            Contact
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg ${navLinkClass("/login")}`}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
