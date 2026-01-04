"use client";

import { useState } from "react";
import axios from "axios";
import { TopBar } from "@/components/TopBar";
import { InputPanel } from "@/components/InputPanel";
import { MapCanvas } from "@/components/MapCanvas";
import { SituationSummary } from "@/components/SituationSummary";
import { EvidencePanel } from "@/components/EvidencePanel";
import { ChevronsLeft, ChevronsRight, Plus, Map as MapIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AnalysisResult = {
  anomaly: boolean;
  score: number;
  threshold: number;
  status: string;
} | null;

export default function Home() {
  const [result, setResult] = useState<AnalysisResult>(null);
  const [loading, setLoading] = useState(false);

  // Desktop state
  const [desktopInputsOpen, setDesktopInputsOpen] = useState(true);

  // Mobile state (Model and Drawer)
  const [mobileInputOpen, setMobileInputOpen] = useState(false);
  const [mobileMapOpen, setMobileMapOpen] = useState(false);


  const handleAnalyze = async (data: any) => {
    setLoading(true);
    setMobileInputOpen(false);

    // Create an AbortController for foolproof timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const response = await axios.post(`${apiUrl}/predict`, data, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      setResult(response.data);
    } catch (err: any) {
      console.error(err);
      if (axios.isCancel(err) || err.code === 'ECONNABORTED' || err.name === 'AbortError') {
        alert("Request timed out (15s). The backend is likely waking up or unreachable. Please try again.");
      } else {
        alert("Analysis failed. Please check your connection.");
      }
    } finally {
      setLoading(false);
      clearTimeout(timeoutId);
    }
  };

  return (
    <div className="h-dvh w-screen flex flex-col bg-nav-bg overflow-hidden text-slate-100 font-sans selection:bg-accent/30 selection:text-accent">
      <TopBar />

      <main className="flex-1 flex overflow-hidden relative">

        {/* DESKTOP LEFT SIDEBAR (Hidden on Mobile) */}
        <aside className={cn(
          "hidden lg:flex flex-col border-r border-white/5 z-30 bg-nav-bg transition-all duration-300 ease-in-out relative",
          desktopInputsOpen ? "w-[320px]" : "w-0"
        )}>
          <div className="flex-1 overflow-hidden">
            <InputPanel onAnalyze={handleAnalyze} isLoading={loading} />
          </div>
        </aside>

        {/* Desktop Toggle */}
        <button
          onClick={() => setDesktopInputsOpen(!desktopInputsOpen)}
          className="hidden lg:flex absolute top-4 z-40 bg-surface border border-white/10 border-l-0 rounded-r py-2 pr-1 pl-0.5 text-muted hover:text-white hover:bg-white/5 transition-all"
          style={{ left: desktopInputsOpen ? '320px' : '0px' }}
        >
          {desktopInputsOpen ? <ChevronsLeft className="w-4 h-4" /> : <ChevronsRight className="w-4 h-4" />}
        </button>


        {/* CENTER CONTENT */}
        <section className="flex-1 overflow-y-auto custom-scrollbar p-0 relative">
          <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-6 md:space-y-8 pb-24">

            {/* 1. SITUATION SUMMARY */}
            <section>
              <SituationSummary result={result} />
            </section>

            {/* 2. EVIDENCE (Charts) */}
            {result && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <EvidencePanel score={result.score} threshold={result.threshold} />
              </section>
            )}

            {/* 3. MAP CONTEXT (Desktop: Always, Mobile: Hidden by default) */}
            <section className={cn(
              "bg-surface border border-white/5 rounded-lg overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700",
              result ? "h-[400px]" : "h-0 opacity-0 overflow-hidden",
              "hidden lg:flex" // Hide on mobile by default, handled by modal below
            )}>
              <div className="p-4 border-b border-white/5 bg-nav-bg/50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Geospatial Context</h3>
                <span className="text-[10px] text-muted font-mono">LIVE TRACKING</span>
              </div>
              <div className="flex-1 relative">
                <MapCanvas />
              </div>
            </section>

            {!result && (
              <div className="h-[200px] flex flex-col items-center justify-center text-muted/30 text-sm font-mono uppercase tracking-widest border border-dashed border-white/10 rounded-lg p-6 text-center">
                <span>Awaiting Telemetry</span>
                <span className="text-[10px] mt-2 text-muted/20">Use the input panel to begin</span>
              </div>
            )}
          </div>
        </section>


        {/* MOBILE FLOATING ACTION BUTTON (New Analysis) */}
        <button
          onClick={() => setMobileInputOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent text-nav-bg shadow-lg shadow-accent/20 flex items-center justify-center z-50 active:scale-95 transition-transform"
        >
          <Plus className="w-8 h-8" strokeWidth={3} />
        </button>

        {/* MOBILE MAP TOGGLE (If Result Exists) */}
        {result && (
          <button
            onClick={() => setMobileMapOpen(true)}
            className="lg:hidden fixed bottom-6 left-6 h-12 w-12 rounded-full bg-surface border border-white/10 text-white shadow-lg flex items-center justify-center z-50 active:scale-95 transition-transform"
          >
            <MapIcon className="w-5 h-5" />
          </button>
        )}

        {/* MOBILE INPUT DRAWER */}
        {mobileInputOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileInputOpen(false)} />
            <div className="absolute inset-x-0 bottom-0 top-12 bg-surface rounded-t-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
              <InputPanel onAnalyze={handleAnalyze} isLoading={loading} onClose={() => setMobileInputOpen(false)} />
            </div>
          </div>
        )}

        {/* MOBILE MAP MODAL */}
        {mobileMapOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-black/90" />
            <button onClick={() => setMobileMapOpen(false)} className="absolute top-4 right-4 text-white z-50 p-2 bg-black/50 rounded-full">
              <X className="w-6 h-6" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full">
                <div className="absolute top-6 left-6 z-10 p-2 bg-nav-bg/80 backdrop-blur rounded text-xs font-mono">
                  LAT: 37.8021 | LON: -122.405
                </div>
                <MapCanvas />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Minimal Footer */}
      <footer className="h-6 bg-nav-bg border-t border-white/5 flex items-center justify-between px-4 text-[10px] font-mono text-muted/40 uppercase tracking-wider z-50 shrink-0">
        <div>System Online</div>
        <div>v2.0.1</div>
      </footer>
    </div>
  );
}
