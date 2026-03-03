import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getItemById,
  getCompanyById,
  getComplementaryItems,
  getSimilarItemsFromOtherCompanies,
} from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import FavoriteButton from "@/components/FavoriteButton";
import BookNowButton from "@/components/BookNowButton";

/** Derive minimum setup space from dimensions string, e.g. "15ft x 15ft x 14ft" → "19ft × 19ft" */
function spaceFromDimensions(dimensions: string, spaceRequired?: string): string {
  if (spaceRequired) return spaceRequired;
  const m = dimensions.match(/^(\d+)ft\s*x\s*(\d+)ft/i);
  if (!m) return dimensions;
  return `${parseInt(m[1]) + 4}ft × ${parseInt(m[2]) + 4}ft`;
}

/** Default circuit count by category */
function defaultCircuits(category: string, circuits?: number): number {
  if (circuits !== undefined) return circuits;
  if (["Water Slides", "Combos", "Obstacle Courses"].includes(category)) return 2;
  if (["Tents", "Tables & Chairs"].includes(category)) return 0;
  return 1;
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) notFound();

  const company = getCompanyById(item.companyId);
  if (!company) notFound();

  const complementaryItems = getComplementaryItems(item, 4);
  const similarItems = getSimilarItemsFromOtherCompanies(item, 3);

  // Pricing tiers
  const priceOneDay = item.price;
  const priceOvernight = Math.round(item.price * 1.4 / 5) * 5;
  const priceThreeDays = Math.round(item.price * 2.5 / 5) * 5;

  // Installation info
  const circuits = defaultCircuits(item.category, item.circuitsNeeded);
  const space = spaceFromDimensions(item.dimensions, item.spaceRequired);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link href="/browse" className="hover:text-gray-700">Browse</Link>
        <span>/</span>
        <Link
          href={`/browse?category=${encodeURIComponent(item.category)}`}
          className="hover:text-gray-700"
        >
          {item.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{item.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Main Content ── */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="col-span-2 relative h-80 rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
              {/* Favourite button over hero image */}
              <div className="absolute top-4 right-4">
                <FavoriteButton itemId={item.id} size="lg" />
              </div>
            </div>
            {item.images.slice(1).map((img, i) => (
              <div
                key={i}
                className="relative h-48 rounded-2xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={img}
                  alt={`${item.name} ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full mb-2 inline-block">
                {item.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-sm font-medium text-gray-700">
                  {company.rating}
                </span>
                <span className="text-sm text-gray-400">
                  ({company.reviewCount} reviews)
                </span>
                <span className="text-gray-300">·</span>
                <Link
                  href={`/companies/${company.id}`}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  {company.name}
                </Link>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Specs Grid */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Dimensions", value: item.dimensions },
                { label: "Capacity", value: item.capacity > 0 ? `${item.capacity} kids` : "N/A" },
                { label: "Age Range", value: item.ageRange },
                { label: "Setup Time", value: `~${item.setupTime} min` },
                { label: "Colors", value: item.colors.join(", ") },
                { label: "Category", value: item.category },
              ].map((spec) => (
                <div key={spec.label}>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                    {spec.label}
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Installation Requirements */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🔌</span> Installation Requirements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-blue-500 font-medium uppercase tracking-wide mb-0.5">
                  Circuits Needed
                </div>
                <div className="text-sm font-semibold text-gray-800">
                  {circuits === 0
                    ? "No electricity required"
                    : `${circuits} dedicated ${circuits === 1 ? "circuit" : "circuits"} (20A)`}
                </div>
              </div>
              <div>
                <div className="text-xs text-blue-500 font-medium uppercase tracking-wide mb-0.5">
                  Item Dimensions
                </div>
                <div className="text-sm font-semibold text-gray-800">{item.dimensions}</div>
              </div>
              <div>
                <div className="text-xs text-blue-500 font-medium uppercase tracking-wide mb-0.5">
                  Minimum Space
                </div>
                <div className="text-sm font-semibold text-gray-800">{space}</div>
              </div>
            </div>
            <p className="text-xs text-blue-500 mt-3">
              Outlets must be within 100 ft of setup area. Extension cords not recommended — use a dedicated blower outlet.
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {item.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-500 font-bold">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Themes */}
          {item.themes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Themes</h2>
              <div className="flex flex-wrap gap-2">
                {item.themes.map((theme) => (
                  <Link
                    key={theme}
                    href={`/browse?theme=${encodeURIComponent(theme)}`}
                    className="text-sm bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {theme}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Safety Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
            <h2 className="text-sm font-bold text-amber-800 mb-1.5 flex items-center gap-2">
              <span>⚠️</span> Safety Guidelines
            </h2>
            <p className="text-sm text-amber-700">{item.safetyNotes}</p>
          </div>

          {/* Company Card */}
          <div className="border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Provided by</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 relative shrink-0">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h3 className="font-bold text-gray-900 text-lg">{company.name}</h3>
                  {company.verified && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                  {company.insuranceCertified && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                      ✓ Insured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-semibold">{company.rating}</span>
                  <span className="text-gray-400 text-sm">({company.reviewCount} reviews)</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-sm text-gray-500">{company.yearsInBusiness} years in business</span>
                </div>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{company.description}</p>
                <div className="mb-3">
                  <div className="text-xs text-gray-400 font-medium mb-1">Service Area</div>
                  <p className="text-xs text-gray-600">
                    {company.serviceArea.slice(0, 6).join(", ")}
                    {company.serviceArea.length > 6
                      ? ` + ${company.serviceArea.length - 6} more cities`
                      : ""}
                  </p>
                </div>
                <Link
                  href={`/companies/${company.id}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  View all {company.name} rentals →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Booking Sidebar ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sticky top-24">
            {/* Pricing tiers */}
            <div className="mb-5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Rental Duration &amp; Pricing
              </div>
              <div className="space-y-2">
                {[
                  { label: "One Day", sub: "10 am – 6 pm", price: priceOneDay },
                  { label: "Overnight", sub: "Eve through morning", price: priceOvernight },
                  { label: "3 Days", sub: "Multi-day event", price: priceThreeDays },
                ].map((tier) => (
                  <div key={tier.label} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{tier.label}</div>
                      <div className="text-xs text-gray-400">{tier.sub}</div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">${tier.price}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Delivery &amp; setup always included · Service fee applies
              </p>
            </div>

            <div className="space-y-3">
              {/* Book Now */}
              <BookNowButton itemId={item.id} />

              {/* Add to Favourites */}
              <div className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-500 font-semibold py-3 rounded-xl transition-colors cursor-pointer">
                <FavoriteButton itemId={item.id} size="sm" className="shadow-none border-none bg-transparent" />
                <span className="text-sm">Save to Favourites</span>
              </div>

              {/* Call button */}
              <a
                href={`tel:${company.phone.replace(/\D/g, "")}`}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <span>📞</span>
                <span>Call {company.phone}</span>
              </a>
            </div>

            <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🛡️</span>
                <span>All companies are verified &amp; insured</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>✓</span>
                <span>Equipment cleaned &amp; sanitized</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>📞</span>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 1: You might also be interested in (same company) ── */}
      {complementaryItems.length > 0 && (
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                You might also be interested in
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Add-ons and accessories from {company.name}
              </p>
            </div>
            <Link
              href={`/companies/${company.id}`}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complementaryItems.map((i) => (
              <ItemCard key={i.id} item={i} company={company} />
            ))}
          </div>
        </div>
      )}

      {/* ── Row 2: Similar products from other businesses ── */}
      {similarItems.length > 0 && (
        <div className="mt-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Similar products from other businesses
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                More {item.category.toLowerCase()} from other local companies
              </p>
            </div>
            <Link
              href={`/browse?category=${encodeURIComponent(item.category)}`}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Browse all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarItems.map((i) => {
              const c = getCompanyById(i.companyId);
              if (!c) return null;
              return <ItemCard key={i.id} item={i} company={c} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
