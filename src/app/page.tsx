import Link from "next/link";
import { Home, Layers, Waves, Flag, Gamepad2, Baby, Utensils, TableProperties, Tent, Target } from "lucide-react";
import { getDistinctCategories, getFeaturedListings } from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import HomeHero from "@/components/HomeHero";
import FavouritesRow from "@/components/FavouritesRow";
import CityRentalsBanner from "@/components/CityRentalsBanner";

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

      {/* ── Category rows ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* ── Categories ──────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>

          {/* Featured category cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {[
              { name: "Bounce Houses", Icon: Home, color: "text-brand-blue", bg: "bg-brand-blue-subtle" },
              { name: "Combo Bouncers (Bounce + Slide)", Icon: Layers, color: "text-purple-500", bg: "bg-purple-50" },
              { name: "Water Slides", Icon: Waves, color: "text-cyan-500", bg: "bg-cyan-50" },
              { name: "Obstacle Courses", Icon: Flag, color: "text-orange-500", bg: "bg-orange-50" },
              { name: "Interactive Inflatables", Icon: Target, color: "text-green-500", bg: "bg-green-50" },
              { name: "Toddler Inflatables", Icon: Baby, color: "text-pink-500", bg: "bg-pink-50" },
            ].map(({ name, Icon, color, bg }) => {
              const cat = categories.find((c) => c.category_name === name);
              return (
                <Link
                  key={name}
                  href={`/browse?category=${encodeURIComponent(name)}`}
                  className="flex flex-col items-center gap-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm rounded-2xl p-4 text-center transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-brand-blue leading-tight">{name}</span>
                  {cat && <span className="text-xs text-gray-400">{cat.listing_count} rentals</span>}
                </Link>
              );
            })}
          </div>

          {/* Other categories as tags */}
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => !["Bounce Houses", "Combo Bouncers (Bounce + Slide)", "Water Slides", "Obstacle Courses", "Interactive Inflatables", "Toddler Inflatables"].includes(c.category_name))
              .map((cat) => (
                <Link
                  key={cat.category_slug}
                  href={`/browse?category=${encodeURIComponent(cat.category_name)}`}
                  className="flex items-center gap-2 border border-gray-200 hover:border-brand-blue-border hover:bg-brand-blue-subtle rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors"
                >
                  {cat.category_name}
                  <span className="text-xs text-gray-400">{cat.listing_count}</span>
                </Link>
              ))}
          </div>
        </section>

        <FavouritesRow />

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
