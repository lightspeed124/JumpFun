// ── Supabase DB types (matching real schema) ──────────────────────────────

export interface Company {
  business_id: number;
  business_site: string;       // domain/slug, used as FK in other tables
  business_name: string;
  phone: string | null;
  email: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
  listing_count: number;
  category_count: number;
  service_area_count: number;
  service_areas?: ServiceArea[]; // populated via join
}

export interface RentalItem {
  listing_id: number;
  business_site: string;
  business_name: string;
  category_slug: string;
  category_name: string;
  title: string;
  base_price_amount: number | null;
  base_price_display: string | null;
  min_price_amount: number | null;
  max_price_amount: number | null;
  price_option_count: number;
  primary_image_url: string | null;
  primary_image_big_url: string | null;
  dimensions: string | null;
  space_needed: string | null;
  description: string | null;
  source_url: string | null;
  // populated via separate queries
  images?: ListingImage[];
  prices?: ListingPrice[];
}

export interface ListingImage {
  listing_id: number;
  image_url: string;
  image_big_url: string | null;
  alt_text: string | null;
  source: string | null;
}

export interface ListingPrice {
  listing_id: number;
  amount: number;
  display_value: string;
  label: string;
  currency_code: string | null;
}

export interface ServiceArea {
  business_site: string;
  city: string;
  state: string | null;
  country: string | null;
}

export interface CategorySummary {
  category_slug: string;
  category_name: string;
  listing_count: number;
}

// ── App-level types ───────────────────────────────────────────────────────

export interface Booking {
  id: string;
  itemIds: string[];
  eventDate: string;
  duration: "oneDay" | "overnight" | "threeDays";
  setupType: string;
  deliveryAddress: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  submittedAt: string;
  status: "pending";
}
