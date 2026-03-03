const KEY = "playbase_favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function isFavorite(itemId: string): boolean {
  return getFavorites().includes(itemId);
}

export function addFavorite(itemId: string): void {
  const favs = getFavorites();
  if (!favs.includes(itemId)) {
    localStorage.setItem(KEY, JSON.stringify([...favs, itemId]));
  }
}

export function removeFavorite(itemId: string): void {
  localStorage.setItem(
    KEY,
    JSON.stringify(getFavorites().filter((id) => id !== itemId))
  );
}

/** Toggle favorite status; returns the new state (true = now saved). */
export function toggleFavorite(itemId: string): boolean {
  if (isFavorite(itemId)) {
    removeFavorite(itemId);
    return false;
  }
  addFavorite(itemId);
  return true;
}
