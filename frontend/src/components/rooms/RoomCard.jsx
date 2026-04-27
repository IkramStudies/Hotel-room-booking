import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-64 w-full bg-[#EFF6FF]">
        <img
          src={room.images && room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover block"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300?text=Image+Not+Found";
          }}
        />
        {/* Updated Price Pill: Removed blur and blue shadow for a flat, clean look */}
        <div className="absolute top-4 right-4 bg-white text-[#2563EB] px-4 py-1.5 rounded-full font-bold text-sm border border-gray-100">
          ${room.pricePerStay}/stay
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-2xl font-black text-[#111827] mb-3 tracking-tight group-hover:text-[#2563EB] transition-colors">
          {room.name}
        </h3>

        <p className="text-[#6B7280] text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
          {room.description}
        </p>

        <div className="flex items-center text-[#6B7280] text-sm mb-8 gap-5 border-t border-gray-100 pt-5">
          <span className="flex items-center">
            <span className="bg-[#EFF6FF] text-[#2563EB] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest mr-2">
              {room.category}
            </span>
          </span>
          <span className="flex items-center text-xs font-semibold">
            <i className="ri-hotel-bed-line mr-1.5 text-[#2563EB]"></i>{" "}
            {room.amenities?.[0]}
          </span>
        </div>

        <Link
          to={`/booking/${room._id}`}
          className="block w-full text-center bg-[#2563EB] text-white py-4 rounded-xl font-bold hover:bg-[#1d4ed8] transition-all duration-300 shadow-lg shadow-blue-100 hover:shadow-blue-200"
        >
          Book Your Stay
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
