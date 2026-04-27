const RoomCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="h-64 w-full bg-gray-200" />

      {/* Content Section */}
      <div className="p-6 flex flex-col">
        {/* Title Placeholder */}
        <div className="h-7 bg-gray-200 rounded-md w-3/4 mb-4" />

        {/* Description Placeholder */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
        </div>

        {/* Info Row Placeholder */}
        <div className="flex items-center mb-8 gap-5 border-t border-gray-100 pt-5">
          <div className="h-6 bg-[#EFF6FF] rounded-full w-20" />
          <div className="h-4 bg-gray-100 rounded w-24" />
        </div>

        {/* Button Placeholder */}
        <div className="h-14 bg-gray-200 rounded-xl w-full" />
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
