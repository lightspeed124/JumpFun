"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (city.trim()) params.set("city", city.trim());
    if (date) params.set("date", date);
    router.push(`/browse?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="bg-white rounded-2xl shadow-xl p-4 max-w-3xl mx-auto space-y-3">
        {/* Keyword row — full width, prominent */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
          <span className="text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search bounce houses, water slides, princess theme, popcorn machine…"
            className="flex-1 outline-none text-gray-800 text-sm placeholder-gray-400 bg-transparent"
          />
        </div>

        {/* City + date + search button row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
            <span className="text-gray-400">📍</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Delivery city (e.g. Palo Alto)"
              className="flex-1 outline-none text-gray-800 text-sm placeholder-gray-400 bg-transparent"
            />
          </div>

          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
            <span className="text-gray-400">📅</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 outline-none text-gray-800 text-sm bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
