"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    router.push(`/browse?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex items-center bg-white rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.28)] border border-white/20 w-full">

        {/* Single search input */}
        <div className="flex-1 px-7 py-4 min-w-0">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Bounce house, water slide, obstacle course…"
            className="w-full outline-none text-gray-800 text-sm placeholder-gray-400 bg-transparent truncate"
          />
        </div>

        {/* Search button */}
        <div className="pr-2 shrink-0">
          <button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white rounded-full w-14 h-14 flex items-center justify-center transition-colors shadow-md"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
