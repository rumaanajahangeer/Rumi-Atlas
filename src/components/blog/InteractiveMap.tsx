"use client";

import React, { useEffect, useState } from "react";

interface InteractiveMapProps {
  destination: string;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
  height?: string;
}

export default function InteractiveMap({
  destination,
  country,
  latitude,
  longitude,
  height = "400px",
}: InteractiveMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const lat = latitude || 31.0983;
  const lng = longitude || -4.0105;

  if (!isMounted) {
    return (
      <div
        style={{ height }}
        className="w-full bg-stone-200 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center text-stone-500 text-sm font-serif italic"
      >
        Loading Atlas Map Coordinates for {destination}...
      </div>
    );
  }

  // OpenStreetMap embed iframe URL for lightweight, zero-token map rendering
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.5}%2C${
    lat - 0.5
  }%2C${lng + 0.5}%2C${lat + 0.5}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-slate-800 group">
      <iframe
        title={`Map location for ${destination}`}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={mapUrl}
        className="w-full h-full filter saturate-90 dark:contrast-125 dark:brightness-90 transition-all"
      />
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-[#070D18]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-stone-200/60 dark:border-slate-800/60 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#C5A059] animate-ping" />
          <span className="text-xs uppercase tracking-widest font-bold text-stone-800 dark:text-stone-200">
            {destination}, {country}
          </span>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-semibold uppercase tracking-wider text-[#C5A059] hover:underline"
        >
          Open in Google Maps &rarr;
        </a>
      </div>
    </div>
  );
}
