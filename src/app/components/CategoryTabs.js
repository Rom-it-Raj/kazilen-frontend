"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const categories = [
	{ name: "Vehicle repair", image: "/categories/Vehicle repair.png" },
	{ name: "Healthcare", image: "/categories/Healthcare.png" },
	{ name: "Carpenter", image: "/categories/Carpanter repair or install.png" },
	{ name: "Electrician", image: "/categories/Electrician service.png" },
	{ name: "Appliance repair", image: "/categories/Appliances repair.png" },
	{ name: "Home Cleaning", image: "/categories/Home cleaning.png" },
];

export default function CategoryTabs({ value = "", onChange }) {
	const [active, setActive] = useState(value);
	const [stuck, setStuck] = useState(false);
	const barRef = useRef(null);

	useEffect(() => setActive(value), [value]);

	useEffect(() => {
		if (!barRef.current) return;
		const el = barRef.current;

		const io = new IntersectionObserver(
			([entry]) => setStuck(!entry.isIntersecting),
			{ rootMargin: "-1px 0px 0px 0px", threshold: [1] },
		);

		const sentinel = document.createElement("div");
		sentinel.style.position = "absolute";
		sentinel.style.top = "-1px";
		sentinel.style.height = "1px";
		sentinel.style.width = "1px";
		el.prepend(sentinel);
		io.observe(sentinel);

		return () => {
			io.disconnect();
			sentinel.remove();
		};
	}, []);

	const handleClick = (name) => {
		setActive(name);
		onChange?.(name);
	};

	return (
		<div
			ref={barRef}
			className={[
				"sticky top-0 z-40",
				"bg-white supports-[backdrop-filter]:bg-white/80 backdrop-blur",
				stuck ? "border-b border-gray-200 shadow-sm" : "",
				"px-3",
			].join(" ")}
		>
			<div className="overflow-x-auto -mx-3 px-3">
				<div className="flex gap-5 py-3">
					{categories.map((category) => {
						const isActive = active === category.name;
						return (
							<button
								key={category.name}
								onClick={() => handleClick(category.name)}
								className={[
									"flex flex-col items-center transition-all duration-200",
									isActive
										? "border-b-4 border-pink-500 rounded-md bg-pink-50 pb-1"
										: "pb-1",
								].join(" ")}
							>
								<Image
									src={category.image}
									alt={category.name}
									width={55}
									height={55}
									className="rounded-full"
								/>
								<span
									className={`text-xs mt-1 ${isActive ? "text-pink-600 font-semibold" : "text-gray-500"
										}`}
								>
									{category.name}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
