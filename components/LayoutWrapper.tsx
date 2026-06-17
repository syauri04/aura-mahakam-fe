"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/aura/") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/register");

  return (
    <>
      {!hideLayout && (
        <Suspense fallback={null}>
          <Header />
        </Suspense>
      )}

      {children}

      {!hideLayout && <Footer />}
    </>
  );
}
