import Link from "next/link";
import Image from "next/image";
import { RentalItem, Company } from "@/types";
import FavoriteButton from "@/components/FavoriteButton";

interface Props {
  item: RentalItem;
  company: Company;
}

export default function ItemCard({ item, company }: Props) {
  return (
    <Link href={`/items/${item.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!item.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-800 font-semibold px-3 py-1 rounded-full text-sm">
                Unavailable
              </span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
              {item.category}
            </span>
          </div>
          {/* Favorite heart button */}
          <div className="absolute top-3 right-3">
            <FavoriteButton itemId={item.id} size="sm" />
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
              {item.name}
            </h3>
            <div className="text-right shrink-0">
              <div className="text-lg font-bold text-gray-900">${item.price}</div>
              <div className="text-xs text-gray-500">/ day</div>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs font-medium text-gray-700">{company.rating}</span>
            <span className="text-xs text-gray-400">({company.reviewCount})</span>
            <span className="text-gray-300 mx-1">·</span>
            <span className="text-xs text-gray-500 truncate">{company.name}</span>
          </div>

          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {item.themes.slice(0, 3).map((theme) => (
              <span
                key={theme}
                className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full"
              >
                {theme}
              </span>
            ))}
            {item.themes.length > 3 && (
              <span className="text-xs text-gray-400">+{item.themes.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
