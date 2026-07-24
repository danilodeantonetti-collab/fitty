"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getMtmtDay, getMtmtMonth, MtmtExercise, MtmtSection } from "@/data/mtmt";
import { advanceMtmtProgress, getMtmtProgress, markMtmtDone, setMtmtProgress, syncMtmtState } from "@/lib/mtmtProgress";
import { useTimer } from "@/context/TimerContext";
import VideoModal from "@/components/VideoModal";

interface SetLog { reps: string; weight: string; reps2?: string; isWarmup?: boolean; done?: boolean; } // reps2 = rechte Seite bei "/ Seite"-Übungen

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

// Wie wird die Übung gemessen? (aus Audit aller 318 Übungen abgeleitet)
// weight = KG×Reps · reps = nur Reps (Körpergewicht) · time = Sekunden+Stoppuhr
// breath = Atemzüge · cal = Kalorien (Finisher) · intervalWeight = Intervall mit
// Gerät (nur KG) · check = Intervall ohne Gerät (nur abhaken, Timer macht die Runden)
type Modality = "weight" | "reps" | "time" | "breath" | "cal" | "intervalWeight" | "check";

const hasImplement = (name: string) =>
    /\b(DB|KB|BB)\b|Langhantel|Barbell|Kettlebell|Kurzhantel|Trap ?Bar|Safety|Landmine|Kabel|Cable|Pulldown|Maschine|Medizinball/i.test(name);

const isBodyweight = (name: string) =>
    /Push ?Up|Klimmzug|Pull ?Up\b|Ring Rows|an Ringen|mit Festhalten|Körpergewicht|Step Overs|^Lateral Lunge$|^Skater Squat mit Festhalten$/i.test(name);

// "pro Seite"-Übungen bekommen Links/Rechts-Felder (außer bei Gewichtsübungen)
const isSideTarget = (ex: MtmtExercise, weekIdx: number) => /\/\s*Seite/i.test(ex.weeks[weekIdx]?.reps ?? "");

