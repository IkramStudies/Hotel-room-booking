import { Link } from "react-router-dom";
import { Search, Star, Home, Calendar, BedDouble } from "lucide-react";

const Hero = () => {
  // Replace these with your actual 'x' and 'y' values
  const propertySettings = {
    totalRooms: 5,
    pricePerDay: 85,
  };

  return (
    <section className="relative bg-white pt-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Home size={16} />
            <span>Private Guest House Experience</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            The Comfort of Home. <br />
            <span className="text-blue-600 italic">The Luxury of a Hotel.</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl">
            Experience our exclusive residence featuring **
            {propertySettings.totalRooms} private rooms**. Enjoy a premium stay
            with daily booking options starting at just **$
            {propertySettings.pricePerDay}/day**.
          </p>

          {/* Quick Search Bar - Updated for Room/Day Logic */}
          <div className="mt-10 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-gray-100">
              <Calendar className="text-blue-600" size={20} />
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Check In
                </p>
                <input
                  type="text"
                  placeholder="Select Date"
                  className="text-sm outline-none w-full font-medium"
                />
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-gray-100">
              <BedDouble className="text-blue-600" size={20} />
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Room Type
                </p>
                <select className="text-sm outline-none w-full font-medium bg-transparent border-none p-0 cursor-pointer">
                  <option>Any Room</option>
                  <option>Master Suite</option>
                  <option>Garden View</option>
                </select>
              </div>
            </div>

            <Link
              to="/rooms"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Book Now
            </Link>
          </div>
        </div>

        {/* Right Content: Image with Experience Badge */}
        <div className="flex-1 relative">
          <div className="relative z-10">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
              alt="Boutique Guest House"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-2xl"
            />
            {/* Floating Info Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Star size={24} className="fill-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Starting at ${propertySettings.pricePerDay}/day
                  </p>
                  <p className="text-xs text-gray-500">
                    {propertySettings.totalRooms} Rooms Available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative background shape */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
