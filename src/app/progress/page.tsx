"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const EXERCISE_MUSCLE_MAP: Record<string, string> = {
    "Kniebeugen": "Beine", "Kreuzheben": "R\u00fccken", "Klimmziehen eng": "R\u00fccken",
    "Schr\u00e4gbankdr\u00fccken": "Brust", "Langhantelrudern OG": "R\u00fccken",
    "Trizepsdr\u00fccken (Stange)": "Trizeps", "Hammer Curls": "Bizeps",
    "Bankdr\u00fccken": "Brust", "Langhantelrudern UG": "R\u00fccken",
    "Schulterdr\u00fccken (LH)": "Schultern", "SZ-Curls": "Bizeps",
    "Trizepsdr\u00fccken (Seil)": "Trizeps"
};

type FilterType = "7D" | "30D" | "ALL";
type ViewMode = "muscles" | "exercises" | "chart";

// Simple SVG line chart
function LineChart({ data }: { data: { label: string; value: number }[] }) {
    if (data.length < 2) return <p className="text-center text-xs text-muted py-6">Mindestens 2 Sessions ben\u00f6tigt</p>;
    const W = 300; const H = 120; const PAD = 20;
    const maxV = Math.max(...data.map(d => d.value));
    const minV = Math.min(...data.map(d => d.value));
    const range = maxV - minV || 1;
    const pts = data.map((d, i) => ({
        x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
        y: PAD + ((maxV - d.value) / range) * (H - PAD * 2),
        label: d.label, value: d.value
    }));
    const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const fill = `${path} L ${pts[pts.length-1].x} ${H} L ${pts[0].x} ${H} Z`;
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
            <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e2ff00" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#e2ff00" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={fill} fill="url(#cg)" />
            <path d={path} fill="none" stroke="#e2ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map((p) => (
                <g key={p.label}>
                    <circle cx={p.x} cy={p.y} r="4" fill="#e2ff00" />
                    <text x={p.x} y={H - 4} textAnchor="middle" fontSize="8" fill="#666" fontWeight="bold">{p.label}</text>
                    <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="8" fill="#e2ff00" fontWeight="bold">{p.value}kg</text>
                </g>
            ))}
        </svg>
    );
}

