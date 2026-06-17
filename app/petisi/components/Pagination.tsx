// app/petisi/components/Pagination.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
}

export default function Pagination({
  currentPage,
  pageCount,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  if (pageCount <= 1) return null;

  // Generate page numbers dengan ellipsis
  function getPages(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(pageCount - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < pageCount - 2) pages.push("...");
    pages.push(pageCount);
    return pages;
  }

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-2 pb-20 bg-[#F7F7F7]">
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-10 h-10 flex items-center justify-center font-jakarta text-black/40 text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goTo(page)}
            className={[
              "w-10 h-10 rounded-full flex items-center justify-center font-jakarta text-sm font-medium transition-all duration-200 cursor-pointer border-none",
              page === currentPage
                ? "bg-purple-light text-white"
                : "bg-white text-black hover:bg-purple-light/10 shadow-sm",
            ].join(" ")}
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
}
