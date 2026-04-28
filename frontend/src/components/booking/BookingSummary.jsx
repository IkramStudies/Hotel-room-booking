import React from "react";

const BookingSummary = ({
  room,
  nights = 0,
  roomTotal = 0,
  mealTotal = 0,
  extraBedTotal = 0,
  finalTotal = 0,
}) => {
  if (!room)
    return (
      <div className="p-8 text-center text-gray-400">Loading details...</div>
    );

  const displayImage = Array.isArray(room.images) ? room.images[0] : room.image;

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-[#111827]">
        Reservation Summary
      </h2>

      <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
        <img
          src={displayImage || "https://via.placeholder.com/150"}
          alt={room.name}
          className="w-20 h-20 rounded-xl object-cover shadow-sm"
        />
        <div>
          <h3 className="font-bold text-[#111827]">{room.name}</h3>
          <p className="text-sm text-gray-500 capitalize">
            {room.category || room.type}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Room Base Charges */}
        <div className="flex justify-between text-gray-600">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Room Charges</span>
            <span className="text-[10px] text-gray-400 uppercase">
              ${(room.pricePerStay || room.price || 0).toFixed(2)} x {nights}{" "}
              nights
            </span>
          </div>
          <span className="font-bold text-[#111827]">
            ${roomTotal.toFixed(2)}
          </span>
        </div>

        {/* Meal Plan Charges */}
        {mealTotal > 0 && (
          <div className="flex justify-between text-gray-600">
            <span className="text-sm font-medium">Dining & Meal Plan</span>
            <span className="font-bold text-[#111827]">
              ${mealTotal.toFixed(2)}
            </span>
          </div>
        )}

        {/* Extra Bed Surcharge */}
        {extraBedTotal > 0 && (
          <div className="flex justify-between text-red-500">
            <span className="text-sm font-medium">Extra Bed Surcharge</span>
            <span className="font-bold">${extraBedTotal.toFixed(2)}</span>
          </div>
        )}

        {/* Grand Total */}
        <div className="flex justify-between text-xl font-black text-[#111827] pt-4 border-t border-gray-100">
          <span>Total (USD)</span>
          <span className="text-[#2563EB]">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <p className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest font-black">
        Secure SSL Checkout
      </p>
    </div>
  );
};

export default BookingSummary;
