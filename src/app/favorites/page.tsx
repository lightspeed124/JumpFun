"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getFavorites, removeFavorite } from "@/lib/favorites";
import { supabase } from "@/lib/supabase";
import { RentalItem } from "@/types";

export default function FavoritesPage() {
  const [items, setItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFavorites() {
    const ids = getFavorites().map(Number).filter((n) => !isNaN(n));
    if (ids.length === 0) { setItems([]); setLoading(false); return; }
    const { data } = await supabase
      .from("app_listings")
      .select("*")
      .in("listing_id", ids);
    setItems((data as RentalItem[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { loadFavorites(); }, []);

  function handleRemove(id: number) {
    removeFavorite(String(id));
    setItems((prev) => prev.filter((i) => i.listing_id !== id));
  }

  // Group by business_name, then category_name
  const grouped: Record<string, Record<string, RentalItem[]>> = {};
  for (const item of items) {
    if (!grouped[item.business_name]) grouped[item.business_name] = {};
    if (!grouped[item.business_name][item.category_name]) grouped[item.business_name][item.category_name] = [];
    grouped[item.business_name][item.category_name].push(item);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Items</h1>
          <p className="text-gray-500 mt-1">
            {loading ? "Loading…" : items.length === 0
              ? "Items you save will appear here."
              : `${items.length} item${items.length !== 1 ? "s" : ""} saved`}
          </p>
        </div>
        {items.length > 0 && (
          <Link href="/booking"
            className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
            Book Selected →
          </Link>
        )}
      </div>

      {!loading && items.length === 0 && (
        <div className="text-center py-24 bg-gray-50 rounded-3xl">
          <div className="text-6xl mb-4">♡</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No saved items yet</h2>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Browse rentals and tap ♡ to save items here.
          </p>
          <Link href="/browse"
            className="inline-block bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold px-6 py-3 rounded-xl">
            Browse Rentals
          </Link>
        </div>
      )}

      {Object.entries(grouped).map(([bizName, categories]) => (
        <div key={bizName} className="mb-10">
          <h2 className="font-bold text-gray-900 text-lg mb-1 pb-2 border-b border-gray-100">{bizName}</h2>
          {Object.entries(categories).map(([cat, catItems]) => (
            <div key={cat} className="mt-4 mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{cat}</h3>
              <div className="space-y-3">
                {catItems.map((item) => (
                  <div key={item.listing_id}
                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition-shadow">
                    <Link href={`/items/${item.listing_id}`} className="shrink-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 relative">
                        {item.primary_image_url ? (
                          <Image src={item.primary_image_url} alt={item.title} fill className="object-cover" sizes="80px" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">🎪</div>
                        )}
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/items/${item.listing_id}`}>
                        <h4 className="font-semibold text-gray-900 hover:text-brand-blue transition-colors line-clamp-1">{item.title}</h4>
                      </Link>
                      <p className="text-xs text-gray-400">{item.category_name}</p>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      {item.base_price_amount != null ? (
                        <>
                          <div className="text-lg font-bold text-gray-900">${Math.round(item.base_price_amount)}</div>
                          <div className="text-xs text-gray-400">/ day</div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-400">Call for price</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link href={`/booking?from=${item.listing_id}`}
                        className="text-xs bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                        Book
                      </Link>
                      <button onClick={() => handleRemove(item.listing_id)}
                        className="text-xs text-red-400 hover:text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
