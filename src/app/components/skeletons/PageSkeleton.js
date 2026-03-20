import ListSkeleton from "./ListSkeleton";

export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-pulse">
      {/* Header/Tabs Placeholder */}
      <div className="px-4 py-4 space-y-4 bg-white shadow-sm mb-6">
        <div className="flex gap-2 overflow-x-hidden">
          <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-16 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="px-4">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <ListSkeleton count={6} />
      </div>
    </div>
  );
}
