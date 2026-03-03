import { supabase } from "./supabase";
import type {
  Company,
  RentalItem,
  ListingImage,
  ListingPrice,
  ServiceArea,
  CategorySummary,
} from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// COMPANIES
// ─────────────────────────────────────────────────────────────────────────────

export async function getCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from("app_businesses")
    .select("*")
    .order("business_name");
  if (error) { console.error("getCompanies:", error.message); return []; }
  return data as Company[];
}

export async function getCompanyById(id: number): Promise<Company | null> {
  const { data, error } = await supabase
    .from("app_businesses")
    .select("*")
    .eq("business_id", id)
    .single();
  if (error) { console.error("getCompanyById:", error.message); return null; }
  return data as Company;
}

export async function getCompanyBySite(site: string): Promise<Company | null> {
  const { data, error } = await supabase
    .from("app_businesses")
    .select("*")
    .eq("business_site", site)
    .single();
  if (error) { console.error("getCompanyBySite:", error.message); return null; }
  return data as Company;
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE AREAS
// ─────────────────────────────────────────────────────────────────────────────

export async function getServiceAreasByBusiness(site: string): Promise<ServiceArea[]> {
  const { data, error } = await supabase
    .from("app_service_areas")
    .select("business_site, city, state, country")
    .eq("business_site", site)
    .order("city");
  if (error) { console.error("getServiceAreasByBusiness:", error.message); return []; }
  return data as ServiceArea[];
}

export async function getBusinessSitesByCity(city: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("app_service_areas")
    .select("business_site")
    .ilike("city", `%${city}%`);
  if (error) { console.error("getBusinessSitesByCity:", error.message); return []; }
  return [...new Set((data ?? []).map((r: { business_site: string }) => r.business_site))];
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

export async function getDistinctCategories(): Promise<CategorySummary[]> {
  const { data, error } = await supabase
    .from("app_categories")
    .select("category_slug, category_name, listing_count");
  if (error) { console.error("getDistinctCategories:", error.message); return []; }
  const map = new Map<string, CategorySummary>();
  for (const row of data as CategorySummary[]) {
    const existing = map.get(row.category_slug);
    if (existing) {
      existing.listing_count += row.listing_count;
    } else {
      map.set(row.category_slug, { ...row });
    }
  }
  return [...map.values()].sort((a, b) => b.listing_count - a.listing_count);
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTINGS
// ─────────────────────────────────────────────────────────────────────────────

export interface ListingFilters {
  businessSite?: string;
  categoryName?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  limit?: number;
}

export async function getListings(filters: ListingFilters = {}): Promise<RentalItem[]> {
  let query = supabase.from("app_listings").select("*");

  if (filters.businessSite) query = query.eq("business_site", filters.businessSite);
  if (filters.categoryName) query = query.ilike("category_name", filters.categoryName);
  if (filters.search) {
    const q = filters.search;
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,category_name.ilike.%${q}%`);
  }
  if (filters.minPrice !== undefined) query = query.gte("base_price_amount", filters.minPrice);
  if (filters.maxPrice !== undefined) query = query.lte("base_price_amount", filters.maxPrice);
  if (filters.city) {
    const sites = await getBusinessSitesByCity(filters.city);
    if (sites.length === 0) return [];
    query = query.in("business_site", sites);
  }

  query = query.order("title").limit(filters.limit ?? 200);
  const { data, error } = await query;
  if (error) { console.error("getListings:", error.message); return []; }
  return data as RentalItem[];
}

export async function getListingById(id: number): Promise<RentalItem | null> {
  const { data, error } = await supabase
    .from("app_listings")
    .select("*")
    .eq("listing_id", id)
    .single();
  if (error) { console.error("getListingById:", error.message); return null; }
  return data as RentalItem;
}

export async function getListingsByBusiness(
  site: string,
  excludeId?: number,
  limit = 60
): Promise<RentalItem[]> {
  let query = supabase
    .from("app_listings")
    .select("*")
    .eq("business_site", site)
    .order("category_name,title")
    .limit(limit);
  if (excludeId !== undefined) query = query.neq("listing_id", excludeId);
  const { data, error } = await query;
  if (error) { console.error("getListingsByBusiness:", error.message); return []; }
  return data as RentalItem[];
}

export async function getSimilarListings(
  categoryName: string,
  excludeSite: string,
  limit = 3
): Promise<RentalItem[]> {
  const { data, error } = await supabase
    .from("app_listings")
    .select("*")
    .ilike("category_name", categoryName)
    .neq("business_site", excludeSite)
    .order("title")
    .limit(limit);
  if (error) { console.error("getSimilarListings:", error.message); return []; }
  return data as RentalItem[];
}

const COMPLEMENT_SLUGS = ["concession", "table", "chair", "tent", "game", "accessory", "food"];

export async function getComplementaryListings(
  item: RentalItem,
  limit = 4
): Promise<RentalItem[]> {
  const { data, error } = await supabase
    .from("app_listings")
    .select("*")
    .eq("business_site", item.business_site)
    .neq("listing_id", item.listing_id)
    .order("category_name")
    .limit(limit * 3);
  if (error) { console.error("getComplementaryListings:", error.message); return []; }
  const all = data as RentalItem[];
  all.sort((a, b) => {
    const aComp = COMPLEMENT_SLUGS.some((s) => a.category_slug.toLowerCase().includes(s)) ? 0 : 1;
    const bComp = COMPLEMENT_SLUGS.some((s) => b.category_slug.toLowerCase().includes(s)) ? 0 : 1;
    return aComp - bComp;
  });
  return all.slice(0, limit);
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES & PRICES
// ─────────────────────────────────────────────────────────────────────────────

export async function getListingImages(listingId: number): Promise<ListingImage[]> {
  const { data, error } = await supabase
    .from("app_listing_images")
    .select("listing_id, image_url, image_big_url, alt_text, source")
    .eq("listing_id", listingId);
  if (error) { console.error("getListingImages:", error.message); return []; }
  return data as ListingImage[];
}

export async function getListingPrices(listingId: number): Promise<ListingPrice[]> {
  const { data, error } = await supabase
    .from("app_listing_prices")
    .select("listing_id, amount, display_value, label, currency_code")
    .eq("listing_id", listingId)
    .order("amount");
  if (error) { console.error("getListingPrices:", error.message); return []; }
  return data as ListingPrice[];
}

export async function getListingsByIds(ids: number[]): Promise<RentalItem[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase
    .from("app_listings")
    .select("*")
    .in("listing_id", ids);
  if (error) { console.error("getListingsByIds:", error.message); return []; }
  return data as RentalItem[];
}
