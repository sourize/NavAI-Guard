import { Terminal } from "lucide-react";

export function ModelPanel() {
    return (
        <div className="h-full bg-surface border-l border-white/5 flex flex-col">
            <div className="p-4 border-b border-white/5">
                <h2 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-accent" /> System Logs
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] space-y-2 custom-scrollbar">
                <div className="flex gap-2">
                    <span className="text-muted/40">03:42:01</span>
                    <span className="text-emerald-500">SYSTEM_READY</span>
                    <span className="text-muted">Model loaded in 240ms</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-muted/40">03:42:05</span>
                    <span className="text-accent">INFO</span>
                    <span className="text-muted">Connected to AIS stream</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-muted/40">03:42:15</span>
                    <span className="text-warning">WARN</span>
                    <span className="text-muted">High latency on region US-WEST</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-muted/40">03:42:19</span>
                    <span className="text-accent">INFERENCE</span>
                    <span className="text-muted">Processing batch #9921</span>
                </div>
            </div>

            <div className="p-4 border-t border-white/5">
                <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-bold text-muted uppercase tracking-wider mb-2">
                        <span>Sensitivity Threshold</span>
                        <span>0.100</span>
                    </div>
                    <input type="range" className="w-full h-1 bg-nav-bg rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="p-2 bg-nav-bg rounded border border-white/5">
                        <div className="text-muted/50 mb-1">UPTIME</div>
                        <div className="text-white">12d 4h</div>
                    </div>
                    <div className="p-2 bg-nav-bg rounded border border-white/5">
                        <div className="text-muted/50 mb-1">REQ/SEC</div>
                        <div className="text-white">42.8</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
