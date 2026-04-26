import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
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
      image: "https://i.pravatar.cc/150?u=james",
      text: "The smart lock system made check-in a breeze. It's rare to find a place that is this secure yet feels so welcoming and residential.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Guest Experiences
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              What Our <span className="text-primary">Guests</span> Say
            </h3>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-4 bg-primary-light px-6 py-4 rounded-3xl border border-blue-100">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
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

        {/* Swiper Slider */}
        <div className="testimonial-slider-container relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16" // Space for pagination dots
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="relative bg-surface p-8 rounded-brand border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-xl group">
                  <div className="absolute top-6 right-8 text-blue-100 group-hover:text-blue-200 transition-colors">
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

                  <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
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
                        <span className="w-1 h-1 bg-blue-400 rounded-full" />
                        <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
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

      {/* Optional: Global Swiper Overrides for your Blue Theme */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #2563eb !important; /* Your Primary Blue */
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
