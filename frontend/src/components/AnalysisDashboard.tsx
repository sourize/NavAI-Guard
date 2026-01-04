"use client";

import { useState } from "react";
import axios from "axios";
import { AnalysisForm } from "./AnalysisForm";
import { ResultsDisplay } from "./ResultsDisplay";
import { Loader2 } from "lucide-react";

export type AnalysisResult = {
    anomaly: boolean;
    score: number;
    threshold: number;
    status: string;
} | null;

export function AnalysisDashboard() {
    const [result, setResult] = useState<AnalysisResult>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:8000/predict", data);
            setResult(response.data);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || "Connection to analysis engine failed. Please verify API status.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setError(null);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 xl:col-span-3">
                <AnalysisForm onAnalyze={handleAnalyze} isLoading={loading} />
            </div>

            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="h-96 border border-border rounded-xl bg-white flex flex-col items-center justify-center text-muted animate-in fade-in duration-500">
                        <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
                        <p className="text-sm font-medium tracking-wide">PROCESSING TELEMETRY...</p>
                        <p className="text-xs text-muted-foreground mt-2">Running Autoencoder Inference</p>
                    </div>
                ) : result ? (
                    <ResultsDisplay result={result} onReset={handleReset} />
                ) : (
                    <div className="h-full min-h-[400px] border border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-primary mb-1">Waiting for Input</h3>
                        <p className="text-xs text-muted max-w-sm">
                            Provide vessel coordinates and motion parameters in the panel to the left to initiate behavioral analysis.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
