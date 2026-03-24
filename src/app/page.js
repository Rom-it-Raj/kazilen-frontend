'use client'

"use client";

import { Suspense } from "react";
import CategoryTabs from "./components/CategoryTabs";
import SubCategoryTabs from "./components/SubCategoryTabs";
import ProfessionalCard from "./components/ProfessionalCard";
import { useFilterSync } from "../hooks/useFilterSync";
import { useScrollRestore } from "../hooks/useScrollRestore";
import PageSkeleton from "./components/skeletons/PageSkeleton";

function HomeContent() {
  const { category, setCategory, subCategory, setSubCategory } = useFilterSync();
  useScrollRestore();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Category */}
      <CategoryTabs
        value={category}
        onChange={(val) => {
          setCategory(val);
          setSubCategory('');
        }}
      />

      {/* Sub Category */}
      {category && (
        <SubCategoryTabs
          value={subCategory}
          onChange={setSubCategory}
        />
      )}

      {/* Placeholder UI (pure frontend) */}
      <section className="px-4 mt-6 text-center text-gray-500">
        {category && !subCategory && 'Select a sub-category'}
        {subCategory && (
          <ProfessionalCard
            professional={{
              name: 'Demo Electrician',
              skill: subCategory,
              price: 250,
            }}
          />
        )}
      </section>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
