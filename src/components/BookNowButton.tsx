"use client";

import { useRouter } from "next/navigation";
import { addFavorite } from "@/lib/favorites";

// itemId is the string form of listing_id
export default function BookNowButton({ itemId }: { itemId: string }) {
  const router = useRouter();

  function handleClick() {
    addFavorite(itemId);
    router.push(`/booking?from=${itemId}`);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-4 rounded-xl transition-colors text-base"
    >
      Book Now
    </button>
  );
}
