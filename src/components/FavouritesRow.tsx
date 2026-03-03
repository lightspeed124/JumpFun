"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites } from "@/lib/favorites";
import ItemCard from "@/components/ItemCard";
import type { RentalItem } from "@/types";

export default function FavouritesRow() {
  const [items, setItems] = useState<RentalItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const ids = getFavorites();
    if (ids.length === 0) { setLoaded(true); return; }

    fetch(`/api/listings?ids=${ids.join(",")}`)
      .then((r) => r.json())
      .then((data: RentalItem[]) => {
        // preserve saved order
        const ordered = ids
          .map((id) => data.find((d) => String(d.listing_id) === id))
          .filter(Boolean) as RentalItem[];
        setItems(ordered);
      })
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || items.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-xl">♥</span>
          <h2 className="text-xl font-bold text-gray-900">Your Saved Items</h2>
          <span className="text-sm text-gray-400 font-medium">({items.length})</span>
        </div>
        <Link
          href="/favorites"
          className="text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors shrink-0"
        >
          View all →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {items.map((item) => (
          <div key={item.listing_id} className="w-60 shrink-0">
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
