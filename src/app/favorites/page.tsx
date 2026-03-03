"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getFavorites, removeFavorite } from "@/lib/favorites";
import { rentalItems, companies, getCompanyById } from "@/lib/data";
import { RentalItem, Company } from "@/types";

interface GroupedItems {
  company: Company;
  byCategory: Record<string, RentalItem[]>;
}

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  function handleRemove(itemId: string) {
    removeFavorite(itemId);
    setFavoriteIds((prev) => prev.filter((id) => id !== itemId));
  }

  const favoriteItems = rentalItems.filter((i) => favoriteIds.includes(i.id));

  // Group by company, then by category
  const grouped: GroupedItems[] = companies
    .map((company) => {
      const companyItems = favoriteItems.filter((i) => i.companyId === company.id);
      if (companyItems.length === 0) return null;
      const byCategory: Record<string, RentalItem[]> = {};
      for (const item of companyItems) {
        if (!byCategory[item.category]) byCategory[item.category] = [];
        byCategory[item.category].push(item);
      }
      return { company, byCategory };
    })
    .filter(Boolean) as GroupedItems[];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Items</h1>
          <p className="text-gray-500 mt-1">
            {favoriteItems.length === 0
              ? "Items you save will appear here."
              : `${favoriteItems.length} item${favoriteItems.length !== 1 ? "s" : ""} saved`}
          </p>
        </div>
        {favoriteItems.length > 0 && (
          <Link
            href="/booking"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Book Selected →
          </Link>
        )}
      </div>

      {/* Empty state */}
      {favoriteItems.length === 0 && (
        <div className="text-center py-24 bg-gray-50 rounded-3xl">
          <div className="text-6xl mb-4">♡</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No saved items yet</h2>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Browse bounce houses, water slides, and more — tap the heart to save items here.
          </p>
          <Link
            href="/browse"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse Rentals
          </Link>
        </div>
      )}

      {/* Grouped list */}
      {grouped.map(({ company, byCategory }) => (
        <div key={company.id} className="mb-10">
          {/* Company header */}
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 relative shrink-0">
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <Link
                href={`/companies/${company.id}`}
                className="font-bold text-gray-900 hover:text-indigo-600 transition-colors"
              >
                {company.name}
              </Link>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span className="text-yellow-400">★</span>
                <span>{company.rating}</span>
                <span>· {company.reviewCount} reviews</span>
                <span>· {company.location}</span>
              </div>
            </div>
          </div>

          {/* Categories within company */}
          {Object.entries(byCategory).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {category}
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <FavoriteItemRow
                    key={item.id}
                    item={item}
                    company={company}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function FavoriteItemRow({
  item,
  company,
  onRemove,
}: {
  item: RentalItem;
  company: Company;
  onRemove: (id: string) => void;
}) {
  const priceOvernight = Math.round((item.price * 1.4) / 5) * 5;
  const priceThreeDays = Math.round((item.price * 2.5) / 5) * 5;

  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition-shadow">
      {/* Thumbnail */}
      <Link href={`/items/${item.id}`} className="shrink-0">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 relative">
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-cover hover:scale-105 transition-transform"
            sizes="80px"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/items/${item.id}`}>
          <h4 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1">
            {item.name}
          </h4>
        </Link>
        <p className="text-xs text-gray-400 mb-1">{item.category}</p>
        <div className="flex flex-wrap gap-1">
          {item.themes.slice(0, 3).map((t) => (
            <span key={t} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="text-right shrink-0 hidden sm:block">
        <div className="text-lg font-bold text-gray-900">${item.price}</div>
        <div className="text-xs text-gray-400">1 day</div>
        <div className="text-xs text-gray-400">
          ${priceOvernight} overnight · ${priceThreeDays} / 3 days
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 shrink-0">
        <Link
          href={`/booking?from=${item.id}`}
          className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Book
        </Link>
        <button
          onClick={() => onRemove(item.id)}
          className="text-xs text-red-400 hover:text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
