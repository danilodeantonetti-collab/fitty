"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Exercise { id: string; name: string; target_reps: string; target_sets: number; }
interface SetLog { reps: string; weight: string; }

export default function WorkoutSession() {
    const { id } = useParams();
    const router = useRouter();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [logs, setLogs] = useState<Record<string, SetLog[]>>({});
    const [lastPerformance, setLastPerformance] = useState<Record<string, { weight: string, reps: string }>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newPRs, setNewPRs] = useState<{ name: string; weight: number }[]>([]);
    const [showPRModal, setShowPRModal] = useState(false);

    const [sessionDate, setSessionDate] = useState(() => new Date().toISOString().split('T')[0]);

    const mockPlanA: Exercise[] = [
        { id: "a1", name: "Kniebeugen", target_sets: 5, target_reps: "5" },
        { id: "a2", name: "Kreuzheben", target_sets: 1, target_reps: "5" },
        { id: "a3", name: "Klimmziehen eng", target_sets: 4, target_reps: "6-8" },
        { id: "a4", name: "Schr\u00e4gbankdr\u00fccken", target_sets: 4, target_reps: "6-8" },
        { id: "a5", name: "Langhantelrudern OG", target_sets: 3, target_reps: "8-12" },
        { id: "a6", name: "Trizepsdr\u00fccken (Stange)", target_sets: 3, target_reps: "8-12" },
        { id: "a7", name: "Hammer Curls", target_sets: 2, target_reps: "8-12" },
    ];
    const mockPlanB: Exercise[] = [
        { id: "b1", name: "Kniebeugen", target_sets: 5, target_reps: "5" },
        { id: "b2", name: "Bankdr\u00fccken", target_sets: 5, target_reps: "5" },
        { id: "b3", name: "Langhantelrudern UG", target_sets: 5, target_reps: "5" },
        { id: "b4", name: "Schulterdr\u00fccken (LH)", target_sets: 3, target_reps: "8-12" },
        { id: "b5", name: "SZ-Curls", target_sets: 3, target_reps: "8-12" },
        { id: "b6", name: "Trizepsdr\u00fccken (Seil)", target_sets: 2, target_reps: "8-12" },
    ];

    const exerciseNameById = (exId: string) => {
        const all = [...mockPlanA, ...mockPlanB];
        return all.find(e => e.id === exId)?.name || exId;
    };

    useEffect(() => {
        const loadWorkoutData = async () => {
            const activePlan = id === "tag-a" ? mockPlanA : (id === "tag-b" ? mockPlanB : []);
            setExercises(activePlan);
            const defaultLogs: Record<string, SetLog[]> = {};
            activePlan.forEach(ex => { defaultLogs[ex.id] = [{reps:"",weight:""},{reps:"",weight:""},{reps:"",weight:""}]; });
            setLogs(defaultLogs);

            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const workoutDbId = id === "tag-a" ? "d5e86566-a4c3-4d64-8ab3-c36b81a7b1fb" : "a12bc85d-8b01-447a-b552-320e8b2b78a9";
                    const { data: lastSession } = await supabase.from('sessions').select('id').eq('user_id', user.id).eq('workout_id', workoutDbId).order('date', { ascending: false }).limit(1).single();
                    if (lastSession) {
                        const { data: lastSets } = await supabase.from('sets').select('exercise_id, weight, reps').eq('session_id', lastSession.id).order('weight', { ascending: false });
                        if (lastSets) {
                            const performanceMap: Record<string, { weight: string, reps: string }> = {};
                            lastSets.forEach(set => { if (!performanceMap[set.exercise_id]) performanceMap[set.exercise_id] = { weight: set.weight.toString(), reps: set.reps.toString() }; });
                            setLastPerformance(performanceMap);
                        }
                    }
                }
            } catch (e) { console.error(e); }
            setLoading(false);
        };
        loadWorkoutData();
    }, [id]);

    const addSet = (exId: string) => setLogs(p => ({ ...p, [exId]: [...(p[exId]||[]), {reps:"",weight:""}] }));
    const updateSet = (exId: string, idx: number, field: keyof SetLog, value: string) => {
        const n = { ...logs }; n[exId][idx][field] = value; setLogs(n);
    };

    const handleFinish = async () => {
        try {
            setSaving(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { alert("Nicht eingeloggt!"); setSaving(false); return; }

            const workoutDbId = id === "tag-a" ? "d5e86566-a4c3-4d64-8ab3-c36b81a7b1fb" : "a12bc85d-8b01-447a-b552-320e8b2b78a9";

            // --- Fetch all-time best weights before saving ---
            const { data: allSets } = await supabase
                .from('sets').select('exercise_id, weight, sessions!inner(user_id)')
                .eq('sessions.user_id', user.id);
            const allTimeBest: Record<string, number> = {};
            (allSets || []).forEach((s: any) => {
                if (!allTimeBest[s.exercise_id] || s.weight > allTimeBest[s.exercise_id]) allTimeBest[s.exercise_id] = s.weight;
            });

            // --- Save session ---
            const { data: sessionInfo, error: sessionError } = await supabase.from('sessions')
                .insert([{ user_id: user.id, workout_id: workoutDbId, date: new Date(sessionDate).toISOString() }]).select().single();
            if (sessionError) throw sessionError;

            // --- Build sets + detect PRs ---
            const setsToInsert: any[] = [];
            const prs: { name: string; weight: number }[] = [];
            Object.keys(logs).forEach(exId => {
                const maxNew = Math.max(...logs[exId].filter(s => s.weight).map(s => parseFloat(s.weight)), 0);
                if (maxNew > 0 && maxNew > (allTimeBest[exId] || 0)) {
                    prs.push({ name: exerciseNameById(exId), weight: maxNew });
                }
                logs[exId].forEach((set, idx) => {
                    if (set.reps || set.weight) {
                        setsToInsert.push({ session_id: sessionInfo.id, exercise_id: exId, weight: set.weight ? parseFloat(set.weight) : 0, reps: set.reps ? parseInt(set.reps) : 0, order: idx + 1 });
                    }
                });
            });

            if (setsToInsert.length > 0) {
                const { error } = await supabase.from('sets').insert(setsToInsert);
                if (error) throw error;
            }

            if (prs.length > 0) {
                setNewPRs(prs);
                setShowPRModal(true);
                setSaving(false);
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
            alert("Fehler: " + err.message);
            setSaving(false);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-accent font-bold text-lg">Lade Workout...</div>;

    if (showPRModal) return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <div className="animate-in zoom-in duration-500 space-y-6 max-w-sm w-full">
                <div className="text-7xl animate-bounce">🏆</div>
                <h1 className="text-4xl font-black text-foreground">Neue Bestleistung!</h1>
                <p className="text-muted text-sm">Du hast heute neue Rekorde aufgestellt:</p>
                <div className="space-y-3">
                    {newPRs.map((pr) => (
                        <div key={pr.name} className="rounded-2xl border border-accent bg-accent/10 p-4 neon-shadow">
                            <p className="text-xs font-black text-accent uppercase tracking-widest">{pr.name}</p>
                            <p className="text-3xl font-black text-foreground mt-1">{pr.weight} <span className="text-base text-muted">kg</span></p>
                        </div>
                    ))}
                </div>
                <button onClick={() => router.push("/dashboard")} className="btn-primary w-full text-lg mt-4">
                    Weiter 💪
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex flex-col items-center border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md gap-3">
                <div className="flex w-full items-center justify-between">
                    <Link href="/dashboard" className="text-muted hover:text-foreground">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </Link>
                    <h1 className="text-xl font-black tracking-tighter text-foreground uppercase">{id?.toString().replace("-", " ")}</h1>
                    <button onClick={handleFinish} disabled={saving} className="rounded-full bg-accent px-4 py-1.5 text-xs font-black text-background uppercase tracking-wider disabled:opacity-50">
                        {saving ? "..." : "Finish"}
                    </button>
                </div>
                <div className="flex items-center gap-2 mt-1 bg-card-border/30 rounded-full py-1.5 px-4 max-w-[200px]">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)}
                        className="bg-transparent text-sm font-bold text-foreground border-none outline-none cursor-pointer focus:ring-0 w-full" />
                </div>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8">
                <div className="space-y-12">
                    {exercises.map((ex) => (
                        <div key={ex.id}>
                            <div className="flex items-center justify-between border-b border-accent/20 pb-2">
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight text-foreground">{ex.name}</h2>
                                    {lastPerformance[ex.id] && (
                                        <p className="text-xs font-bold text-accent uppercase tracking-widest mt-0.5">
                                            Zuletzt: {lastPerformance[ex.id].weight}kg &times; {lastPerformance[ex.id].reps}
                                        </p>
                                    )}
                                </div>
                                <button onClick={() => addSet(ex.id)} className="rounded-lg bg-card-border px-3 py-1 text-[10px] font-bold text-accent uppercase tracking-tighter hover:bg-accent/10 transition-colors">+ Set</button>
                            </div>
                            <div className="mt-4 space-y-3">
                                {(logs[ex.id] || []).map((set, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/20 text-sm font-black text-accent">{idx + 1}</div>
                                        <div className="grid flex-1 grid-cols-2 gap-3">
                                            <input type="number" placeholder="KG" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.weight} onChange={(e) => updateSet(ex.id, idx, "weight", e.target.value)} />
                                            <input type="number" placeholder="REPS" className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all" value={set.reps} onChange={(e) => updateSet(ex.id, idx, "reps", e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 w-full max-w-sm">
                <button onClick={handleFinish} disabled={saving} className="btn-primary w-full flex items-center justify-center gap-3 text-lg disabled:opacity-50">
                    {saving ? "Speichere..." : "Session beenden"}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </button>
            </div>
        </div>
    );
}
