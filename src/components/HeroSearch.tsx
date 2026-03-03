"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { detectCity, fetchCitySuggestions, CitySuggestion } from "@/lib/geo";

export default function HeroSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const whereRef = useRef<HTMLDivElement>(null);

  // Auto-detect city from IP on mount
  useEffect(() => {
    detectCity().then((detected) => {
      if (detected) setCity(detected);
    });
  }, []);

  // Fetch suggestions with debounce as city input changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!city || city.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const results = await fetchCitySuggestions(city);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [city]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (whereRef.current && !whereRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setShowSuggestions(false);
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (city.trim()) params.set("city", city.trim());
    router.push(`/browse?${params.toString()}`);
  }

  function selectSuggestion(s: CitySuggestion) {
    setCity(s.display);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      {/* overflow-visible so the city dropdown can escape the pill */}
      <div className="flex items-center bg-white rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.28)] border border-white/20 w-full">

        {/* What */}
        <div className="flex-1 px-7 py-4 min-w-0">
          <div className="text-[11px] font-bold text-gray-900 tracking-wide mb-1">What</div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Bounce house, water slide, obstacle course…"
            className="w-full outline-none text-gray-800 text-sm placeholder-gray-400 bg-transparent truncate"
          />
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200 shrink-0" />

        {/* Where — position:relative so dropdown is anchored here */}
        <div ref={whereRef} className="relative flex-1 px-7 py-4 min-w-0">
          <div className="text-[11px] font-bold text-gray-900 tracking-wide mb-1">Where</div>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="City (e.g. Palo Alto, San Jose…)"
            className="w-full outline-none text-gray-800 text-sm placeholder-gray-400 bg-transparent"
          />

          {/* Autocomplete dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onMouseDown={() => selectSuggestion(s)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="text-sm font-semibold text-gray-900">{s.name}</div>
                  {s.state && (
                    <div className="text-xs text-gray-400">
                      {s.state}
                      {s.country && s.country !== "United States of America"
                        ? `, ${s.country}`
                        : ""}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
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
