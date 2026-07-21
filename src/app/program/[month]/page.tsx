"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMtmtMonth } from "@/data/mtmt";
import { getMtmtDone, getMtmtProgress, isMtmtDone, setMtmtProgress, syncMtmtState, MtmtDoneEntry } from "@/lib/mtmtProgress";

export default function ProgramMonth() {
    const params = useParams();
    const monthNum = parseInt(params.month as string);
    const month = getMtmtMonth(monthNum);
    const [week, setWeek] = useState(1);
    const [done, setDone] = useState<MtmtDoneEntry[]>([]);

    useEffect(() => {
        const p = getMtmtProgress();
        if (p.month === monthNum) setWeek(p.week);
        setDone(getMtmtDone());
        syncMtmtState().then((s) => {
            if (s.progress.month === monthNum) setWeek(s.progress.week);
            setDone(s.done);
        });
    }, [monthNum]);

    if (!month) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-background gap-4">
                <p className="text-muted">Monat nicht gefunden.</p>
                <Link href="/program" className="btn-primary">Zurück</Link>
            </div>
        );
    }

    const selectWeek = (w: number) => {
        setWeek(w);
        setMtmtProgress({ month: monthNum, week: w });
    };

    return (
        <div className="min-h-screen bg-background pb-24">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <Link href="/program" className="text-muted hover:text-foreground">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </Link>
                <h1 className="truncate px-2 text-lg font-black tracking-tighter text-foreground uppercase">{month.phase}</h1>
                <span className="w-6" />
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8">
                <div className="mb-6 animate-in fade-in slide-in-from-left-4 duration-700">
                    <span className="text-xs font-bold tracking-widest text-accent uppercase">Monat {month.month}</span>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">{month.phase}</h2>
                </div>

                {/* Wochen-Auswahl */}
                <div className="mb-8 grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((w) => (
                        <button key={w} onClick={() => selectWeek(w)}
                            className={`rounded-xl border py-3 text-sm font-black uppercase tracking-wider transition-all ${week === w ? "border-accent bg-accent text-background neon-shadow" : "border-card-border bg-card text-muted hover:text-foreground"}`}>
                            W{w}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4">
                    {month.days.map((d) => {
                        const dayDone = isMtmtDone(done, month.month, week, d.day);
                        const sectionNames = d.sections.map((s) => s.title).filter((t) => t !== "Vorbereitung");
                        const exCount = d.sections.reduce((n, s) => n + s.exercises.length, 0);
                        return (
                            <Link key={d.day} href={`/program/${month.month}/${d.day}`}
                                className={`group relative overflow-hidden rounded-2xl border p-6 transition-all hover:scale-[1.02] active:scale-[0.98] ${dayDone ? "border-accent/40 bg-accent/5" : "border-card-border bg-card-border/10"}`}>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <span className="text-xs font-bold tracking-widest text-accent uppercase">Woche {week}</span>
                                        <h3 className="text-2xl font-black tracking-tighter text-foreground group-hover:text-accent transition-colors">Tag {d.day}</h3>
                                        <p className="mt-1 truncate text-xs leading-relaxed text-muted">{sectionNames.join(" · ")}</p>
                                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted">{exCount} Übungen</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {dayDone ? (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        ) : (
                                            <div className="rounded-full bg-foreground p-2 text-background transition-transform group-hover:translate-x-1">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
