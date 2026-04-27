import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/login/success",
          { withCredentials: true },
        );
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  }, [location]);

  // FIXED: Now uses Axios to avoid the raw JSON browser redirect
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/logout",
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        setUser(null); // Clear local user state
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      console.error("Logout failed:", err);
      // Optional: Force reload to home if the API call fails
      window.location.href = "/";
    }
  };

  const navLinkClass = (path) =>
    location.pathname === path
      ? "text-[#2563EB] font-bold text-lg whitespace-nowrap"
      : "text-gray-600 hover:text-[#2563EB] transition-colors text-lg font-medium whitespace-nowrap";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      {/* Centered layout grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-[1fr_2fr_1fr] items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Link
            to="/"
            className="text-2xl font-black text-[#2563EB] tracking-tighter"
          >
            StayEase
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex gap-6 lg:gap-10 justify-center items-center">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/rooms" className={navLinkClass("/rooms")}>
            Rooms
          </Link>
          <Link to="/book-now" className={navLinkClass("/book-now")}>
            Book Now
          </Link>
          {user && (
            <Link to="/my-bookings" className={navLinkClass("/my-bookings")}>
              My Bookings
            </Link>
          )}
          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
        </div>

        {/* Right: User Actions */}
        <div className="flex justify-end items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <span className="text-gray-900 font-bold whitespace-nowrap">
                  Hi,{" "}
                  {
                    (
                      user.name ||
                      user.fullName ||
                      user.displayName ||
                      "Guest"
                    ).split(" ")[0]
                  }
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 font-bold text-lg hover:text-red-600 transition-all whitespace-nowrap"
                >
                  Logout <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-100 whitespace-nowrap"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 flex flex-col gap-4 p-6 md:hidden shadow-xl">
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
            to="/book-now"
            onClick={() => setIsOpen(false)}
            className={navLinkClass("/book-now")}
          >
            Book Now
          </Link>
          {user && (
            <Link
              to="/my-bookings"
              onClick={() => setIsOpen(false)}
              className={navLinkClass("/my-bookings")}
            >
              My Bookings
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-red-500 font-bold text-lg text-left pt-2 border-t border-gray-50"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className={navLinkClass("/login")}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
