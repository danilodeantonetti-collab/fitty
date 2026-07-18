"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface CardioEntry {
    id: string;
    date: string;
    distance_km: number | null;
    duration_min: number | null;
    route: string | null;
}

// Montag der aktuellen Woche (deutsche Wochenlogik)
function mondayOfCurrentWeek(): string {
    const d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d.toISOString().split("T")[0];
}

const speed = (e: CardioEntry) =>
    e.distance_km && e.duration_min ? Math.round((e.distance_km / (e.duration_min / 60)) * 10) / 10 : null;

// Montag der Woche eines Datums (yyyy-mm-dd)
function mondayOf(dateStr: string): string {
    const d = new Date(dateStr + "T00:00:00");
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const fmtShort = (dateStr: string) =>
    new Date(dateStr + "T00:00:00").toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });

// km pro Woche: schlanke Balken, Akzentfarbe, zurückhaltendes Gitter
function WeeklyKmChart({ entries }: { entries: CardioEntry[] }) {
    const byWeek: Record<string, number> = {};
    entries.forEach((e) => { if (e.distance_km) byWeek[mondayOf(e.date)] = (byWeek[mondayOf(e.date)] ?? 0) + e.distance_km; });
    // letzte 10 Wochen inkl. Lücken
    const weeks: { key: string; km: number }[] = [];
    const cur = new Date(mondayOf(new Date().toISOString().split("T")[0]) + "T00:00:00");
    for (let i = 9; i >= 0; i--) {
        const d = new Date(cur); d.setDate(d.getDate() - i * 7);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        weeks.push({ key, km: Math.round((byWeek[key] ?? 0) * 10) / 10 });
    }
    if (!weeks.some((w) => w.km > 0)) return <p className="py-6 text-center text-xs text-muted">Noch keine km eingetragen</p>;
    const W = 320, H = 140, L = 26, R = 8, T = 14, B = 20;
    const maxV = Math.max(...weeks.map((w) => w.km), 1);
    const bw = Math.min(18, ((W - L - R) / weeks.length) * 0.6);
    const x = (i: number) => L + ((i + 0.5) / weeks.length) * (W - L - R) - bw / 2;
    const y = (v: number) => T + (1 - v / maxV) * (H - T - B);
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }}>
            {[maxV / 2, maxV].map((v) => (
                <g key={v}>
                    <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <text x={L - 4} y={y(v) + 3} textAnchor="end" fontSize="8" fill="#666" fontWeight="bold">{Math.round(v)}</text>
                </g>
            ))}
            <line x1={L} x2={W - R} y1={H - B} y2={H - B} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            {weeks.map((w, i) => (
                <g key={w.key}>
                    {w.km > 0 && <rect x={x(i)} y={y(w.km)} width={bw} height={Math.max(2, H - B - y(w.km))} rx="3" fill="#e2ff00" />}
                    {w.km > 0 && <text x={x(i) + bw / 2} y={y(w.km) - 4} textAnchor="middle" fontSize="7" fill="#999" fontWeight="bold">{w.km}</text>}
                </g>
            ))}
            <text x={L} y={H - 6} textAnchor="start" fontSize="8" fill="#666" fontWeight="bold">{fmtShort(weeks[0].key)}</text>
            <text x={W - R} y={H - 6} textAnchor="end" fontSize="8" fill="#666" fontWeight="bold">{fmtShort(weeks[weeks.length - 1].key)}</text>
        </svg>
    );
}

