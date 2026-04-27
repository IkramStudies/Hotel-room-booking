import React from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Business Traveler",
      image: "https://i.pravatar.cc/150?u=sarah",
      text: "I've stayed in dozens of hotels, but this house-hotel is something special. The Wi-Fi is incredibly fast, and it feels like a home rather than a cold lobby.",
      rating: 5,
    },
    {
      id: 2,
      name: "Mark Thompson",
      role: "Weekend Guest",
      image: "https://i.pravatar.cc/150?u=mark",
      text: "The privacy here is unmatched. With only 6 rooms, I never felt crowded. The shared lounge area is beautiful, and the room design is impeccable.",
      rating: 5,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Digital Nomad",
      image: "https://i.pravatar.cc/150?u=elena",
      text: "Booking room-by-room is so convenient. I stayed for a week while working remotely, and the atmosphere was perfectly peaceful. I'll definitely be back!",
      rating: 5,
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Solo Traveler",
      // Updated to a professional corporate/traveler headshot
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
      text: "The smart lock system made check-in a breeze. It's rare to find a place that is this secure yet feels so welcoming and residential.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-[#2563EB] font-bold tracking-widest uppercase text-sm mb-4">
              Guest Experiences
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              What Our <span className="text-[#2563EB]">Guests</span> Say
            </h3>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-4 bg-blue-50/50 px-6 py-4 rounded-3xl border border-blue-100">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 15}`}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  alt="guest"
                />
              ))}
            </div>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm font-bold text-gray-900">
                4.9/5 Average Rating
              </p>
            </div>
          </div>
        </div>

        {/* Swiper Slider Wrapper */}
        <div className="relative group/testimonials">
          {/* Custom Side Navigation Arrows */}
          <button className="testimonial-prev absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#2563EB] hover:border-[#2563EB] transition-all shadow-xl hover:scale-110 active:scale-95 opacity-0 group-hover/testimonials:opacity-100 hidden md:flex">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>

          <button className="testimonial-next absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#2563EB] hover:border-[#2563EB] transition-all shadow-xl hover:scale-110 active:scale-95 opacity-0 group-hover/testimonials:opacity-100 hidden md:flex">
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: ".testimonial-next",
              prevEl: ".testimonial-prev",
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="relative bg-white p-8 rounded-[2rem] border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group/card">
                  <div className="absolute top-6 right-8 text-blue-50 group-hover/card:text-blue-100 transition-colors">
                    <Quote size={48} fill="currentColor" />
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-8 relative z-10 italic flex-grow">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500 font-medium">
                          {review.role}
                        </p>
                        <span className="w-1 h-1 bg-blue-300 rounded-full" />
                        <span className="text-[10px] uppercase font-bold text-[#2563EB] tracking-wider">
                          Verified Guest
                        </span>
                      </div>
                    </div>
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

export default Testimonials;
