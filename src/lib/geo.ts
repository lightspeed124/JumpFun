export interface CitySuggestion {
  name: string;
  state: string;
  country: string;
  display: string; // e.g. "Palo Alto, California"
}

export async function detectCity(): Promise<string> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) return "";
    const data = await res.json();
    return data.city || "";
  } catch {
    return "";
  }
}

export async function fetchCitySuggestions(query: string): Promise<CitySuggestion[]> {
  if (!query || query.length < 2) return [];
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&layer=city&limit=7&lang=en`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    const seen = new Set<string>();
    return (data.features || [])
      .map((f: { properties?: { name?: string; state?: string; country?: string } }) => {
        const name = f.properties?.name || "";
        const state = f.properties?.state || "";
        const country = f.properties?.country || "";
        const display = [name, state].filter(Boolean).join(", ");
        return { name, state, country, display };
      })
      .filter((c: CitySuggestion) => {
        if (!c.name || seen.has(c.display)) return false;
        seen.add(c.display);
        return true;
      });
  } catch {
    return [];
  }
}
