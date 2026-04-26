import { Link } from "react-router-dom";
import { Bed, Users, Expand, ArrowRight, Star } from "lucide-react";

const FeaturedRooms = () => {
  const rooms = [
    {
      id: 1,
      name: "Master Luxury Suite",
      type: "Primary Bedroom",
      price: 120,
      guests: 2,
      size: "350 sqft",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    },
    {
      id: 2,
      name: "Modern Garden Room",
      type: "Guest Room",
      price: 85,
      guests: 2,
      size: "240 sqft",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    },
    {
      id: 3,
      name: "Skyline Loft",
      type: "Private Loft",
      price: 95,
      guests: 1,
      size: "200 sqft",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:infinite-mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Our <span className="text-blue-600">Featured</span> Rooms
            </h2>
            <p className="text-gray-500 mt-2 md:mt-4 text-base md:text-lg">
              Experience premium comfort in our meticulously designed spaces.
            </p>
          </div>
          <Link
            to="/rooms"
            className="flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all duration-300 group text-sm md:text-base"
          >
            Explore All Rooms
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group flex flex-col bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-gray-100 transition-all hover:shadow-2xl md:hover:-translate-y-2"
            >
              {/* Image Container - Reduced height on mobile */}
              <div className="relative h-[220px] md:h-[300px] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-lg font-bold text-sm md:text-base">
                  ${room.price}
                  <span className="text-blue-100 font-normal text-xs md:text-sm">
                    /day
                  </span>
                </div>
              </div>

              {/* Content - Reduced padding on mobile */}
              <div className="p-5 md:p-8 flex flex-col flex-grow">
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center gap-2 text-blue-600 mb-1 md:mb-2">
                    <Star size={14} className="fill-blue-600" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      Top Rated Stay
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    {room.name}
                  </h3>
                </div>

                {/* Specs - More compact on mobile */}
                <div className="flex items-center justify-between mb-6 md:mb-8 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl">
                  <div className="flex flex-col items-center gap-1">
                    <Users size={16} className="text-blue-600" />
                    <span className="text-[10px] md:text-xs font-semibold text-gray-500">
                      {room.guests} Guests
                    </span>
                  </div>
                  <div className="w-[1px] h-6 md:h-8 bg-gray-200" />
                  <div className="flex flex-col items-center gap-1">
                    <Bed size={16} className="text-blue-600" />
                    <span className="text-[10px] md:text-xs font-semibold text-gray-500">
                      King Bed
                    </span>
                  </div>
                  <div className="w-[1px] h-6 md:h-8 bg-gray-200" />
                  <div className="flex flex-col items-center gap-1">
                    <Expand size={16} className="text-blue-600" />
                    <span className="text-[10px] md:text-xs font-semibold text-gray-500">
                      {room.size}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/rooms/${room.id}`}
                  className="mt-auto w-full text-center py-3 md:py-4 rounded-xl md:rounded-2xl bg-white border-2 border-blue-600 text-blue-600 font-bold transition-all hover:bg-blue-600 hover:text-white shadow-sm text-sm md:text-base"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
