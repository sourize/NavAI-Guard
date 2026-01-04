"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { Info } from "lucide-react";

interface EvidencePanelProps {
    score: number;
    threshold: number;
}

// Mock historic data relative to the current analysis
const generateMockHistory = (currentScore: number, threshold: number) => {
    const base = threshold * 0.5;
    return [
        { time: '-30m', error: base * 0.8 },
        { time: '-25m', error: base * 1.1 },
        { time: '-20m', error: base * 0.9 },
        { time: '-15m', error: base * 1.2 },
        { time: '-10m', error: base * 0.9 },
        { time: '-5m', error: base * 1.1 },
        { time: 'NOW', error: currentScore }, // The current point
    ];
};

export function EvidencePanel({ score, threshold }: EvidencePanelProps) {
    const data = generateMockHistory(score, threshold);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Metric 1: Deviation History */}
            <div className="lg:col-span-2 bg-surface border border-white/5 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            Reconstruction Error Time-Series
                        </h3>
                        <p className="text-xs text-muted mt-1">
                            Shows how the vessel's behavior deviation (MSE) has evolved over the last 30 minutes.
                        </p>
                    </div>
                </div>

                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                            <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f1724', borderColor: '#334155', fontSize: '12px', color: '#fff' }}
                                itemStyle={{ color: '#2DD4BF' }}
                            />
                            <ReferenceLine y={threshold} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'THRESHOLD', fill: '#EF4444', fontSize: 10, position: 'insideRight' }} />
                            <Line type="monotone" dataKey="error" stroke="#2DD4BF" strokeWidth={3} dot={{ fill: '#2DD4BF' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Metric 2: Feature Contribution (Why?) */}
            <div className="bg-surface border border-white/5 rounded-lg p-6 flex flex-col">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                    Primary Contibuting Factors
                </h3>
                <p className="text-xs text-muted mb-6">
                    Which specific telemetry features caused the model to flag this behavior?
                </p>

                <div className="space-y-4 flex-1">
                    {/* Mock Contribution Bars */}
                    <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-slate-300">SPEED OVER GROUND (SOG)</span>
                            <span className="text-accent">HIGH</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-accent w-[85%] rounded-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-slate-300">HEADING CHANGE</span>
                            <span className="text-accent/80">MED</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-accent/80 w-[60%] rounded-full"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-slate-300">LAT/LON VELOCITY</span>
                            <span className="text-accent/40">LOW</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-accent/40 w-[20%] rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-3 bg-nav-bg rounded border border-white/5 flex gap-3 text-xs text-muted leading-relaxed">
                    <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p>The anomaly is primarily driven by unusual speed relative to position.</p>
                </div>
            </div>
        </div>
    );
}
