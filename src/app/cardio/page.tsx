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
                <span className="text-2xl">🚴</span>
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
