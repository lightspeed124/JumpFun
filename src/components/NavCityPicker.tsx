"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchCitySuggestions, CitySuggestion } from "@/lib/geo";
import { useCity } from "@/context/CityContext";

export default function NavCityPicker() {
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
    <div ref={containerRef} className="relative hidden md:flex items-center">
      {editing ? (
        <span className="relative inline-flex items-center border border-brand-blue-border rounded-full px-3 py-1 bg-white">
          <span className="text-gray-400 text-xs mr-1.5">📍</span>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter city…"
            className="outline-none text-brand-blue font-semibold text-sm bg-transparent w-28"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
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
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-brand-blue border border-gray-200 hover:border-brand-blue-border rounded-full px-3 py-1.5 transition-colors disabled:opacity-40"
        >
          <span className="text-xs">📍</span>
          {loading ? (
            <span className="inline-block w-16 h-3.5 rounded bg-gray-200 animate-pulse" />
          ) : (
            <span className="font-medium max-w-[120px] truncate">{city}</span>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-gray-400">
            <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L3.88 9.648a.75.75 0 0 0-.196.37l-.66 3a.75.75 0 0 0 .892.892l3-.66a.75.75 0 0 0 .37-.196l7.135-7.133a1.75 1.75 0 0 0 0-2.475l-.933-.933Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
