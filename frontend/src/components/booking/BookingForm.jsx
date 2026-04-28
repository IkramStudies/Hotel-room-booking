import { useState } from "react";
import { FaUser, FaCreditCard, FaLock } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const BookingForm = ({
  selectedRoom,
  checkIn,
  checkOut,
  nights,
  totalAmount,
}) => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");
  const navigate = useNavigate();

  // State for all form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    headOfFamily: "",
    nationality: "",
    address: "",
    noOfPax: 1,
    roomType: "",
    planType: "",
    // Mock Payment fields (not sent to DB but used for validation)
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. DATE VALIDATION
    if (!checkIn || !checkOut) {
      alert(
        "Please select both Check-In and Check-Out dates before proceeding.",
      );
      return;
    }

    // 2. STAY DURATION VALIDATION
    if (nights <= 0) {
      alert("Please select a valid stay duration (at least 1 night).");
      return;
    }

    // 3. EXTRA BED LOGIC
    const extraBedFlag = formData.noOfPax >= 6;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings/create",
        {
          ...formData,
          room: selectedRoom?._id,
          checkIn,
          checkOut,
          totalPrice: totalAmount,
          extraBed: extraBedFlag,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        // SUCCESS: Send everyone to the BookingSuccess component.
        // We removed the if/else block here so it doesn't override this navigation.
        navigate("/booking-success");
      }
    } catch (err) {
      alert(
        err.response?.data?.message || "Something went wrong during booking.",
      );
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Guest Details */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <FaUser className="text-primary" />
          <h2 className="text-xl font-bold">Guest Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="fullName"
            onChange={handleChange}
            required
            type="text"
            placeholder="Full Name"
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="email"
            onChange={handleChange}
            required
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="phone"
            onChange={handleChange}
            required
            type="tel"
            placeholder="Phone Number"
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="emergencyContact"
            onChange={handleChange}
            required
            type="text"
            placeholder="Emergency Contact"
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="headOfFamily"
            onChange={handleChange}
            required
            type="text"
            placeholder="Head of Family"
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="nationality"
            onChange={handleChange}
            required
            type="text"
            placeholder="Nationality"
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="address"
            onChange={handleChange}
            required
            type="text"
            placeholder="Address"
            className="md:col-span-2 w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="noOfPax"
            onChange={handleChange}
            required
            type="number"
            placeholder="No. of Pax (People)"
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
            min={1}
          />

          <select
            name="roomType"
            onChange={handleChange}
            required
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Premium">Premium</option>
            <option value="Suite">Suite</option>
          </select>

          <select
            name="planType"
            onChange={handleChange}
            required
            className="md:col-span-2 w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select Plan Type</option>
            <option value="EPAI">EPAI (Room Only)</option>
            <option value="CPAI">CPAI (Room & Breakfast)</option>
            <option value="MAPAI">
              MAPAI (Room, Breakfast + Lunch/Dinner)
            </option>
            <option value="APAI">APAI (All Meals)</option>
          </select>
        </div>
      </div>

      {/* Payment Details (Visual/Testing Only) */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaLock className="text-green-500" />
            <h2 className="text-xl font-bold">Secure Payment</h2>
          </div>
          <FaCreditCard className="text-gray-300" size={24} />
        </div>
        <div className="space-y-4">
          <p className="text-sm text-blue-500">
            Test Card: 4242 4242 4242 4242
          </p>
          <input
            name="cardNumber"
            onChange={handleChange}
            required
            type="text"
            placeholder="Card Number"
            className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="expiry"
              onChange={handleChange}
              required
              type="text"
              placeholder="MM/YY"
              className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <input
              name="cvv"
              onChange={handleChange}
              required
              type="text"
              placeholder="CVV"
              className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Replace your old button with this */}
      <button
        type="submit"
        // 1. Logic: If either date is missing, 'disabled' becomes true
        disabled={!checkIn || !checkOut}
        // 2. Styling: If disabled, use gray colors. If active, use Blue.
        className={`w-full font-bold py-5 rounded-2xl shadow-xl transition-all text-lg ${
          !checkIn || !checkOut
            ? "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none"
            : "bg-[#2563EB] text-white hover:scale-[1.02] shadow-blue-100"
        }`}
      >
        {/* 3. Text: Tell the user exactly why they can't click yet */}
        {!checkIn || !checkOut
          ? "Please Select Check-in/out Dates"
          : "Complete Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
