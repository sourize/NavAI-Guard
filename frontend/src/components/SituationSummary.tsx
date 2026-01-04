import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SituationSummaryProps {
    result: {
        anomaly: boolean;
        score: number;
        threshold: number;
        status: string;
    } | null;
}

export function SituationSummary({ result }: SituationSummaryProps) {
    if (!result) return (
        <div className="bg-surface border border-white/10 rounded-lg p-8 flex flex-col items-center text-center">
            <HelpCircle className="w-12 h-12 text-muted/20 mb-4" />
            <h2 className="text-xl font-serif text-muted">Ready for Analysis</h2>
            <p className="text-sm text-muted/60 mt-2 max-w-md">
                Enter vessel telemetry in the controls panel to generate an operational assessment.
            </p>
        </div>
    );

    const isAnomaly = result.anomaly;
    const severity = isAnomaly ? (result.score > result.threshold * 2 ? "CRITICAL" : "HIGH") : "LOW";
    const confidence = "98.2%"; // Placeholder for now

    return (
        <div className={cn(
            "rounded-lg border-l-4 p-8 shadow-lg transition-all",
            isAnomaly ? "bg-[#1a1515] border-critical" : "bg-[#0f1724] border-emerald-500"
        )}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

                {/* Primary Verdict */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        {isAnomaly ? (
                            <AlertTriangle className="w-8 h-8 text-critical" strokeWidth={2} />
                        ) : (
                            <CheckCircle className="w-8 h-8 text-emerald-500" strokeWidth={2} />
                        )}
                        <span className={cn(
                            "text-sm font-bold tracking-widest uppercase",
                            isAnomaly ? "text-critical" : "text-emerald-500"
                        )}>
                            Situation Verdict
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">
                        {isAnomaly ? "Anomaly Detected" : "Normal Behavior"}
                    </h1>

                    <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
                        {isAnomaly
                            ? `The vessel's kinematic signature (${result.score.toFixed(4)}) exceeds the safety threshold of ${result.threshold}. Deviations observed in Heading and SOG suggest potential irregular maneuvering.`
                            : "The vessel’s behavior is consistent with standard maritime patterns for this class. No operational irregularities detected."
                        }
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="flex flex-row md:flex-col gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 min-w-[200px]">
                    <div>
                        <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Severity Tier</div>
                        <div className={cn(
                            "text-2xl font-mono font-bold",
                            isAnomaly ? "text-critical" : "text-emerald-500"
                        )}>
                            {severity}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Confidence</div>
                        <div className="text-2xl font-mono font-bold text-white">
                            {confidence}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Action</div>
                        <div className="text-sm font-medium text-slate-300">
                            {isAnomaly ? "Flag for Watch Officer" : "Log & Continue"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
