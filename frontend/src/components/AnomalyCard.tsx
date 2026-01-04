import { AlertTriangle, CheckCircle, Search, FileText, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnomalyCardProps {
    result: {
        anomaly: boolean;
        score: number;
        threshold: number;
        status: string;
    } | null;
}

export function AnomalyCard({ result }: AnomalyCardProps) {
    if (!result) return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-muted/40 border-t border-white/5 bg-surface">
            <Search className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-xs font-mono uppercase tracking-widest">Awaiting Telemetry</p>
        </div>
    );

    const isAnomaly = result.anomaly;
    const percentage = Math.min((result.score / (result.threshold * 2)) * 100, 100);

    return (
        <div className="bg-surface border-t border-white/5 p-6 flex flex-col gap-6">
            <div className="flex items-start justify-between">
                <div>
                    <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider block mb-1">
                        Analysis Verdict
                    </span>
                    <div className="flex items-center gap-2">
                        {isAnomaly ? (
                            <AlertTriangle className="w-5 h-5 text-critical" />
                        ) : (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                        )}
                        <h3 className={cn(
                            "text-xl font-serif font-bold tracking-wide",
                            isAnomaly ? "text-critical" : "text-emerald-400"
                        )}>
                            {isAnomaly ? "ANOMALY DETECTED" : "NOMINAL BEHAVIOR"}
                        </h3>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider block mb-1">
                        Confidence
                    </div>
                    <div className="text-lg font-mono text-white">96.4%</div>
                </div>
            </div>

            {/* Meter */}
            <div className="relative pt-4 pb-2">
                <div className="flex justify-between text-[10px] font-mono text-muted/60 mb-1">
                    <span>0.0</span>
                    <span>THRESHOLD</span>
                    <span>CRITICAL</span>
                </div>
                <div className="h-2 w-full bg-nav-bg rounded-full overflow-hidden relative">
                    <div
                        className={cn(
                            "h-full transition-all duration-700 ease-out relative z-10",
                            isAnomaly ? "bg-critical" : "bg-emerald-500"
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                    {/* Threshold Marker */}
                    <div className="absolute top-0 bottom-0 w-[2px] bg-white/50 z-20 left-1/2 -translate-x-1/2"></div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs font-mono text-white">
                        Score: <span className="text-accent">{result.score.toFixed(6)}</span>
                    </span>
                </div>
            </div>

            {/* Explanation */}
            <div className="p-3 bg-nav-bg border border-white/5 rounded text-sm text-muted leading-relaxed">
                {isAnomaly
                    ? "Vessel kinematics exhibit significant deviation from standard shipping lane patterns. High MSE suggests potential spoofing or irregular maneuvering."
                    : "Telemetry signature aligns with expected vessel class behavior and lane keeping. No operational irregularities detected."
                }
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
                <button className="flex-1 h-8 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded text-[10px] font-bold text-white uppercase tracking-wider transition-colors">
                    <FileText className="w-3 h-3" /> Report
                </button>
                <button className="flex-1 h-8 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded text-[10px] font-bold text-white uppercase tracking-wider transition-colors">
                    <Flag className="w-3 h-3" /> Flag
                </button>
            </div>
        </div>
    );
}
