"use client";

import { MapPin, Crosshair, ZoomIn, ZoomOut, Layers } from "lucide-react";

export function MapCanvas() {
    return (
        <div className="relative w-full h-full bg-[#050C19] overflow-hidden group">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#2DD4BF 1px, transparent 1px), linear-gradient(90deg, #2DD4BF 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Fake Map Elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-[80%] h-[60%] border border-accent/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
                <div className="w-[60%] h-[40%] border border-accent/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
            </div>

            {/* Target Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                    <div className="w-4 h-4 bg-accent/20 rounded-full animate-ping absolute inset-0"></div>
                    <MapPin className="w-6 h-6 text-accent relative z-10" />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-accent whitespace-nowrap bg-nav-bg/80 px-1 rounded">
                        TARGET: VESSEL-01
                    </div>
                </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <button className="p-2 bg-surface border border-white/5 rounded text-muted hover:text-white hover:bg-white/5 transition-colors">
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button className="p-2 bg-surface border border-white/5 rounded text-muted hover:text-white hover:bg-white/5 transition-colors">
                    <ZoomOut className="w-4 h-4" />
                </button>
                <button className="p-2 bg-surface border border-white/5 rounded text-muted hover:text-white hover:bg-white/5 transition-colors mt-2">
                    <Layers className="w-4 h-4" />
                </button>
            </div>

            {/* Crosshair Overlay */}
            <div className="absolute top-6 left-6 text-muted/30 pointer-events-none">
                <div className="text-[10px] font-mono">LAT: 37.8021 N</div>
                <div className="text-[10px] font-mono">LON: 122.405 W</div>
            </div>

            <div className="absolute top-6 right-6 pointer-events-none">
                <Crosshair className="w-6 h-6 text-accent/20" />
            </div>
        </div>
    );
}
