import Link from "next/link";
import { getListings, getCompanies, getDistinctCategories } from "@/lib/data";
import ItemCard from "@/components/ItemCard";

interface SearchParams {
  category?: string;
  q?: string;
  city?: string;
  minPrice?: string;
  maxPrice?: string;
  company?: string;
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { category, q, city, minPrice, maxPrice, company: companySite } = params;

  // Build active filter chips for display
  const activeFilters: { label: string; clearKey: string }[] = [];
  if (q)           activeFilters.push({ label: `"${q}"`,         clearKey: "q" });
  if (city)        activeFilters.push({ label: `📍 ${city}`,     clearKey: "city" });
  if (category)    activeFilters.push({ label: category,          clearKey: "category" });
  if (companySite) activeFilters.push({ label: companySite,       clearKey: "company" });
  if (minPrice)    activeFilters.push({ label: `From $${minPrice}`, clearKey: "minPrice" });
  if (maxPrice)    activeFilters.push({ label: `Up to $${maxPrice}`, clearKey: "maxPrice" });

  function clearFilterHref(key: string) {
    const p = new URLSearchParams(params as Record<string, string>);
    p.delete(key);
    const s = p.toString();
    return `/browse${s ? `?${s}` : ""}`;
  }

  // Fetch data in parallel
  const [items, companies, categories] = await Promise.all([
    getListings({
      search: q,
      city,
      categoryName: category,
      businessSite: companySite,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    }),
    getCompanies(),
    getDistinctCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sidebar filters ── */}
        <aside className="lg:w-64 shrink-0">
          <form method="GET" action="/browse" className="space-y-6">
            {/* Keyword */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Search</label>
              <input
                name="q"
                defaultValue={q}
                type="text"
                placeholder="Bounce house, princess…"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Delivery City</label>
              <input
                name="city"
                defaultValue={city}
                type="text"
                placeholder="e.g. Palo Alto"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Category</label>
              <select name="category" defaultValue={category ?? ""}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400 bg-white">
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.category_slug} value={c.category_name}>{c.category_name} ({c.listing_count})</option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Price Range</label>
              <div className="flex items-center gap-2">
                <input name="minPrice" defaultValue={minPrice} type="number" placeholder="$0"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                <span className="text-gray-400 text-sm">–</span>
                <input name="maxPrice" defaultValue={maxPrice} type="number" placeholder="any"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Company</label>
              <select name="company" defaultValue={companySite ?? ""}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-400 bg-white">
                <option value="">All companies</option>
                {companies.map((c) => (
                  <option key={c.business_id} value={c.business_site}>{c.business_name}</option>
                ))}
              </select>
            </div>

            <button type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
              Apply Filters
            </button>
            {activeFilters.length > 0 && (
              <Link href="/browse" className="block text-center text-sm text-gray-500 hover:text-gray-700 underline">
                Clear all filters
              </Link>
            )}
          </form>
        </aside>

        {/* ── Results ── */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h1 className="text-xl font-bold text-gray-900">
              {items.length} rental{items.length !== 1 ? "s" : ""}
              {city ? ` near ${city}` : ""}
            </h1>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {activeFilters.map((f) => (
                <Link key={f.clearKey} href={clearFilterHref(f.clearKey)}
                  className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors">
                  {f.label} <span className="text-white/70 text-sm leading-none">×</span>
                </Link>
              ))}
            </div>
          )}

          {/* No results */}
          {items.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">No rentals found</h2>
              <p className="text-gray-500 text-sm mb-6">
                {city
                  ? `No companies serve "${city}" yet, or try a different spelling.`
                  : "Try adjusting your filters."}
              </p>
              <Link href="/browse" className="inline-block bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm">
                Clear filters
              </Link>
            </div>
          )}

          {/* Grid */}
          {items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {items.map((item) => <ItemCard key={item.listing_id} item={item} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
