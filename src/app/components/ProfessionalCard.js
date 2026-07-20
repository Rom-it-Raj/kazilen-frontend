"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, X } from "lucide-react";
import { getCookie } from "@/utils/customCookie";
import { apiRequest } from "@/utils/api";

export default function ProfessionalCard({ professional, subCategory }) {
	const [showConfirm, setShowConfirm] = useState(false);
	const [showProfile, setShowProfile] = useState(false);
	const [isBooking, setIsBooking] = useState(false);
	const [userId, setUserId] = useState("");
	const price = professional.sub_categories?.price || 120;
	const details = professional.sub_categories?.details || "";

	useEffect(() => {
		const startupReady = async () => {
			const user_id = await getCookie("userId");
			setUserId(user_id);
		};
		startupReady();
	}, [setUserId]);

	const confirmBooking = async () => {
		if (!userId) {
			console.log("yo no bud");
			return;
		}
		try {
			setIsBooking(true);
			const res = await apiRequest("/requestBooking", "post", {
				worker: professional.id,
				customer: userId,
				action: subCategory,
			});
		} catch (error) {
			console.log("error in booking", error);
		} finally {
			setIsBooking(false);
		}
	};

	return (
		<div className="w-full relative">
			<div className="flex items-start gap-4 border rounded-2xl p-4 shadow-sm bg-white mb-3">
				<div className="flex flex-col flex-1">
					<div className="flex justify-between items-start">
						<h3 className="text-base font-semibold text-gray-800">
							{professional.name}
						</h3>
						<div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
							<Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
							<span className="ml-1 text-sm font-medium text-gray-700">
								{professional.rating}
							</span>
						</div>
					</div>

					<p className="text-sm text-gray-600 mt-2">
						{professional.description}
					</p>

					<div className="flex justify-between items-end mt-3 gap-2">
						<button
							onClick={() => setShowProfile(true)}
							className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 text-gray-700"
						>
							View Profile
						</button>
						<div className="flex flex-col items-end">
							<p className="text-sm font-semibold text-pink-600">
								₹{price} / hour
							</p>
							<button
								onClick={() => setShowConfirm(true)}
								className="mt-1 px-3 py-1.5 text-sm rounded-lg bg-pink-500 text-white"
							>
								Book Now
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Confirm Booking Popup */}
			{showConfirm && (
				<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
					<div className="bg-white w-[90%] max-w-sm rounded-2xl p-6">
						<h3 className="text-lg font-semibold text-center">
							Confirm Booking
						</h3>
						<p className="text-sm text-gray-600 mt-3 text-center">
							Book {professional.name} for{" "}
							<span className="font-semibold text-pink-600">₹{price}</span>?
						</p>
						<div className="flex gap-3 mt-6">
							<button
								onClick={() => setShowConfirm(false)}
								className="flex-1 py-2 rounded-lg bg-gray-200"
							>
								Cancel
							</button>
							<button
								onClick={confirmBooking}
								className="flex-1 py-2 rounded-lg bg-pink-500 text-white"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Profile Popup */}
			{showProfile && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
					<div className="bg-white rounded-2xl w-[90%] max-w-md p-6 relative">
						<button
							onClick={() => setShowProfile(false)}
							className="absolute top-3 right-3"
						>
							<X className="w-5 h-5" />
						</button>
						<h2 className="text-lg font-semibold">{professional.name}</h2>
						<div className="mt-4 text-sm text-gray-600 space-y-2">
							<p>{professional.description}</p>
							<p>
								<b>Address:</b> {professional.address}
							</p>
							<p>
								<b>Phone:</b> {professional.phoneNo}
							</p>
							<p>
								<b>Service:</b> {subCategory}
							</p>
							<p>
								<b>Details:</b> {details}
							</p>
							<p>
								<b>Price:</b> ₹{price} / hour
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
