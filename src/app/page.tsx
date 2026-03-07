import Link from "next/link";
import { getDistinctCategories, getFeaturedListings } from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import HomeHero from "@/components/HomeHero";
import ValueProps from "@/components/ValueProps";
import HowItWorks from "@/components/HowItWorks";
import FavouritesRow from "@/components/FavouritesRow";
import CategoryGrid from "@/components/CategoryGrid";
import PlanByOccasion from "@/components/PlanByOccasion";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedListings(),
    getDistinctCategories(),
  ]);

  const totalListings = categories.reduce((sum, c) => sum + c.listing_count, 0);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <HomeHero totalListings={totalListings} />

      {/* ── Value propositions ─────────────────────────────────────────── */}
      <ValueProps />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        <FavouritesRow />

        {/* ── Trending This Week ─────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Trending This Week</h2>
            <Link href="/browse" className="text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <ItemCard key={item.listing_id} item={item} />
            ))}
          </div>
        </section>

        {/* ── Category grid ──────────────────────────────────────────────── */}
        <CategoryGrid categories={categories} totalCount={totalListings} />

        {/* ── How It Works ───────────────────────────────────────────────── */}
        <HowItWorks />

        {/* ── Plan by Occasion ─────────────────────────────────────────── */}
        <PlanByOccasion />

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <FAQ />

        {/* ── Final CTA ───────────────────────────────────────────────────── */}
        <CTABanner />
      </div>

    </div>
  );
}
