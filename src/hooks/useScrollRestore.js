"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollRestore() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollKey = `scroll_pos_${pathname}`;

    // Restore scroll position
    const savedPosition = sessionStorage.getItem(scrollKey);
    if (savedPosition) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
      });
    }

    // Save scroll position stringified
    const handleScroll = () => {
      sessionStorage.setItem(scrollKey, window.scrollY.toString());
    };

    let timeoutId;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100); // 100ms debounce
    };

    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [pathname]);
}
