import { useState } from "react";
import { FaUser, FaCreditCard, FaLock, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookingForm = ({
  selectedRoom,
  checkIn,
  checkOut,
  nights,
  finalTotal,
  setMealPlan,
  setNoOfPax,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    headOfFamily: "",
    nationality: "",
    address: "",
    noOfPax: 1,
    roomType: "Premium",
    planType: "EPAI",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "noOfPax" ? Number(value) : value;

    // Update local form state
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

    // Sync with parent state to update BookingSummary
    if (name === "planType") {
      setMealPlan(value);
    }
    if (name === "noOfPax") {
      setNoOfPax(updatedValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please select both Check-In and Check-Out dates.");
      return;
    }

    const extraBedFlag = formData.noOfPax >= 6;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings/create",
        {
          ...formData,
          room: selectedRoom?._id,
          checkIn,
          checkOut,
          totalPrice: finalTotal,
          extraBed: extraBedFlag,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        navigate("/booking-success");
      }
    } catch (err) {
      alert(
        err.response?.data?.message || "Something went wrong during booking.",
      );
    }
  };

  const inputStyle =
    "w-full bg-gray-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <FaUser className="text-blue-600" />
          <h2 className="text-xl font-bold">Guest Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="fullName"
            onChange={handleChange}
            required
            type="text"
            placeholder="Full Name"
            className={inputStyle}
          />
          <input
            name="email"
            onChange={handleChange}
            required
            type="email"
            placeholder="Email Address"
            className={inputStyle}
          />
          <input
            name="phone"
            onChange={handleChange}
            required
            type="tel"
            placeholder="Phone Number"
            className={inputStyle}
          />
          <input
            name="emergencyContact"
            onChange={handleChange}
            required
            type="text"
            placeholder="Emergency Contact"
            className={inputStyle}
          />
          <input
            name="headOfFamily"
            onChange={handleChange}
            required
            type="text"
            placeholder="Head of Family"
            className={inputStyle}
          />
          <input
            name="nationality"
            onChange={handleChange}
            required
            type="text"
            placeholder="Nationality"
            className={inputStyle}
          />
          <input
            name="address"
            onChange={handleChange}
            required
            type="text"
            placeholder="Address"
            className={`md:col-span-2 ${inputStyle}`}
          />

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 px-2 font-bold">
              Guests
            </label>
            <input
              name="noOfPax"
              value={formData.noOfPax}
              onChange={handleChange}
              required
              type="number"
              min={1}
              className={inputStyle}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 px-2 font-bold">
              Room Category
            </label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              className={inputStyle}
            >
              <option value="Single">Single</option>
              <option value="Premium">Premium</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 px-2 font-bold">
              Meal Plan Selection
            </label>
            <select
              name="planType"
              value={formData.planType}
              onChange={handleChange}
              required
              className={inputStyle}
            >
              <option value="EPAI">EPAI (Room Only)</option>
              <option value="CPAI">CPAI (Room & Breakfast)</option>
              <option value="MAPAI">
                MAPAI (Room, Breakfast + Lunch/Dinner)
              </option>
              <option value="APAI">APAI (All Meals)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-[2rem] flex justify-between items-center px-8">
        <div>
          <h3 className="text-blue-800 font-bold">Total Stay Value</h3>
          <p className="text-xs text-blue-600 font-medium">
            {formData.noOfPax >= 6
              ? "Includes Extra Bed Surcharge"
              : "Includes selected meal plan"}
          </p>
        </div>
        <div className="text-2xl font-black text-blue-900 flex items-center gap-1">
          <FaDollarSign size={18} />
          {finalTotal.toFixed(2)}
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaLock className="text-green-500" />
            <h2 className="text-xl font-bold">Secure Payment</h2>
          </div>
          <FaCreditCard className="text-gray-300" size={24} />
        </div>
        <div className="space-y-4">
          <input
            name="cardNumber"
            onChange={handleChange}
            required
            type="text"
            placeholder="Card Number"
            className={inputStyle}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="expiry"
              onChange={handleChange}
              required
              type="text"
              placeholder="MM/YY"
              className={inputStyle}
            />
            <input
              name="cvv"
              onChange={handleChange}
              required
              type="text"
              placeholder="CVV"
              className={inputStyle}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!checkIn || !checkOut}
        className={`w-full font-bold py-5 rounded-2xl shadow-lg transition-all text-lg ${
          !checkIn || !checkOut
            ? "bg-gray-200 cursor-not-allowed text-gray-400"
            : "bg-[#2563EB] text-white hover:scale-[1.01] active:scale-[0.99] shadow-blue-200"
        }`}
      >
        {!checkIn || !checkOut
          ? "Select Dates to Continue"
          : `Confirm & Pay $${finalTotal.toFixed(2)}`}
      </button>
    </form>
  );
};

export default BookingForm;
