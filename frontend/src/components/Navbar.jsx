import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          StayEase
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/rooms" className={navLinkClass("/rooms")}>
            Rooms
          </Link>
          <Link to="/booking" className={navLinkClass("/booking")}>
            Book Now
          </Link>
          <Link to="/login" className={navLinkClass("/login")}>
            Login
          </Link>

          <Link
            to="/admin/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={navLinkClass("/")}
          >
            Home
          </Link>

          <Link
            to="/rooms"
            onClick={() => setIsOpen(false)}
            className={navLinkClass("/rooms")}
          >
            Rooms
          </Link>

          <Link
            to="/booking"
            onClick={() => setIsOpen(false)}
            className={navLinkClass("/booking")}
          >
            Book Now
          </Link>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className={navLinkClass("/login")}
          >
            Login
          </Link>

          <Link
            to="/admin/login"
            onClick={() => setIsOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
