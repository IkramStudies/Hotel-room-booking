import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home, Calendar } from "lucide-react";
import axios from "axios";

const BookingSuccess = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Calling your existing auth endpoint
        const res = await axios.get(
          "http://localhost:5000/api/auth/login/success",
          {
            withCredentials: true,
          },
        );

        if (res.data.success && res.data.user) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        // If 401 or error, we assume it's a guest
        setIsLoggedIn(false);
      }
    };
    checkStatus();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-xl text-center border border-gray-50">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={60} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-4">
          Booking Confirmed!
        </h1>

        <p className="text-gray-500 mb-8 font-medium leading-relaxed">
          Your sanctuary in Dallas is waiting. A confirmation email has been
          sent with your check-in details.
        </p>

        <div className="space-y-4">
          {/* ✅ Shows ONLY if the backend confirms the user is logged in */}
          {isLoggedIn && (
            <Link
              to="/my-bookings"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#2563EB] text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all"
            >
              <Calendar size={18} /> View My Bookings
            </Link>
          )}

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold hover:bg-gray-100 transition-all"
          >
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
