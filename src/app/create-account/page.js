"use client";
import { Suspense } from "react";
import CreateAccountClient from "./CreateAccountClient";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function SearchWrapper() {
	const param = useSearchParams();
	const phone = param.get('phone');
	return <CreateAccountClient phoneFromQuery={phone} />
}

export default function Page() {
	return (
		<Suspense fallback={<div>Loading..</div>}>
			<SearchWrapper />
		</Suspense>
	);
}
