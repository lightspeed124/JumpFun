"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const StickySearchContext = createContext({
  sticky: false,
  setSticky: (_: boolean) => {},
});

export function StickySearchProvider({ children }: { children: ReactNode }) {
  const [sticky, setSticky] = useState(false);
  return (
    <StickySearchContext.Provider value={{ sticky, setSticky }}>
      {children}
    </StickySearchContext.Provider>
  );
}

export const useStickySearch = () => useContext(StickySearchContext);
