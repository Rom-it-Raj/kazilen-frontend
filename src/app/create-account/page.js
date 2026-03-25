import { Suspense } from "react";
import CreateAccountClient from "./CreateAccountClient";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Page() {
	const param = useSearchParams()
	const phone = param.get("phone")
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateAccountClient phone={phone}/>
    </Suspense>
  );
}
