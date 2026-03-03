"use client";

import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

interface Props {
  itemId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function FavoriteButton({ itemId, size = "md", className = "" }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(itemId));
  }, [itemId]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleFavorite(itemId));
  }

  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-lg",
    lg: "w-12 h-12 text-xl",
  }[size];

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? "Remove from favorites" : "Save to favorites"}
      title={saved ? "Remove from favorites" : "Save to favorites"}
      className={`${sizeClasses} flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow hover:scale-110 transition-transform border border-white/60 ${className}`}
    >
      <span className={saved ? "text-red-500" : "text-gray-400"}>
        {saved ? "♥" : "♡"}
      </span>
    </button>
  );
}
