import Link from "next/link";
import Image from "next/image";
import { RentalItem } from "@/types";
import FavoriteButton from "@/components/FavoriteButton";

export default function ItemCard({ item }: { item: RentalItem }) {
  const imgSrc = item.primary_image_url ?? item.primary_image_big_url ?? null;
  const price = item.base_price_amount ?? item.min_price_amount;

  return (
    <Link href={`/items/${item.listing_id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-200 mb-3">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ filter: "saturate(1.08) contrast(1.04) brightness(1.02)" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-brand-blue-subtle">
            🎪
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {item.category_name}
          </span>
        </div>
        {/* Favourite button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton itemId={String(item.listing_id)} size="sm" />
        </div>
      </div>

      {/* Details */}
      <div className="px-1">
        <div className="flex justify-between items-start gap-2 mb-0.5">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">
            {item.title}
          </h3>
          <div className="text-right shrink-0">
            {price != null ? (
              <>
                <div className="text-base font-bold text-gray-900">${Math.round(price)}</div>
                <div className="text-xs text-gray-500">/ day</div>
              </>
            ) : (
              <div className="text-sm text-gray-400">Call for price</div>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-500 truncate">{item.business_name}</p>
      </div>
    </Link>
  );
}
