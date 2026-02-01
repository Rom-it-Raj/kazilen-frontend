"use client";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "../../utils/api";

export default function CreateAccountPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// 1. Initialize phone from search params
	const [phoneNo, setPhone] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [touched, setTouched] = useState({});
	const [loading, setLoading] = useState(false);

	// Effect to grab the phone number from the URL /create-account?phone=1234567890
	useEffect(() => {
		const p = searchParams?.get("phone");
		if (p) setPhone(p);
	}, [searchParams]);

	const canSubmit = Boolean(
		name.trim() && dob && gender && /^\d{10}$/.test(phoneNo),
	);

	const handleCreateAccount = async () => {
		if (!canSubmit) {
			setTouched({ name: true, dob: true, gender: true });
			alert(
				"Please fill Name, Date of Birth, Gender and ensure a valid phone number is present.",
			);
			return;
		}

		try {
			setLoading(true);
			const genderMap = { "Male": "M", "Female": "F", "Other": "O" };
			const genderEnum = genderMap[gender.toLowerCase()] || "O";

			const payload = {
				'phoneNo': `+91${phoneNo}`, // Django field name 'phone'
				'name': name.trim(),
				'email': email,
				'dob': dob,
				'gender': genderEnum,
			};

			// 2. Call Django Backend
			const created = await apiRequest("/create-account", "POST", payload);

			// 3. Handle Success
			if (created?.id) {
				// Save only the canonical userId
				localStorage.setItem("userId", String(created.id));
			}

			alert("Account created successfully!");
			router.replace("/");
		} catch (err) {
			alert(`Create failed: ${err?.message || "Something went wrong"}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Top bar */}
			<div className="flex items-center gap-3 p-4 shadow-sm border-b">
				<button onClick={() => router.back()} className="text-gray-700">
					<ArrowLeft size={20} />
				</button>
				<h1 className="text-lg font-semibold text-gray-800">
					Create your profile
				</h1>
			</div>

			{/* Phone (Read-only display) */}
			<div className="px-4 mt-4">
				<fieldset className="relative border border-gray-200 bg-gray-50 rounded-lg px-3 pt-4 pb-2">
					<legend className="text-xs px-1 text-gray-500">Phone</legend>
					<input
						type="tel"
						value={phoneNo}
						readOnly
						className="w-full border-none bg-transparent p-0 text-sm text-gray-500 focus:outline-none cursor-not-allowed"
					/>
				</fieldset>
				{!/^\d{10}$/.test(phoneNo) && (
					<p className="text-xs text-red-500 mt-1">
						Phone number missing. Please go back.
					</p>
				)}
			</div>

			{/* Name */}
			<div className="px-4 mt-6">
				<fieldset
					className={`relative border rounded-lg px-3 pt-4 pb-2 ${touched.name && !name.trim() ? "border-red-400" : "border-gray-300"}`}
				>
					<legend className="text-xs px-1 text-gray-500">Name *</legend>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						onBlur={() => setTouched((t) => ({ ...t, name: true }))}
						placeholder="Enter your full name"
						className="w-full border-none bg-transparent p-0 text-sm text-black focus:outline-none"
					/>
				</fieldset>
			</div>

			{/* Email */}
			<div className="px-4 mt-4">
				<fieldset className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2">
					<legend className="text-xs px-1 text-gray-500">
						Email (optional)
					</legend>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="w-full border-none bg-transparent p-0 text-sm text-black focus:outline-none"
					/>
				</fieldset>
			</div>

			{/* DOB */}
			<div className="px-4 mt-4">
				<fieldset
					className={`relative border rounded-lg px-3 pt-4 pb-2 ${touched.dob && !dob ? "border-red-400" : "border-gray-300"}`}
				>
					<legend className="text-xs px-1 text-gray-500">
						Date of birth *
					</legend>
					<input
						type="date"
						value={dob}
						onChange={(e) => setDob(e.target.value)}
						onBlur={() => setTouched((t) => ({ ...t, dob: true }))}
						className="w-full border-none bg-transparent p-0 text-sm text-black focus:outline-none"
					/>
				</fieldset>
			</div>

			{/* Gender */}
			<div className="px-4 mt-4 mb-6">
				<fieldset
					className={`relative border rounded-lg px-3 pt-4 pb-2 ${touched.gender && !gender ? "border-red-400" : "border-gray-300"}`}
				>
					<legend className="text-xs px-1 text-gray-500">Gender *</legend>
					<select
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						onBlur={() => setTouched((t) => ({ ...t, gender: true }))}
						className="w-full border-none bg-transparent text-sm text-black focus:outline-none"
					>
						<option value="" disabled>
							Select gender
						</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</fieldset>
			</div>

			{/* Submit */}
			<div className="px-4 pb-6">
				<button
					onClick={handleCreateAccount}
					disabled={!canSubmit || loading}
					className={`w-full py-3 rounded-xl font-bold transition ${canSubmit && !loading
							? "bg-yellow-400 hover:bg-yellow-500 text-black"
							: "bg-gray-200 text-gray-500 cursor-not-allowed"
						}`}
				>
					{loading ? "Creating Account..." : "Create Account"}
				</button>
			</div>
		</div>
	);
}
