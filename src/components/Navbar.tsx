"use client";

import Link from "next/link";
import Image from "next/image";
import NavCityPicker from "@/components/NavCityPicker";
import { useStickySearch } from "@/context/StickySearchContext";

export default function Navbar() {
  const { sticky } = useStickySearch();
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${sticky ? "h-[21px]" : "h-16"}`}>
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="JumpFun"
              width={sticky ? 73 : 220}
              height={sticky ? 26 : 78}
              priority
              className="transition-all duration-300"
            />
          </Link>

          {!sticky && (
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/browse"
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Browse All
              </Link>
              <NavCityPicker />
              <Link
                href="/plan"
                className="text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark px-4 py-1.5 rounded-full transition-colors"
              >
                Get Matched
              </Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
