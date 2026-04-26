import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    isActive(path)
      ? "flex flex-col items-center text-[13px] font-medium text-[#1a1a1a] px-3.5 py-1.5 rounded-lg tracking-wide after:block after:w-4 after:h-px after:bg-[#c9a96e] after:rounded-full after:mt-0.5"
      : "text-[13px] font-normal text-[#6b6460] px-3.5 py-1.5 rounded-lg tracking-wide transition-colors duration-150 hover:text-[#1a1a1a] hover:bg-[#f0ece5]";

  const mobileLinkClass = (path) =>
    isActive(path)
      ? "text-sm font-medium text-[#1a1a1a] px-3 py-2.5 rounded-lg border-l-2 border-[#c9a96e] pl-2.5 transition-colors duration-150"
      : "text-sm text-[#6b6460] px-3 py-2.5 rounded-lg transition-colors duration-150 hover:text-[#1a1a1a] hover:bg-[#f0ece5]";

  return (
    <>
      {/* Google Fonts — kept as @import since Tailwind can't load external fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <nav
        className="sticky top-0 z-50 flex items-center justify-between h-16 px-10 border-b border-[#e2ddd8] bg-[#faf9f6]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[22px] font-semibold text-[#1a1a1a] no-underline"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[#c9a96e] mb-0.5 inline-block" />
          StayEase
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {[
            { to: "/", label: "Home" },
            { to: "/rooms", label: "Rooms" },
            { to: "/booking", label: "Book Now" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className={linkClass(to)}>
              {label}
            </Link>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-[#e2ddd8] mx-2" />

          <Link
            to="/login"
            className="text-[13px] text-[#6b6460] px-3.5 py-1.5 rounded-lg transition-colors duration-150 hover:text-[#1a1a1a] hover:bg-[#f0ece5]"
          >
            Login
          </Link>

          <Link
            to="/admin/login"
            className="group ml-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-[#faf9f6] bg-[#1a1a1a] px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-[#c9a96e]"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[#c9a96e] group-hover:bg-[#faf9f6] transition-colors duration-150" />
            Admin
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1 bg-transparent border border-[#e2ddd8] rounded-lg px-2.5 py-[7px] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-[18px] h-px bg-[#1a1a1a] rounded-full" />
          <span className="block w-[18px] h-px bg-[#1a1a1a] rounded-full" />
          <span className="block w-[18px] h-px bg-[#1a1a1a] rounded-full" />
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden flex flex-col gap-0.5 px-6 pt-4 pb-5 bg-[#faf9f6] border-b border-[#e2ddd8]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/rooms", label: "Rooms" },
            { to: "/booking", label: "Book Now" },
            { to: "/login", label: "Login" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={mobileLinkClass(to)}
            >
              {label}
            </Link>
          ))}

          <Link
            to="/admin/login"
            onClick={() => setIsOpen(false)}
            className="mt-2.5 text-[11px] font-medium uppercase tracking-widest text-[#faf9f6] bg-[#1a1a1a] px-3 py-3 rounded-lg text-center transition-colors duration-150 hover:bg-[#c9a96e]"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
