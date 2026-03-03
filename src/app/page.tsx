import Image from "next/image";
import Link from "next/link";
import { getListings } from "@/lib/data";
import ItemCard from "@/components/ItemCard";
import HeroSearch from "@/components/HeroSearch";

const QUICK_FILTERS = [
  { label: "Bounce Houses",    icon: "🏰", href: "/browse?category=Bounce+Houses" },
  { label: "Water Slides",     icon: "💦", href: "/browse?category=Water+Slides" },
  { label: "Combos",           icon: "⭐", href: "/browse?category=Combos" },
  { label: "Obstacle Courses", icon: "🏃", href: "/browse?category=Obstacle+Courses" },
  { label: "Concessions",      icon: "🍿", href: "/browse?category=Concessions" },
  { label: "Princess",         icon: "👸", href: "/browse?q=princess" },
  { label: "Dinosaur",         icon: "🦕", href: "/browse?q=dinosaur" },
  { label: "Superhero",        icon: "🦸", href: "/browse?q=superhero" },
  { label: "Tropical",         icon: "🌴", href: "/browse?q=tropical" },
  { label: "Sports",           icon: "⚽", href: "/browse?q=sports" },
  { label: "Tents",            icon: "⛺", href: "/browse?category=Tents" },
  { label: "Tables & Chairs",  icon: "🪑", href: "/browse?category=Tables+%26+Chairs" },
];

export default async function HomePage() {
  const featured = await getListings({ limit: 8 });

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[62vh] min-h-[480px]">
        <Image
          src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1600&q=80"
          alt="Kids party celebration"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-4">
            Bounce houses · water slides · party rentals
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
            Book the perfect rental
            <br className="hidden sm:block" />
            for your next party
          </h1>
          <HeroSearch />
          <p className="mt-5 text-sm text-white/75">
            Not sure what you need?{" "}
            <Link href="/plan" className="text-white font-semibold underline underline-offset-2 hover:text-white/90">
              Get Personalized Picks →
            </Link>
          </p>
        </div>
      </section>

      {/* Category strip */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto py-4 no-scrollbar">
            {QUICK_FILTERS.map((f) => (
              <Link key={f.label} href={f.href}
                className="flex flex-col items-center gap-1.5 shrink-0 text-gray-500 hover:text-gray-900 transition-colors group">
                <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{f.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap pb-1 border-b-2 border-transparent group-hover:border-gray-800 transition-colors">
                  {f.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Listings grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Popular rentals</h2>
          <Link href="/browse" className="text-sm font-semibold text-gray-700 underline underline-offset-2 hover:text-gray-900">
            Show all
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="text-gray-400 text-sm py-10 text-center">
            No listings available — check your Supabase connection or RLS policies.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
            {featured.map((item) => <ItemCard key={item.listing_id} item={item} />)}
          </div>
        )}
      </section>
    </div>
  );
}
