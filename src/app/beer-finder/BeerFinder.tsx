"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { stores as allStores, storeTypes, type Store, type StoreType } from "@/data/stores";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <p className="text-sm text-gray-400">Loading map…</p>
    </div>
  ),
});

// Haversine distance in miles
function distance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const DEFAULT_CENTER: [number, number] = [39.75, -74.18];
const DEFAULT_ZOOM = 9;
const RADIUS_OPTIONS = [10, 25, 50, 100];

type SortedStore = Store & { distance?: number };

export default function BeerFinder() {
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState(25);
  const [typeFilter, setTypeFilter] = useState<StoreType | "All">("All");
  const [searchCoords, setSearchCoords] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [activeStoreId, setActiveStoreId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Mobile only: which panel is visible
  const [mobileTab, setMobileTab] = useState<"list" | "map">("list");

  const filteredStores = useMemo<SortedStore[]>(() => {
    let list: SortedStore[] = allStores.map((s) => ({ ...s }));
    if (typeFilter !== "All") {
      list = list.filter((s) => s.type === typeFilter);
    }
    if (searchCoords) {
      list = list
        .map((s) => ({
          ...s,
          distance: distance(searchCoords[0], searchCoords[1], s.lat, s.lng),
        }))
        .filter((s) => s.distance! <= radius)
        .sort((a, b) => a.distance! - b.distance!);
    }
    return list;
  }, [searchCoords, radius, typeFilter]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!zip.trim()) return;
    setLoading(true);
    setError("");
    setActiveStoreId(null);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(zip)}&countrycodes=us&limit=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      if (!data.length) {
        setError("Zip code not found. Please try again.");
        setLoading(false);
        return;
      }
      const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      setSearchCoords(coords);
      setMapCenter(coords);
      setMapZoom(10);
    } catch {
      setError("Could not reach geocoding service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleStoreClick(id: number) {
    setActiveStoreId((prev) => (prev === id ? null : id));
    const store = allStores.find((s) => s.id === id);
    if (store) {
      setMapCenter([store.lat, store.lng]);
      setMapZoom(13);
      // On mobile, jump to the map so the user sees the popup
      setMobileTab("map");
    }
  }

  function handleClear() {
    setZip("");
    setSearchCoords(null);
    setMapCenter(DEFAULT_CENTER);
    setMapZoom(DEFAULT_ZOOM);
    setActiveStoreId(null);
    setError("");
  }

  const typeColors: Record<StoreType, string> = {
    "Bar & Restaurant": "bg-blue-100 text-blue-800",
    Restaurant: "bg-green-100 text-green-800",
    "Bar & Taproom": "bg-amber-100 text-amber-800",
    Retail: "bg-purple-100 text-purple-800",
    "Liquor Store": "bg-orange-100 text-orange-800",
  };

  return (
    // On mobile: fill the viewport below navbar + page header.
    // On desktop: fixed 700px side-by-side layout.
    <div className="flex flex-col h-[calc(100dvh-8.5rem)] lg:h-[700px] lg:flex-row">

      {/* ── Mobile tab bar (hidden on desktop) ── */}
      <div className="lg:hidden flex border-b border-sand-dark bg-white shrink-0">
        <button
          onClick={() => setMobileTab("list")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${
            mobileTab === "list"
              ? "text-navy-dark border-amber"
              : "text-gray-400 border-transparent"
          }`}
        >
          List
          <span className="ml-1.5 text-xs font-normal text-gray-400">
            ({filteredStores.length})
          </span>
        </button>
        <button
          onClick={() => setMobileTab("map")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${
            mobileTab === "map"
              ? "text-navy-dark border-amber"
              : "text-gray-400 border-transparent"
          }`}
        >
          Map
        </button>
      </div>

      {/* ── Sidebar (search + results list) ── */}
      {/* On mobile: visible only on "list" tab. On desktop: always visible. */}
      <div
        className={`w-full lg:w-[380px] shrink-0 flex-col bg-white border-r border-sand-dark
          ${mobileTab === "map" ? "hidden lg:flex" : "flex"}`}
      >
        {/* Search controls */}
        <div className="p-4 border-b border-sand-dark shrink-0">
          <form onSubmit={handleSearch} className="flex gap-2 mb-3">
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Enter zip code"
              maxLength={10}
              inputMode="numeric"
              className="flex-1 border border-sand-dark rounded-lg px-3 py-2 text-sm text-navy-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-amber hover:bg-amber/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? "…" : "Search"}
            </button>
            {searchCoords && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-700 px-2 text-xl leading-none"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </form>

          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

          <div className="flex flex-wrap gap-2">
            {searchCoords && (
              <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="border border-sand-dark rounded-lg px-2 py-1.5 text-xs text-navy-dark bg-white focus:outline-none focus:ring-2 focus:ring-amber/40"
              >
                {RADIUS_OPTIONS.map((r) => (
                  <option key={r} value={r}>Within {r} miles</option>
                ))}
              </select>
            )}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as StoreType | "All")}
              className="border border-sand-dark rounded-lg px-2 py-1.5 text-xs text-navy-dark bg-white focus:outline-none focus:ring-2 focus:ring-amber/40"
            >
              <option value="All">All types</option>
              {storeTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2.5 bg-sand border-b border-sand-dark shrink-0">
            <p className="text-xs text-gray-500 font-medium">
              {filteredStores.length} location{filteredStores.length !== 1 ? "s" : ""}
              {searchCoords ? ` within ${radius} miles` : " — search by zip to filter"}
            </p>
          </div>

          {filteredStores.length === 0 && searchCoords && (
            <div className="p-6 text-center text-gray-400 text-sm">
              No locations found within {radius} miles.
              <br />
              Try increasing the radius.
            </div>
          )}

          {filteredStores.map((store) => (
            <button
              key={store.id}
              onClick={() => handleStoreClick(store.id)}
              className={`w-full text-left px-4 py-3.5 border-b border-sand-dark hover:bg-sand transition-colors ${
                activeStoreId === store.id ? "bg-amber/5 border-l-2 border-l-amber" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-dark leading-tight truncate">
                    {store.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {store.address}, {store.city}, {store.state}
                  </p>
                  {store.phone && (
                    <p className="text-xs text-gray-400 mt-0.5">{store.phone}</p>
                  )}
                  <span className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[store.type]}`}>
                    {store.type}
                  </span>
                </div>
                {store.distance !== undefined && (
                  <span className="text-xs font-semibold text-amber shrink-0 mt-0.5">
                    {store.distance < 10 ? store.distance.toFixed(1) : Math.round(store.distance)} mi
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Map ── */}
      {/* On mobile: visible only on "map" tab. On desktop: always visible. */}
      <div className={`flex-1 lg:h-full ${mobileTab === "list" ? "hidden lg:block" : "block h-full"}`}>
        <MapView
          stores={filteredStores}
          center={mapCenter}
          zoom={mapZoom}
          searchCoords={searchCoords}
          onStoreClick={handleStoreClick}
          activeStoreId={activeStoreId}
        />
      </div>
    </div>
  );
}
