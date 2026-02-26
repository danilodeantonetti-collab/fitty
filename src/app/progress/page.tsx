"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const EXERCISE_MUSCLE_MAP: Record<string, string> = {
    "Kniebeugen": "Beine",
    "Kreuzheben": "Rücken",
    "Klimmziehen eng": "Rücken",
    "Schrägbankdrücken": "Brust",
    "Langhantelrudern OG": "Rücken",
    "Trizepsdrücken (Stange)": "Trizeps",
    "Hammer Curls": "Bizeps",
    "Bankdrücken": "Brust",
    "Langhantelrudern UG": "Rücken",
    "Schulterdrücken (LH)": "Schultern",
    "SZ-Curls": "Bizeps",
    "Trizepsdrücken (Seil)": "Trizeps"
};

type FilterType = "7D" | "30D" | "ALL";

export default function StatisticsDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [statsData, setStatsData] = useState<any[]>([]);
    const [filter, setFilter] = useState<FilterType>("ALL");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push("/auth/login");
                    return;
                }

                const { data, error } = await supabase
                    .from('sessions')
                    .select(`
                        id,
                        date,
                        sets (
                            weight,
                            reps,
                            exercises ( name )
                        )
                    `)
                    .eq('user_id', user.id)
                    .order('date', { ascending: false });

                if (error) throw error;
                if (data) {
                    setStatsData(data);
                }
            } catch (err) {
                console.error("Error fetching stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [router]);

    const processedStats = useMemo(() => {
        const now = new Date();
        const cutoff = new Date();
        if (filter === "7D") cutoff.setDate(now.getDate() - 7);
        if (filter === "30D") cutoff.setDate(now.getDate() - 30);
        if (filter === "ALL") cutoff.setFullYear(1970);

        const filteredSessions = statsData.filter(session => new Date(session.date) >= cutoff);

        let totalVolume = 0;
        const muscleVolume: Record<string, number> = {};

        filteredSessions.forEach(session => {
            session.sets.forEach((set: any) => {
                const weight = set.weight || 0;
                const reps = set.reps || 0;
                const volume = weight * reps;
                totalVolume += volume;

                const exName = set.exercises?.name;
                if (exName) {
                    const muscle = EXERCISE_MUSCLE_MAP[exName] || "Andere";
                    muscleVolume[muscle] = (muscleVolume[muscle] || 0) + volume;
                }
            });
        });

        const maxVolume = Math.max(...Object.values(muscleVolume), 1);
        const muscleBars = Object.entries(muscleVolume)
            .sort((a, b) => b[1] - a[1])
            .map(([muscle, vol]) => ({
                muscle,
                volume: vol,
                percentage: (vol / maxVolume) * 100
            }));

        return {
            totalSessions: filteredSessions.length,
            totalVolume,
            muscleBars
        };
    }, [statsData, filter]);

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-accent font-bold">Lade Statistiken...</div>;

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <h1 className="text-2xl font-black tracking-tighter text-foreground">
                    STA<span className="text-accent italic">TISTICS</span>
                </h1>
                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-card-border glass bg-accent/10">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8">
                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                    {(["7D", "30D", "ALL"] as FilterType[]).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`flex-1 rounded-full py-2 text-[10px] font-black tracking-widest uppercase transition-colors ${
                                filter === f 
                                ? "bg-accent text-background border border-accent" 
                                : "bg-card-border text-muted border border-transparent hover:text-foreground"
                            }`}
                        >
                            {f === "ALL" ? "All Time" : `Last ${f}`}
                        </button>
                    ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="glass flex flex-col items-center justify-center rounded-3xl p-6 border border-card-border text-center">
                        <span className="text-4xl font-black tracking-tighter text-foreground">
                            {processedStats.totalSessions}
                        </span>
                        <span className="mt-1 text-[10px] font-bold text-muted uppercase tracking-widest">
                            Sessions
                        </span>
                    </div>
                    <div className="glass flex flex-col items-center justify-center rounded-3xl p-6 border border-card-border text-center neon-shadow">
                        <span className="text-3xl font-black tracking-tighter text-accent">
                            {processedStats.totalVolume.toLocaleString()}
                        </span>
                        <span className="mt-1 text-[10px] font-bold text-muted uppercase tracking-widest">
                            Volumen (KG)
                        </span>
                    </div>
                </div>

                <section className="mt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h2 className="text-sm font-bold tracking-widest text-muted uppercase mb-6 flex items-center justify-between">
                        <span>Muskelgruppen Volumen</span>
                        <span className="text-[10px] opacity-50">Basierend auf KG x Wdh</span>
                    </h2>
                    
                    <div className="glass rounded-3xl p-6 space-y-6">
                        {processedStats.muscleBars.length === 0 ? (
                            <p className="text-center text-xs text-muted font-bold tracking-widest uppercase py-4">
                                Keine Daten im Zeitraum
                            </p>
                        ) : (
                            processedStats.muscleBars.map((item, idx) => (
                                <div key={item.muscle} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black text-foreground tracking-wide">{item.muscle}</span>
                                        <span className="text-[10px] font-bold text-accent uppercase">{item.volume.toLocaleString()} kg</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-background overflow-hidden">
                                        <div 
                                            className="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
                                            style={{ width: `${item.percentage}%`, animationDelay: `${idx * 100}ms` }}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <nav className="fixed bottom-6 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 px-6">
                <div className="flex items-center justify-around rounded-full bg-background/80 py-3 backdrop-blur-xl border border-card-border shadow-2xl glass">
                    <Link href="/dashboard" className="flex flex-col items-center gap-1 text-muted transition-colors hover:text-accent p-2">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </Link>
                    <div className="flex flex-col items-center gap-1 text-accent p-2">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <button onClick={() => { supabase.auth.signOut(); router.push('/auth/login'); }} className="flex flex-col items-center gap-1 text-muted transition-colors hover:text-accent focus:outline-none p-2">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    );
}
