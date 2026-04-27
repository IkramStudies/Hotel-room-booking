import React from "react";
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
import { roomsData } from "../../data/rooms";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedRooms = () => {
  return (
    <section className="py-16 md:py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
            Our <span className="text-[#2563EB] italic">Featured</span> Rooms
          </h2>
          <p className="text-gray-500 mt-4 text-base md:text-lg">
            Explore our handpicked selection of premium suites designed for
            ultimate comfort.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative group/slider">
          {/* ✅ Updated Arrows: Adjusted 'top' position to align with the image height (approx 250px-300px) */}
          <button className="swiper-button-prev-custom absolute -left-2 lg:-left-12 top-[235px] md:top-[150px] -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#2563EB] hover:border-[#2563EB] transition-all shadow-xl hover:scale-110 active:scale-95 md:opacity-0 group-hover/slider:opacity-100">
            <ChevronLeft
              size={24}
              className="md:w-7 md:h-7"
              strokeWidth={2.5}
            />
          </button>

          <button className="swiper-button-next-custom absolute -right-2 lg:-right-12 top-[235px] md:top-[150px] -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#2563EB] hover:border-[#2563EB] transition-all shadow-xl hover:scale-110 active:scale-95 md:opacity-0 group-hover/slider:opacity-100">
            <ChevronRight
              size={24}
              className="md:w-7 md:h-7"
              strokeWidth={2.5}
            />
          </button>

          {/* Swiper Component */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="!overflow-visible pb-12"
          >
            {roomsData.map((room) => (
              <SwiperSlide key={room.id}>
                <div className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
                  {/* Image Area (Height is 250px on mobile, 300px on desktop) */}
                  <div className="relative h-[250px] md:h-[300px] overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-2xl shadow-sm font-bold text-sm">
                      ${room.price}
                      <span className="text-gray-400 font-medium">/night</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-[#2563EB] mb-2">
                      <Star size={14} className="fill-[#2563EB]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                        {room.type}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#2563EB] transition-colors">
                      {room.name}
                    </h3>

                    {/* Specs Bar */}
                    <div className="grid grid-cols-3 gap-2 py-5 border-t border-b border-gray-50 mb-8">
                      <div className="flex flex-col items-center border-r border-gray-100">
                        <Users size={18} className="text-[#2563EB] mb-1" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase text-center">
                          {room.guests} Guests
                        </span>
                      </div>
                      <div className="flex flex-col items-center border-r border-gray-100">
                        <Bed size={18} className="text-[#2563EB] mb-1" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase text-center">
                          {room.bed}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Expand size={18} className="text-[#2563EB] mb-1" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase text-center">
                          {room.size}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/book-now?room=${room.id}`}
                      className="mt-auto w-full py-4 bg-[#2563EB] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#1d4ed8] transition-all duration-300 group/btn shadow-lg shadow-blue-100 hover:shadow-blue-200"
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
