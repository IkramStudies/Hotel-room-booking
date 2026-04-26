import { ShieldCheck, Wifi, Clock, Heart, Home, Sparkles } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Home size={32} />,
      title: "Boutique Experience",
      description:
        "With only 6 designer rooms, we provide an intimate, quiet atmosphere that larger hotels simply can't match.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Secure & Private",
      description:
        "Advanced smart lock systems and 24/7 security ensure you feel safe and at home throughout your stay.",
    },
    {
      icon: <Sparkles size={32} />,
      title: "Premium Amenities",
      description:
        "From high-end linens to luxury toiletries, every detail is curated to ensure your stay is comfortable.",
    },
    {
      icon: <Wifi size={32} />,
      title: "Work-From-Home Ready",
      description:
        "Dedicated fiber-optic Wi-Fi in every room, perfect for digital nomads and business travelers.",
    },
    {
      icon: <Clock size={32} />,
      title: "Flexible Daily Booking",
      description:
        "Book your room day-by-day with no long-term commitment. Perfect for short trips or weekend getaways.",
    },
    {
      icon: <Heart size={32} />,
      title: "Personalized Service",
      description:
        "Our small-scale approach allows us to focus on the little details that make your stay special.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
            The StayEase Advantage
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Why Travelers Choose Our <br />{" "}
            <span className="text-primary">Private Residence</span>
          </h3>
          <p className="text-gray-500 mt-6 text-lg leading-relaxed">
            We’ve reimagined hospitality. By converting a premium home into a
            boutique stay, we offer the perfect balance of residential comfort
            and professional service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-brand border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <div className="text-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 bg-primary rounded-[3rem] p-10 py-4 md:p-12 flex flex-wrap justify-around items-center gap-8 text-white shadow-2xl shadow-blue-200">
          <div className="text-center">
            <p className="text-4xl font-black mb-1">4.9/5</p>
            <p className="text-blue-100 text-sm font-medium uppercase tracking-widest">
              Guest Rating
            </p>
          </div>

          <div className="w-[1px] h-12 bg-blue-400 hidden lg:block" />

          <div className="text-center">
            <p className="text-4xl font-black mb-1">6</p>
            <p className="text-blue-100 text-sm font-medium uppercase tracking-widest">
              Exclusive Rooms
            </p>
          </div>

          <div className="w-[1px] h-12 bg-blue-400 hidden lg:block" />

          <div className="text-center">
            <p className="text-4xl font-black mb-1">500+</p>
            <p className="text-blue-100 text-sm font-medium uppercase tracking-widest">
              Happy Stays
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
