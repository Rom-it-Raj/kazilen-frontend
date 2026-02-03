"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackHeader from "../components/BackHeader"; // keep this relative path if this file exists
import { apiRequest } from "@/utils/api";

export default function UserProfilePage() {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [userId, setUserId] = useState(null);

	// form state
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState(""); // yyyy-mm-dd
	const [gender, setGender] = useState(""); // MALE/FEMALE/OTHER

	useEffect(() => {
		async function load() {
			try {
				setLoading(true);

				const savedUserString = localStorage.getItem("user");

				if (!savedUserString) {
					router.push("/login");
					return; // Stop execution
				}

				const userData = JSON.parse(savedUserString);

				setName(userData.name || "");
				setEmail(userData.email || "");
				setDob(userData.dob || "");
				setGender(userData.gender || "");
				setPhone(userData.phoneNo || ""); // Match your Django model field name
			} catch (err) {
				console.error("Failed to load user from storage:", err);
				localStorage.removeItem("user"); // Clear corrupted data
				router.push("/login");
			} finally {
				setLoading(false);
			}
		}

		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSave = async () => {
		if (!userId) {
			alert("No user id found. Please re-login.");
			router.push("/login");
			return;
		}
		if (!name.trim() || !dob || !gender) {
			alert("Please fill name, date of birth and gender.");
			return;
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-gray-600">Loading profile…</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<BackHeader />

			<div className="p-4 space-y-4">
				<h2 className="text-lg font-semibold">Your profile</h2>

				{/* Phone (readonly) */}
				<div>
					<label className="text-xs text-gray-500">Phone</label>
					<input
						type="tel"
						value={phone}
						readOnly
						className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 text-sm"
					/>
				</div>

				{/* Name */}
				<div>
					<label className="text-xs text-gray-500">Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
						placeholder="Your full name"
					/>
				</div>

				{/* Email */}
				<div>
					<label className="text-xs text-gray-500">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
						placeholder="you@example.com (optional)"
					/>
				</div>

				{/* DOB */}
				<div>
					<label className="text-xs text-gray-500">Date of birth</label>
					<input
						type="date"
						value={dob}
						onChange={(e) => setDob(e.target.value)}
						className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
					/>
				</div>

				{/* Gender */}
				<div>
					<label className="text-xs text-gray-500">Gender</label>
					<select
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
					>
						<option value="">Select</option>
						<option value="MALE">Male</option>
						<option value="FEMALE">Female</option>
						<option value="OTHER">Other</option>
					</select>
				</div>

				<div className="pt-2">
					<button
						onClick={handleSave}
						disabled={saving}
						className={`w-full py-3 rounded-xl font-medium ${saving
								? "bg-gray-300 text-gray-700 cursor-not-allowed"
								: "bg-yellow-400 hover:bg-yellow-500 text-black"
							}`}
					>
						{saving ? "Saving…" : "Save changes"}
					</button>
				</div>
			</div>
		</div>
	);
}
