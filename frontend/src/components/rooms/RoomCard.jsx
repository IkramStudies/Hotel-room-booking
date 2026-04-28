import React from "react";
import { Link } from "react-router-dom";
import { Bed, Users, Expand, ArrowRight, Star } from "lucide-react";

const RoomCard = ({ room }) => {
  // Check availability from the database
  const isAvailable = room.isAvailable;

  return (
    <div
      className={`group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden transition-all duration-500 h-full flex flex-col ${isAvailable ? "hover:shadow-2xl hover:-translate-y-2" : "opacity-75"}`}
    >
      {/* Image Section */}
      <div className="relative h-[250px] md:h-[280px] overflow-hidden">
        <img
          src={room.images?.[0] || room.image}
          alt={room.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isAvailable ? "group-hover:scale-110" : "grayscale"}`}
        />

        {/* Price Tag or Sold Out Badge */}
        {isAvailable ? (
          <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-2xl shadow-sm font-bold text-sm">
            ${room.pricePerStay || room.price}
            <span className="text-gray-400 font-medium">/night</span>
          </div>
        ) : (
          <div className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-2xl shadow-lg font-black text-xs uppercase tracking-widest">
            Sold Out
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow">
        <div
          className={`flex items-center gap-2 mb-2 ${isAvailable ? "text-[#2563EB]" : "text-gray-400"}`}
        >
          <Star
            size={14}
            className={isAvailable ? "fill-[#2563EB]" : "fill-gray-400"}
          />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {room.category || room.type || "Luxury Suite"}
          </span>
        </div>

        <h3
          className={`text-2xl font-bold mb-6 transition-colors ${isAvailable ? "text-gray-900 group-hover:text-[#2563EB]" : "text-gray-400"}`}
        >
          {room.name}
        </h3>

        {/* Specs Bar */}
        <div className="grid grid-cols-3 gap-2 py-5 border-t border-b border-gray-50 mb-8">
          <div className="flex flex-col items-center border-r border-gray-100 text-center">
            <Users
              size={18}
              className={`${isAvailable ? "text-[#2563EB]" : "text-gray-300"} mb-1`}
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              {room.guests || room.capacity || 2} Guests
            </span>
          </div>
          <div className="flex flex-col items-center border-r border-gray-100 text-center">
            <Bed
              size={18}
              className={`${isAvailable ? "text-[#2563EB]" : "text-gray-300"} mb-1`}
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              {room.bedType || "King Bed"}
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Expand
              size={18}
              className={`${isAvailable ? "text-[#2563EB]" : "text-gray-300"} mb-1`}
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              {room.size || "450 sqft"}
            </span>
          </div>
        </div>

        {/* Button Logic */}
        {isAvailable ? (
          <Link
            to={`/book-now?room=${room._id}`}
            className="mt-auto w-full py-4 bg-[#2563EB] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#1d4ed8] transition-all duration-300 group/btn shadow-lg shadow-blue-100"
          >
            Book Your Stay
            <ArrowRight
              size={18}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        ) : (
          <button
            disabled
            className="mt-auto w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-bold cursor-not-allowed"
          >
            Currently Unavailable
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
