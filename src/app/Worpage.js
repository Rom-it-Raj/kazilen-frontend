"use client";

import { useQuery } from "@tanstack/react-query";
import CategoryTabs from "./components/CategoryTabs";
import SubCategoryTabs from "./components/SubCategoryTabs";
import ProfessionalCard from "./components/PC";
import { fetchServices } from "../lib/api";
import ListSkeleton from "./components/skeletons/ListSkeleton";

export default function Page() {
  const { data: pros, isLoading, isError, error } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices(),
  });

  return (
    <main className="p-4 min-h-screen bg-gray-50 pb-20">
      <h1 className="text-2xl font-bold mb-4">Pro Records</h1>
      
      {isLoading ? (
        <ListSkeleton count={6} />
      ) : isError ? (
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">
          Error loading pros: {error.message}. Please try again.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pros?.length > 0 ? (
            pros.map((record, index) => (
              <ProfessionalCard key={record.id || index} pro={record} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full py-10">No records found.</p>
          )}
        </div>
      )}
    </main>
  );
}
