"use client";
import { useEffect, useState } from "react";
import CategoryTabs from "./components/CategoryTabs";
import SubCategoryTabs from "./components/SubCategoryTabs";
import ProfessionalCard from "./components/ProfessionalCard";

const BASE_URL = "http://localhost:8000/api/worker"

const categories = {
	"Vehicle repair": "vehicle",
	"Healthcare": "health",
	"Carpenter": "carpenter",
	"Electrician": "electrician",
	"Appliance repair": "appliance",
	"Home Cleaning": "home",
};

function advUrl(filter){
	if (filter == ""){
		return "";
	}else{
		return "JP&"+categories[filter];
	}
}

async function getPros(filter){
	const ADV_URL = advUrl(filter); 
	const API_URL = BASE_URL + ADV_URL;
	try{
		const response = await fetch(API_URL, {});
		if (!response.ok){
			throw new Error(`failed to fetch ${response.status} ${response.statusText}`);
		}
		const res = await response.json();
		return res;
	} catch (error){
		return [];
	}
}

export default function HomePage() {
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [pros, setPros] = useState([]);

	useEffect(() => {
		if (!category) return;
		const run = async () => {
			setLoading(true);
			setError("");
			try {
				const data = await getPros(category);
				setPros(data);
			} catch (e) {
				setError(e.message || "Failed to load data");
				setPros([]);
			} finally {
				setLoading(false);
			}
		};

		run();
	}, [category, subCategory]);

	return (
		<main className="min-h-screen bg-gray-50 pb-20">
			{/* Category Tabs */}
			<CategoryTabs
				value={category}
				onChange={(val) => {
					setCategory(val);
					setSubCategory("");
				}}
			/>

			{/* SubCategory Tabs */}
			{category && (
				<SubCategoryTabs
					value={subCategory}
					onChange={(val) => setSubCategory(val)}
				/>
			)}

			{/* Professionals List */}
			<section className="px-4 mt-6">
				{loading && (
					<p className="text-center text-gray-500">Loading professionals...</p>
				)}
				{error && <p className="text-center text-red-500">{error}</p>}

				{!loading && pros.length === 0 && !error && (
					<p className="text-center text-gray-500 mt-6">
						No professionals available in this category.
					</p>
				)}

				{/* Only one card per row (centered) */}
				<div className="flex flex-col items-center gap-6 mt-4">
					{ pros.length > 0 ? (
						pros.map((proData) => (
					<ProfessionalCard key={proData.id} professional={proData} />
					))
					) : (
						<p>No record from api </p>
					)}
				</div>
			</section>
		</main>
	);
}
