"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getFavorites } from "@/lib/favorites";
import { supabase } from "@/lib/supabase";
import { RentalItem, Booking } from "@/types";

const DURATION_LABELS: Record<string, string> = {
  oneDay: "One Day (10 am – 6 pm)",
  overnight: "Overnight",
  threeDays: "3 Days",
};

const SETUP_OPTIONS = ["Backyard", "Indoor / Garage", "Public Park", "Church / School", "Other"];

function BookingForm() {
  const searchParams = useSearchParams();
  const fromId = searchParams.get("from");

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [allItems, setAllItems] = useState<RentalItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [step, setStep] = useState(1);
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState<"oneDay" | "overnight" | "threeDays">("oneDay");
  const [setupType, setSetupType] = useState("");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      const favs = getFavorites();
      setFavoriteIds(favs);
      const preselect = fromId ? [...new Set([...favs, fromId])] : favs;
      setSelectedIds(preselect);
      const ids = preselect.map(Number).filter((n) => !isNaN(n));
      if (ids.length === 0) { setLoading(false); return; }
      const { data } = await supabase.from("app_listings").select("*").in("listing_id", ids);
      setAllItems((data as RentalItem[]) ?? []);
      setLoading(false);
    }
    load();
  }, [fromId]);

  const selectedItems = allItems.filter((i) => selectedIds.includes(String(i.listing_id)));
  const uniqueCompanies = [...new Set(selectedItems.map((i) => i.business_name))];
  const multiCompany = uniqueCompanies.length > 1;

  const subtotal = selectedItems.reduce((s, i) => s + (i.base_price_amount ?? 0), 0);
  const serviceFee = Math.round(subtotal * 0.1);

  function toggleItem(id: string) {
    setSelectedIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
    setWarningDismissed(false);
  }

  function handleSubmit() {
    const id = `PB-${Date.now().toString(36).toUpperCase()}`;
    const booking: Booking = {
      id, itemIds: selectedIds, eventDate, duration, setupType,
      deliveryAddress: address, contactName, contactPhone, contactEmail,
      submittedAt: new Date().toISOString(), status: "pending",
    };
    try {
      const existing = JSON.parse(localStorage.getItem("playbase_bookings") || "[]") as Booking[];
      localStorage.setItem("playbase_bookings", JSON.stringify([...existing, booking]));
    } catch { /**/ }
    setBookingId(id);
    setSubmitted(true);
  }

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">Loading…</div>;

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Booking Received!</h1>
        <p className="text-gray-600 mb-2">
          Your booking <span className="font-semibold text-indigo-600">#{bookingId}</span> has been received and will be confirmed shortly.
        </p>
        <p className="text-gray-500 text-sm mb-8">Confirmation sent to <span className="font-medium">{contactEmail}</span>.</p>
        <div className="bg-gray-50 rounded-2xl p-5 text-left mb-8 text-sm text-gray-700 space-y-1">
          <div><span className="font-medium">Date:</span> {eventDate}</div>
          <div><span className="font-medium">Duration:</span> {DURATION_LABELS[duration]}</div>
          <div><span className="font-medium">Setup:</span> {setupType}</div>
          <div><span className="font-medium">Items:</span> {selectedItems.map((i) => i.title).join(", ")}</div>
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/browse" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl">Browse More</Link>
          <Link href="/favorites" className="border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-gray-300">Saved Items</Link>
        </div>
      </div>
    );
  }

  if (allItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">♡</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">No saved items</h1>
        <p className="text-gray-500 mb-6">Save items to your favourites first, then come back to book.</p>
        <Link href="/browse" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl">Browse Rentals</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${s < step ? "bg-green-500 text-white" : s === step ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"}`}>
              {s < step ? "✓" : s}
            </div>
            <div className="text-xs font-medium text-gray-500 hidden sm:block">
              {s === 1 ? "Select Items" : s === 2 ? "Event Details" : "Contact & Confirm"}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? "bg-green-300" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">What would you like to rent?</h1>
          <p className="text-gray-500 text-sm mb-6">Select the items to include in this booking.</p>
          <div className="space-y-3 mb-6">
            {allItems.map((item) => {
              const checked = selectedIds.includes(String(item.listing_id));
              return (
                <label key={item.listing_id} className={`flex items-center gap-4 bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all ${checked ? "border-indigo-500 shadow-sm" : "border-gray-100 hover:border-gray-200"}`}>
                  <input type="checkbox" checked={checked} onChange={() => toggleItem(String(item.listing_id))} className="w-5 h-5 accent-indigo-600 shrink-0" />
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 relative shrink-0">
                    {item.primary_image_url
                      ? <Image src={item.primary_image_url} alt={item.title} fill className="object-cover" sizes="56px" unoptimized />
                      : <div className="w-full h-full flex items-center justify-center text-2xl">🎪</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 line-clamp-1">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.business_name} · {item.category_name}</div>
                  </div>
                  <div className="text-right shrink-0">
                    {item.base_price_amount != null
                      ? <><div className="font-bold text-gray-900">${Math.round(item.base_price_amount)}</div><div className="text-xs text-gray-400">/ day</div></>
                      : <div className="text-sm text-gray-400">Call</div>}
                  </div>
                </label>
              );
            })}
          </div>
          {multiCompany && !warningDismissed && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-xl shrink-0">⚠️</span>
                <div>
                  <div className="font-semibold text-amber-800 mb-1">Items from multiple companies selected</div>
                  <p className="text-sm text-amber-700 mb-2">These will be delivered by <strong>{uniqueCompanies.length} different companies</strong>: {uniqueCompanies.join(", ")}. We recommend ordering from a single company when possible.</p>
                  <button onClick={() => setWarningDismissed(true)} className="text-sm font-semibold text-amber-800 underline">I understand, continue →</button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{selectedIds.length} item{selectedIds.length !== 1 ? "s" : ""} selected</span>
            <button disabled={selectedIds.length === 0 || (multiCompany && !warningDismissed)} onClick={() => setStep(2)}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors">
              Next: Event Details →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Event Details</h1>
          <p className="text-gray-500 text-sm mb-6">Tell us about your event.</p>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date *</label>
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rental Duration *</label>
              <div className="grid grid-cols-3 gap-3">
                {(["oneDay", "overnight", "threeDays"] as const).map((d) => (
                  <label key={d} className={`flex flex-col items-center border-2 rounded-2xl p-4 cursor-pointer ${duration === d ? "border-indigo-500 bg-indigo-50" : "border-gray-100 hover:border-gray-200"}`}>
                    <input type="radio" name="duration" value={d} checked={duration === d} onChange={() => setDuration(d)} className="sr-only" />
                    <div className="font-semibold text-gray-900 text-sm">{d === "oneDay" ? "One Day" : d === "overnight" ? "Overnight" : "3 Days"}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{d === "oneDay" ? "10 am – 6 pm" : d === "overnight" ? "Eve through morning" : "Multi-day"}</div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Setup Location *</label>
              <div className="flex flex-wrap gap-2">
                {SETUP_OPTIONS.map((opt) => (
                  <button key={opt} type="button" onClick={() => setSetupType(opt)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${setupType === opt ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address *</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street address, city, state, ZIP" rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 resize-none" />
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-xl hover:bg-gray-100">← Back</button>
            <button disabled={!eventDate || !setupType || !address.trim()} onClick={() => setStep(3)}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors">
              Next: Contact Info →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Contact Info &amp; Confirm</h1>
          <p className="text-gray-500 text-sm mb-6">We&apos;ll use this to confirm your booking.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Jane Smith"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
              <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="(415) 555-1234"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="jane@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <div className="text-sm font-bold text-gray-900 mb-4">Order Summary</div>
            <div className="space-y-3 mb-4">
              {selectedItems.map((item) => (
                <div key={item.listing_id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 relative shrink-0">
                    {item.primary_image_url
                      ? <Image src={item.primary_image_url} alt={item.title} fill className="object-cover" sizes="40px" unoptimized />
                      : <div className="w-full h-full flex items-center justify-center">🎪</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.business_name}</div>
                  </div>
                  <div className="text-sm font-bold text-gray-900 shrink-0">
                    {item.base_price_amount != null ? `$${Math.round(item.base_price_amount)}` : "—"}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-gray-600"><span>Duration</span><span>{DURATION_LABELS[duration]}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery &amp; setup</span><span className="text-green-600 font-medium">Free</span></div>
              <div className="flex justify-between text-gray-600"><span>Service fee (10%)</span><span>${serviceFee}</span></div>
              <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-200">
                <span>Total (estimate)</span><span>${subtotal + serviceFee}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">Final pricing confirmed by the rental company. Not charged until confirmed.</p>
          </div>
          {multiCompany && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-sm text-amber-700">
              ⚠️ Reminder: items from <strong>{uniqueCompanies.length} different companies</strong> will be delivered separately.
            </div>
          )}
          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-xl hover:bg-gray-100">← Back</button>
            <button disabled={!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()} onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors">
              Submit Booking Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">Loading…</div>}>
      <BookingForm />
    </Suspense>
  );
}
