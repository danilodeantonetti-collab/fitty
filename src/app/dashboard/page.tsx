"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getMtmtDone, getMtmtProgress, isMtmtDone, MtmtDoneEntry, MtmtProgress, syncMtmtState } from "@/lib/mtmtProgress";
import { getMtmtMonth } from "@/data/mtmt";

// Reduzierte, einfarbige Icons (Linienstil wie die übrige App)
const FlameIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.5 3-1.5 4.5-2.5 6C8.5 10.5 8 12 8 13.5A4.5 4.5 0 0 0 12 18a4.5 4.5 0 0 0 4-4.5c0-1.5-.5-2.5-1-3.5 0 1-.5 2-1.5 2.5.5-2.5-.5-6.5-1.5-9.5Z" /></svg>
);
const DumbbellIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 10v4M7 8v8M17 8v8M20 10v4M7 12h10" /></svg>
);
const BikeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="6" cy="16" r="3.2" /><circle cx="18" cy="16" r="3.2" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 16l4-7h5m-2.5 0L18 16M10 9h-2.5M14.5 6.5H16" /></svg>
);

function calcStreak(dates: string[]): number {
    if (dates.length === 0) return 0;
    const getWeek = (d: Date) => {
        const jan1 = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
    };
    const getWeekYear = (d: Date) => `${d.getFullYear()}-${getWeek(d)}`;
    const weeks = [...new Set(dates.map(d => getWeekYear(new Date(d))))].sort().reverse();
    const now = new Date();
    let streak = 0;
    let checkWeek = getWeekYear(now);
    for (const w of weeks) {
        if (w === checkWeek) {
            streak++;
            const prev = new Date(now);
            prev.setDate(prev.getDate() - 7 * streak);
            checkWeek = getWeekYear(prev);
        } else break;
    }
    return streak;
}

