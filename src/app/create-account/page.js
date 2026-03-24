import { Suspense } from "react";
import CreateAccountClient from "./CreateAccountClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateAccountClient />
    </Suspense>
  );
}