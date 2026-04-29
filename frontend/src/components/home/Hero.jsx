import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  Calendar,
  BedDouble,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { fetchAllRooms } from "../../services/roomService";
import api from "../../services/api";
import { checkRoomAvailability } from "../../services/bookingService";

const Hero = () => {
  const navigate = useNavigate();

  // Core Data States
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Availability & UI States
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");

  // Fetch rooms on component mount
  useEffect(() => {
    const getRoomsData = async () => {
      try {
        const data = await fetchAllRooms();
        // Filter: Only show rooms that are physically marked "Available"
        const activeRooms = data.filter((room) => room.status === "Available");
        setRooms(activeRooms);

        if (activeRooms.length > 0) {
          setSelectedRoomId(activeRooms[0]._id);
        }
      } catch (err) {
        console.error("Hero component fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    getRoomsData();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = async () => {
    // 1. Basic Field Validation
    if (!checkInDate || !checkOutDate) {
      setError("Please select both Check In and Check Out dates.");
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setError("Check Out date must be after Check In date.");
      return;
    }

    setIsChecking(true);
    setError("");

    try {
      const data = await checkRoomAvailability({
        roomId: selectedRoomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
      });

      if (data.available) {
        // SUCCESS: Create query parameters and navigate
        const params = new URLSearchParams({
          room: selectedRoomId,
          checkIn: checkInDate,
          checkOut: checkOutDate,
        });
        navigate(`/book-now?${params.toString()}`);
      } else {
        // FAIL: Room occupied
        setError("This room is already reserved for the selected dates.");
      }
    } catch (err) {
      console.error("Availability Check Error:", err);
      setError("Unable to verify availability. Please try again.");
    } finally {
      // CRITICAL: This ensures the button becomes clickable again
      // regardless of whether the API call succeeded or failed.
      setIsChecking(false);
    }
  };

  return (
    <section className="relative bg-white pt-4 max-sm:pt-8 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Home size={16} />
              <span>Private Guest House Experience</span>
            </div>

            <h1 className="text-3xl md:text-6xl font-black text-gray-900 leading-tight mb-4">
              The Comfort of Home. <br />
              <span className="text-blue-600 italic">
                The Luxury of a Hotel.
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed">
              Enjoy our hospitality with
              <span className="font-semibold text-gray-800">
                {" "}
                six premium rooms
              </span>
              , designed for comfort and elegance. Take advantage of our special
              weekday rates
              <span className="text-gray-800 font-medium"> (Mon–Fri)</span>{" "}
              starting at
              <span className="font-semibold text-gray-900"> $X</span>, and
              weekend stays
              <span className="text-gray-800 font-medium"> (Sat–Sun)</span> from
              <span className="font-semibold text-gray-900"> $Y</span>.
            </p>
          </div>

          {/* Right Content: Hero Image */}
          <div className="flex-1 relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
                alt="StayEase Guest House"
                className="w-full h-[400px] max-sm:h-[300px] md:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Search Bar Container */}
        <div
          className={`mt-6 p-2 bg-white rounded-2xl shadow-xl border border-gray-300 transition-all duration-300 ${
            error ? "border-red-500 ring-4 ring-red-50" : "border-gray-100"
          }`}
        >
          {/* Error Message Header */}
          {error && (
            <div className="bg-red-600 text-white p-3 text-center text-xs font-bold rounded-t-xl flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row items-stretch">
            {/* Check In */}
            <div className="flex-1 flex items-center gap-3 px-6 py-5 border-b md:border-b-0 md:border-r border-gray-100">
              <Calendar className="text-blue-600 shrink-0" size={20} />
              <div className="text-left w-full border border-gray-300 rounded-sm p-2">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                  Check In
                </p>
                <input
                  type="date"
                  min={today}
                  value={checkInDate}
                  onChange={(e) => {
                    setCheckInDate(e.target.value);
                    setError("");
                  }}
                  className="text-sm outline-none w-full font-bold text-gray-700 bg-transparent cursor-pointer"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex-1 flex items-center gap-3 px-6 py-5 border-b md:border-b-0 md:border-r border-gray-100">
              <Calendar className="text-blue-600 shrink-0" size={20} />
              <div className="text-left w-full border border-gray-300 rounded-sm p-2">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                  Check Out
                </p>
                <input
                  type="date"
                  min={checkInDate || today}
                  value={checkOutDate}
                  onChange={(e) => {
                    setCheckOutDate(e.target.value);
                    setError("");
                  }}
                  className="text-sm outline-none w-full font-bold text-gray-700 bg-transparent cursor-pointer"
                />
              </div>
            </div>

            {/* Room Selection */}
            <div className="flex-1 flex items-center gap-3 px-6 py-5 border-b md:border-b-0 border-gray-100">
              <BedDouble className="text-blue-600 shrink-0" size={20} />
              <div className="text-left w-full min-w-0 border border-gray-300 rounded-sm p-2 relative">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                  Room Selection
                </p>
                <select
                  value={selectedRoomId}
                  onChange={(e) => {
                    setSelectedRoomId(e.target.value);
                    setError("");
                  }}
                  className="text-sm outline-none w-full font-bold text-gray-700 bg-transparent cursor-pointer appearance-none pr-6"
                  disabled={loading}
                >
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No rooms available</option>
                  )}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-0 top-7 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-3 flex items-center justify-center">
              <button
                onClick={handleSearch}
                disabled={isChecking || loading}
                className={`w-full md:w-auto px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isChecking || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-100"
                } text-white`}
              >
                <Search size={18} />
                <span>{isChecking ? "Checking..." : "Book Now"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
