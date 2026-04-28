import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Star,
  Home,
  Calendar,
  BedDouble,
  ChevronDown,
} from "lucide-react";
import { roomsData } from "../../data/rooms";

const Hero = () => {
  const navigate = useNavigate();
  const [selectedRoomId, setSelectedRoomId] = useState(roomsData[0].id);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const propertySettings = {
    totalRooms: roomsData.length,
    minPrice: Math.min(...roomsData.map((r) => r.price)),
  };

  const handleSearch = () => {
    // 1. Validation Check
    if (!checkInDate || !checkOutDate) {
      alert("Please select both Check In and Check Out dates.");
      return; // Stop the function from navigating
    }

    // 2. Navigation Logic (Only runs if dates are present)
    const params = new URLSearchParams({
      room: selectedRoomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    });

    navigate(`/book-now?${params.toString()}`);
  };

  return (
    <section className="relative bg-white pt-4 max-sm:pt-8 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero: Two Columns */}
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

          {/* Right Content */}
          <div className="flex-1 relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
                alt="Boutique Guest House"
                className="w-full h-[400px] max-sm:h-[300px] md:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Star size={22} className="fill-blue-600 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Starting at ${propertySettings.minPrice}/day
                    </p>
                    <p className="text-xs text-gray-500">
                      {propertySettings.totalRooms} Rooms Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          </div>
        </div>

        {/* ✅ Full-Width Search Bar — BELOW both columns */}
        <div className="mt-8 max-sm:mt-10 bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Check In */}
            <div className="flex-1 flex items-center gap-3 px-6 py-5 border-b md:border-b-0 md:border-r border-gray-100">
              <Calendar className="text-blue-600 shrink-0" size={20} />
              <div className="text-left w-full">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                  Check In
                </p>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="text-sm outline-none w-full font-bold text-gray-700 bg-transparent cursor-pointer border border-gray-300 p-1 rounded-sm"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex-1 flex items-center gap-3 px-6 py-5 border-b md:border-b-0 md:border-r border-gray-100">
              <Calendar className="text-blue-600 shrink-0" size={20} />
              <div className="text-left w-full">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                  Check Out
                </p>
                <input
                  type="date"
                  value={checkOutDate}
                  min={checkInDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="text-sm outline-none w-full font-bold text-gray-700 bg-transparent cursor-pointer border border-gray-300 p-1 rounded-sm"
                />
              </div>
            </div>

            {/* Room Type — now has plenty of space */}
            <div className="flex-1 flex items-center gap-3 px-6 py-5 border-b md:border-b-0 border-gray-100">
              <BedDouble className="text-blue-600 shrink-0" size={20} />
              <div className="text-left w-full min-w-0">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                  Room Type
                </p>
                <div className="relative flex items-center w-full">
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="text-sm outline-none w-full font-bold text-gray-700 bg-transparent cursor-pointer appearance-none pr-6 border border-gray-300 p-1 rounded-sm"
                  >
                    {roomsData.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    strokeWidth={3}
                    className="absolute right-0 pointer-events-none text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Book Now */}
            <div className="p-3 flex items-center justify-center">
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 whitespace-nowrap"
              >
                <Search size={18} />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
