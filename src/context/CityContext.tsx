"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { detectCity } from "@/lib/geo";

interface CityContextType {
  city: string;
  loading: boolean;
  setCity: (city: string) => void;
}

const CityContext = createContext<CityContextType>({
  city: "",
  loading: true,
  setCity: () => {},
});

const CITY_KEY = "jumpfun_city";

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem(CITY_KEY);
    if (cached) {
      setCity(cached);
      setLoading(false);
      return;
    }
    detectCity().then((detected) => {
      const resolved = detected || "your area";
      setCity(resolved);
      if (detected) localStorage.setItem(CITY_KEY, detected);
      setLoading(false);
    });
  }, []);

  function persistCity(newCity: string) {
    setCity(newCity);
    localStorage.setItem(CITY_KEY, newCity);
  }

  return (
    <CityContext.Provider value={{ city, loading, setCity: persistCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
