import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bed,
  Users,
  Expand,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchAllRooms } from "../../services/roomService";
import Loader from "../../components/common/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeaturedRooms = async () => {
      try {
        const data = await fetchAllRooms();
        setRooms(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching featured rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    getFeaturedRooms();
  }, []);

  if (loading)
    return (
      <div className="py-20">
        <Loader />
      </div>
    );
  if (rooms.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
            Our <span className="text-[#2563EB] italic">Featured</span> Rooms
          </h2>
        </div>

        <div className="relative group/slider">
          {/* Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute -left-2 lg:-left-12 top-[50%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 hover:text-[#2563EB] transition-all opacity-0 group-hover/slider:opacity-100">
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <button className="swiper-button-next-custom absolute -right-2 lg:-right-12 top-[50%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 hover:text-[#2563EB] transition-all opacity-0 group-hover/slider:opacity-100">
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-visible pb-12"
          >
            {rooms.map((room) => (
              <SwiperSlide key={room._id}>
                <div className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
                  <div className="relative h-[250px] overflow-hidden">
                    <img
                      src={
                        Array.isArray(room.images) ? room.images[0] : room.image
                      }
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-5 right-5 bg-white/95 px-4 py-2 rounded-2xl shadow-sm font-bold text-sm">
                      ${room.price || room.pricePerStay}{" "}
                      <span className="text-gray-400">/night</span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-[#2563EB] mb-2">
                      <Star size={14} className="fill-[#2563EB]" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {room.type || "Luxury"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-[#2563EB] transition-colors">
                      {room.name}
                    </h3>

                    {/* Room Details Grid */}
                    <div className="grid grid-cols-3 gap-2 py-5 border-y border-gray-50 mb-8">
                      <div className="flex flex-col items-center border-r border-gray-100">
                        <Users size={18} className="text-[#2563EB] mb-1" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          {room.guests || "2"} Guests
                        </span>
                      </div>
                      <div className="flex flex-col items-center border-r border-gray-100">
                        <Bed size={18} className="text-[#2563EB] mb-1" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          {room.bed || "King"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Expand size={18} className="text-[#2563EB] mb-1" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          {room.size || "450 sqft"}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/book-now?room=${room._id}`}
                      className="mt-auto w-full py-4 bg-[#2563EB] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#1d4ed8] transition-all group/btn shadow-lg shadow-blue-100"
                    >
                      Book Your Stay
                      <ArrowRight
                        size={18}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
