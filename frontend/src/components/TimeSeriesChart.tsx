"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { time: '10:00', error: 0.02 },
    { time: '10:05', error: 0.03 },
    { time: '10:10', error: 0.025 },
    { time: '10:15', error: 0.08 },
    { time: '10:20', error: 0.12 },
    { time: '10:25', error: 0.04 },
    { time: '10:30', error: 0.03 },
];

export function TimeSeriesChart() {
    return (
        <div className="h-full w-full p-4">
            <h3 className="text-[10px] font-bold text-muted uppercase tracking-wider mb-4 font-mono">Reconstruction Error History</h3>
            <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f1724', borderColor: 'rgba(255,255,255,0.1)', fontSize: '12px' }}
                            itemStyle={{ color: '#2DD4BF' }}
                        />
                        <Line type="monotone" dataKey="error" stroke="#2DD4BF" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
