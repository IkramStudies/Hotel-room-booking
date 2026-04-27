const BookingSummary = ({ room, nights = 0, totalAmount = 0 }) => {
  if (!room)
    return (
      <div className="p-8 text-center text-gray-400">Loading details...</div>
    );

  // Fallback logic for the image
  // Check if it's an array 'images' or a single string 'image'
  const displayImage = Array.isArray(room.images) ? room.images[0] : room.image;

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm sticky top-24">
      <h2 className="text-xl font-bold mb-6 text-[#111827]">
        Reservation Summary
      </h2>

      {/* Room Preview */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
        <img
          src={displayImage || "https://via.placeholder.com/150"} // Fallback placeholder
          alt={room.name}
          className="w-20 h-20 rounded-xl object-cover shadow-sm"
        />
        <div>
          <h3 className="font-bold text-[#111827]">{room.name}</h3>
          <p className="text-sm text-gray-500">{room.category || room.type}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span className="text-sm">
            {/* Match the field name used in your Booking.jsx calculation */}$
            {room.pricePerStay || room.price || 0}.00 x {nights}{" "}
            {nights === 1 ? "Night" : "Nights"}
          </span>
          <span className="font-bold text-[#111827]">${totalAmount}.00</span>
        </div>

        {/* Total calculation */}
        <div className="flex justify-between text-xl font-black text-[#111827] pt-4 border-t border-gray-100">
          <span>Total (USD)</span>
          <span className="text-[#2563EB]">${totalAmount}.00</span>
        </div>
      </div>

      <p className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest font-black">
        Secure SSL Checkout
      </p>
    </div>
  );
};
export default BookingSummary;
