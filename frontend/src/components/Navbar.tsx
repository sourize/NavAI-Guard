import Link from "next/link";
import { Ship } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Ship className="h-6 w-6 text-primary" strokeWidth={2} />
                    <span className="font-bold text-lg tracking-tight text-primary">
                        Nav-AI Guard
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted font-medium">
                    <span className="hidden sm:inline-block">Maritime Intelligence System</span>
                    <div className="h-4 w-[1px] bg-border hidden sm:block"></div>
                    <span className="text-accent">AIS Anomaly Detection</span>
                </div>
            </div>
        </nav>
    );
}
