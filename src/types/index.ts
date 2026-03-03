export type Category =
  | "Bounce Houses"
  | "Water Slides"
  | "Combos"
  | "Obstacle Courses"
  | "Games"
  | "Concessions"
  | "Tents"
  | "Tables & Chairs"
  | "Accessories";

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  yearsInBusiness: number;
  rating: number;
  reviewCount: number;
  location: string;
  serviceArea: string[];
  phone: string;
  email: string;
  website: string;
  verified: boolean;
  insuranceCertified: boolean;
}

export interface RentalItem {
  id: string;
  companyId: string;
  name: string;
  slug: string;
  category: Category;
  themes: string[];
  description: string;
  dimensions: string;
  capacity: number;
  ageRange: string;
  setupTime: number; // minutes
  price: number; // flat day rate
  images: string[];
  available: boolean;
  features: string[];
  safetyNotes: string;
  colors: string[];
  circuitsNeeded?: number;   // electrical outlets required
  spaceRequired?: string;    // minimum clear area for setup
}

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
