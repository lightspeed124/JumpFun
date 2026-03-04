import Link from "next/link";
import Image from "next/image";
import NavCityPicker from "@/components/NavCityPicker";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="JumpFun" width={220} height={78} priority />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/browse"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Browse All
            </Link>
            <Link
              href="/plan"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              AI Planner
            </Link>
            <NavCityPicker />
            <Link
              href="/plan"
              className="text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue-dark px-4 py-1.5 rounded-full transition-colors"
            >
              Get Matched
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/favorites"
              className="text-sm font-medium text-gray-700 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
            >
              <span>♥</span>
              <span>Saved</span>
            </Link>
            <button className="text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-dark px-4 py-2 rounded-lg">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
