import { AnalysisResult } from "./AnalysisDashboard";
import { AlertCircle, CheckCircle2, RefreshCw, BarChart3, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
    result: AnalysisResult;
    onReset: () => void;
}

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
    if (!result) return null;

    const isAnomaly = result.anomaly;
    const scorePercent = Math.min((result.score / (result.threshold * 2)) * 100, 100);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Primary Result Card */}
            <div className={cn(
                "bg-white rounded-xl border shadow-sm overflow-hidden relative",
                isAnomaly ? "border-red-200" : "border-slate-200"
            )}>
                {/* Status Header */}
                <div className={cn(
                    "h-2 w-full absolute top-0 left-0",
                    isAnomaly ? "bg-red-500" : "bg-emerald-500"
                )} />

                <div className="p-8">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">Analysis Outcome</h3>
                            <div className="flex items-center gap-3">
                                {isAnomaly ? (
                                    <AlertCircle className="w-8 h-8 text-red-600" />
                                ) : (
                                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                )}
                                <span className={cn(
                                    "text-3xl font-bold tracking-tight",
                                    isAnomaly ? "text-red-900" : "text-slate-900"
                                )}>
                                    {isAnomaly ? "ANOMALY DETECTED" : "BEHAVIOR NORMAL"}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                        </div>
                    </div>

                    <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                        {isAnomaly
                            ? "The vessel's kinematic patterns deviate significantly from the learned baseline. This indicates potential irregular maneuvering, sensor spoofing, or unusual environmental conditions."
                            : "The vessel's behavior conforms to expected maritime patterns. No significant deviations were detected in the telemetry stream."
                        }
                    </p>
                </div>

                {/* Technical Details Footer */}
                <div className="bg-slate-50 border-t border-slate-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-xs font-semibold text-muted uppercase mb-1">Reconstruction Error (MSE)</div>
                            <div className="text-2xl font-mono text-slate-800 font-medium">
                                {result.score.toFixed(6)}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-muted uppercase mb-1">Threshold</div>
                            <div className="text-2xl font-mono text-slate-500 font-medium border-l border-slate-200 pl-4">
                                {result.threshold.toFixed(4)}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-muted uppercase mb-1">Confidence Model</div>
                            <div className="flex items-center gap-2 mt-1">
                                <Activity className="w-4 h-4 text-accent" />
                                <span className="text-sm text-primary font-medium">Autoencoder ResNet</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Context */}
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                <h4 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Deviation Analysis
                </h4>

                <div className="relative pt-6 pb-2">
                    {/* Threshold Line */}
                    <div
                        className="absolute top-0 bottom-0 w-[2px] bg-slate-300 z-10 border-r border-dashed border-slate-400"
                        style={{ left: '50%' }}
                    >
                        <span className="absolute -top-6 -translate-x-1/2 text-[10px] font-mono font-medium text-slate-500 bg-slate-100 px-1 rounded">Threshold</span>
                    </div>

                    {/* Bar Container */}
                    <div className="h-12 bg-slate-100 rounded-full w-full overflow-hidden relative mb-2">
                        {/* Fill */}
                        <div
                            className={cn(
                                "h-full transition-all duration-1000 ease-out",
                                isAnomaly ? "bg-red-500/80" : "bg-emerald-500/80"
                            )}
                            style={{ width: `${Math.min((result.score / (result.threshold * 2)) * 100, 100)}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-xs text-muted font-mono mt-2">
                        <span>0.0</span>
                        <span>{result.score.toFixed(4)}</span>
                        <span>{(result.threshold * 2).toFixed(4)}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 hover:bg-slate-50 rounded-md"
                >
                    <RefreshCw className="w-4 h-4" />
                    Analyze New Target
                </button>
            </div>

        </div>
    );
}
