import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getListingById, getCompanyBySite, getListingImages,
  getListingPrices, getComplementaryListings, getSimilarListings,
} from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import FavoriteButton from "@/components/FavoriteButton";
import BookNowButton from "@/components/BookNowButton";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listingId = Number(id);
  if (isNaN(listingId)) notFound();

  const [item, images, prices] = await Promise.all([
    getListingById(listingId),
    getListingImages(listingId),
    getListingPrices(listingId),
  ]);
  if (!item) notFound();

  const [company, complementary, similar] = await Promise.all([
    getCompanyBySite(item.business_site),
    getComplementaryListings(item, 4),
    getSimilarListings(item.category_name, item.business_site, 3),
  ]);

  const heroImg = item.primary_image_big_url || item.primary_image_url || images[0]?.image_big_url || images[0]?.image_url || null;
  const galleryImgs = images.slice(1, 3);
  const basePrice = item.base_price_amount ?? item.min_price_amount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link href="/browse" className="hover:text-gray-700">Browse</Link>
        <span>/</span>
        <Link href={`/browse?category=${encodeURIComponent(item.category_name)}`} className="hover:text-gray-700">
          {item.category_name}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{item.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Main content ── */}
        <div className="lg:col-span-2">
          {/* Image gallery */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="col-span-2 relative h-96 rounded-2xl overflow-hidden bg-gray-100">
              {heroImg ? (
                <Image src={heroImg} alt={item.title} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 66vw" priority unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl bg-brand-blue-subtle">🎪</div>
              )}
              <div className="absolute top-4 right-4">
                <FavoriteButton itemId={String(listingId)} size="lg" />
              </div>
            </div>
            {galleryImgs.map((img, i) => (
              <div key={i} className="relative h-48 rounded-2xl overflow-hidden bg-gray-100">
                <Image src={img.image_url} alt={img.alt_text ?? item.title} fill className="object-cover" sizes="33vw" unoptimized />
              </div>
            ))}
          </div>

          {/* Title */}
          <span className="text-xs font-medium text-brand-blue bg-brand-blue-subtle px-2 py-1 rounded-full mb-2 inline-block">
            {item.category_name}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
          {company && (
            <Link href={`/companies/${encodeURIComponent(item.business_site)}`}
              className="text-sm text-brand-blue hover:text-brand-blue-dark font-medium">
              {item.business_name} →
            </Link>
          )}

          {/* Description */}
          {item.description && (
            <div className="mt-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          )}

          {/* Specs */}
          {(item.dimensions || item.space_needed) && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {item.dimensions && (
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Dimensions</div>
                    <div className="text-sm font-semibold text-gray-800">{item.dimensions}</div>
                  </div>
                )}
                {item.space_needed && (
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Space Needed</div>
                    <div className="text-sm font-semibold text-gray-800">{item.space_needed}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All price options */}
          {prices.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Pricing Options</h2>
              <div className="space-y-2">
                {prices.map((p, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium text-gray-700">{p.label || "Standard"}</span>
                    <span className="text-base font-bold text-gray-900">{p.display_value || `$${p.amount}`}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Company card */}
          {company && (
            <div className="border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Provided by</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-blue-subtle flex items-center justify-center text-xl font-bold text-brand-blue shrink-0">
                  {company.business_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{company.business_name}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                    {company.listing_count > 0 && <span>{company.listing_count} listings</span>}
                    {company.service_area_count > 0 && <span>{company.service_area_count} service areas</span>}
                  </div>
                  <Link href={`/companies/${encodeURIComponent(item.business_site)}`}
                    className="inline-block mt-3 text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
                    View all {company.business_name} rentals →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sticky top-24">
            {basePrice != null ? (
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-bold text-gray-900">${Math.round(basePrice)}</span>
                <span className="text-gray-500">/ day</span>
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-5">Contact for pricing</p>
            )}

            {item.price_option_count > 1 && (
              <p className="text-xs text-gray-400 mb-4">{item.price_option_count} pricing options available — see below</p>
            )}

            <div className="space-y-3">
              <BookNowButton itemId={String(listingId)} />

              <FavoriteButton itemId={String(listingId)} showLabel />

              {company?.phone && (
                <a href={`tel:${company.phone.replace(/\D/g, "")}`}
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm">
                  <span>📞</span>
                  <span>{company.phone}</span>
                </a>
              )}
            </div>

            <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 text-xs text-gray-500"><span>🛡️</span><span>Verified local companies</span></div>
              <div className="flex items-center gap-2 text-xs text-gray-500"><span>✓</span><span>Delivery & setup included</span></div>
              {item.source_url && (
                <a href={item.source_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-brand-blue hover:text-brand-blue-dark">
                  <span>🔗</span><span>View on company website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Same company, complementary items */}
      {complementary.length > 0 && (
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Bundle More from {item.business_name}</h2>
              <p className="text-sm text-gray-500 mt-1">Add more items from this company to your booking</p>
            </div>
            <Link href={`/companies/${encodeURIComponent(item.business_site)}`}
              className="text-brand-blue hover:text-brand-blue-dark text-sm font-medium">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {complementary.map((i) => <ItemCard key={i.listing_id} item={i} />)}
          </div>
        </div>
      )}

      {/* Row 2: Same category, different businesses */}
      {similar.length > 0 && (
        <div className="mt-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Compare Similar Options from Other Companies</h2>
              <p className="text-sm text-gray-500 mt-1">More {item.category_name} from other local companies</p>
            </div>
            <Link href={`/browse?category=${encodeURIComponent(item.category_name)}`}
              className="text-brand-blue hover:text-brand-blue-dark text-sm font-medium">Browse all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similar.map((i) => <ItemCard key={i.listing_id} item={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
