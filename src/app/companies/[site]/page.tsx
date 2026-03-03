import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCompanyBySite, getListingsByBusiness, getServiceAreasByBusiness,
} from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import { RentalItem } from "@/types";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const businessSite = decodeURIComponent(site);

  const [company, listings, serviceAreas] = await Promise.all([
    getCompanyBySite(businessSite),
    getListingsByBusiness(businessSite),
    getServiceAreasByBusiness(businessSite),
  ]);
  if (!company) notFound();

  // Group listings by category
  const byCategory: Record<string, RentalItem[]> = {};
  for (const item of listings) {
    if (!byCategory[item.category_name]) byCategory[item.category_name] = [];
    byCategory[item.category_name].push(item);
  }
  const categoryEntries = Object.entries(byCategory).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link href="/browse" className="hover:text-gray-700">Browse</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{company.business_name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Main ── */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 shrink-0">
              {company.business_name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{company.business_name}</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                <span>{company.listing_count} listing{company.listing_count !== 1 ? "s" : ""}</span>
                {company.category_count > 0 && <span>· {company.category_count} categories</span>}
                {company.service_area_count > 0 && <span>· {company.service_area_count} service areas</span>}
              </div>
            </div>
          </div>

          {/* Listings grouped by category */}
          {categoryEntries.length === 0 ? (
            <p className="text-gray-400 text-sm py-10 text-center">No listings available.</p>
          ) : (
            <div className="space-y-12">
              {categoryEntries.map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {category}
                    <span className="ml-2 text-sm font-normal text-gray-400">({items.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {items.map((item) => <ItemCard key={item.listing_id} item={item} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24 space-y-6">
            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Contact</h3>
              <div className="space-y-2">
                {company.phone && (
                  <a href={`tel:${company.phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600">
                    <span>📞</span><span>{company.phone}</span>
                  </a>
                )}
                {company.email && (
                  <a href={`mailto:${company.email}`}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 truncate">
                    <span>✉️</span><span className="truncate">{company.email}</span>
                  </a>
                )}
                {company.business_site && (
                  <a href={company.business_site.startsWith("http") ? company.business_site : `https://${company.business_site}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
                    <span>🌐</span><span>Visit website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Social */}
            {(company.facebook_url || company.instagram_url || company.twitter_url || company.youtube_url) && (
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Social</h3>
                <div className="flex gap-3">
                  {company.facebook_url && (
                    <a href={company.facebook_url} target="_blank" rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-xl">f</a>
                  )}
                  {company.instagram_url && (
                    <a href={company.instagram_url} target="_blank" rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700 text-xl">📷</a>
                  )}
                  {company.youtube_url && (
                    <a href={company.youtube_url} target="_blank" rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 text-xl">▶</a>
                  )}
                </div>
              </div>
            )}

            {/* Service areas */}
            {serviceAreas.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Service Area</h3>
                <div className="flex flex-wrap gap-1.5">
                  {serviceAreas.map((area, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {area.city}{area.state ? `, ${area.state}` : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
