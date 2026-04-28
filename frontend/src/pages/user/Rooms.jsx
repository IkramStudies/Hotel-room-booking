import React, { useState, useEffect } from "react";
import RoomCard from "../../components/rooms/RoomCard";
import RoomCardSkeleton from "../../components/rooms/RoomCardSkeleton";
import { fetchAllRooms } from "../../services/roomService";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRooms = async () => {
      try {
        // Fetching from your MERN backend
        const data = await fetchAllRooms();
        setRooms(data);
      } catch (error) {
        console.error("Error loading rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    getRooms();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Page Header - Matching the "StayEase Advantage" style */}
      <div className="bg-[#F9FAFB] py-16 md:py-18 mb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[#2563EB] font-bold tracking-widest uppercase text-sm mb-4">
            The StayEase Collection
          </h2>
          <h1 className="text-3xl md:text-6xl font-extrabold text-[#111827] mb-6 tracking-tight leading-tight">
            Our <span className="text-[#2563EB]">Private</span> Sanctuary
          </h1>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Discover {rooms.length || 6} exclusively designed designer rooms in
            Dallas, where residential comfort meets professional hotel luxury.
          </p>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <RoomCardSkeleton key={`skeleton-${index}`} />
              ))
            : rooms.map((room) => <RoomCard key={room._id} room={room} />)}
        </div>

        {!loading && rooms.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-[#111827]">
              No rooms found.
            </h3>
            <p className="text-[#6B7280] mt-2">
              Please check back later or try refreshing.
            </p>
          </div>
        )}
      </div>

      {/* Helpful Support Footer - Updated to match your Stats Bar theme */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-[#2563EB] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-blue-200">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              Need help choosing?
            </h2>
            <p className="text-blue-100 text-lg">
              Our Dallas-based team is available 24/7 to find your perfect stay.
            </p>
          </div>
          <button className="bg-white text-[#2563EB] hover:bg-blue-50 px-10 py-5 rounded-2xl font-black transition-all whitespace-nowrap shadow-xl active:scale-95">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
