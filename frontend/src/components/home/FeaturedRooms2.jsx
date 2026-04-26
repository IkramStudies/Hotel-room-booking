import { Link } from "react-router-dom";
import { Users, Bed, Expand, ArrowRight } from "lucide-react";

const rooms = [
  {
    id: 1,
    name: "Master Luxury Suite",
    type: "Primary Bedroom",
    price: 120,
    guests: 2,
    bed: "King bed",
    size: "350 sqft",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
  },
  {
    id: 2,
    name: "Modern Garden Room",
    type: "Guest Room",
    price: 85,
    guests: 2,
    bed: "King bed",
    size: "240 sqft",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
  },
  {
    id: 3,
    name: "Skyline Loft",
    type: "Private Loft",
    price: 95,
    guests: 1,
    bed: "Queen bed",
    size: "200 sqft",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
  },
];

const FeaturedRooms2 = () => {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <section
        className="py-14 px-8 bg-[#f5f2ec]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-[#8a7d6b] font-medium mb-2">
                Handpicked for you
              </p>
              <h2
                className="text-[42px] md:text-[50px] font-light leading-[1.05] text-[#1c2b1a]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Our <em className="italic text-[#3d6b35]">Featured</em>
                <br />
                Rooms
              </h2>
            </div>

            <Link
              to="/rooms"
              className="flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase font-medium text-[#3d6b35] border-b border-[#3d6b35] pb-0.5 hover:text-[#1c2b1a] hover:border-[#1c2b1a] transition-colors duration-150"
            >
              Explore all rooms
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group flex flex-col bg-white rounded-[18px] overflow-hidden border border-[#e0d9ce] transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Room type pill */}
                  <span className="absolute top-3.5 left-3.5 bg-[#f5f2ec]/90 text-[#3d6b35] text-[10px] tracking-[0.1em] uppercase font-medium px-3 py-1.5 rounded-full">
                    {room.type}
                  </span>

                  {/* Price badge */}
                  <div className="absolute bottom-3.5 right-3.5 bg-[#1c2b1a] px-3.5 py-2 rounded-[10px] text-right">
                    <div
                      className="text-[#f5f2ec] text-[22px] leading-none font-semibold"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ${room.price}
                    </div>
                    <div className="text-[#8a9e86] text-[10px] tracking-wide mt-0.5">
                      per night
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-3.5 flex-1">
                  <h3
                    className="text-[22px] font-normal text-[#1c2b1a] leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {room.name}
                  </h3>

                  {/* Specs row */}
                  <div className="flex bg-[#f5f2ec] rounded-[10px] overflow-hidden">
                    {[
                      {
                        icon: <Users size={15} className="text-[#3d6b35]" />,
                        label: `${room.guests} guests`,
                      },
                      {
                        icon: <Bed size={15} className="text-[#3d6b35]" />,
                        label: room.bed,
                      },
                      {
                        icon: <Expand size={15} className="text-[#3d6b35]" />,
                        label: room.size,
                      },
                    ].map((spec, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-1 py-2.5 px-1 border-r border-[#e0d9ce] last:border-r-0"
                      >
                        {spec.icon}
                        <span className="text-[11px] text-[#6b6057]">
                          {spec.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/rooms/${room.id}`}
                    className="mt-auto block text-center py-2.5 rounded-[10px] border border-[#1c2b1a] text-[#1c2b1a] text-[11px] tracking-[0.07em] uppercase font-medium transition-colors duration-150 hover:bg-[#1c2b1a] hover:text-[#f5f2ec]"
                  >
                    Book now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedRooms2;
