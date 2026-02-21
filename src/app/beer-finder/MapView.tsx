"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Store } from "@/data/stores";

// Fix Leaflet's broken default marker icons under webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom amber marker for the search origin pin
const originIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:16px;height:16px;background:#e8833a;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function FlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  const isMounted = useRef(false);
  useEffect(() => {
    // Skip initial mount — MapContainer handles its own starting position.
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (isNaN(center[0]) || isNaN(center[1])) return;
    // Force Leaflet to recalculate its container size — needed when the map was
    // hidden (display:none on mobile list tab) and just became visible.
    map.invalidateSize();
    const size = map.getSize();
    if (!size.x || !size.y) return;
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [map, center, zoom]);
  return null;
}

interface MarkerLayerProps {
  stores: Store[];
  searchCoords: [number, number] | null;
  onStoreClick: (id: number) => void;
  activeStoreId: number | null;
}

// Inner component so we can keep marker refs and open popups after flyTo finishes
function MarkerLayer({ stores, searchCoords, onStoreClick, activeStoreId }: MarkerLayerProps) {
  const markerRefs = useRef<Record<number, L.Marker | null>>({});

  useEffect(() => {
    if (activeStoreId === null) return;
    // Delay matches the flyTo duration (1.2s) so the popup opens once the map has landed
    const timer = setTimeout(() => {
      markerRefs.current[activeStoreId]?.openPopup();
    }, 1250);
    return () => clearTimeout(timer);
  }, [activeStoreId]);

  return (
    <>
      {searchCoords && (
        <Marker position={searchCoords} icon={originIcon}>
          <Popup>Your search location</Popup>
        </Marker>
      )}

      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          ref={(ref) => { markerRefs.current[store.id] = ref; }}
          eventHandlers={{ click: () => onStoreClick(store.id) }}
          opacity={activeStoreId === null || activeStoreId === store.id ? 1 : 0.45}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-bold text-navy-dark">{store.name}</p>
              <p className="text-gray-500 text-xs">{store.type}</p>
              <p className="mt-1 text-gray-700">
                {store.address}
                <br />
                {store.city}, {store.state} {store.zip}
              </p>
              {store.phone && (
                <a
                  href={`tel:${store.phone}`}
                  className="text-ocean text-xs mt-1 block"
                >
                  {store.phone}
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

interface MapViewProps {
  stores: Store[];
  center: [number, number];
  zoom: number;
  searchCoords: [number, number] | null;
  onStoreClick: (id: number) => void;
  activeStoreId: number | null;
}

export default function MapView({
  stores,
  center,
  zoom,
  searchCoords,
  onStoreClick,
  activeStoreId,
}: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo center={center} zoom={zoom} />
      <MarkerLayer
        stores={stores}
        searchCoords={searchCoords}
        onStoreClick={onStoreClick}
        activeStoreId={activeStoreId}
      />
    </MapContainer>
  );
}