export default function StatisticsDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [statsData, setStatsData] = useState<any[]>([]);
    const [filter, setFilter] = useState<FilterType>("ALL");
    const [viewMode, setViewMode] = useState<ViewMode>("muscles");
    const [selectedExercise, setSelectedExercise] = useState<string>("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) { router.push("/auth/login"); return; }
                const { data, error } = await supabase.from('sessions')
                    .select('id, date, sets ( weight, reps, exercises ( name ) )')
                    .eq('user_id', user.id).order('date', { ascending: true });
                if (error) throw error;
                if (data) setStatsData(data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchStats();
    }, [router]);

    const processedStats = useMemo(() => {
        const now = new Date(); const cutoff = new Date();
        if (filter === "7D") cutoff.setDate(now.getDate() - 7);
        else if (filter === "30D") cutoff.setDate(now.getDate() - 30);
        else cutoff.setFullYear(1970);
        const filtered = statsData.filter(s => new Date(s.date) >= cutoff);
        let totalVolume = 0;
        const muscleVol: Record<string, number> = {};
        const exVol: Record<string, number> = {};
        const exMaxBySession: Record<string, { label: string; value: number }[]> = {};

        filtered.forEach(s => {
            const month = new Date(s.date).toLocaleDateString('de-DE', { month: 'short' });
            s.sets.forEach((set: any) => {
                const v = (set.weight || 0) * (set.reps || 0); totalVolume += v;
                const n = set.exercises?.name;
                if (n) {
                    muscleVol[EXERCISE_MUSCLE_MAP[n] || "Andere"] = (muscleVol[EXERCISE_MUSCLE_MAP[n] || "Andere"] || 0) + v;
                    exVol[n] = (exVol[n] || 0) + v;
                    if (!exMaxBySession[n]) exMaxBySession[n] = [];
                    const last = exMaxBySession[n][exMaxBySession[n].length - 1];
                    if (last?.label === month) { if (set.weight > last.value) last.value = set.weight; }
                    else exMaxBySession[n].push({ label: month, value: set.weight || 0 });
                }
            });
        });

        const makeBars = (d: Record<string, number>) => {
            const m = Math.max(...Object.values(d), 1);
            return Object.entries(d).sort((a, b) => b[1] - a[1]).map(([name, vol]) => ({ name, volume: vol, percentage: (vol / m) * 100 }));
        };
        return { totalSessions: filtered.length, totalVolume, muscleBars: makeBars(muscleVol), exerciseBars: makeBars(exVol), exMaxBySession };
    }, [statsData, filter]);

    const allExercises = Object.keys(processedStats.exMaxBySession);
    const chartExercise = selectedExercise || allExercises[0] || "";
    const chartData = processedStats.exMaxBySession[chartExercise] || [];

    const bars = viewMode === "muscles" ? processedStats.muscleBars : processedStats.exerciseBars;
    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-accent font-bold">Lade...</div>;

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <h1 className="text-2xl font-black tracking-tighter text-foreground">STA<span className="text-accent italic">TISTICS</span></h1>
                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-card-border bg-accent/10">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
            </header>
            <main className="mx-auto max-w-lg px-6 pt-8 space-y-6">
                {/* Filter */}
                <div className="flex items-center gap-3">
                    {(["7D", "30D", "ALL"] as FilterType[]).map((f) => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`flex-1 rounded-full py-2 text-[10px] font-black tracking-widest uppercase transition-colors ${filter === f ? 'bg-accent text-background' : 'bg-card-border/20 text-muted border border-card-border hover:text-foreground'}`}>
                            {f === "ALL" ? "Gesamt" : f === "7D" ? "7 Tage" : "30 Tage"}
                        </button>
                    ))}
                </div>

                {/* Totals */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-3xl p-6 border border-card-border bg-card-border/20 text-center">
                        <span className="text-4xl font-black text-foreground">{processedStats.totalSessions}</span>
                        <p className="mt-1 text-[10px] font-bold text-muted uppercase tracking-widest">Sessions</p>
                    </div>
                    <div className="rounded-3xl p-6 border border-card-border bg-card-border/20 text-center">
                        <span className="text-3xl font-black text-accent">{processedStats.totalVolume.toLocaleString()}</span>
                        <p className="mt-1 text-[10px] font-bold text-muted uppercase tracking-widest">Volumen KG</p>
                    </div>
                </div>

                {/* View toggle */}
                <div className="flex rounded-full border border-card-border overflow-hidden">
                    {(["muscles", "exercises", "chart"] as ViewMode[]).map((m) => (
                        <button key={m} onClick={() => setViewMode(m)}
                            className={`flex-1 py-2 text-[10px] font-black tracking-widest uppercase transition-colors ${viewMode === m ? 'bg-accent text-background' : 'text-muted hover:text-foreground'}`}>
                            {m === "muscles" ? "Muskeln" : m === "exercises" ? "\u00dcbungen" : "Verlauf"}
                        </button>
                    ))}
                </div>

                {/* Bars */}
                {viewMode !== "chart" && (
                    <div className="rounded-3xl p-6 space-y-5 border border-card-border bg-card-border/20">
                        {bars.length === 0
                            ? <p className="text-center text-xs text-muted font-bold uppercase py-4">Keine Daten</p>
                            : bars.map((item) => (
                                <div key={item.name} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black text-foreground">{item.name}</span>
                                        <span className="text-[10px] font-bold text-accent">{item.volume.toLocaleString()} kg</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-background overflow-hidden">
                                        <div className="h-full rounded-full bg-accent transition-all duration-1000" style={{ width: `${item.percentage}%` }} />
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* Chart */}
                {viewMode === "chart" && (
                    <div className="rounded-3xl p-6 border border-card-border bg-card-border/20 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-muted uppercase tracking-widest">Gewichts-Verlauf</h3>
                        </div>
                        {/* Exercise selector */}
                        <div className="flex flex-wrap gap-2">
                            {allExercises.map((ex) => (
                                <button key={ex} onClick={() => setSelectedExercise(ex)}
                                    className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-colors ${chartExercise === ex ? 'bg-accent text-background' : 'bg-card-border/20 text-muted border border-card-border'}`}>
                                    {ex}
                                </button>
                            ))}
                        </div>
                        {chartExercise && <LineChart data={chartData} />}
                    </div>
                )}
            </main>

            <nav className="fixed bottom-6 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 px-6">
                <div className="flex items-center justify-around rounded-full bg-background py-3 border border-card-border shadow-2xl">
                    <Link href="/dashboard" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></Link>
                    <div className="p-2 text-accent"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>
                    <Link href="/timer" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></Link>
                    <Link href="/account" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></Link>
                </div>
            </nav>
        </div>
    );
}
