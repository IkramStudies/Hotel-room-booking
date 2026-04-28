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

  // --- STATE FOR SYNCING SUMMARY ---
  const [mealPlan, setMealPlan] = useState("EPAI");
  const [noOfPax, setNoOfPax] = useState(1);

  const roomId = searchParams.get("room");
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";

  useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await fetchAllRooms();
        setRooms(data);
      } catch (error) {
        console.error("Failed to load rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    getRooms();
  }, []);

  const selectedRoom = useMemo(() => {
    if (rooms.length === 0) return null;
    return rooms.find((r) => r._id === roomId) || rooms[0];
  }, [rooms, roomId]);

  // --- CENTRALIZED PRICING LOGIC ---
  const pricing = useMemo(() => {
    if (!checkIn || !checkOut || !selectedRoom) {
      return {
        nights: 0,
        roomTotal: 0,
        mealTotal: 0,
        extraBedTotal: 0,
        finalTotal: 0,
      };
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const nights = diffDays > 0 ? diffDays : 0;

    // Pricing Constants (USD) - Ensure these match your business logic
    const planRates = { EPAI: 0, CPAI: 100, MAPAI: 250, APAI: 400 };

    const roomTotal =
      (selectedRoom.pricePerStay || selectedRoom.price || 0) * nights;
    const mealTotal = (planRates[mealPlan] || 0) * noOfPax * nights;
    const extraBedTotal = noOfPax >= 6 ? 100 * nights : 0;

    return {
      nights,
      roomTotal,
      mealTotal,
      extraBedTotal,
      finalTotal: roomTotal + mealTotal + extraBedTotal,
    };
  }, [checkIn, checkOut, selectedRoom, mealPlan, noOfPax]);

  const handleParamChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          to="/rooms"
          className="flex items-center gap-2 text-gray-400 hover:text-[#2563EB] font-bold mb-8 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Rooms
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tight">
            Book Your <span className="text-[#2563EB]">Stay</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-[#6B7280] uppercase tracking-widest">
                  <Calendar size={14} className="text-[#2563EB]" /> Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleParamChange("checkIn", e.target.value)}
                  className="w-full p-4 bg-[#F9FAFB] border border-gray-200 rounded-2xl font-bold outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-[#6B7280] uppercase tracking-widest">
                  <Calendar size={14} className="text-[#2563EB]" /> Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) =>
                    handleParamChange("checkOut", e.target.value)
                  }
                  className="w-full p-4 bg-[#F9FAFB] border border-gray-200 rounded-2xl font-bold outline-none"
                />
              </div>
            </div>

            <BookingForm
              selectedRoom={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              nights={pricing.nights}
              finalTotal={pricing.finalTotal}
              setMealPlan={setMealPlan}
              setNoOfPax={setNoOfPax}
            />
          </div>

          <div className="lg:col-span-1 space-y-6 sticky top-24">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <label className="block text-[10px] font-black text-[#2563EB] mb-4 uppercase tracking-widest">
                Room Selection
              </label>
              <div className="relative">
                <select
                  value={selectedRoom?._id || ""}
                  onChange={(e) => handleParamChange("room", e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4 font-black appearance-none outline-none"
                >
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2563EB]"
                  size={20}
                />
              </div>
            </div>

            <BookingSummary
              room={selectedRoom}
              nights={pricing.nights}
              roomTotal={pricing.roomTotal}
              mealTotal={pricing.mealTotal}
              extraBedTotal={pricing.extraBedTotal}
              finalTotal={pricing.finalTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
