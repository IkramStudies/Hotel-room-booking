import { FaUser, FaCreditCard, FaLock } from "react-icons/fa";

const BookingForm = () => {
  return (
    <div className="space-y-6">
      {/* Guest Details */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <FaUser className="text-primary" />
          <h2 className="text-xl font-bold">Guest Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none md:col-span-2"
          />
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaLock className="text-green-500" />
            <h2 className="text-xl font-bold">Secure Payment</h2>
          </div>
          <FaCreditCard className="text-gray-300" size={24} />
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>
      </div>

      <button className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all text-lg">
        Complete Booking
      </button>
    </div>
  );
};

export default BookingForm;
