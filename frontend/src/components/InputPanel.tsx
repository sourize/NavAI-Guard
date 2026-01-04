"use client";

import { useState } from "react";
import { Clock, MapPin, Navigation, Play, ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputPanelProps {
    onAnalyze: (data: any) => void;
    isLoading: boolean;
    onClose?: () => void; // For mobile closing
}

export function InputPanel({ onAnalyze, isLoading, onClose }: InputPanelProps) {
    // Use strings for state to allow smooth decimal typing
    const [formData, setFormData] = useState({
        timestamp_str: "27/02/2024 03:42:19",
        mmsi: "24700",
        latitude: "37.802",
        longitude: "-122.405",
        sog: "12.5",
        cog: "245.0",
        heading: "242.0",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            timestamp_str: formData.timestamp_str,
            mmsi: parseFloat(formData.mmsi),
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            sog: parseFloat(formData.sog),
            cog: parseFloat(formData.cog),
            heading: parseFloat(formData.heading),
        };
        onAnalyze(payload);
        if (onClose) onClose();
    };

    return (
        <div className="h-full flex flex-col bg-surface border-r border-white/5">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xs font-semibold text-white uppercase tracking-wider">Analysis Inputs</h2>
                {onClose && (
                    <button onClick={onClose} className="p-1 hover:bg-white/5 rounded text-muted">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-24">

                {/* Timestamp */}
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5 font-mono">
                        <Clock className="w-3 h-3 text-accent" /> Timestamp
                    </label>
                    <input
                        type="text"
                        name="timestamp_str"
                        value={formData.timestamp_str}
                        onChange={handleChange}
                        className="w-full h-10 px-3 text-sm bg-nav-bg border border-white/10 rounded focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono text-slate-300 placeholder:text-slate-700"
                        placeholder="DD/MM/YYYY HH:MM:SS"
                    />
                </div>

                {/* Identity & Position */}
                <div className="space-y-3">
                    <div className="text-[10px] font-bold text-muted uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-accent" /> Identity & Position
                    </div>

                    <div className="space-y-3">
                        <div>
                            <span className="text-[10px] text-muted/60 uppercase mb-1 block">MMSI</span>
                            <input
                                type="number"
                                name="mmsi"
                                value={formData.mmsi}
                                onChange={handleChange}
                                className="w-full h-10 px-3 text-sm bg-nav-bg border border-white/10 rounded focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono text-slate-300"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <span className="text-[10px] text-muted/60 uppercase mb-1 block">Latitude</span>
                                <input
                                    type="number"
                                    step="0.0001"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 text-sm bg-nav-bg border border-white/10 rounded focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono text-slate-300"
                                />
                            </div>
                            <div>
                                <span className="text-[10px] text-muted/60 uppercase mb-1 block">Longitude</span>
                                <input
                                    type="number"
                                    step="0.0001"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 text-sm bg-nav-bg border border-white/10 rounded focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono text-slate-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kinematics */}
                <div className="space-y-3">
                    <div className="text-[10px] font-bold text-muted uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <Navigation className="w-3 h-3 text-accent" /> Kinematics
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <span className="text-[10px] text-muted/60 uppercase mb-1 block">SOG (kn)</span>
                            <input
                                type="number"
                                step="0.1"
                                name="sog"
                                value={formData.sog}
                                onChange={handleChange}
                                className="w-full h-10 px-3 text-sm bg-nav-bg border border-white/10 rounded focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono text-slate-300"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] text-muted/60 uppercase mb-1 block">COG (°)</span>
                            <input
                                type="number"
                                step="0.1"
                                name="cog"
                                value={formData.cog}
                                onChange={handleChange}
                                className="w-full h-10 px-3 text-sm bg-nav-bg border border-white/10 rounded focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono text-slate-300"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] text-muted/60 uppercase mb-1 block">Head (°)</span>
                            <input
                                type="number"
                                step="0.1"
                                name="heading"
                                value={formData.heading}
                                onChange={handleChange}
                                className="w-full h-10 px-3 text-sm bg-nav-bg border border-white/10 rounded focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono text-slate-300"
                            />
                        </div>
                    </div>
                </div>
            </form>

            {/* Sticky Bottom Action */}
            <div className="p-4 border-t border-white/5 bg-surface z-10 absolute bottom-0 left-0 right-0 md:relative">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 h-12 md:h-10 bg-accent hover:bg-accent/90 text-nav-bg text-sm font-bold rounded shadow-[0_0_15px_-3px_var(--color-accent)] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider active:scale-95"
                >
                    {isLoading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            <Play className="w-4 h-4 fill-current" /> Run Analysis
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
