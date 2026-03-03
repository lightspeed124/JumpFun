import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "JumpFun — Book Bounce Houses & Party Rentals",
  description:
    "Find and book bounce houses, water slides, combos, and party rentals from top-rated local companies. Instant booking, transparent pricing, delivered to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-300 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎪</span>
                <span className="text-white font-bold text-lg">JumpFun</span>
              </div>
              <p className="text-sm text-gray-400">
                Your marketplace for bounce houses and party rentals from top-rated local companies.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Browse</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/browse?category=Bounce+Houses" className="hover:text-white">Bounce Houses</a></li>
                <li><a href="/browse?category=Water+Slides" className="hover:text-white">Water Slides</a></li>
                <li><a href="/browse?category=Combos" className="hover:text-white">Combos</a></li>
                <li><a href="/browse?category=Obstacle+Courses" className="hover:text-white">Obstacle Courses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Companies</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/companies/kidzz-star-jumpers" className="hover:text-white">Kidzz Star Jumpers</a></li>
                <li><a href="/companies/bay-area-bounce" className="hover:text-white">Bay Area Bounce</a></li>
                <li><a href="/companies/astro-jump-north-bay" className="hover:text-white">Astro Jump North Bay</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About JumpFun</a></li>
                <li><a href="#" className="hover:text-white">List Your Company</a></li>
                <li><a href="#" className="hover:text-white">Safety Standards</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
              © 2025 JumpFun. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
