"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { RentalItem } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  city: string;
  date: string;
  kidsCount: string;  // "under10" | "10to20" | "20to50" | "50plus"
  ageRange: string;   // "toddler" | "kids" | "teens" | "mixed"
  eventType: string;  // "birthday" | "corporate" | "school" | "blockparty" | "other"
  setting: string;    // "outdoor" | "indoor" | "either"
  budget: string;     // "150" | "300" | "500" | "999"
  themes: string[];
}

interface ScoredItem {
  item: RentalItem;
  score: number;
  reasons: string[];
}

const INITIAL_FORM: FormData = {
  city: "",
  date: "",
  kidsCount: "",
  ageRange: "",
  eventType: "",
  setting: "",
  budget: "",
  themes: [],
};

// ─── Scoring Algorithm ────────────────────────────────────────────────────────

function scoreItems(items: RentalItem[], data: FormData): ScoredItem[] {
  const budgetMap: Record<string, number> = {
    "150": 150,
    "300": 300,
    "500": 500,
    "999": 9999,
  };
  const maxBudget = budgetMap[data.budget] ?? 9999;

  return items
    .map((item): ScoredItem => {
      let score = 0;
      const reasons: string[] = [];

      const cat = item.category_name.toLowerCase();
      const titleLow = item.title.toLowerCase();
      const descLow = (item.description ?? "").toLowerCase();
      const price = item.base_price_amount ?? item.min_price_amount;

      // ── Budget ──────────────────────────────────────────────────────────────
      if (price != null && price <= maxBudget) {
        score += 2;
      } else if (price != null && price > maxBudget) {
        score -= 4;
      } else {
        score += 1; // no price listed, neutral
      }

      // ── Event Type → Category ───────────────────────────────────────────────
      if (data.eventType === "birthday") {
        if (cat.includes("bounce")) {
          score += 3; reasons.push("Birthday party staple");
        } else if (cat.includes("combo")) {
          score += 2; reasons.push("Birthday party favorite");
        } else if (cat.includes("concession")) {
          score += 2; reasons.push("Perfect birthday add-on");
        } else if (cat.includes("water")) {
          score += 1;
        } else {
          score += 1;
        }
      } else if (data.eventType === "corporate") {
        if (cat.includes("obstacle")) {
          score += 4; reasons.push("Team-building activity");
        } else if (cat.includes("tent") || cat.includes("table") || cat.includes("chair")) {
          score += 3; reasons.push("Corporate event essential");
        } else if (cat.includes("concession")) {
          score += 2; reasons.push("Crowd-pleasing add-on");
        } else {
          score += 1;
        }
      } else if (data.eventType === "school") {
        if (cat.includes("obstacle")) {
          score += 4; reasons.push("School carnival hit");
        } else if (cat.includes("bounce") || cat.includes("combo")) {
          score += 2; reasons.push("School event favorite");
        } else if (cat.includes("concession")) {
          score += 2; reasons.push("Carnival concession");
        } else {
          score += 1;
        }
      } else if (data.eventType === "blockparty") {
        if (cat.includes("obstacle") || cat.includes("combo") || cat.includes("water")) {
          score += 3; reasons.push("Block party crowd-pleaser");
        } else if (cat.includes("tent") || cat.includes("table") || cat.includes("chair")) {
          score += 3; reasons.push("Block party essential");
        } else {
          score += 1;
        }
      } else {
        score += 1;
      }

      // ── Indoor / Outdoor ────────────────────────────────────────────────────
      if (data.setting === "indoor") {
        if (cat.includes("water")) {
          score -= 4;
        } else if (cat.includes("bounce") || cat.includes("combo") || cat.includes("obstacle")) {
          score += 1;
          reasons.push("Works indoors");
        }
      } else if (data.setting === "outdoor") {
        if (cat.includes("tent")) {
          score += 1; reasons.push("Provides outdoor shade");
        }
        if (cat.includes("water")) {
          score += 1; reasons.push("Outdoor summer fun");
        }
      }

      // ── Age Range ───────────────────────────────────────────────────────────
      if (data.ageRange === "toddler") {
        if (titleLow.includes("toddler") || descLow.includes("toddler")) {
          score += 4; reasons.push("Toddler-safe design");
        } else if (cat.includes("concession") || cat.includes("tent")) {
          score += 1;
        }
      } else if (data.ageRange === "teens") {
        if (cat.includes("obstacle") || cat.includes("water") || cat.includes("game")) {
          score += 3; reasons.push("Teen-friendly activity");
        }
      } else if (data.ageRange === "mixed") {
        if (cat.includes("combo")) {
          score += 2; reasons.push("Fits mixed age groups");
        } else {
          score += 1;
        }
      }

      // ── Theme Match (keyword search in title/description) ───────────────────
      if (data.themes.length > 0) {
        const hit = data.themes.find(
          (t) => titleLow.includes(t.toLowerCase()) || descLow.includes(t.toLowerCase())
        );
        if (hit) {
          score += 3; reasons.push(`${hit} themed`);
        }
      }

      return { item, score, reasons };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

// ─── Selectable Card ──────────────────────────────────────────────────────────

function OptionCard({
  value,
  selected,
  icon,
  label,
  description,
  onClick,
}: {
  value: string;
  selected: boolean;
  icon: string;
  label: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-4 rounded-2xl border-2 text-center transition-all w-full ${
        selected
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-gray-200 hover:border-indigo-300 text-gray-700 bg-white"
      }`}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-sm font-semibold leading-tight">{label}</span>
      {description && (
        <span className="text-xs text-gray-400 leading-tight">{description}</span>
      )}
    </button>
  );
}

// ─── Step Wrapper ─────────────────────────────────────────────────────────────

function StepCard({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextLabel = "Continue →",
  nextDisabled = false,
  skipLabel,
  onSkip,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  skipLabel?: string;
  onSkip?: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
      {subtitle && <p className="text-gray-500 text-sm mb-6">{subtitle}</p>}
      {!subtitle && <div className="mb-6" />}
      {children}
      <div className="flex items-center justify-between mt-8">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-3">
          {skipLabel && onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              {skipLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Theme options (curated, child/party-oriented) ────────────────────────────

const THEME_OPTIONS = [
  { value: "Princess", icon: "👸" },
  { value: "Disney", icon: "✨" },
  { value: "Barbie", icon: "🩷" },
  { value: "Frozen", icon: "❄️" },
  { value: "Unicorn", icon: "🦄" },
  { value: "Hello Kitty", icon: "🐱" },
  { value: "My Little Pony", icon: "🐴" },
  { value: "Superhero", icon: "🦸" },
  { value: "Batman", icon: "🦇" },
  { value: "Spider-Man", icon: "🕷️" },
  { value: "Dinosaur", icon: "🦕" },
  { value: "T-Rex", icon: "🦖" },
  { value: "Space", icon: "🚀" },
  { value: "Galaxy", icon: "🌌" },
  { value: "Jungle", icon: "🌿" },
  { value: "Safari", icon: "🦁" },
  { value: "Tropical", icon: "🌴" },
  { value: "Beach", icon: "🏖️" },
  { value: "Castle", icon: "🏰" },
  { value: "Adventure", icon: "🗺️" },
  { value: "Sports", icon: "⚽" },
  { value: "Summer", icon: "☀️" },
];

// ─── Results Card ─────────────────────────────────────────────────────────────

function ResultCard({ scored }: { scored: ScoredItem }) {
  const { item, reasons } = scored;
  const price = item.base_price_amount ?? item.min_price_amount;

  return (
    <Link href={`/items/${item.listing_id}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden">
        <div className="relative h-44 w-full bg-gray-100">
          {item.primary_image_url ? (
            <Image
              src={item.primary_image_url}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-indigo-50">🎪</div>
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
              {item.category_name}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h3>
            <div className="text-right shrink-0">
              {price != null ? (
                <>
                  <div className="text-base font-bold text-gray-900">${Math.round(price)}</div>
                  <div className="text-xs text-gray-400">/ day</div>
                </>
              ) : (
                <div className="text-sm text-gray-400">Call for price</div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-3">{item.business_name}</p>

          {/* Match reason tags */}
          {reasons.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {reasons.slice(0, 3).map((r) => (
                <span
                  key={r}
                  className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-medium"
                >
                  ✓ {r}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PlanPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [results, setResults] = useState<ScoredItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleTheme = (t: string) =>
    setForm((f) => ({
      ...f,
      themes: f.themes.includes(t)
        ? f.themes.filter((x) => x !== t)
        : [...f.themes, t],
    }));

  const submit = async () => {
    setLoading(true);
    try {
      const budgetMap: Record<string, number> = {
        "150": 150, "300": 300, "500": 500, "999": 9999,
      };
      const maxBudget = budgetMap[form.budget] ?? 9999;

      // Find business sites that serve the entered city
      let businessSites: string[] | null = null;
      if (form.city.trim()) {
        const { data: areas } = await supabase
          .from("app_service_areas")
          .select("business_site")
          .ilike("city", `%${form.city.trim()}%`);
        if (areas && areas.length > 0) {
          businessSites = [...new Set(areas.map((a: { business_site: string }) => a.business_site))];
        }
      }

      // Fetch listings
      let query = supabase.from("app_listings").select("*").limit(150);
      if (businessSites) {
        query = query.in("business_site", businessSites);
      }
      if (form.budget && form.budget !== "999") {
        query = query.lte("base_price_amount", maxBudget);
      }

      const { data } = await query;
      const items = (data as RentalItem[]) ?? [];
      setResults(scoreItems(items, form));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setResults(null);
    setStep(1);
  };

  // Build browse URL from form data for "See all matching" link
  const browseUrl = (() => {
    const p = new URLSearchParams();
    if (form.city) p.set("city", form.city);
    if (form.date) p.set("date", form.date);
    const budgetMap: Record<string, string> = { "150": "150", "300": "300", "500": "500" };
    if (form.budget && budgetMap[form.budget]) p.set("maxPrice", budgetMap[form.budget]);
    return `/browse?${p.toString()}`;
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Rental</h1>
          <p className="text-indigo-200">
            Answer a few quick questions and we&apos;ll recommend exactly what fits your event.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Progress dots */}
        {!results && !loading && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s < step
                      ? "bg-indigo-600 text-white"
                      : s === step
                      ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {s < step ? "✓" : s}
                </div>
                {s < 4 && (
                  <div
                    className={`h-0.5 w-8 transition-all ${
                      s < step ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="text-5xl mb-4 animate-bounce">🎪</div>
            <p className="text-gray-600 font-medium">Finding your perfect picks…</p>
          </div>
        )}

        {/* ── Step 1: Where & When ─────────────────────────────────────────── */}
        {!results && !loading && step === 1 && (
          <StepCard
            title="Where's the party?"
            subtitle="We'll show you companies that can actually deliver to you."
            onNext={() => setStep(2)}
            nextDisabled={!form.city.trim()}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 Your city or zip code
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="e.g. Palo Alto, San Jose, 94025"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                {form.city.trim() && (
                  <p className="text-xs mt-1.5 text-green-600 font-medium">
                    ✓ We&apos;ll find companies that deliver to {form.city}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📅 Event date <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          </StepCard>
        )}

        {/* ── Step 2: Event Details ────────────────────────────────────────── */}
        {!results && !loading && step === 2 && (
          <StepCard
            title="Tell us about the event"
            subtitle="This helps us recommend the right size and type of rental."
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            nextDisabled={!form.kidsCount || !form.ageRange || !form.eventType || !form.setting}
          >
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  How many kids will be attending?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "under10", icon: "👧", label: "Under 10" },
                    { value: "10to20", icon: "👦👦", label: "10 – 20" },
                    { value: "20to50", icon: "🧒🧒🧒", label: "20 – 50" },
                    { value: "50plus", icon: "🎪", label: "50+" },
                  ].map((o) => (
                    <OptionCard
                      key={o.value}
                      value={o.value}
                      icon={o.icon}
                      label={o.label}
                      selected={form.kidsCount === o.value}
                      onClick={() => set("kidsCount", o.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  What age group?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "toddler", icon: "🍼", label: "Toddlers", description: "Ages 1–5" },
                    { value: "kids", icon: "🎈", label: "Kids", description: "Ages 5–12" },
                    { value: "teens", icon: "🏃", label: "Teens", description: "Ages 12+" },
                    { value: "mixed", icon: "👨‍👩‍👧‍👦", label: "Mixed", description: "All ages" },
                  ].map((o) => (
                    <OptionCard
                      key={o.value}
                      value={o.value}
                      icon={o.icon}
                      label={o.label}
                      description={o.description}
                      selected={form.ageRange === o.value}
                      onClick={() => set("ageRange", o.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  What type of event?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { value: "birthday", icon: "🎂", label: "Birthday Party" },
                    { value: "school", icon: "🏫", label: "School / Carnival" },
                    { value: "corporate", icon: "🏢", label: "Corporate Event" },
                    { value: "blockparty", icon: "🏘️", label: "Block Party" },
                    { value: "other", icon: "🎉", label: "Other" },
                  ].map((o) => (
                    <OptionCard
                      key={o.value}
                      value={o.value}
                      icon={o.icon}
                      label={o.label}
                      selected={form.eventType === o.value}
                      onClick={() => set("eventType", o.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Indoor or outdoor?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "outdoor", icon: "☀️", label: "Outdoor" },
                    { value: "indoor", icon: "🏠", label: "Indoor" },
                    { value: "either", icon: "🤷", label: "Not sure yet" },
                  ].map((o) => (
                    <OptionCard
                      key={o.value}
                      value={o.value}
                      icon={o.icon}
                      label={o.label}
                      selected={form.setting === o.value}
                      onClick={() => set("setting", o.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </StepCard>
        )}

        {/* ── Step 3: Budget ───────────────────────────────────────────────── */}
        {!results && !loading && step === 3 && (
          <StepCard
            title="What's your budget?"
            subtitle="This is for the rental items only — delivery and setup are free."
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
            nextDisabled={!form.budget}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { value: "150", icon: "💵", label: "Under $150", description: "Concessions, small bounce houses" },
                { value: "300", icon: "💵💵", label: "Up to $300", description: "Most bounce houses & combos" },
                { value: "500", icon: "💵💵💵", label: "Up to $500", description: "Obstacle courses, water slides" },
                { value: "999", icon: "🎪", label: "No limit", description: "Show me everything" },
              ].map((o) => (
                <OptionCard
                  key={o.value}
                  value={o.value}
                  icon={o.icon}
                  label={o.label}
                  description={o.description}
                  selected={form.budget === o.value}
                  onClick={() => set("budget", o.value)}
                />
              ))}
            </div>
          </StepCard>
        )}

        {/* ── Step 4: Themes (Optional) ────────────────────────────────────── */}
        {!results && !loading && step === 4 && (
          <StepCard
            title="Any theme in mind?"
            subtitle="Optional — skip if you don't have a theme yet."
            onNext={submit}
            onBack={() => setStep(3)}
            nextLabel="See My Picks 🎉"
            skipLabel="Skip themes"
            onSkip={submit}
          >
            <div className="flex flex-wrap gap-2">
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => toggleTheme(t.value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-all ${
                    form.themes.includes(t.value)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                      : "border-gray-200 text-gray-600 hover:border-indigo-300 bg-white"
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.value}</span>
                </button>
              ))}
            </div>
            {form.themes.length > 0 && (
              <p className="text-xs text-indigo-600 mt-3 font-medium">
                {form.themes.length} theme{form.themes.length !== 1 ? "s" : ""} selected
              </p>
            )}
          </StepCard>
        )}

        {/* ── Results ──────────────────────────────────────────────────────── */}
        {results && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {results.length > 0
                    ? `Your top ${results.length} picks`
                    : "No matches found"}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  {form.city
                    ? `Rentals delivered to ${form.city}`
                    : "Based on your event details"}
                  {form.eventType &&
                    ` · ${
                      {
                        birthday: "Birthday party",
                        corporate: "Corporate event",
                        school: "School event",
                        blockparty: "Block party",
                        other: "Event",
                      }[form.eventType]
                    }`}
                </p>
              </div>
              <button
                onClick={reset}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ← Start over
              </button>
            </div>

            {results.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <div className="text-5xl mb-3">🎈</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No exact matches
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                  Your filters were very specific. Try adjusting your budget or
                  removing the theme selection.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={reset}
                    className="text-sm bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700"
                  >
                    Try Again
                  </button>
                  <Link
                    href="/browse"
                    className="text-sm border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50"
                  >
                    Browse All
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  {results.map((s) => (
                    <ResultCard key={s.item.listing_id} scored={s} />
                  ))}
                </div>

                <div className="text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <p className="text-gray-600 text-sm mb-4">
                    Want to see all available rentals with your preferences applied?
                  </p>
                  <Link
                    href={browseUrl}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
                  >
                    Browse All Matching Rentals →
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
