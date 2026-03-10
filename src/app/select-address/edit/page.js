import { Suspense } from "react";
import EditAddressClient from "./EditAddressClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditAddressClient />
    </Suspense>
  );
}