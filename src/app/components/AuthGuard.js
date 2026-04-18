"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Define all routes that do not require authentication
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/create-account",
  "/verify",
  
];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // If we're on the server, we can't check localStorage yet
    if (typeof window === "undefined") return;

    const checkAuth = () => {
      const isPublicPath = PUBLIC_PATHS.includes(pathname);
      const token = localStorage.getItem("session_token");

      if (!isPublicPath && !token) {
        // Redirect to login if user tries to access a protected route without a token
        router.replace("/login");
      } else {
        // If they have a token, or the route is public, allow rendering
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // While checking auth status for a protected route, prevent rendering to avoid flash
  if (isChecking && !PUBLIC_PATHS.includes(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
