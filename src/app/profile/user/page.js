"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackHeader from "../components/BackHeader";
import { getCookie } from "@/utils/customCookie";
import { apiRequest } from "@/utils/api";


export default function UserProfilePage() {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [userId, setUserId] = useState(null);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	useEffect(() => {
		async function load() {
			try {
				setLoading(true);

				const savedId = getCookie("userId");
				const sessionToken = getCookie("session_token");
				console.log(savedId, sessionToken)
				
				if (savedId && sessionToken) {
					setUserId(savedId);
					await fetchAndPopulate(savedId);
				} else {
					router.push("/login");
				}
			} catch (err) {
				console.error("Failed to load user:", err);
				alert("Failed to load profile. Please try again.");
				router.push("/login");
			} finally {
				setLoading(false);
			}
		}

		load();
	}, [router]);

	async function fetchAndPopulate(id) {
		const res = await apiRequest("/get-profile", "post", { userId: id });

		const data = res?.data || res;

		if (!data) {
			throw new Error("User not found");
		}

		setName(data.name ?? "");
		setEmail(data.email ?? "");
		setGender(data.gender ?? "");
		setAddress(data.address ?? "");
		setPhone(data.phoneNo ?? "");
	}

	const handleSave = async () => {
		if (!userId) {
			alert("No user id found. Please re-login.");
			router.push("/login");
			return;
		}
		if (!name.trim() || !gender || !address.trim()) {
			alert("Please fill name, gender, and address.");
			return;
		}

		try {
			setSaving(true);
			const payload = {
				userId,
				name: name.trim(),
				email: email || null,
				gender: gender ? gender.toUpperCase() : null,
				address: address.trim(),
			};

			const res = await apiRequest("profile", "post", payload);
			const updated = res?.data || res;

			alert("Profile updated successfully.");
			if (updated) {
				setName(updated.name ?? name);
				setEmail(updated.email ?? email);
				setGender(updated.gender ?? gender);
				setAddress(updated.address ?? address);
			}
		} catch (err) {
			console.error(err);
			const msg = err?.message || "Update failed";
			alert(`Update failed: ${msg}`);
		} finally {
			setSaving(false);
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
				{/* Phone */}
				<div>
					<label className="text-xs text-gray-500">Phone Number</label>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
						placeholder="Your phone number"
					/>
				</div>
				{/* Address */}
				<div>
					<label className="text-xs text-gray-500">Address</label>
					<textarea
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
						placeholder="Your residential address"
						rows={3}
					/>
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