function exModality(ex: MtmtExercise, weekIdx: number, sectionTitle?: string): Modality {
    const t = ex.weeks[weekIdx]?.reps ?? "";
    if (/Atemzüge/i.test(t)) return "breath";
    if (/Max ?Out/i.test(t)) return "time"; // so lange halten wie möglich -> Stoppuhr
    if (/CAL/i.test(t)) return "cal";
    if (/ON\s*\//i.test(t)) return hasImplement(ex.name) ? "intervalWeight" : "check";
    if (/Sek\.|Min\./i.test(t)) return "time";
    if (sectionTitle && /Vorbereitung/i.test(sectionTitle)) return "reps"; // Warmmachen = Körpergewicht
    if (isBodyweight(ex.name)) return "reps";
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

// Hilfsmittel aus den Übungsnamen ableiten. special = hat nicht jedes Studio.
const EQUIPMENT: { re: RegExp; label: string; special?: boolean }[] = [
    { re: /Air ?Bike/i, label: "Airbike", special: true },
    { re: /Ski ?Ergo/i, label: "SkiErg", special: true },
    { re: /Rower|Ruder/i, label: "Ruderergometer", special: true },
    { re: /Versa ?Climber/i, label: "Versa Climber", special: true },
    { re: /Battle ?Rope/i, label: "Battle Rope", special: true },
    { re: /Trap ?Bar/i, label: "Trap Bar", special: true },
    { re: /Safety ?Bar/i, label: "Safety Bar", special: true },
    { re: /Wedge/i, label: "Wedge (Keil)", special: true },
    { re: /Sled|Schlitten/i, label: "Sled", special: true },
    { re: /Treadmil|Laufband/i, label: "Laufband", special: true },
    { re: /Pendulum/i, label: "Pendulum Squat", special: true },
    { re: /Foam ?Roller/i, label: "Foam Roller" },
    { re: /\bDB\b|Kurzhantel/i, label: "Kurzhanteln" },
    { re: /\bKB\b|Kettlebell/i, label: "Kettlebell" },
    { re: /Langhantel|Barbell/i, label: "Langhantel" },
    { re: /Klimmzug|Pull ?Up|Pulldown/i, label: "Klimmzugstange/Latzug" },
    { re: /Cable|Kabel/i, label: "Kabelzug" },
    { re: /\bBank\b|auf Bank/i, label: "Bank" },
    { re: /\bBand\b|Miniband/i, label: "Band" },
    { re: /\bWall|Wand/i, label: "Wand" },
];

function dayEquipment(day: { sections: MtmtSection[] }): { label: string; special: boolean }[] {
    const found = new Map<string, boolean>();
    day.sections.forEach((s) =>
        s.exercises.forEach((e) => {
            EQUIPMENT.forEach((q) => {
                if (q.re.test(e.name)) found.set(q.label, found.get(q.label) || !!q.special);
            });
        })
    );
    return [...found.entries()]
        .map(([label, special]) => ({ label, special }))
        .sort((a, b) => Number(b.special) - Number(a.special));
}

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
    // Pro Übung: die letzten 2 Sessions mit allen Sätzen (z. B. diese + letzte Woche)
    const [history, setHistory] = useState<Record<string, { date: string; sets: { weight: number; reps: number }[] }[]>>({});
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

    const toggleWatch = (name: string, idx: number, side: boolean) => {
        if (watch && watch.name === name && watch.idx === idx) {
            const secs = Math.max(1, Math.round((Date.now() - watch.start) / 1000));
            setLogs((p) => {
                const n = { ...p };
                n[name] = [...n[name]];
                const cur = n[name][idx];
                if (side && cur.reps && !cur.reps2) {
                    // zweiter Durchgang -> rechte Seite, dann ist der Satz komplett
                    n[name][idx] = { ...cur, reps2: String(secs), done: true };
                } else {
                    n[name][idx] = { ...cur, reps: String(secs), done: !side };
                }
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

    // Zwischenspeicherung: jede Eingabe landet sofort als Entwurf im localStorage.
    // Zurückgehen oder App schließen verliert nichts mehr; "Session beenden" löscht den Entwurf.
    const draftKey = `fitty_mtmt_draft_${monthNum}_${dayNum}`;
    const draftRestored = useRef(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(draftKey);
            if (raw) {
                const d = JSON.parse(raw);
                if (Date.now() - (d.savedAt ?? 0) < 20 * 3600_000 && d.logs) {
                    setLogs((prev) => (Object.keys(prev).length ? prev : d.logs));
                    if (d.week >= 1 && d.week <= 4) { setWeek(d.week); draftRestored.current = true; }
                } else {
                    localStorage.removeItem(draftKey);
                }
            }
        } catch {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draftKey]);

    // Entwurf automatisch speichern (leicht verzögert, um nicht bei jedem Tastendruck zu schreiben)
    useEffect(() => {
        if (!day) return;
        const hasContent = Object.values(logs).some((sets) => sets.some((s) => s.weight || s.reps || s.done));
        const t = setTimeout(() => {
            try {
                if (hasContent) localStorage.setItem(draftKey, JSON.stringify({ week, logs, savedAt: Date.now() }));
                else localStorage.removeItem(draftKey);
            } catch {}
        }, 300);
        return () => clearTimeout(t);
    }, [logs, week, day, draftKey]);

    // Woche aus dem gespeicherten Fortschritt übernehmen (+ Cloud-Abgleich);
    // ein wiederhergestellter Entwurf hat Vorrang
    useEffect(() => {
        const p = getMtmtProgress();
        if (!draftRestored.current && p.month === monthNum) setWeek(p.week);
        syncMtmtState().then((s) => {
            if (!draftRestored.current && s.progress.month === monthNum) setWeek(s.progress.week);
        });
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

    // Verlauf je Übung laden: die letzten 2 Sessions mit allen Sätzen
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
                const dateOf = new Map(sessions.map((s) => [s.id, s.date]));
                const { data: sets } = await supabase
                    .from("sets").select('session_id, exercise_name, weight, reps, "order"')
                    .in("session_id", sessions.map((s) => s.id))
                    .not("exercise_name", "is", null);
                if (!sets) return;
                // je Übung nach Session gruppieren
                const grouped: Record<string, Map<string, { weight: number; reps: number; order: number }[]>> = {};
                sets.forEach((s: any) => {
                    if (!names.has(s.exercise_name)) return;
                    const bySession = (grouped[s.exercise_name] ??= new Map());
                    if (!bySession.has(s.session_id)) bySession.set(s.session_id, []);
                    bySession.get(s.session_id)!.push({ weight: Number(s.weight), reps: Number(s.reps), order: Number(s.order ?? 0) });
                });
                const hist: typeof history = {};
                Object.entries(grouped).forEach(([name, bySession]) => {
                    hist[name] = [...bySession.entries()]
                        .sort((a, b) => (order.get(a[0]) ?? 999) - (order.get(b[0]) ?? 999))
                        .slice(0, 2)
                        .map(([sid, list]) => ({
                            date: String(dateOf.get(sid) ?? ""),
                            sets: list.sort((a, b) => a.order - b.order).map(({ weight, reps }) => ({ weight, reps })),
                        }));
                });
                setHistory(hist);
            } catch (e) { console.error(e); }
        };
        load();
    }, [day]);

    // Werte der letzten Session in die Eingabefelder übernehmen
    const fillFromLast = () => {
        // welche Übungen sind Links/Rechts-Übungen? (Paare wieder zusammensetzen)
        const sideNames = new Set<string>();
        day?.sections.forEach((sec) =>
            sec.exercises.forEach((e) => {
                const m = exModality(e, week - 1, sec.title);
                if (isSideTarget(e, week - 1) && (m === "time" || m === "reps" || m === "breath")) sideNames.add(e.name);
            })
        );
        setLogs((prev) => {
            const next: Record<string, SetLog[]> = { ...prev };
            Object.entries(history).forEach(([name, hs]) => {
                const last = hs[0];
                if (!last?.sets.length) return;
                if (sideNames.has(name)) {
                    const rows: SetLog[] = [];
                    for (let i = 0; i < last.sets.length; i += 2) {
                        rows.push({
                            weight: "",
                            reps: last.sets[i]?.reps ? String(last.sets[i].reps) : "",
                            reps2: last.sets[i + 1]?.reps ? String(last.sets[i + 1].reps) : "",
                        });
                    }
                    next[name] = rows;
                } else {
                    next[name] = last.sets.map((s) => ({
                        weight: s.weight ? String(s.weight) : "",
                        reps: s.reps ? String(s.reps) : "",
                    }));
                }
            });
            return next;
        });
    };

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
    const updateSet = (name: string, idx: number, field: "weight" | "reps" | "reps2", value: string) =>
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
                let ord = 0;
                exSets.forEach((set) => {
                    if (set.weight || set.reps || set.reps2) {
                        ord += 1;
                        setsToInsert.push({
                            session_id: session.id,
                            exercise_name: name,
                            weight: set.weight ? parseFloat(set.weight) : 0,
                            reps: set.reps ? parseInt(set.reps) : 0,
                            order: ord,
                        });
                        // rechte Seite als eigene Zeile direkt dahinter (Paare bleiben rekonstruierbar)
                        if (set.reps2) {
                            ord += 1;
                            setsToInsert.push({
                                session_id: session.id,
                                exercise_name: name,
                                weight: 0,
                                reps: parseInt(set.reps2) || 0,
                                order: ord,
                            });
                        }
                    }
                });
            });
            if (setsToInsert.length > 0) {
                const { error } = await supabase.from("sets").insert(setsToInsert);
                if (error) throw error;
            }

            try { localStorage.removeItem(draftKey); } catch {} // Entwurf ist jetzt richtig gespeichert
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
                {Object.keys(history).length > 0 && (
                    <button onClick={fillFromLast}
                        className="flex items-center justify-center gap-1.5 rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent transition-colors hover:bg-accent/20">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
                        </svg>
                        Letzte Werte übernehmen
                    </button>
                )}
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8">
                {/* Hilfsmittel des Tages — Spezial-Geräte hervorgehoben */}
                {(() => {
                    const eq = dayEquipment(day);
                    if (!eq.length) return null;
                    return (
                        <div className="mb-6 rounded-2xl border border-card-border bg-card-border/10 p-4">
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted">Heute brauchst du</p>
                            <div className="flex flex-wrap gap-1.5">
                                {eq.map((q) => (
                                    <span key={q.label}
                                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${q.special ? "border-accent/50 bg-accent/10 text-accent" : "border-card-border text-muted"}`}>
                                        {q.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })()}

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
                                    const modality = exModality(ex, weekIdx, sec.title);
                                    const side = isSideTarget(ex, weekIdx) && (modality === "time" || modality === "reps" || modality === "breath");
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
                                                        {rm > 0 && <p className="text-xs font-bold uppercase tracking-widest text-muted">1RM ~{rm}kg</p>}
                                                    </div>
                                                    {/* Was zuletzt gemacht wurde: die letzten 2 Sessions komplett */}
                                                    {history[ex.name]?.length ? (
                                                        <div className="mt-1 space-y-0.5">
                                                            {history[ex.name].map((h) => (
                                                                <p key={h.date} className="text-[11px] font-bold text-muted">
                                                                    <span className="text-foreground/60">{new Date(h.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}:</span>{" "}
                                                                    {(() => {
                                                                        const one = (s: { weight: number; reps: number }) => {
                                                                            if (modality === "time") return `${s.reps}s`;
                                                                            if (modality === "cal") return `${s.reps} kcal`;
                                                                            if (modality === "intervalWeight") return s.reps ? `${s.weight}kg×${s.reps}` : `${s.weight}kg`;
                                                                            if (modality === "weight" && s.weight) return `${s.weight}×${s.reps}`;
                                                                            return `${s.reps}`;
                                                                        };
                                                                        if (!side) return h.sets.map(one).join(" · ");
                                                                        // Links/Rechts-Paare (L|R)
                                                                        const parts: string[] = [];
                                                                        for (let i = 0; i < h.sets.length; i += 2) {
                                                                            const l = h.sets[i], r = h.sets[i + 1];
                                                                            parts.push(r ? `${one(l)}|${one(r)}` : one(l));
                                                                        }
                                                                        return parts.join(" · ");
                                                                    })()}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    ) : null}
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
                                                        {modality === "reps" && (
                                                            side ? (
                                                                <div className="grid flex-1 grid-cols-2 gap-3">
                                                                    <input type="number" placeholder="LINKS" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                                    <input type="number" placeholder="RECHTS" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps2 ?? ""} onChange={(e) => updateSet(ex.name, idx, "reps2", e.target.value)} />
                                                                </div>
                                                            ) : (
                                                                <div className="flex-1">
                                                                    <input type="number" placeholder="REPS" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                                </div>
                                                            )
                                                        )}
                                                        {modality === "cal" && (
                                                            <div className="flex-1">
                                                                <input type="number" placeholder="KCAL" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                            </div>
                                                        )}
                                                        {modality === "intervalWeight" && (
                                                            <div className="grid flex-1 grid-cols-2 gap-3">
                                                                <input type="number" placeholder="KG" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.weight} onChange={(e) => updateSet(ex.name, idx, "weight", e.target.value)} />
                                                                <input type="number" placeholder="REPS" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                            </div>
                                                        )}
                                                        {modality === "check" && (
                                                            <p className="flex-1 text-center text-[10px] font-bold uppercase tracking-widest text-muted">Runde {idx + 1} — abhaken</p>
                                                        )}
                                                        {modality === "breath" && (
                                                            side ? (
                                                                <div className="grid flex-1 grid-cols-2 gap-3">
                                                                    <input type="number" placeholder="LINKS" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                                    <input type="number" placeholder="RECHTS" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps2 ?? ""} onChange={(e) => updateSet(ex.name, idx, "reps2", e.target.value)} />
                                                                </div>
                                                            ) : (
                                                                <div className="flex-1">
                                                                    <input type="number" placeholder="ATEMZÜGE" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                                </div>
                                                            )
                                                        )}
                                                        {modality === "time" && (() => {
                                                            const running = watch && watch.name === ex.name && watch.idx === idx;
                                                            const live = running ? Math.round((watch!.now - watch!.start) / 1000) : 0;
                                                            return (
                                                                <div className="flex flex-1 items-center gap-3">
                                                                    {side ? (
                                                                        <div className="grid flex-1 grid-cols-2 gap-2">
                                                                            <input type="number" placeholder="L SEK." className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                                            <input type="number" placeholder="R SEK." className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps2 ?? ""} onChange={(e) => updateSet(ex.name, idx, "reps2", e.target.value)} />
                                                                        </div>
                                                                    ) : (
                                                                        <input type="number" placeholder="SEK." className="w-full flex-1 rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.name, idx, "reps", e.target.value)} />
                                                                    )}
                                                                    <button onClick={() => toggleWatch(ex.name, idx, side)}
                                                                        aria-label={running ? "Stoppuhr stoppen und Zeit speichern" : side && set.reps ? "Stoppuhr für rechte Seite starten" : "Stoppuhr starten"}
                                                                        className={`flex h-11 min-w-[3.5rem] flex-shrink-0 items-center justify-center gap-1 rounded-xl border px-2 text-sm font-black tabular-nums transition-all active:scale-95 ${running ? "border-accent bg-accent text-background" : "border-card-border bg-card text-accent"}`}>
                                                                        {running ? (
                                                                            <>{live}s</>
                                                                        ) : (
                                                                            <span className="flex items-center gap-1">
                                                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5M12 6a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM10 3h4" /></svg>
                                                                                {side && <span className="text-[9px]">{set.reps && !set.reps2 ? "R" : "L"}</span>}
                                                                            </span>
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
