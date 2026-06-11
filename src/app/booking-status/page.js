"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BackHeader from "./components/BackHeader";
import { apiRequest } from "@/utils/api";
import { getCookie } from "@/utils/customCookie";

export default function BookingStatusPage() {
	const [bookingData, setBookingData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBooking = async () => {
			try {
				const userId = getCookie("userId");
				const data = await apiRequest("/booking-status", "post", {
					userId: userId,
				});
				setBookingData(data);
			} catch (err) {
				console.error("Failed to fetch booking status:", err);
				setError("Could not load booking details.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchBooking();
	}, []);

	if (isLoading) {
		return (
			<main className="min-h-screen bg-gray-100 flex items-center justify-center">
				<p className="text-gray-500 font-medium">Loading booking details...</p>
			</main>
		);
	}

	if (error || !bookingData) {
		return (
			<main className="min-h-screen bg-gray-100 flex items-center justify-center">
				<p className="text-red-500 font-medium">{error || "No data found."}</p>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-gray-100">
			<BackHeader />

			<div className="max-w-xl mx-auto px-4 pb-8 pt-6 space-y-6">
				{/* UNIFIED WORKER & ACTION CARD */}
				<div className="bg-white rounded-2xl p-5 shadow-sm space-y-5">
					{/* Worker Info */}
					<div className="flex items-center gap-4">
						<div className="w-16 h-16 rounded-full overflow-hidden border bg-gray-50">
							<Image
								src={bookingData.avatar || "/images/default-avatar.jpg"} // Fallback image if undefined
								alt={bookingData.name || "Worker"}
								width={64}
								height={64}
								className="object-cover w-full h-full"
							/>
						</div>

						<div className="flex-1 min-w-0">
							<p className="text-lg font-semibold text-gray-800 truncate">
								{bookingData.name}
							</p>

							<div className="flex items-center gap-1 mt-1 text-sm">
								<span className="font-semibold text-gray-700">
									{bookingData.rating}
								</span>
								<svg
									className="w-4 h-4 text-yellow-400"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M12 17.3 7.2 20l1.1-5.3L4 12.2l5.4-.5L12 7l2.6 4.7 5.4.5-4.3 2.5L16.8 20z" />
								</svg>
							</div>
						</div>
					</div>

					{/* Price / Fare */}
					<div className="flex justify-between items-center py-3 border-t border-b border-gray-100">
						<span className="text-sm font-medium text-gray-500">
							Total Price
						</span>
						<span className="text-xl font-bold text-gray-800">
							₹{bookingData.price}
						</span>
					</div>

					{/* Action Button */}
					<button className="w-full px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition duration-200">
						Cancel Service
					</button>
				</div>
			</div>
		</main>
	);
}
