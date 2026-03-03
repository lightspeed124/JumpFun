import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎪</span>
            <span className="text-xl font-bold text-indigo-600">PlayBase</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/browse"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Browse All
            </Link>
            <Link
              href="/browse?category=Bounce+Houses"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Bounce Houses
            </Link>
            <Link
              href="/browse?category=Water+Slides"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Water Slides
            </Link>
            <Link
              href="/browse?category=Combos"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Combos
            </Link>
            <Link
              href="/plan"
              className="text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors"
            >
              🎯 Get Matched
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
            <button className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
