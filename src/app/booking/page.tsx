"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getFavorites } from "@/lib/favorites";
import { rentalItems, getCompanyById } from "@/lib/data";
import { RentalItem, Company, Booking } from "@/types";

// ─── Pricing helpers ────────────────────────────────────────────────────────
function tierPrice(basePrice: number, duration: string): number {
  if (duration === "overnight") return Math.round((basePrice * 1.4) / 5) * 5;
  if (duration === "threeDays") return Math.round((basePrice * 2.5) / 5) * 5;
  return basePrice;
}

const DURATION_LABELS: Record<string, string> = {
  oneDay: "One Day (10 am – 6 pm)",
  overnight: "Overnight",
  threeDays: "3 Days",
};

const SETUP_OPTIONS = [
  "Backyard",
  "Indoor / Garage",
  "Public Park",
  "Church / School",
  "Other",
];

// ─── BookingForm inner component ─────────────────────────────────────────────
function BookingForm() {
  const searchParams = useSearchParams();
  const fromItemId = searchParams.get("from");

  const [step, setStep] = useState(1);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [multiCompanyWarningDismissed, setMultiCompanyWarningDismissed] =
    useState(false);

  // Step 2
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState<"oneDay" | "overnight" | "threeDays">("oneDay");
  const [setupType, setSetupType] = useState("");
  const [address, setAddress] = useState("");

  // Step 3
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Confirmation
  const [bookingId, setBookingId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    const favs = getFavorites();
    setFavoriteIds(favs);
    // Pre-select: from-item + all saved items
    setSelectedIds(favs.length > 0 ? favs : fromItemId ? [fromItemId] : []);
  }, [fromItemId]);

  const allItems = rentalItems.filter((i) => favoriteIds.includes(i.id));
  const selectedItems = rentalItems.filter((i) => selectedIds.includes(i.id));

  // Check if selected items span multiple companies
  const selectedCompanyIds = [...new Set(selectedItems.map((i) => i.companyId))];
  const multiCompany = selectedCompanyIds.length > 1;

  function toggleItem(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setMultiCompanyWarningDismissed(false);
  }

  // ── Totals ──
  const subtotal = selectedItems.reduce((sum, i) => sum + tierPrice(i.price, duration), 0);
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  // ── Step validation ──
  function canProceedStep1() {
    return selectedIds.length > 0 && (!multiCompany || multiCompanyWarningDismissed);
  }
  function canProceedStep2() {
    return eventDate !== "" && duration !== undefined && setupType !== "" && address.trim() !== "";
  }
  function canProceedStep3() {
    return (
      contactName.trim() !== "" &&
      contactPhone.trim() !== "" &&
      contactEmail.trim() !== ""
    );
  }

  // ── Submit ──
  function handleSubmit() {
    const id = `PB-${Date.now().toString(36).toUpperCase()}`;
    const booking: Booking = {
      id,
      itemIds: selectedIds,
      eventDate,
      duration,
      setupType,
      deliveryAddress: address,
      contactName,
      contactPhone,
      contactEmail,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };
    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("playbase_bookings") || "[]") as Booking[];
      localStorage.setItem("playbase_bookings", JSON.stringify([...existing, booking]));
    } catch {
      /* ignore */
    }
    setBookingId(id);
    setSubmitted(true);
  }

  // ── Confirmation screen ──
  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Booking Received!</h1>
        <p className="text-gray-600 mb-2">
          Your booking request <span className="font-semibold text-indigo-600">#{bookingId}</span> has
          been received, will be reviewed, and confirmed shortly.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          A confirmation will be sent to <span className="font-medium">{contactEmail}</span>.
        </p>
        <div className="bg-gray-50 rounded-2xl p-5 text-left mb-8">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Booking Summary
          </div>
          <div className="space-y-1 text-sm text-gray-700">
            <div>
              <span className="font-medium">Date:</span> {eventDate}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {DURATION_LABELS[duration]}
            </div>
            <div>
              <span className="font-medium">Setup:</span> {setupType}
            </div>
            <div>
              <span className="font-medium">Address:</span> {address}
            </div>
            <div>
              <span className="font-medium">Items:</span>{" "}
              {selectedItems.map((i) => i.name).join(", ")}
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Link
            href="/browse"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse More
          </Link>
          <Link
            href="/favorites"
            className="border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            My Saved Items
          </Link>
        </div>
      </div>
    );
  }

  // ── Empty favorites ──
  if (favoriteIds.length === 0 && !fromItemId) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">♡</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">No saved items</h1>
        <p className="text-gray-500 mb-6">
          Save items to your favourites first, then come back to book.
        </p>
        <Link
          href="/browse"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Browse Rentals
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                s < step
                  ? "bg-green-500 text-white"
                  : s === step
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {s < step ? "✓" : s}
            </div>
            <div className="text-xs font-medium text-gray-500 hidden sm:block">
              {s === 1 ? "Select Items" : s === 2 ? "Event Details" : "Contact & Confirm"}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? "bg-green-300" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* ─── Step 1: Select items ─── */}
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">What would you like to rent?</h1>
          <p className="text-gray-500 text-sm mb-6">
            Select the items you want to include in this booking.
          </p>

          {allItems.length === 0 ? (
            <p className="text-gray-500 text-sm">No favourited items found.</p>
          ) : (
            <div className="space-y-3 mb-6">
              {allItems.map((item) => {
                const company = getCompanyById(item.companyId);
                const checked = selectedIds.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className={`flex items-center gap-4 bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                      checked
                        ? "border-indigo-500 shadow-sm"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleItem(item.id)}
                      className="w-5 h-5 accent-indigo-600 shrink-0"
                    />
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 relative shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 line-clamp-1">{item.name}</div>
                      <div className="text-xs text-gray-400">
                        {company?.name} · {item.category}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-gray-900">${item.price}</div>
                      <div className="text-xs text-gray-400">/ day</div>
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {/* Multi-company warning */}
          {multiCompany && !multiCompanyWarningDismissed && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-xl shrink-0">⚠️</span>
                <div className="flex-1">
                  <div className="font-semibold text-amber-800 mb-1">
                    Items from multiple companies selected
                  </div>
                  <p className="text-sm text-amber-700 mb-3">
                    Your selected items will be delivered by{" "}
                    <strong>{selectedCompanyIds.length} different companies</strong>. Each company
                    will contact you separately and may have different delivery windows.
                    We recommend ordering from a single company when possible.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedCompanyIds.map((cid) => {
                      const c = getCompanyById(cid);
                      if (!c) return null;
                      const itemsFromCompany = selectedItems.filter((i) => i.companyId === cid);
                      return (
                        <span key={cid} className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                          {c.name} ({itemsFromCompany.length} item{itemsFromCompany.length !== 1 ? "s" : ""})
                        </span>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setMultiCompanyWarningDismissed(true)}
                    className="mt-3 text-sm font-semibold text-amber-800 underline"
                  >
                    I understand, continue anyway →
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedIds.length} item{selectedIds.length !== 1 ? "s" : ""} selected
            </div>
            <button
              disabled={!canProceedStep1()}
              onClick={() => setStep(2)}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Next: Event Details →
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 2: Event details ─── */}
      {step === 2 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Event Details</h1>
          <p className="text-gray-500 text-sm mb-6">Tell us about your event so we can prepare.</p>

          <div className="space-y-5">
            {/* Event date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rental Duration *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["oneDay", "overnight", "threeDays"] as const).map((d) => (
                  <label
                    key={d}
                    className={`flex flex-col items-center border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                      duration === d ? "border-indigo-500 bg-indigo-50" : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={d}
                      checked={duration === d}
                      onChange={() => setDuration(d)}
                      className="sr-only"
                    />
                    <div className="font-semibold text-gray-900 text-sm">
                      {d === "oneDay" ? "One Day" : d === "overnight" ? "Overnight" : "3 Days"}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {d === "oneDay" ? "10 am – 6 pm" : d === "overnight" ? "Eve through morning" : "Multi-day event"}
                    </div>
                    <div className="text-sm font-bold text-indigo-600 mt-2">
                      from ${selectedItems.length > 0 ? tierPrice(selectedItems[0].price, d) : "—"}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Setup type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Setup Location *
              </label>
              <div className="flex flex-wrap gap-2">
                {SETUP_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSetupType(opt)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                      setupType === opt
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Address *
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, city, state, ZIP"
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(1)}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              ← Back
            </button>
            <button
              disabled={!canProceedStep2()}
              onClick={() => setStep(3)}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Next: Contact Info →
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 3: Contact info + review ─── */}
      {step === 3 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Contact Info &amp; Confirm</h1>
          <p className="text-gray-500 text-sm mb-6">
            We&apos;ll use this to confirm your booking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="(415) 555-1234"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <div className="text-sm font-bold text-gray-900 mb-4">Order Summary</div>

            <div className="space-y-3 mb-4">
              {selectedItems.map((item) => {
                const company = getCompanyById(item.companyId);
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 relative shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</div>
                      <div className="text-xs text-gray-400">{company?.name}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900 shrink-0">
                      ${tierPrice(item.price, duration)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Duration</span>
                <span>{DURATION_LABELS[duration]}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery &amp; setup</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service fee (10%)</span>
                <span>${serviceFee}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-200">
                <span>Total (estimate)</span>
                <span>${total}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Final pricing confirmed by the rental company. You won&apos;t be charged until confirmed.
            </p>
          </div>

          {multiCompany && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-sm text-amber-700">
              ⚠️ Reminder: your items will be delivered by{" "}
              <strong>{selectedCompanyIds.length} different companies</strong>.
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              ← Back
            </button>
            <button
              disabled={!canProceedStep3()}
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Submit Booking Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page (wraps in Suspense for useSearchParams) ────────────────────────────
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">Loading…</div>}>
      <BookingForm />
    </Suspense>
  );
}
