"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchCitySuggestions, CitySuggestion } from "@/lib/geo";
import { useCity } from "@/context/CityContext";

export default function CityRentalsBanner() {
  const router = useRouter();
  const { city, loading, setCity } = useCity();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!inputValue || inputValue.length < 2) { setSuggestions([]); return; }
    debounceRef.current = setTimeout(async () => {
      const results = await fetchCitySuggestions(inputValue);
      setSuggestions(results);
    }, 250);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [inputValue]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEditing(false);
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function startEditing() {
    setInputValue(city === "your area" ? "" : city);
    setEditing(true);
  }

  function commit(newCity: string) {
    if (!newCity.trim()) return;
    setCity(newCity.trim());
    setEditing(false);
    setSuggestions([]);
    router.push(`/browse?city=${encodeURIComponent(newCity.trim())}`);
  }

  function selectSuggestion(s: CitySuggestion) { commit(s.display); }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      commit(suggestions.length > 0 ? suggestions[0].display : inputValue);
    } else if (e.key === "Escape") {
      setEditing(false);
      setSuggestions([]);
    }
  }

  return (
    <div ref={containerRef} className="relative flex items-center justify-center gap-3 flex-wrap">
      <span className="text-gray-700 font-medium text-base">
        Rentals near
      </span>

      {editing ? (
        <span className="relative inline-block">
          <span className="inline-flex items-center border-2 border-brand-blue rounded-lg px-4 py-1.5">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter city…"
              className="outline-none text-brand-blue font-semibold text-base bg-transparent w-40"
            />
          </span>

          {suggestions.length > 0 && (
            <ul className="absolute left-0 top-full mt-1 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onMouseDown={() => selectSuggestion(s)}
                  className="px-4 py-3 hover:bg-brand-blue-subtle cursor-pointer"
                >
                  <div className="text-sm font-semibold text-gray-900">{s.name}</div>
                  {s.state && (
                    <div className="text-xs text-gray-400">
                      {s.state}{s.country && s.country !== "United States of America" ? `, ${s.country}` : ""}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </span>
      ) : (
        <button
          onClick={startEditing}
          disabled={loading}
          title="Click to change city"
          className="inline-flex items-center gap-1.5 text-brand-blue font-bold text-base border-b-2 border-dashed border-brand-blue-border hover:border-brand-blue hover:text-brand-blue-dark transition-colors disabled:opacity-40 pb-0.5"
        >
          {loading ? (
            <span className="inline-block w-24 h-5 rounded bg-brand-blue-subtle animate-pulse" />
          ) : (
            <>
              {city}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L3.88 9.648a.75.75 0 0 0-.196.37l-.66 3a.75.75 0 0 0 .892.892l3-.66a.75.75 0 0 0 .37-.196l7.135-7.133a1.75 1.75 0 0 0 0-2.475l-.933-.933Z" />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
}
