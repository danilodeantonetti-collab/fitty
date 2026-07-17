"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MTMT_MONTHS, MTMT_INFO_VIDEOS } from "@/data/mtmt";
import { getMtmtDone, getMtmtProgress, MtmtDoneEntry, MtmtProgress } from "@/lib/mtmtProgress";
import VideoModal from "@/components/VideoModal";

const PHASE_COLORS: Record<string, string> = {
    Kompetenz: "from-accent/20 to-accent/5",
    "Kapazität": "from-blue-500/20 to-blue-500/5",
    Hypertrophie: "from-red-500/20 to-red-500/5",
};

function phaseKind(phase: string): string {
    if (phase.startsWith("Kompetenz")) return "Kompetenz";
    if (phase.startsWith("Kapazität")) return "Kapazität";
    return "Hypertrophie";
}

export default function ProgramOverview() {
    const [progress, setProgress] = useState<MtmtProgress>({ month: 1, week: 1 });
    const [done, setDone] = useState<MtmtDoneEntry[]>([]);
    const [video, setVideo] = useState<{ url: string; title: string } | null>(null);
    const [showVideos, setShowVideos] = useState(false);

    useEffect(() => {
        setProgress(getMtmtProgress());
        setDone(getMtmtDone());
    }, []);

    const doneCount = (month: number) => done.filter((e) => e.month === month).length;

    return (
        <div className="min-h-screen bg-background pb-24">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <Link href="/dashboard" className="text-muted hover:text-foreground">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </Link>
                <h1 className="text-xl font-black tracking-tighter text-foreground uppercase">MTMT <span className="text-accent italic">Blueprint</span></h1>
                <button onClick={() => setShowVideos(true)} aria-label="Technik-Videos"
                    className="rounded-full border border-card-border p-2 text-muted hover:text-accent transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8">
                <div className="mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Dein <span className="text-accent italic">12-Monats-Programm</span>
                    </h2>
                    <p className="mt-2 text-muted text-sm">Du bist in Monat {progress.month}, Woche {progress.week}.</p>
                </div>

                <div className="grid gap-4">
                    {MTMT_MONTHS.map((m) => {
                        const isCurrent = m.month === progress.month;
                        const total = m.days.length * 4;
                        const count = doneCount(m.month);
                        const kind = phaseKind(m.phase);
                        return (
                            <Link key={m.month} href={`/program/${m.month}`}
                                className={`group relative overflow-hidden rounded-2xl border p-5 transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-br ${PHASE_COLORS[kind]} ${isCurrent ? "border-accent neon-shadow" : "border-card-border"}`}>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <span className="text-[10px] font-bold tracking-widest text-muted uppercase">Monat {m.month}{isCurrent ? " · Aktuell" : ""}</span>
                                        <h3 className={`truncate text-xl font-black tracking-tighter transition-colors ${isCurrent ? "text-accent" : "text-foreground group-hover:text-accent"}`}>{m.phase}</h3>
                                        <p className="mt-1 text-xs text-muted">{m.days.length} Trainingstage · {count}/{total} Trainings</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {count >= total ? (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        ) : (
                                            <div className="rounded-full bg-foreground p-2 text-background transition-transform group-hover:translate-x-1">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {count > 0 && count < total && (
                                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-card-border">
                                        <div className="h-full rounded-full bg-accent" style={{ width: `${(count / total) * 100}%` }} />
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </main>

            {showVideos && !video && (
                <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 animate-in fade-in duration-200" onClick={() => setShowVideos(false)}>
                    <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-card-border bg-background p-6 pb-10 animate-in slide-in-from-bottom-8 duration-300" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Technik-<span className="text-accent italic">Videos</span></h3>
                            <button onClick={() => setShowVideos(false)} className="text-muted hover:text-foreground">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        {["Intro", "Kompetenz", "Kapazität", "Hypertrophie"].map((src) => {
                            const vids = MTMT_INFO_VIDEOS.filter((v) => v.source === src);
                            if (!vids.length) return null;
                            return (
                                <div key={src} className="mb-5">
                                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted">{src}</p>
                                    <div className="space-y-2">
                                        {vids.map((v) => (
                                            <button key={v.url + v.label} onClick={() => setVideo({ url: v.url, title: v.label })}
                                                className="flex w-full items-center gap-3 rounded-xl border border-card-border bg-card p-3 text-left transition-colors hover:border-accent">
                                                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                </span>
                                                <span className="truncate text-sm font-bold text-foreground">{v.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {video && <VideoModal url={video.url} title={video.title} onClose={() => setVideo(null)} />}
        </div>
    );
}
