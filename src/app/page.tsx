import Link from "next/link";
import { getDistinctCategories, getFeaturedListings } from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import HomeHero from "@/components/HomeHero";
import FavouritesRow from "@/components/FavouritesRow";
import CityRentalsBanner from "@/components/CityRentalsBanner";
import CategoryGrid from "@/components/CategoryGrid";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedListings(),
    getDistinctCategories(),
  ]);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <HomeHero />

      {/* ── City rentals band ─────────────────────────────────────────────── */}
      <div className="border-t border-b border-gray-200 bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CityRentalsBanner />
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        <FavouritesRow />

        {/* ── Category grid (replaces Browse by Category) ───────────────── */}
        <CategoryGrid categories={categories} />

        {/* ── Featured items ───────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Popular Rentals</h2>
            <Link href="/browse" className="text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <ItemCard key={item.listing_id} item={item} />
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
