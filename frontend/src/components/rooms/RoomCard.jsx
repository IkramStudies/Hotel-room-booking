import React from "react";
import { Link } from "react-router-dom";
import { Bed, Users, Expand, ArrowRight, Star } from "lucide-react";

const RoomCard = ({ room }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-[250px] md:h-[280px] overflow-hidden">
        <img
          src={room.images?.[0] || room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-2xl shadow-sm font-bold text-sm">
          ${room.pricePerStay || room.price}
          <span className="text-gray-400 font-medium">/night</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-[#2563EB] mb-2">
          <Star size={14} className="fill-[#2563EB]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {room.type || "Luxury Suite"}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#2563EB] transition-colors">
          {room.name}
        </h3>

        {/* Specs Bar */}
        <div className="grid grid-cols-3 gap-2 py-5 border-t border-b border-gray-50 mb-8">
          <div className="flex flex-col items-center border-r border-gray-100 text-center">
            <Users size={18} className="text-[#2563EB] mb-1" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              {room.guests || room.capacity} Guests
            </span>
          </div>
          <div className="flex flex-col items-center border-r border-gray-100 text-center">
            <Bed size={18} className="text-[#2563EB] mb-1" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              {room.bedType || "King Bed"}
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Expand size={18} className="text-[#2563EB] mb-1" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              {room.size || "450 sqft"}
            </span>
          </div>
        </div>

        {/* ✅ THE FIX: Changed = to ?room= */}
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
      </div>
    </div>
  );
};

export default RoomCard;
