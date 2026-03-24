export default function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-40 bg-gray-200"></div>
      
      {/* Content Placeholder */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        {/* Subtitle/Skill */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        
        {/* Price & Action */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
        </div>
      </div>
    </div>
  );
}
