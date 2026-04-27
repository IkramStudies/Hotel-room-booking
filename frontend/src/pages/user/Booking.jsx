import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllRooms } from "../../services/roomService"; // Ensure your service is ready
import BookingForm from "../../components/booking/BookingForm";
import BookingSummary from "../../components/booking/BookingSummary";
import { ChevronDown, Calendar } from "lucide-react";

const Booking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Extract values from URL (roomId is now a string from MongoDB _id)
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

  // 2. Identify the selected room object from the fetched array
  const selectedRoom = useMemo(() => {
    return rooms.find((r) => r._id === roomId) || rooms[0];
  }, [rooms, roomId]);

  // 3. Calculate Nights and Total Price based on check-in/out
  const { nights, totalAmount } = useMemo(() => {
    if (!checkIn || !checkOut || !selectedRoom)
      return { nights: 0, totalAmount: 0 };

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const stayNights = diffDays > 0 ? diffDays : 0;

    // Using your updated pricePerStay schema
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-[#2563EB]">
        Loading Sanctuary Details...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-12">
          <span className="bg-[#EFF6FF] text-[#2563EB] text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest">
            Reservation
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#111827] mt-4 tracking-tight">
            Book Your <span className="text-[#2563EB]">Stay</span>
          </h1>
          <p className="text-[#6B7280] mt-3 text-lg">
            Complete your details to finalize your visit to StayEase Dallas.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-8">
            {/* Date Selection Section */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-[#6B7280] mb-3">
                  Check In
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) =>
                      handleParamChange("checkIn", e.target.value)
                    }
                    className="w-full p-4 bg-[#F9FAFB] border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all font-semibold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-black text-[#6B7280] mb-3">
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) =>
                    handleParamChange("checkOut", e.target.value)
                  }
                  className="w-full p-4 bg-[#F9FAFB] border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all font-semibold"
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
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <label className="block text-[10px] uppercase tracking-widest font-black text-[#2563EB] mb-4">
                Selected Room
              </label>
              <div className="relative group">
                <select
                  value={selectedRoom?._id}
                  onChange={(e) => handleParamChange("room", e.target.value)}
                  className="w-full py-2 bg-transparent text-[#111827] border border-gray-300 rounded-sm p-4 font-bold text-xl outline-none appearance-none cursor-pointer border-b-2 border-gray-100 focus:border-[#2563EB] transition-all"
                >
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#2563EB]">
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
