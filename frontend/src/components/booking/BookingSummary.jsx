const BookingSummary = ({ room, nights = 0, totalAmount = 0 }) => {
  if (!room)
    return (
      <div className="p-8 text-center text-gray-400">Loading details...</div>
    );

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm sticky top-24">
      <h2 className="text-xl font-bold mb-6">Reservation Summary</h2>

      {/* Room Preview */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
        <img
          src={room.image}
          alt={room.name}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div>
          <h3 className="font-bold text-gray-900">{room.name}</h3>
          <p className="text-sm text-gray-500">{room.type}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span className="text-sm">
            ${room.price}.00 x {nights} {nights === 1 ? "Night" : "Nights"}
          </span>
          <span className="font-medium">${totalAmount}.00</span>
        </div>

        {/* Total calculation */}
        <div className="flex justify-between text-xl font-black text-gray-900 pt-4 border-t border-gray-100">
          <span>Total (USD)</span>
          <span className="text-blue-600">${totalAmount}.00</span>
        </div>
      </div>

      <p className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
        Secure SSL Checkout
      </p>
    </div>
  );
};

export default BookingSummary;
