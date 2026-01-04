import Link from "next/link";
import { Ship } from "lucide-react";

export function TopBar() {
    return (
        <nav className="sticky top-0 z-50 w-full h-14 border-b border-white/5 bg-nav-bg/95 backdrop-blur-md flex items-center justify-between px-4 md:px-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
                <Ship className="h-5 w-5 text-accent" strokeWidth={2} />
                <span className="font-serif font-semibold text-lg tracking-wide text-white">
                    Nav-AI <span className="text-muted/60 font-sans text-sm ml-1 font-normal opacity-50">GUARD</span>
                </span>
            </div>

            {/* Minimal Right Side */}
            <div className="flex items-center gap-6">
                <a
                    href="https://sourish.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors group"
                >
                    <div className="w-6 h-6 rounded-full bg-muted/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <span className="text-[10px] font-serif font-bold text-muted group-hover:text-accent">S</span>
                    </div>
                    <span>Portfolio</span>
                </a>

                <div className="h-4 w-[1px] bg-white/10"></div>

                <a
                    href="https://github.com/sourize/NavAI-Guard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors"
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    GitHub
                </a>
            </div>
        </nav>
    );
}
