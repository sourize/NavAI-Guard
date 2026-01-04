"use client";

import { useState } from "react";
import { Clock, MapPin, Navigation, Info, ShieldCheck } from "lucide-react";

interface AnalysisFormProps {
    onAnalyze: (data: any) => void;
    isLoading: boolean;
}

export function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
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
        // Parse numbers before sending
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
    };

    return (
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-slate-50/50">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    Input Parameters
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-6">
                {/* Temporal */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Temporal Data
                    </label>
                    <div>
                        <span className="text-[10px] text-muted-foreground uppercase mb-1 block">Timestamp (DD/MM/YYYY HH:MM:SS)</span>
                        <input
                            type="text"
                            name="timestamp_str"
                            value={formData.timestamp_str}
                            onChange={handleChange}
                            className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-mono"
                            placeholder="DD/MM/YYYY HH:MM:SS"
                        />
                    </div>
                </div>

                {/* Identity & Position */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> Position & ID
                    </label>

                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <span className="text-[10px] text-muted-foreground uppercase mb-1 block">MMSI Number</span>
                            <input
                                type="number"
                                name="mmsi"
                                value={formData.mmsi}
                                onChange={handleChange}
                                className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-mono"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <span className="text-[10px] text-muted-foreground uppercase mb-1 block">Latitude</span>
                            <input
                                type="number"
                                step="0.0001"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                                className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-mono"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] text-muted-foreground uppercase mb-1 block">Longitude</span>
                            <input
                                type="number"
                                step="0.0001"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-mono"
                            />
                        </div>
                    </div>
                </div>

                {/* Kinematics */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5" /> Kinematics
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <span className="text-[10px] text-muted-foreground uppercase mb-1 block">SOG (kn)</span>
                            <input
                                type="number"
                                step="0.1"
                                name="sog"
                                value={formData.sog}
                                onChange={handleChange}
                                className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-mono"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] text-muted-foreground uppercase mb-1 block">COG (deg)</span>
                            <input
                                type="number"
                                step="0.1"
                                name="cog"
                                value={formData.cog}
                                onChange={handleChange}
                                className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-mono"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] text-muted-foreground uppercase mb-1 block">Heading</span>
                            <input
                                type="number"
                                step="0.1"
                                name="heading"
                                value={formData.heading}
                                onChange={handleChange}
                                className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all font-mono"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center h-10 bg-primary hover:bg-slate-800 text-primary-foreground text-sm font-medium rounded-md shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                    >
                        {isLoading ? "Processing..." : "Run Analysis"}
                    </button>
                </div>
            </form>
        </div>
    );
}
