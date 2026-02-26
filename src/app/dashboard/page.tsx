"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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

    useEffect(() => {
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data: profile } = await supabase.from('profiles').select('nickname').eq('id', user.id).single();
            if (profile?.nickname) setNickname(profile.nickname);
            const { data: sessions } = await supabase.from('sessions').select('date').eq('user_id', user.id).order('date', { ascending: false });
            if (sessions) {
                setTotalSessions(sessions.length);
                setStreak(calcStreak(sessions.map(s => s.date)));
            }
        };
        load();
    }, []);

    const workouts = [
        { id: "tag-a", name: "TAG A", description: "Squats · Deadlifts · Pull-ups · Incline Press", accent: "from-accent/20 to-accent/5" },
        { id: "tag-b", name: "TAG B", description: "Squats · Bench Press · Rows · Overhead Press", accent: "from-blue-500/20 to-blue-500/5" },
    ];

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
                        Hallo <span className="text-accent italic">{nickname},</span><br />W\u00e4hle dein Workout
                    </h2>
                    <p className="mt-2 text-muted text-sm">Ready for your next session?</p>
                </div>

                {/* Streak + Sessions bar */}
                <div className="grid grid-cols-2 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="rounded-2xl border border-card-border bg-card-border/20 p-4 flex items-center gap-3">
                        <span className="text-3xl">{streak >= 4 ? "🔥" : streak >= 2 ? "⚡" : "💪"}</span>
                        <div>
                            <p className="text-2xl font-black text-foreground">{streak} <span className="text-sm font-bold text-muted">Wochen</span></p>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Streak</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-card-border bg-card-border/20 p-4 flex items-center gap-3">
                        <span className="text-3xl">🏋️</span>
                        <div>
                            <p className="text-2xl font-black text-foreground">{totalSessions}</p>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Sessions</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    {workouts.map((workout, index) => (
                        <Link key={workout.id} href={`/workout/${workout.id}`}
                            className={`group relative overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br ${workout.accent} p-6 transition-all hover:scale-[1.02] active:scale-[0.98] animate-in fade-in slide-in-from-bottom-6 duration-700`}
                            style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="relative z-10 flex flex-col gap-2">
                                <span className="text-xs font-bold tracking-widest text-accent uppercase">Workout Plan</span>
                                <h3 className="text-3xl font-black tracking-tighter text-foreground group-hover:text-accent transition-colors">{workout.name}</h3>
                                <p className="text-sm leading-relaxed text-muted/80">{workout.description}</p>
                            </div>
                            <div className="absolute right-[-10px] top-[-10px] h-24 w-24 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-all" />
                            <div className="mt-6 flex items-center justify-end">
                                <div className="rounded-full bg-foreground p-2 text-background transition-transform group-hover:translate-x-1">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
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
