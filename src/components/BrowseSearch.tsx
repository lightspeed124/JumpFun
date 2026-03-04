"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BrowseSearch({
  initialQuery = "",
  preserveParams = {},
}: {
  initialQuery?: string;
  preserveParams?: Record<string, string>;
}) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialQuery);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(preserveParams);
    if (keyword.trim()) {
      params.set("q", keyword.trim());
    } else {
      params.delete("q");
    }
    router.push(`/browse?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm w-full">
        <div className="flex-1 px-5 py-3 min-w-0">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Bounce house, water slide, obstacle course…"
            className="w-full outline-none text-gray-800 text-sm placeholder-gray-400 bg-transparent truncate"
          />
        </div>
        <div className="pr-1.5 shrink-0">
          <button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
