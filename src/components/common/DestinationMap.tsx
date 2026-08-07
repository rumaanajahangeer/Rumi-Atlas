"use client";

import React from "react";
import { MapPin, Navigation, Compass } from "lucide-react";

interface DestinationMapProps {
  destination?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export default function DestinationMap({
  destination = "Merzouga Dunes",
  country = "Morocco",
  lat = 31.18,
  lng = -4.01,
}: DestinationMapProps) {
  const mapTileUrl = `https://maps.wikimedia.org/osm-intl/12/${Math.floor(
    ((lng + 180) / 360) * 4096
  )}/${Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      4096
  )}.png`;

  return (
    <div className="liquid-glass p-8 sm:p-10 rounded-3xl border border-[#2E2352] shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#FDE047]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-instrument italic text-3xl font-normal text-white">
              Destination Map
            </h3>
            <p className="text-xs text-[#A78BFA] font-light">
              {destination}, {country}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#FDE047]">
          <Navigation className="w-4 h-4" />
          <span>
            {lat.toFixed(4)}° N, {Math.abs(lng).toFixed(4)}° W
          </span>
        </div>
      </div>

      {/* Visual Map Container */}
      <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#2E2352] group">
        <iframe
          title="Destination Map Preview"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05}%2C${lat - 0.05}%2C${lng + 0.05}%2C${lat + 0.05}&layer=mapnik&marker=${lat}%2C${lng}`}
          className="w-full h-full filter invert brightness-[0.7] contrast-[1.2] opacity-80 group-hover:opacity-100 transition-opacity"
        />

        <div className="absolute bottom-4 left-4 z-10 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs text-white flex items-center space-x-2">
          <Compass className="w-4 h-4 text-[#FDE047] animate-spin-slow" />
          <span>Interactive Radar Pin: {destination}</span>
        </div>
      </div>
    </div>
  );
}
