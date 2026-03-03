"use client";

import { useRouter } from "next/navigation";
import { addFavorite } from "@/lib/favorites";

export default function BookNowButton({ itemId }: { itemId: string }) {
  const router = useRouter();

  function handleClick() {
    addFavorite(itemId);
    router.push(`/booking?from=${itemId}`);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors text-base"
    >
      Book Now
    </button>
  );
}
