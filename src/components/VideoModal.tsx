"use client";

import { useEffect } from "react";

function toEmbedUrl(url: string): string {
    const listMatch = url.match(/[?&]list=([\w-]+)/);
    if (listMatch && url.includes("playlist")) {
        return `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}`;
    }
    const idMatch = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([\w-]{6,})/);
    if (idMatch) {
        let src = `https://www.youtube.com/embed/${idMatch[1]}?autoplay=1&rel=0`;
        if (listMatch) src += `&list=${listMatch[1]}`;
        return src;
    }
    return url;
}

export default function VideoModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground truncate">{title}</h3>
                    <button onClick={onClose} aria-label="Schließen"
                        className="rounded-full border border-card-border bg-card p-2 text-muted hover:text-foreground transition-colors">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="relative w-full overflow-hidden rounded-2xl border border-card-border bg-black" style={{ paddingTop: "56.25%" }}>
                    <iframe
                        src={toEmbedUrl(url)}
                        title={title}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}
