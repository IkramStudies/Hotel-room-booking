import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Container - Fixed height is crucial */}
      <div className="relative h-64 w-full bg-gray-200">
        <img
          src={room.images && room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover block"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300?text=Image+Not+Found";
          }}
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-sm">
          ${room.pricePerNight}/night
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {room.description}
        </p>

        <div className="flex items-center text-gray-600 text-sm mb-6 gap-4">
          <span className="flex items-center">
            <i className="ri-user-line mr-1"></i> {room.category}
          </span>
        </div>

        <Link
          to={`/booking/${room._id}`}
          className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
