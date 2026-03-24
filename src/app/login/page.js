"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../utils/api";
import TermsOfCondition from "./TermsOfCondition";

export default function LoginPage() {
	const router = useRouter();
	const [phone, setPhone] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [acceptedTerms, setAcceptedTerms] = useState(false);

	const handleContinue = async () => {
		if (!acceptedTerms) {
			alert("Please accept Terms of Condition");
			return;
		}

		if (!/^\d{10}$/.test(phone)) {
			alert("Please enter a valid 10-digit mobile number");
			return;
		}

		try {
			setLoading(true);

			const fphone = `91${phone}`;

			await apiRequest("/send-otp", "POST", { phone: fphone });

			router.push(`/verify?phone=${encodeURIComponent(phone)}`);
		} catch (e) {
			alert(`Failed to check phone: ${e?.message ?? e}`);
		} finally {
			setLoading(false);
		}
	};

	const handlePhoneInput = (e) => {
		const digitsOnly = e.target.value.replace(/\D/g, "");
		if (digitsOnly.length <= 10) setPhone(digitsOnly);
	};

	const handleCreate = async () => {
		if (!acceptedTerms) {
			alert("Please accept Terms of Condition");
			return;
		}
		try {
			setLoading(true);
			const fphone = `91${phone}`;
			await apiRequest("/customer/send-otp", "POST", { phone: fphone });
			router.push(
				`/verify?phone=${encodeURIComponent(phone)}`,
			);
		} catch (e) {
			alert(`Failed to check phone: ${e?.message ?? e}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center px-6 bg-white relative">
			<h1 className="text-3xl font-bold mb-2">Kazilen</h1>

			<div className="mt-4 w-full max-w-sm">
				<p className="text-sm font-semibold text-black mb-4">
					Login <span className="text-gray-600">or Create Account</span>
				</p>

				<label className="block text-sm text-black mb-1">
					Enter mobile number
				</label>

				<input
					type="tel"
					inputMode="numeric"
					pattern="\d*"
					placeholder="9876543210"
					value={phone}
					onChange={handlePhoneInput}
					className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm mb-4"
				/>

				<button
					onClick={handleContinue}
					disabled={loading || !acceptedTerms}
					className={`w-full bg-yellow-400 text-black font-semibold py-3 rounded-xl
  ${loading || !acceptedTerms ? "cursor-not-allowed opacity-70" : "hover:bg-yellow-500"}
  transition`}
				>
					{loading ? "Checking…" : "Continue"}
				</button>
			</div>

			{/* Shortcut buttons */}
			<div className="mt-6 w-full max-w-sm flex gap-3">
				<button
					onClick={() => router.push("/")}
					className="w-1/2 border border-gray-400 py-2 rounded-xl font-medium hover:bg-gray-100"
				>
					Login → Home
				</button>

				<button
					onClick={handleCreate}
					className="w-1/2 border border-gray-400 py-2 rounded-xl font-medium hover:bg-gray-100"
				>
					Create Account
				</button>
			</div>

			{/* Terms checkbox */}
			<div className="flex items-start gap-2 mt-4 max-w-sm">
				<input
					type="checkbox"
					id="terms"
					checked={acceptedTerms}
					onChange={(e) => setAcceptedTerms(e.target.checked)}
					className="mt-1 h-4 w-4 accent-yellow-500 cursor-pointer"
				/>

				<label
					htmlFor="terms"
					className="text-[11px] text-gray-600 leading-snug"
				>
					I agree to the{" "}
					<button
						type="button"
						onClick={() => setShowModal(true)}
						className="text-blue-600 underline"
					>
						Terms of Conditions.
					</button>
				</label>
			</div>

			<TermsOfCondition open={showModal} onClose={() => setShowModal(false)} />
		</div>
	);
}
