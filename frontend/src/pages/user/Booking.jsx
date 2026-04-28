import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchAllRooms } from "../../services/roomService";
import BookingForm from "../../components/booking/BookingForm";
import BookingSummary from "../../components/booking/BookingSummary";
import { ChevronDown, Calendar, ArrowLeft } from "lucide-react";
import Loader from "../../components/common/Loader";

const Booking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Extract values from URL search params
  const roomId = searchParams.get("room");
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";

  // Fetch Rooms from Backend
  useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await fetchAllRooms();
        setRooms(data);
      } catch (error) {
        console.error("Failed to load rooms for booking:", error);
      } finally {
        setLoading(false);
      }
    };
    getRooms();
  }, []);

  // 2. Identify the selected room object safely
  const selectedRoom = useMemo(() => {
    if (rooms.length === 0) return null;
    return rooms.find((r) => r._id === roomId) || rooms[0];
  }, [rooms, roomId]);

  // 3. Calculate Nights and Total Price
  const { nights, totalAmount } = useMemo(() => {
    if (!checkIn || !checkOut || !selectedRoom)
      return { nights: 0, totalAmount: 0 };

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    // Safety check for invalid dates
    if (isNaN(start) || isNaN(end)) return { nights: 0, totalAmount: 0 };

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const stayNights = diffDays > 0 ? diffDays : 0;

    return {
      nights: stayNights,
      totalAmount: stayNights * (selectedRoom.pricePerStay || 0),
    };
  }, [checkIn, checkOut, selectedRoom]);

  const handleParamChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation Back */}
        <Link
          to="/rooms"
          className="flex items-center gap-2 text-gray-400 hover:text-[#2563EB] font-bold mb-8 transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Rooms
        </Link>

        <header className="mb-12">
          <span className="bg-[#EFF6FF] text-[#2563EB] text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest shadow-sm shadow-blue-100">
            Secure Reservation
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#111827] mt-4 tracking-tight">
            Book Your <span className="text-[#2563EB]">Stay</span>
          </h1>
          <p className="text-[#6B7280] mt-3 text-lg font-medium">
            Complete your details to finalize your visit to StayEase Dallas.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-8">
            {/* Date Selection Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[#6B7280]">
                  <Calendar size={14} className="text-[#2563EB]" /> Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split("T")[0]} // Prevents past dates
                  onChange={(e) => handleParamChange("checkIn", e.target.value)}
                  className="w-full p-4 bg-[#F9FAFB] border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2563EB] focus:bg-white outline-none transition-all font-bold text-gray-700"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[#6B7280]">
                  <Calendar size={14} className="text-[#2563EB]" /> Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || new Date().toISOString().split("T")[0]} // Prevents checkout before checkin
                  onChange={(e) =>
                    handleParamChange("checkOut", e.target.value)
                  }
                  className="w-full p-4 bg-[#F9FAFB] border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2563EB] focus:bg-white outline-none transition-all font-bold text-gray-700"
                />
              </div>
            </div>

            <BookingForm
              selectedRoom={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              nights={nights}
              totalAmount={totalAmount}
            />
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <label className="block text-[10px] uppercase tracking-widest font-black text-[#2563EB] mb-4">
                Selected Sanctuary
              </label>
              <div className="relative group">
                <select
                  value={selectedRoom?._id || ""}
                  onChange={(e) => handleParamChange("room", e.target.value)}
                  className="w-full bg-[#F9FAFB] text-[#111827] border border-gray-200 rounded-2xl p-4 font-black text-lg outline-none appearance-none cursor-pointer focus:border-[#2563EB] transition-all"
                >
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#2563EB]">
                  <ChevronDown size={24} />
                </div>
              </div>
            </div>

            <BookingSummary
              room={selectedRoom}
              nights={nights}
              totalAmount={totalAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