// Tempo je Ausfahrt (km/h): Linie in Akzent, Punkte klein
function SpeedChart({ entries }: { entries: CardioEntry[] }) {
    const pts = entries
        .filter((e) => speed(e) !== null)
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((e) => ({ date: e.date, v: speed(e)! }));
    if (pts.length < 2) return <p className="py-6 text-center text-xs text-muted">Mindestens 2 Ausfahrten mit km + Zeit benötigt</p>;
    const W = 320, H = 140, L = 30, R = 10, T = 14, B = 20;
    const rawMin = Math.min(...pts.map((p) => p.v)), rawMax = Math.max(...pts.map((p) => p.v));
    const pad = Math.max((rawMax - rawMin) * 0.2, 0.5);
    const minV = rawMin - pad, maxV = rawMax + pad;
    const x = (i: number) => L + (pts.length === 1 ? 0.5 : i / (pts.length - 1)) * (W - L - R);
    const y = (v: number) => T + ((maxV - v) / (maxV - minV)) * (H - T - B);
    const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.v).toFixed(1)}`).join(" ");
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }}>
            {[rawMin, rawMax].map((v) => (
                <g key={v}>
                    <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <text x={L - 4} y={y(v) + 3} textAnchor="end" fontSize="8" fill="#666" fontWeight="bold">{Math.round(v * 10) / 10}</text>
                </g>
            ))}
            <path d={path} fill="none" stroke="#e2ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map((p, i) => (
                <circle key={p.date + i} cx={x(i)} cy={y(p.v)} r={i === pts.length - 1 ? 4 : 2.5} fill="#e2ff00" stroke="#050505" strokeWidth={i === pts.length - 1 ? 2 : 0} />
            ))}
            <text x={x(pts.length - 1)} y={y(pts[pts.length - 1].v) - 8} textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">{pts[pts.length - 1].v}</text>
            <text x={L} y={H - 6} textAnchor="start" fontSize="8" fill="#666" fontWeight="bold">{fmtShort(pts[0].date)}</text>
            <text x={W - R} y={H - 6} textAnchor="end" fontSize="8" fill="#666" fontWeight="bold">{fmtShort(pts[pts.length - 1].date)}</text>
        </svg>
    );
}

export default function CardioPage() {
    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [entries, setEntries] = useState<CardioEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [km, setKm] = useState("");
    const [minutes, setMinutes] = useState("");
    const [route, setRoute] = useState("");

    useEffect(() => {
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push("/auth/login"); return; }
            setUserId(user.id);
            const { data } = await supabase
                .from("cardio_sessions")
                .select("id, date, distance_km, duration_min, route")
                .eq("user_id", user.id)
                .order("date", { ascending: false })
                .limit(100);
            setEntries((data as CardioEntry[]) ?? []);
            setLoading(false);
        };
        load();
    }, [router]);

    const save = async () => {
        const dist = parseFloat(km.replace(",", "."));
        const mins = parseInt(minutes);
        if (!dist && !mins) return;
        setSaving(true);
        const { data, error } = await supabase
            .from("cardio_sessions")
            .insert([{
                user_id: userId,
                date,
                activity: "Radfahren",
                distance_km: dist || null,
                duration_min: mins || null,
                route: route.trim() || null,
            }])
            .select()
            .single();
        if (!error && data) {
            setEntries((prev) => [data as CardioEntry, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
            setKm(""); setMinutes(""); setRoute("");
        } else if (error) {
            alert("Fehler: " + error.message);
        }
        setSaving(false);
    };

    const remove = async (id: string) => {
        await supabase.from("cardio_sessions").delete().eq("id", id).eq("user_id", userId);
        setEntries((prev) => prev.filter((e) => e.id !== id));
    };

    const monday = mondayOfCurrentWeek();
    const thisWeek = entries.filter((e) => e.date >= monday);
    const totalKm = Math.round(entries.reduce((s, e) => s + (e.distance_km ?? 0), 0) * 10) / 10;

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-accent font-bold">Lade...</div>;

    return (
        <div className="min-h-screen bg-background pb-24">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <Link href="/dashboard" className="text-muted hover:text-foreground">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </Link>
                <h1 className="text-xl font-black tracking-tighter text-foreground uppercase">Rad<span className="text-accent italic">fahren</span></h1>
                <svg className="h-6 w-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="6" cy="16" r="3.2" /><circle cx="18" cy="16" r="3.2" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 16l4-7h5m-2.5 0L18 16M10 9h-2.5M14.5 6.5H16" /></svg>
            </header>

            <main className="mx-auto max-w-lg space-y-6 px-6 pt-8">
                {/* Wochenstatus */}
                <div className={`flex items-center justify-between rounded-2xl border p-5 ${thisWeek.length ? "border-accent/50 bg-accent/10" : "border-card-border bg-card-border/20"}`}>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Diese Woche</p>
                        <p className={`text-xl font-black ${thisWeek.length ? "text-accent" : "text-foreground"}`}>
                            {thisWeek.length ? `Erledigt ✓${thisWeek.length > 1 ? ` (${thisWeek.length}×)` : ""}` : "Noch offen"}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Gesamt</p>
                        <p className="text-xl font-black text-foreground">{totalKm} <span className="text-sm text-muted">km</span></p>
                    </div>
                </div>

                {/* Eintragen */}
                <div className="rounded-3xl border border-card-border bg-card-border/20 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                            className="rounded-xl border border-card-border bg-card p-3 text-xs font-bold text-foreground focus:border-accent focus:outline-none" />
                        <input type="number" inputMode="decimal" step="0.1" placeholder="KM" value={km} onChange={(e) => setKm(e.target.value)}
                            className="w-full flex-1 rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none" />
                        <input type="number" inputMode="numeric" placeholder="MIN" value={minutes} onChange={(e) => setMinutes(e.target.value)}
                            className="w-full flex-1 rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="text" placeholder="Strecke (optional)" value={route} onChange={(e) => setRoute(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") save(); }}
                            className="w-full flex-1 rounded-xl border border-card-border bg-card p-3 text-sm font-bold text-foreground focus:border-accent focus:outline-none" />
                        <button onClick={save} disabled={saving || (!km && !minutes)}
                            className="rounded-xl bg-accent px-5 py-3 text-sm font-black text-background disabled:opacity-40">+</button>
                    </div>
                </div>

                {/* Entwicklung: mehr km? schneller? */}
                {entries.length > 0 && (
                    <>
                        <div className="rounded-3xl border border-card-border bg-card-border/20 p-5">
                            <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-muted">km pro Woche</h3>
                            <WeeklyKmChart entries={entries} />
                        </div>
                        <div className="rounded-3xl border border-card-border bg-card-border/20 p-5">
                            <div className="mb-3 flex items-baseline justify-between gap-3">
                                <h3 className="text-sm font-black uppercase tracking-widest text-muted">Tempo km/h</h3>
                                {(() => {
                                    const sp = entries
                                        .filter((e) => speed(e) !== null)
                                        .slice()
                                        .sort((a, b) => a.date.localeCompare(b.date))
                                        .map((e) => speed(e)!);
                                    if (sp.length < 4) return null;
                                    const half = Math.floor(sp.length / 2);
                                    const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;
                                    const delta = Math.round((avg(sp.slice(half)) - avg(sp.slice(0, half))) * 10) / 10;
                                    return (
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${delta > 0 ? "text-accent" : "text-muted"}`}>
                                            {delta > 0 ? "▲" : delta < 0 ? "▼" : ""} {Math.abs(delta)} km/h im Trend
                                        </span>
                                    );
                                })()}
                            </div>
                            <SpeedChart entries={entries} />
                        </div>
                    </>
                )}

                {/* Liste */}
                {entries.length > 0 && (
                    <div className="space-y-2">
                        {entries.map((e) => (
                            <div key={e.id} className="flex items-center justify-between gap-3 rounded-2xl border border-card-border bg-card-border/10 px-4 py-3">
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-muted">{new Date(e.date + "T00:00:00").toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "2-digit" })}</p>
                                    <p className="text-sm font-black text-foreground">
                                        {e.distance_km ? `${e.distance_km} km` : ""}{e.distance_km && e.duration_min ? " · " : ""}{e.duration_min ? `${e.duration_min} Min` : ""}
                                        {speed(e) ? <span className="ml-2 text-xs font-bold text-accent">{speed(e)} km/h</span> : null}
                                    </p>
                                    {e.route && <p className="truncate text-xs italic text-muted">{e.route}</p>}
                                </div>
                                <button onClick={() => remove(e.id)} aria-label="Eintrag löschen" className="flex-shrink-0 p-1 text-muted hover:text-red-400 transition-colors">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
