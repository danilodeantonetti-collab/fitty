"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getMtmtDay, getMtmtMonth, MtmtExercise, MtmtSection } from "@/data/mtmt";
import { advanceMtmtProgress, getMtmtProgress, markMtmtDone, setMtmtProgress } from "@/lib/mtmtProgress";
import { useTimer } from "@/context/TimerContext";
import VideoModal from "@/components/VideoModal";

interface SetLog { reps: string; weight: string; isWarmup?: boolean; done?: boolean; }

const calc1RM = (weight: number, reps: number) => reps === 1 ? weight : Math.round(weight * (1 + reps / 30));

const fmtTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

// Intervall-Vorgabe der Woche aus einer Sektion lesen, z. B. "10 Sek. ON / 20 Sek. OFF"
function sectionInterval(sec: MtmtSection, weekIdx: number): { work: number; rest: number } | null {
    for (const ex of sec.exercises) {
        const m = (ex.weeks[weekIdx]?.reps ?? "").match(/(\d+)\s*Sek\.\s*ON\s*\/\s*(\d+)\s*Sek\.\s*OFF/i);
        if (m) return { work: parseInt(m[1]), rest: parseInt(m[2]) };
    }
    return null;
}

const REST_CHOICES = [60, 90, 120, 180];

// Wie wird die Übung gemessen? Gewicht×Reps, Zeit (Sek.) oder Atemzüge
type Modality = "weight" | "time" | "breath";
function exModality(ex: MtmtExercise, weekIdx: number): Modality {
    const t = ex.weeks[weekIdx]?.reps ?? "";
    if (/Atemzüge/i.test(t)) return "breath";
    if (/Sek\.|Min\./i.test(t) && !/ON\s*\//i.test(t)) return "time";
    return "weight";
}

// Tempo-Angabe aus den Cues lesen, z. B. "@ Tempo 4 - 1 - 0"
// (Absenken - Halten - Hochdrücken, jeweils in Sekunden)
function parseTempo(cues?: string): { tempo: string; rest: string } | null {
    if (!cues) return null;
    const m = cues.match(/@?\s*Tempo\s*(\d)\s*-\s*(\d)\s*-\s*(\d)/i);
    if (!m) return null;
    const rest = cues.replace(m[0], "").replace(/\s+/g, " ").trim();
    return { tempo: `${m[1]}-${m[2]}-${m[3]}`, rest };
}

function tempoHint(tempo: string): string {
    const [down, hold, up] = tempo.split("-");
    return `${down}s absenken · ${hold}s halten · ${up === "0" ? "explosiv hoch" : `${up}s hoch`}`;
}

const TEMPO_VIDEO_URL = "https://www.youtube.com/watch?v=4acdVXoPBVM"; // Tempoarbeit - MTMT Blueprint

function defaultSetCount(ex: MtmtExercise, section: MtmtSection, weekIdx: number): number {
    const own = parseInt(ex.weeks[weekIdx]?.sets ?? "");
    if (own >= 1 && own <= 10) return own;
    const group = parseInt(section.groupSets?.[weekIdx] ?? "");
    if (group >= 1 && group <= 10) return group;
    return 3;
}

export default function MtmtWorkout() {
    const params = useParams();
    const router = useRouter();
    const monthNum = parseInt(params.month as string);
    const dayNum = parseInt(params.day as string);
    const month = getMtmtMonth(monthNum);
    const day = getMtmtDay(monthNum, dayNum);

    const [week, setWeek] = useState(1);
    const [logs, setLogs] = useState<Record<string, SetLog[]>>({});
    const [lastPerformance, setLastPerformance] = useState<Record<string, { weight: string; reps: string }>>({});
    const [saving, setSaving] = useState(false);
    const [newPRs, setNewPRs] = useState<{ name: string; weight: number }[]>([]);
    const [showPRModal, setShowPRModal] = useState(false);
    const [video, setVideo] = useState<{ url: string; title: string } | null>(null);
    const [sessionDate, setSessionDate] = useState(() => new Date().toISOString().split("T")[0]);
    const timer = useTimer();
    const [restSeconds, setRestSeconds] = useState(90);
    // Stoppuhr für Zeit-Übungen (eine gleichzeitig): gestoppte Sekunden landen im Satz
    const [watch, setWatch] = useState<{ name: string; idx: number; start: number; now: number } | null>(null);

    useEffect(() => {
        if (!watch) return;
        const iv = setInterval(() => setWatch((w) => (w ? { ...w, now: Date.now() } : w)), 250);
        return () => clearInterval(iv);
    }, [watch !== null]); // eslint-disable-line react-hooks/exhaustive-deps

    const toggleWatch = (name: string, idx: number) => {
        if (watch && watch.name === name && watch.idx === idx) {
            const secs = Math.max(1, Math.round((Date.now() - watch.start) / 1000));
            setLogs((p) => {
                const n = { ...p };
                n[name] = [...n[name]];
                n[name][idx] = { ...n[name][idx], reps: String(secs), done: true };
                return n;
            });
            setWatch(null);
        } else {
            setWatch({ name, idx, start: Date.now(), now: Date.now() });
        }
    };

    useEffect(() => {
        try {
            const saved = parseInt(localStorage.getItem("fitty_rest_seconds") ?? "");
            if (REST_CHOICES.includes(saved)) setRestSeconds(saved);
        } catch {}
    }, []);

    const chooseRest = (s: number) => {
        setRestSeconds(s);
        try { localStorage.setItem("fitty_rest_seconds", String(s)); } catch {}
    };

    // Woche aus dem gespeicherten Fortschritt übernehmen
    useEffect(() => {
        const p = getMtmtProgress();
        if (p.month === monthNum) setWeek(p.week);
    }, [monthNum]);

    // Leere Satz-Zeilen passend zur gewählten Woche anlegen (Eingaben bleiben beim Wochenwechsel erhalten)
    useEffect(() => {
        if (!day) return;
        setLogs((prev) => {
            const next: Record<string, SetLog[]> = { ...prev };
            day.sections.forEach((sec) => {
                sec.exercises.forEach((ex) => {
                    if (!next[ex.name]) {
                        next[ex.name] = Array.from({ length: defaultSetCount(ex, sec, week - 1) }, () => ({ reps: "", weight: "" }));
                    }
                });
            });
            return next;
        });
    }, [day, week]);

    // Letzte Leistung je Übung aus den letzten Sessions laden
    useEffect(() => {
        if (!day) return;
        const names = new Set<string>();
        day.sections.forEach((s) => s.exercises.forEach((e) => names.add(e.name)));
        const load = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;
                const { data: sessions } = await supabase
                    .from("sessions").select("id, date")
                    .eq("user_id", user.id)
                    .order("date", { ascending: false })
                    .limit(40);
                if (!sessions?.length) return;
                const order = new Map(sessions.map((s, i) => [s.id, i]));
                const { data: sets } = await supabase
                    .from("sets").select("session_id, exercise_name, weight, reps")
                    .in("session_id", sessions.map((s) => s.id))
                    .not("exercise_name", "is", null);
                if (!sets) return;
                const best: Record<string, { idx: number; weight: string; reps: string }> = {};
                sets.forEach((s: any) => {
                    if (!names.has(s.exercise_name)) return;
                    const idx = order.get(s.session_id) ?? 999;
                    if (!best[s.exercise_name] || idx < best[s.exercise_name].idx) {
                        best[s.exercise_name] = { idx, weight: String(s.weight), reps: String(s.reps) };
                    }
                });
                const perf: Record<string, { weight: string; reps: string }> = {};
                Object.entries(best).forEach(([n, b]) => { perf[n] = { weight: b.weight, reps: b.reps }; });
                setLastPerformance(perf);
            } catch (e) { console.error(e); }
        };
        load();
    }, [day]);

    if (!month || !day) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-background gap-4">
                <p className="text-muted">Training nicht gefunden.</p>
                <Link href="/program" className="btn-primary">Zurück</Link>
            </div>
        );
    }

    const weekIdx = week - 1;

    const selectWeek = (w: number) => {
        setWeek(w);
        setMtmtProgress({ month: monthNum, week: w });
    };

    const addSet = (name: string) => setLogs(p => ({ ...p, [name]: [...(p[name] || []), { reps: "", weight: "" }] }));
    const addWarmup = (name: string) => setLogs(p => ({ ...p, [name]: [{ reps: "", weight: "", isWarmup: true }, ...(p[name] || [])] }));
    const updateSet = (name: string, idx: number, field: "weight" | "reps", value: string) =>
        setLogs(p => { const n = { ...p }; n[name] = [...n[name]]; n[name][idx] = { ...n[name][idx], [field]: value }; return n; });
    const removeSet = (name: string, idx: number) => setLogs(p => ({ ...p, [name]: p[name].filter((_, i) => i !== idx) }));

    // Satz abhaken -> Pausen-Timer startet direkt hier in der Übung
    const toggleDone = (name: string, idx: number) => {
        setLogs(p => {
            const n = { ...p };
            n[name] = [...n[name]];
            const wasDone = !!n[name][idx].done;
            n[name][idx] = { ...n[name][idx], done: !wasDone };
            if (!wasDone && !n[name][idx].isWarmup) timer.startRest(restSeconds);
            return n;
        });
    };

    // Timer mit passender Intervall-Voreinstellung öffnen (z. B. "10 Sek. ON / 20 Sek. OFF")
    const openTimer = () => {
        let preset: { work: number; rest: number } | null = null;
        outer: for (const sec of day.sections) {
            for (const ex of sec.exercises) {
                const m = (ex.weeks[weekIdx]?.reps ?? "").match(/(\d+)\s*Sek\.\s*ON\s*\/\s*(\d+)\s*Sek\.\s*OFF/i);
                if (m) { preset = { work: parseInt(m[1]), rest: parseInt(m[2]) }; break outer; }
            }
        }
        try { if (preset) localStorage.setItem("fitty_timer_preset", JSON.stringify(preset)); } catch {}
        router.push("/timer");
    };

    const get1RM = (name: string) => {
        let best = 0;
        (logs[name] || []).forEach(s => {
            if (s.weight && s.reps) { const rm = calc1RM(parseFloat(s.weight), parseInt(s.reps)); if (rm > best) best = rm; }
        });
        return best;
    };

    const handleFinish = async () => {
        try {
            setSaving(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { alert("Nicht eingeloggt!"); setSaving(false); return; }

            const { data: session, error: sessionErr } = await supabase
                .from("sessions")
                .insert([{ user_id: user.id, date: new Date(sessionDate).toISOString() }])
                .select()
                .single();
            if (sessionErr) throw sessionErr;

            const { data: prevSets } = await supabase
                .from("sets").select("exercise_name, weight, sessions!inner(user_id)")
                .eq("sessions.user_id", user.id)
                .not("exercise_name", "is", null);
            const allTimeBest: Record<string, number> = {};
            (prevSets || []).forEach((s: any) => {
                if (s.exercise_name && s.weight != null) {
                    if (!allTimeBest[s.exercise_name] || s.weight > allTimeBest[s.exercise_name]) allTimeBest[s.exercise_name] = s.weight;
                }
            });

            const prs: { name: string; weight: number }[] = [];
            const setsToInsert: any[] = [];
            Object.entries(logs).forEach(([name, exSets]) => {
                const working = exSets.filter(s => !s.isWarmup && s.weight);
                const maxNew = working.length ? Math.max(...working.map(s => parseFloat(s.weight))) : 0;
                if (maxNew > 0 && maxNew > (allTimeBest[name] || 0)) prs.push({ name, weight: maxNew });
                exSets.forEach((set, idx) => {
                    if (set.weight || set.reps) {
                        setsToInsert.push({
                            session_id: session.id,
                            exercise_name: name,
                            weight: set.weight ? parseFloat(set.weight) : 0,
                            reps: set.reps ? parseInt(set.reps) : 0,
                            order: idx + 1,
                        });
                    }
                });
            });
            if (setsToInsert.length > 0) {
                const { error } = await supabase.from("sets").insert(setsToInsert);
                if (error) throw error;
            }

            markMtmtDone({ month: monthNum, week, day: dayNum, date: sessionDate });
            advanceMtmtProgress(month.days.length);

            if (prs.length > 0) { setNewPRs(prs); setShowPRModal(true); setSaving(false); }
            else router.push(`/program/${monthNum}`);
        } catch (err: any) {
            alert("Fehler: " + err.message);
            setSaving(false);
        }
    };

    if (showPRModal) return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <div className="animate-in zoom-in duration-500 space-y-6 max-w-sm w-full">
                <svg className="mx-auto h-16 w-16 animate-bounce text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3" /></svg>
                <h1 className="text-4xl font-black text-foreground">Neue Bestleistung!</h1>
                <p className="text-muted text-sm">Du hast neue Rekorde aufgestellt:</p>
                <div className="space-y-3">
                    {newPRs.map(pr => (
                        <div key={pr.name} className="rounded-2xl border border-accent bg-accent/10 p-4">
                            <p className="text-xs font-black text-accent uppercase tracking-widest">{pr.name}</p>
                            <p className="text-3xl font-black text-foreground mt-1">{pr.weight} <span className="text-base text-muted">kg</span></p>
                        </div>
                    ))}
                </div>
                <button onClick={() => router.push(`/program/${monthNum}`)} className="btn-primary w-full text-lg mt-4">Weiter</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex flex-col gap-3 border-b border-card-border bg-background px-6 py-4">
                <div className="flex w-full items-center justify-between">
                    <Link href={`/program/${monthNum}`} className="text-muted hover:text-foreground">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </Link>
                    <div className="min-w-0 px-2 text-center">
                        <h1 className="truncate text-lg font-black tracking-tighter text-foreground uppercase">Monat {monthNum} · Tag {dayNum}</h1>
                        <p className="truncate text-[10px] font-bold uppercase tracking-widest text-muted">{month.phase}</p>
                    </div>
                    <button onClick={openTimer} aria-label="Intervall-Timer" className="rounded-full border border-card-border p-2 text-muted hover:text-accent transition-colors">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                </div>
                <div className="flex w-full items-center justify-between gap-3">
                    <div className="grid flex-1 grid-cols-4 gap-1.5">
                        {[1, 2, 3, 4].map((w) => (
                            <button key={w} onClick={() => selectWeek(w)}
                                className={`rounded-lg border py-1.5 text-[11px] font-black uppercase tracking-wider transition-all ${week === w ? "border-accent bg-accent text-background" : "border-card-border bg-card text-muted"}`}>
                                W{w}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-card-border/30 py-1.5 px-3 flex-shrink-0">
                        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)}
                            className="w-28 bg-transparent text-xs font-bold text-foreground border-none outline-none" />
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8">
                <div className="space-y-6">
                    {day.sections.map((sec) => (
                        <section key={sec.title} className="rounded-3xl border border-card-border bg-card-border/10 p-5">
                            <div className="mb-6 border-b border-card-border pb-4">
                                <h2 className="inline-block rounded-lg bg-accent px-3 py-1.5 text-xl font-black uppercase tracking-tight text-background">{sec.title}</h2>
                                {(sec.groupSets?.[weekIdx] || sec.weekNotes?.[weekIdx] || sectionInterval(sec, weekIdx)) && (
                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                                        {sec.groupSets?.[weekIdx] && <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent">{sec.groupSets[weekIdx]} Runden</span>}
                                        {sec.weekNotes?.[weekIdx] && <span className="rounded-full bg-card-border/50 px-2.5 py-1">{sec.weekNotes[weekIdx]}</span>}
                                        {(() => {
                                            const iv = sectionInterval(sec, weekIdx);
                                            if (!iv) return null;
                                            return (
                                                <button onClick={() => timer.startIntervals(iv.work, iv.rest)}
                                                    className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-black text-background transition-transform active:scale-95">
                                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                    {iv.work}/{iv.rest}
                                                </button>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-8">
                                {sec.exercises.map((ex) => {
                                    const target = ex.weeks[weekIdx];
                                    const rm = get1RM(ex.name);
                                    const modality = exModality(ex, weekIdx);
                                    return (
                                        <div key={ex.id + ex.name}>
                                            <div className="flex items-start justify-between border-b border-accent/20 pb-2 gap-2">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="flex-shrink-0 rounded-md bg-card-border/60 px-1.5 py-0.5 text-[10px] font-black uppercase text-muted">{ex.id}</span>
                                                        <h3 className="text-lg font-black leading-tight tracking-tight text-foreground">{ex.name}</h3>
                                                    </div>
                                                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                                                        <p className="text-xs font-bold uppercase tracking-widest text-accent">
                                                            {target.sets ? `${target.sets} × ` : ""}{target.reps ?? "—"}
                                                        </p>
                                                        {lastPerformance[ex.name] && (
                                                            <p className="text-xs font-bold uppercase tracking-widest text-muted">
                                                                Zuletzt: {modality === "weight"
                                                                    ? `${lastPerformance[ex.name].weight}kg × ${lastPerformance[ex.name].reps}`
                                                                    : `${lastPerformance[ex.name].reps}${modality === "time" ? " Sek." : " Atemzüge"}`}
                                                            </p>
                                                        )}
                                                        {rm > 0 && <p className="text-xs font-bold uppercase tracking-widest text-muted">1RM ~{rm}kg</p>}
                                                    </div>
                                                    {(() => {
                                                        const t = parseTempo(ex.cues);
                                                        if (!t) return ex.cues ? <p className="mt-1 text-xs italic text-muted">{ex.cues}</p> : null;
                                                        return (
                                                            <div className="mt-1.5 space-y-1">
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <button onClick={() => setVideo({ url: TEMPO_VIDEO_URL, title: "Tempoarbeit erklärt" })}
                                                                        aria-label="Was bedeutet die Tempo-Angabe? (Video)"
                                                                        className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-background">
                                                                        Tempo {t.tempo}
                                                                        <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                                    </button>
                                                                    <span className="text-[11px] text-muted">{tempoHint(t.tempo)}</span>
                                                                </div>
                                                                {t.rest && <p className="text-xs italic text-muted">{t.rest}</p>}
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                                <div className="flex flex-shrink-0 items-center gap-2">
                                                    {ex.videoUrl && (
                                                        <button onClick={() => setVideo({ url: ex.videoUrl!, title: ex.name })} aria-label={`Video: ${ex.name}`}
                                                            className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-background">
                                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                        </button>
                                                    )}
                                                    <button onClick={() => addWarmup(ex.name)} className="rounded-lg bg-card-border/40 px-2 py-1 text-[9px] font-bold text-muted uppercase hover:text-foreground transition-colors">+ Warm</button>
                                                    <button onClick={() => addSet(ex.name)} className="rounded-lg bg-card-border px-2 py-1 text-[9px] font-bold text-accent uppercase hover:bg-accent/10 transition-colors">+ Set</button>
                                                </div>
                                            </div>
                                            <div className="mt-4 space-y-3">
                                                {(logs[ex.name] || []).map((set, idx) => (
                                                    <div key={idx} className={`flex items-center gap-3 transition-opacity ${set.done ? "opacity-60" : ""}`}>
                                                        <button onClick={() => toggleDone(ex.name, idx)} aria-label={set.done ? "Satz zurücksetzen" : "Satz abhaken (startet Pause)"}
                                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black border transition-all active:scale-90 ${set.done ? "bg-accent border-accent text-background" : set.isWarmup ? "bg-muted/10 border-muted/30 text-muted" : "bg-accent/10 border-accent/20 text-accent"}`}>
                                                            {set.done ? (
                                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                            ) : set.isWarmup ? "W" : idx + 1}
                                                        </button>
                                                        {modality === "weight" && (
                                                            <div className="grid flex-1 grid-cols-2 gap-3">
                                                                <input type="number" placeholder="KG" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.weight} onChange={(e) => updateSet(ex.name, idx, "weight", e.target.value)} />
                                                                <input type="number" placeholder="REPS" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                            </div>
                                                        )}
                                                        {modality === "breath" && (
                                                            <div className="flex-1">
                                                                <input type="number" placeholder="ATEMZÜGE" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                            </div>
                                                        )}
                                                        {modality === "time" && (() => {
                                                            const running = watch && watch.name === ex.name && watch.idx === idx;
                                                            const live = running ? Math.round((watch!.now - watch!.start) / 1000) : 0;
                                                            return (
                                                                <div className="flex flex-1 items-center gap-3">
                                                                    <input type="number" placeholder="SEK." className="w-full flex-1 rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                                    <button onClick={() => toggleWatch(ex.name, idx)}
                                                                        aria-label={running ? "Stoppuhr stoppen und Zeit speichern" : "Stoppuhr starten"}
                                                                        className={`flex h-11 min-w-[3.5rem] flex-shrink-0 items-center justify-center gap-1 rounded-xl border px-2 text-sm font-black tabular-nums transition-all active:scale-95 ${running ? "border-accent bg-accent text-background" : "border-card-border bg-card text-accent"}`}>
                                                                        {running ? (
                                                                            <>{live}s</>
                                                                        ) : (
                                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5M12 6a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM10 3h4" /></svg>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            );
                                                        })()}
                                                        <button onClick={() => removeSet(ex.name, idx)} className="text-muted hover:text-red-400 transition-colors p-1">
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </main>

            {/* Mini-Timer: läuft direkt im Workout, ohne Seitenwechsel */}
            {timer.phase !== "IDLE" && (
                <div className="fixed bottom-24 inset-x-0 z-40 flex justify-center px-6">
                    <div className={`flex w-full max-w-sm items-center justify-between gap-3 rounded-2xl border bg-background/95 px-4 py-3 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300 ${timer.phase === "REST" ? "border-blue-500/40" : "border-accent neon-shadow"}`}>
                        <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${timer.phase === "REST" ? "text-blue-400" : "text-accent"}`}>
                                {timer.phase === "REST" ? "Pause" : "Arbeit"}
                            </span>
                            <span className="text-2xl font-black tabular-nums text-foreground">{fmtTime(timer.timeLeft)}</span>
                            {timer.currentSet > 0 && <span className="text-xs font-bold text-muted">Runde {timer.currentSet}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            {timer.currentSet === 0 && (
                                <div className="flex gap-1">
                                    {REST_CHOICES.map((s) => (
                                        <button key={s} onClick={() => chooseRest(s)}
                                            className={`rounded-md px-1.5 py-0.5 text-[9px] font-black ${restSeconds === s ? "bg-accent text-background" : "bg-card-border/40 text-muted"}`}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button onClick={timer.stop} aria-label="Timer stoppen"
                                className="rounded-full border border-card-border p-1.5 text-muted hover:text-red-400 transition-colors">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed bottom-8 inset-x-0 flex justify-center px-6">
                <button onClick={handleFinish} disabled={saving}
                    className="btn-primary w-full max-w-sm flex items-center justify-center gap-3 text-lg disabled:opacity-50">
                    {saving ? "Speichere..." : "Session beenden"}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </button>
            </div>

            {video && <VideoModal url={video.url} title={video.title} onClose={() => setVideo(null)} />}
        </div>
    );
}
