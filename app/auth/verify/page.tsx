// app/auth/verify/page.tsx
import { Suspense } from "react";
import VerifyClient from "@/components/Auth/VerifyClient";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <VerifyClient />
    </Suspense>
  );
}
