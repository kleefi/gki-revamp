"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GAListener({ GA_ID }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_ID, {
        page_path: pathname,
      });
    }
  }, [pathname, GA_ID]);

  return null;
}
