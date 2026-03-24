"use client";

import { useState, useEffect } from "react";
import CategoryTabs from "./components/CategoryTabs";
import SubCategoryTabs from "./components/SubCategoryTabs";
import ProfessionalCard from "./components/ProfessionalCard";
import { apiRequest } from "@/utils/api";

export default function HomePage() {
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");

	const [workers, setWorkers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchWorkers() {
			if (!subCategory) {
				setWorkers([]);
				return;
			}

			setIsLoading(true);
			try {
				const response = await apiRequest(`/filterworker?category=${subCategory}`);
				setWorkers(response);
			} catch (error) {
				console.error("Failed to fetch workers:", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchWorkers();
	}, [subCategory]);

	return (
		<main className="min-h-screen bg-gray-50 pb-20">
			{/* Category */}
			<CategoryTabs
				value={category}
				onChange={(val) => {
					setCategory(val);
					setSubCategory("");
				}}
			/>

			{/* Sub Category */}
			{category && (
				<SubCategoryTabs value={subCategory} onChange={setSubCategory} />
			)}

			{/* Placeholder UI (pure frontend) */}
			<section className="px-4 mt-6 text-center text-gray-500">
				{category && !subCategory && "Select a sub-category"}
				<div className="space-y-4">
					{workers.map((worker) => (
						<ProfessionalCard key={worker.id} professional={worker} />
					))}
				</div>
			</section>
		</main>
	);
}
