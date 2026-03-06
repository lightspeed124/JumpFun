"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useStickySearch } from "@/context/StickySearchContext";

export default function HomeHero() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const { sticky, setSticky } = useStickySearch();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = searchRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setSticky]);

  function handleSearch(e: React.FormEvent, kw: string) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (kw.trim()) params.set("q", kw.trim());
    router.push(`/browse?${params.toString()}`);
  }

  return (
    <>
      {/* Sticky search bar — slides in below navbar when hero search scrolls out */}
      <div
        className={`fixed top-[22px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm px-4 py-3 transition-all duration-300 ease-in-out ${
          sticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <form onSubmit={(e) => handleSearch(e, keyword)} className="flex-1">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-5 py-2 gap-3">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search bounce houses, water slides…"
                className="flex-1 outline-none text-gray-800 text-sm bg-transparent placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-brand-pink hover:bg-brand-pink-dark text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 transition-colors"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>
          </form>
          <Link
            href="/plan"
            className="text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark px-4 py-2 rounded-full transition-colors shrink-0"
          >
            Get Matched
          </Link>
        </div>
      </div>

      {/* Hero section */}
      <section className="relative h-[66vh] min-h-[520px] overflow-hidden">
        <Image
          src="/landing page background.png"
          alt="Kids having a blast in a bounce house on a sunny day"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[440px] bg-black/40 rounded-full blur-3xl" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center gap-5">
          <p className="text-white/85 text-[11px] font-bold tracking-[0.22em] uppercase drop-shadow">
            Bounce Houses &nbsp;·&nbsp; Water Slides &nbsp;·&nbsp; Obstacle Courses &nbsp;·&nbsp; Combo Jumpers
          </p>
          <h1 className="text-4xl md:text-[54px] font-extrabold text-white leading-tight drop-shadow-lg">
            More Bounce Houses,<br className="hidden sm:block" />
            <span className="text-yellow-300"> Booked in Seconds.</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg font-medium max-w-xl leading-relaxed drop-shadow">
            Browse hundreds of bounce houses and inflatables near you —<br className="hidden md:block" />
            pick your favorite and book it in minutes.
          </p>
          <div ref={searchRef} className="w-full max-w-2xl mt-1">
            <form onSubmit={(e) => handleSearch(e, keyword)} className="w-full">
              <div className="flex items-center bg-white rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.28)] border border-white/20 w-full">
                <div className="flex-1 px-7 py-4 min-w-0">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Bounce house, water slide, obstacle course…"
                    className="w-full outline-none text-gray-800 text-sm placeholder-gray-400 bg-transparent truncate"
                  />
                </div>
                <div className="pr-2 shrink-0">
                  <button
                    type="submit"
                    className="bg-brand-pink hover:bg-brand-pink-dark active:bg-brand-pink-darker text-white rounded-full w-14 h-14 flex items-center justify-center transition-colors shadow-md"
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
          </div>
        </div>
      </section>
    </>
  );
}
