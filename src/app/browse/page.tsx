import Link from "next/link";
import { getListings, getCompanies, getDistinctCategories } from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import BrowseSearch from "@/components/BrowseSearch";

interface SearchParams {
  category?: string;
  theme?: string;
  company?: string;
  minPrice?: string;
  maxPrice?: string;
  // kept for backward compat (hero search still passes these)
  q?: string;
  city?: string;
}

const PRICE_RANGES = [
  { label: "Under $100",  min: undefined as number | undefined, max: 100 },
  { label: "$100 – $200", min: 100,                             max: 200 },
  { label: "$200 – $300", min: 200,                             max: 300 },
  { label: "$300+",       min: 300,                             max: undefined as number | undefined },
];

const THEMES = [
  "Princess", "Unicorn", "Dinosaur", "Superhero",
  "Tropical", "Sports",  "Safari",   "Pirate",
  "Space",    "Farm",    "Circus",   "Cars",
];

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { category, theme, minPrice, maxPrice, company: companySite, q, city } = params;

  // ── URL helpers ──────────────────────────────────────────────────────────

  function toggleFilterHref(key: string, value: string) {
    const p = new URLSearchParams(params as Record<string, string>);
    if (p.get(key) === value) {
      p.delete(key);
    } else {
      p.set(key, value);
    }
    const s = p.toString();
    return `/browse${s ? `?${s}` : ""}`;
  }

  function clearFilterHref(key: string) {
    const p = new URLSearchParams(params as Record<string, string>);
    p.delete(key);
    const s = p.toString();
    return `/browse${s ? `?${s}` : ""}`;
  }

  function clearPriceHref() {
    const p = new URLSearchParams(params as Record<string, string>);
    p.delete("minPrice");
    p.delete("maxPrice");
    const s = p.toString();
    return `/browse${s ? `?${s}` : ""}`;
  }

  function setPriceHref(min?: number, max?: number) {
    const p = new URLSearchParams(params as Record<string, string>);
    const curMin = p.get("minPrice");
    const curMax = p.get("maxPrice");
    const sameMin = (min === undefined ? null : String(min)) === (curMin ?? null);
    const sameMax = (max === undefined ? null : String(max)) === (curMax ?? null);
    if (sameMin && sameMax) {
      p.delete("minPrice");
      p.delete("maxPrice");
    } else {
      if (min !== undefined) p.set("minPrice", String(min)); else p.delete("minPrice");
      if (max !== undefined) p.set("maxPrice", String(max)); else p.delete("maxPrice");
    }
    const s = p.toString();
    return `/browse${s ? `?${s}` : ""}`;
  }

  // ── Active filter chips ──────────────────────────────────────────────────

  const activeFilters: { label: string; href: string }[] = [];
  if (q)           activeFilters.push({ label: `"${q}"`,         href: clearFilterHref("q") });
  if (city)        activeFilters.push({ label: `Near ${city}`,   href: clearFilterHref("city") });
  if (category)    activeFilters.push({ label: category,          href: clearFilterHref("category") });
  if (theme)       activeFilters.push({ label: `Theme: ${theme}`, href: clearFilterHref("theme") });
  if (companySite) activeFilters.push({ label: companySite,       href: clearFilterHref("company") });
  if (minPrice || maxPrice) {
    const label =
      minPrice && maxPrice ? `$${minPrice}–$${maxPrice}` :
      minPrice ? `$${minPrice}+` : `Under $${maxPrice}`;
    activeFilters.push({ label, href: clearPriceHref() });
  }

  // ── Fetch data ───────────────────────────────────────────────────────────

  const [items, companies, categories] = await Promise.all([
    getListings({
      search: q,
      city,
      categoryName: category,
      theme,
      businessSite: companySite,
      minPrice:  minPrice  ? Number(minPrice)  : undefined,
      maxPrice:  maxPrice  ? Number(maxPrice)  : undefined,
    }),
    getCompanies(),
    getDistinctCategories(),
  ]);

  // ── Helpers for active-state detection ──────────────────────────────────

  const curMinNum = minPrice ? Number(minPrice) : undefined;
  const curMaxNum = maxPrice ? Number(maxPrice) : undefined;

  function isPriceActive(r: typeof PRICE_RANGES[number]) {
    return curMinNum === r.min && curMaxNum === r.max;
  }

  const hasAnyFilter = activeFilters.length > 0;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── Sidebar ── */}
        <aside className="lg:w-60 shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-7 pr-1">

            {/* Category */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category</p>
              <ul className="space-y-0.5">
                {categories.map((c) => {
                  const active = category === c.category_name;
                  return (
                    <li key={c.category_slug}>
                      <Link
                        href={toggleFilterHref("category", c.category_name)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                          active
                            ? "bg-brand-blue text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span>{c.category_name}</span>
                        <span className={`text-xs tabular-nums ${active ? "text-white/60" : "text-gray-400"}`}>
                          {c.listing_count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Theme */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Theme</p>
              <div className="flex flex-wrap gap-1.5">
                {THEMES.map((t) => {
                  const active = theme === t;
                  return (
                    <Link
                      key={t}
                      href={toggleFilterHref("theme", t)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        active
                          ? "bg-brand-blue text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {t}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Price Range</p>
              <ul className="space-y-0.5">
                {PRICE_RANGES.map((r) => {
                  const active = isPriceActive(r);
                  return (
                    <li key={r.label}>
                      <Link
                        href={setPriceHref(r.min, r.max)}
                        className={`flex w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                          active
                            ? "bg-brand-blue text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {r.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Company</p>
              <ul className="space-y-0.5">
                {companies.map((c) => {
                  const active = companySite === c.business_site;
                  return (
                    <li key={c.business_id}>
                      <Link
                        href={toggleFilterHref("company", c.business_site)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                          active
                            ? "bg-brand-blue text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="truncate">{c.business_name}</span>
                        <span className={`text-xs tabular-nums ml-1 shrink-0 ${active ? "text-white/60" : "text-gray-400"}`}>
                          {c.listing_count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Clear all */}
            {hasAnyFilter && (
              <Link
                href="/browse"
                className="block text-center text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2"
              >
                Clear all filters
              </Link>
            )}
          </div>
        </aside>

        {/* ── Results ── */}
        <div className="flex-1 min-w-0">

          {/* Search bar */}
          <div className="mb-5">
            <BrowseSearch
              initialQuery={q}
              preserveParams={
                Object.fromEntries(
                  Object.entries(params as Record<string, string>).filter(([k]) => k !== "q")
                )
              }
            />
          </div>

          {/* Header */}
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900">
              {items.length} rental{items.length !== 1 ? "s" : ""}
              {city ? ` near ${city}` : ""}
            </h1>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {activeFilters.map((f) => (
                <Link
                  key={f.label}
                  href={f.href}
                  className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {f.label}
                  <span className="text-white/60 leading-none">×</span>
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
              <Link
                href="/browse"
                className="inline-block bg-brand-blue text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-blue-dark transition-colors text-sm"
              >
                Clear filters
              </Link>
            </div>
          )}

          {/* Grid */}
          {items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((item) => (
                <ItemCard key={item.listing_id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
