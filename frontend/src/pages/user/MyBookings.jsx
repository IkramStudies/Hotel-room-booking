import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  CreditCard,
  ChevronRight,
  Inbox,
  MapPin,
} from "lucide-react";
import Loader from "../../components/common/Loader";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/bookings/my-bookings",
          {
            withCredentials: true,
          },
        );
        setBookings(res.data.data);
      } catch (err) {
        console.error("Error fetching bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              My <span className="text-[#2563EB]">Reservations</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              View and manage your upcoming hotel stays.
            </p>
          </div>
          <Link
            to="/rooms"
            className="hidden md:block text-[#2563EB] font-bold hover:underline"
          >
            Book another room →
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-2xl shadow-blue-50/50">
            <div className="w-24 h-24 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-8">
              <Inbox size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              No bookings yet
            </h2>
            <p className="text-gray-500 mb-10 max-w-sm mx-auto">
              Your travel history is empty. Start exploring our luxury rooms in
              Dallas!
            </p>
            <Link
              to="/rooms"
              className="bg-[#2563EB] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#1d4ed8] transition-all shadow-xl shadow-blue-200"
            >
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-72 h-56 md:h-auto relative overflow-hidden">
                    <img
                      src={
                        booking.room?.images?.[0] ||
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                      }
                      alt="Room"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                          booking.status === "confirmed"
                            ? "bg-green-500 text-white"
                            : "bg-[#2563EB] text-white"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#2563EB] transition-colors">
                          {booking.room?.name || "Luxury Suite"}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-400 mt-1 text-sm font-medium">
                          <MapPin size={14} />
                          <span>Dallas, Texas</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                          Total Paid
                        </p>
                        <p className="text-2xl font-black text-[#2563EB]">
                          ${booking.totalPrice}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-gray-50">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                          <Calendar size={12} /> Check-In
                        </p>
                        <p className="font-bold text-gray-700">
                          {new Date(booking.checkIn).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                          <Clock size={12} /> Check-Out
                        </p>
                        <p className="font-bold text-gray-700">
                          {new Date(booking.checkOut).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </p>
                      </div>
                      <div className="hidden md:block space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                          <CreditCard size={12} /> Payment
                        </p>
                        <p className="font-bold text-green-600">
                          Securely Paid
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
                        Ref: {booking._id.slice(-10)}
                      </span>
                      <button className="flex items-center gap-2 text-[#2563EB] font-black text-sm group/btn">
                        View Receipt{" "}
                        <ChevronRight
                          size={18}
                          className="group-hover/btn:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