export default function Dashboard() {
    const [nickname, setNickname] = useState("Athlete");
    const [streak, setStreak] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [customWorkouts, setCustomWorkouts] = useState<{ id: string; name: string }[]>([]);
    const [mtmt, setMtmt] = useState<MtmtProgress>({ month: 1, week: 1 });
    const [mtmtDone, setMtmtDone] = useState<MtmtDoneEntry[]>([]);
    const [bikeThisWeek, setBikeThisWeek] = useState<number | null>(null);

    useEffect(() => {
        setMtmt(getMtmtProgress());
        setMtmtDone(getMtmtDone());
        // Häkchen + Monat/Woche mit der Cloud abgleichen (Handy <-> PC)
        syncMtmtState().then(({ progress, done }) => { setMtmt(progress); setMtmtDone(done); });
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data: profile } = await supabase.from('profiles').select('nickname').eq('id', user.id).single();
            if (profile?.nickname) setNickname(profile.nickname);
            else {
                // Profil fehlt (z. B. Registrierung mit E-Mail-Bestätigung) -> nachlegen
                const fallback = (user.email ?? 'Athlet').split('@')[0].split('.')[0];
                const nick = fallback.charAt(0).toUpperCase() + fallback.slice(1);
                const { error: insErr } = await supabase.from('profiles').insert({ id: user.id, nickname: nick });
                if (!insErr) setNickname(nick);
            }
            const { data: sessions } = await supabase.from('sessions').select('date').eq('user_id', user.id).order('date', { ascending: false });
            if (sessions) {
                setTotalSessions(sessions.length);
                setStreak(calcStreak(sessions.map(s => s.date)));
            }
            const { data: customs } = await supabase.from('custom_workouts').select('id, name').eq('user_id', user.id).order('created_at', { ascending: false });
            if (customs) setCustomWorkouts(customs);
            // Rad-Session diese Woche? (Woche beginnt Montag)
            const monday = new Date();
            monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
            const { data: rides, error: ridesErr } = await supabase
                .from('cardio_sessions').select('id')
                .eq('user_id', user.id)
                .gte('date', monday.toISOString().split('T')[0]);
            if (!ridesErr) setBikeThisWeek((rides ?? []).length);
        };
        load();
    }, []);

    return (
        <div className="min-h-screen bg-background pb-24">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <h1 className="text-2xl font-black tracking-tighter text-foreground">FIT<span className="text-accent italic">TY</span></h1>
                <Link href="/account" className="h-10 w-10 overflow-hidden rounded-full border border-card-border">
                    <div className="flex h-full w-full items-center justify-center bg-accent/10 text-xs font-bold text-accent uppercase">{nickname[0]}</div>
                </Link>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-10">
                <div className="mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
                    <h2 className="text-4xl font-bold tracking-tight text-foreground">
                        Hallo <span className="text-accent italic">{nickname},</span><br />
                        <span>W&auml;hle dein Workout</span>
                    </h2>
                    <p className="mt-2 text-muted text-sm">Ready for your next session?</p>
                </div>

                {/* Streak + Sessions bar */}
                <div className="grid grid-cols-2 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="rounded-2xl border border-card-border bg-card-border/20 p-4 flex items-center gap-3">
                        <FlameIcon className={`h-7 w-7 ${streak > 0 ? "text-accent" : "text-muted"}`} />
                        <div>
                            <p className="text-2xl font-black text-foreground">{streak} <span className="text-sm font-bold text-muted">Wo.</span></p>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Streak</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-card-border bg-card-border/20 p-4 flex items-center gap-3">
                        <DumbbellIcon className="h-7 w-7 text-muted" />
                        <div>
                            <p className="text-2xl font-black text-foreground">{totalSessions}</p>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Sessions</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* Diese Woche: MTMT + Rad im großen Karten-Stil */}
                    {(() => {
                        const month = getMtmtMonth(mtmt.month);
                        const days = month?.days.map((d) => d.day) ?? [1, 2, 3];
                        const nextOpen = days.find((d) => !isMtmtDone(mtmtDone, mtmt.month, mtmt.week, d));
                        return (
                            <>
                                <Link href={nextOpen ? `/program/${mtmt.month}/${nextOpen}` : `/program/${mtmt.month}`}
                                    className="group relative overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br from-accent/20 to-accent/5 p-6 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    <div className="relative z-10 flex flex-col gap-2">
                                        <span className="text-xs font-bold tracking-widest text-accent uppercase">Diese Woche · Monat {mtmt.month} · Woche {mtmt.week}</span>
                                        <h3 className="text-2xl font-black tracking-tighter text-foreground group-hover:text-accent transition-colors">MTMT Blueprint</h3>
                                        <p className="text-sm leading-relaxed text-muted/80">{month?.phase ?? ""}</p>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            {days.map((d) => {
                                                const done = isMtmtDone(mtmtDone, mtmt.month, mtmt.week, d);
                                                return (
                                                    <span key={d}
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-black ${done ? "border-accent bg-accent/20 text-accent" : d === nextOpen ? "border-foreground/50 text-foreground" : "border-card-border text-muted"}`}>
                                                        {done ? (
                                                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                        ) : `T${d}`}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="absolute right-[-10px] top-[-10px] h-24 w-24 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-all" />
                                    <div className="mt-4 flex items-center justify-end">
                                        <div className="rounded-full bg-foreground p-2 text-background transition-transform group-hover:translate-x-1">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/cardio"
                                    className="group relative overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-6 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    <div className="relative z-10 flex flex-col gap-2">
                                        <span className="text-xs font-bold tracking-widest text-accent uppercase">Diese Woche · 1× pro Woche</span>
                                        <h3 className="text-2xl font-black tracking-tighter text-foreground group-hover:text-accent transition-colors">Rad</h3>
                                        <p className="text-sm leading-relaxed text-muted/80">{bikeThisWeek == null ? "" : bikeThisWeek > 0 ? "Diese Woche erledigt" : "Noch offen"}</p>
                                    </div>
                                    <div className="absolute right-[-10px] top-[-10px] h-24 w-24 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all" />
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${bikeThisWeek ? "border-accent bg-accent/20 text-accent" : "border-card-border text-muted"}`}>
                                            {bikeThisWeek ? (
                                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            ) : (
                                                <BikeIcon className="h-4 w-4" />
                                            )}
                                        </span>
                                        <div className="rounded-full bg-foreground p-2 text-background transition-transform group-hover:translate-x-1">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        );
                    })()}

                    {/* Create new workout — top */}
                    <Link href="/workout/create"
                        className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-card-border p-5 text-muted transition-all hover:border-accent hover:text-accent">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        <span className="text-sm font-black uppercase tracking-widest">Eigenes Workout erstellen</span>
                    </Link>

                    {/* Custom workouts */}
                    {customWorkouts.map((w) => (
                        <Link key={w.id} href={`/workout/custom/${w.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-card-border border-dashed bg-card-border/10 p-6 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold tracking-widest text-muted uppercase">Mein Plan</span>
                                <h3 className="text-2xl font-black tracking-tighter text-foreground group-hover:text-accent transition-colors">{w.name}</h3>
                            </div>
                            <div className="mt-4 flex items-center justify-end">
                                <div className="rounded-full bg-foreground p-2 text-background transition-transform group-hover:translate-x-1">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </main>

            <nav className="fixed bottom-6 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 px-6">
                <div className="flex items-center justify-around rounded-full bg-background py-3 border border-card-border shadow-2xl">
                    <div className="p-2 text-accent"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg></div>
                    <Link href="/progress" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></Link>
                    <Link href="/timer" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></Link>
                    <Link href="/account" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></Link>
                </div>
            </nav>
        </div>
    );
}
