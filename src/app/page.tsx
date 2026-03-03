import Link from "next/link";
import Image from "next/image";
import { getListings, getDistinctCategories } from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import HeroSearch from "@/components/HeroSearch";
import CityRentalsBanner from "@/components/CityRentalsBanner";

export default async function HomePage() {
  const [allItems, categories] = await Promise.all([
    getListings({ limit: 400 }),
    getDistinctCategories(),
  ]);

  // Group items by category (up to 8 per row), preserving category order from DB
  const grouped = new Map<string, typeof allItems>();
  for (const item of allItems) {
    const arr = grouped.get(item.category_name) ?? [];
    if (arr.length < 8) arr.push(item);
    grouped.set(item.category_name, arr);
  }

  const rows = categories
    .filter((c) => (grouped.get(c.category_name)?.length ?? 0) > 0)
    .map((c) => ({ ...c, items: grouped.get(c.category_name)! }));

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[66vh] min-h-[520px] overflow-hidden">
        {/* Illustrated background scene */}
        <Image
          src="/landing page background.png"
          alt="Kids having a blast in a bounce house on a sunny day"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay — light at top, heavier at bottom so text pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/70" />

        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center gap-7">
          <div className="space-y-4">
            <p className="text-white/80 text-[11px] font-bold tracking-[0.22em] uppercase">
              Bounce Houses &nbsp;·&nbsp; Water Slides &nbsp;·&nbsp; Obstacle Courses &nbsp;·&nbsp; Combo Jumpers
            </p>
            <h1 className="text-4xl md:text-[54px] font-extrabold text-white leading-tight drop-shadow-lg">
              More Bounce Houses,<br className="hidden sm:block" />
              <span className="text-yellow-300"> Booked in Seconds.</span>
            </h1>
            <p className="text-white/75 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              Browse hundreds of bounce houses and inflatables near you —<br className="hidden md:block" />
              pick your favorite and book it in minutes.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full max-w-5xl px-4">
            <HeroSearch />
          </div>

          <p className="text-sm text-white/65">
            Not sure what to pick?{" "}
            <Link
              href="/plan"
              className="text-yellow-300 font-semibold underline underline-offset-2 hover:text-yellow-200"
            >
              Try our free AI Planner →
            </Link>
          </p>
        </div>
      </section>

      {/* ── City rentals band ─────────────────────────────────────────────── */}
      <div className="border-t border-b border-gray-200 bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CityRentalsBanner />
        </div>
      </div>

      {/* ── Category rows ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {rows.map((row) => (
          <section key={row.category_slug}>

            {/* Row header */}
            <div className="flex items-center justify-between mb-4">
              <Link
                href={`/browse?category=${encodeURIComponent(row.category_name)}`}
                className="group flex items-center gap-2"
              >
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {row.category_name}
                </h2>
                <span className="text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all text-lg leading-none">
                  →
                </span>
              </Link>
              <Link
                href={`/browse?category=${encodeURIComponent(row.category_name)}`}
                className="text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors shrink-0"
              >
                View all {row.listing_count}
              </Link>
            </div>

            {/* Horizontal scroll row */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              {row.items.map((item) => (
                <div key={item.listing_id} className="w-60 shrink-0">
                  <ItemCard item={item} />
                </div>
              ))}

              {/* "See more" card at the end of each row */}
              {row.listing_count > row.items.length && (
                <div className="w-60 shrink-0">
                  <Link
                    href={`/browse?category=${encodeURIComponent(row.category_name)}`}
                    className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors"
                  >
                    <span className="text-4xl">→</span>
                    <span className="text-sm font-semibold text-center px-4">
                      See all {row.listing_count} {row.category_name}
                    </span>
                  </Link>
                </div>
              )}
            </div>

          </section>
        ))}
      </div>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Not sure what you need?</h2>
          <p className="text-gray-500 max-w-md text-sm leading-relaxed">
            Answer a few quick questions and our AI will put together the perfect rental lineup for your party.
          </p>
          <Link
            href="/plan"
            className="mt-2 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-sm"
          >
            🎯 Get Personalized Picks
          </Link>
        </div>
      </div>

    </div>
  );
}
