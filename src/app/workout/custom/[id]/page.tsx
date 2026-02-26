"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface ExerciseEntry { name: string; sets: number; reps: string; }
interface SetLog { reps: string; weight: string; isWarmup?: boolean; }

const calc1RM = (weight: number, reps: number) => reps === 1 ? weight : Math.round(weight * (1 + reps / 30));

export default function CustomWorkoutSession() {
    const { id } = useParams();
    const router = useRouter();
    const [planName, setPlanName] = useState("");
    const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
    const [logs, setLogs] = useState<Record<string, SetLog[]>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [sessionDate, setSessionDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [newPRs, setNewPRs] = useState<{ name: string; weight: number }[]>([]);
    const [showPRModal, setShowPRModal] = useState(false);

    useEffect(() => {
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push('/auth/login'); return; }
            const { data: plan } = await supabase
                .from('custom_workouts')
                .select('name, exercises')
                .eq('id', id)
                .eq('user_id', user.id)
                .single();
            if (!plan) { router.push('/dashboard'); return; }
            setPlanName(plan.name);
            const exList: ExerciseEntry[] = plan.exercises as ExerciseEntry[];
            setExercises(exList);
            // Pre-fill 3 empty sets per exercise
            const defaultLogs: Record<string, SetLog[]> = {};
            exList.forEach(ex => {
                defaultLogs[ex.name] = [{reps:"",weight:""},{reps:"",weight:""},{reps:"",weight:""}];
            });
            setLogs(defaultLogs);
            setLoading(false);
        };
        load();
    }, [id, router]);

    const addSet = (name: string) => setLogs(p => ({ ...p, [name]: [...(p[name] || []), { reps: "", weight: "" }] }));
    const addWarmup = (name: string) => setLogs(p => ({ ...p, [name]: [{ reps: "", weight: "", isWarmup: true }, ...(p[name] || [])] }));
    const updateSet = (name: string, idx: number, field: "weight" | "reps", value: string) => {
        setLogs(p => { const n = { ...p }; n[name] = [...n[name]]; n[name][idx] = { ...n[name][idx], [field]: value }; return n; });
    };
    const removeSet = (name: string, idx: number) => setLogs(p => ({ ...p, [name]: p[name].filter((_, i) => i !== idx) }));

    const get1RM = (name: string) => {
        let best = 0;
        (logs[name] || []).forEach(s => { if (s.weight && s.reps) { const rm = calc1RM(parseFloat(s.weight), parseInt(s.reps)); if (rm > best) best = rm; } });
        return best;
    };

    const handleFinish = async () => {
        try {
            setSaving(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { alert('Nicht eingeloggt'); setSaving(false); return; }

            // Create session (no workout_id for custom plans)
            const { data: session, error: sessionErr } = await supabase
                .from('sessions')
                .insert([{ user_id: user.id, date: new Date(sessionDate).toISOString() }])
                .select().single();
            if (sessionErr) throw sessionErr;

            // Get all-time best per exercise name (using a text match)
            const { data: allSets } = await supabase
                .from('sets')
                .select('exercise_name, weight')
                .eq('sessions.user_id', user.id);
            const allTimeBest: Record<string, number> = {};
            (allSets || []).forEach((s: any) => { if (s.exercise_name && (!allTimeBest[s.exercise_name] || s.weight > allTimeBest[s.exercise_name])) allTimeBest[s.exercise_name] = s.weight; });

            const prs: { name: string; weight: number }[] = [];
            const setsToInsert: any[] = [];
            exercises.forEach(ex => {
                const exSets = logs[ex.name] || [];
                const workingSets = exSets.filter(s => !s.isWarmup && s.weight);
                const maxNew = workingSets.length ? Math.max(...workingSets.map(s => parseFloat(s.weight))) : 0;
                if (maxNew > 0 && maxNew > (allTimeBest[ex.name] || 0)) prs.push({ name: ex.name, weight: maxNew });
                exSets.forEach((set, idx) => {
                    if (set.weight || set.reps) {
                        setsToInsert.push({
                            session_id: session.id,
                            exercise_name: ex.name,
                            weight: set.weight ? parseFloat(set.weight) : 0,
                            reps: set.reps ? parseInt(set.reps) : 0,
                            order: idx + 1,
                        });
                    }
                });
            });

            if (setsToInsert.length > 0) {
                const { error } = await supabase.from('sets').insert(setsToInsert);
                if (error) throw error;
            }

            if (prs.length > 0) { setNewPRs(prs); setShowPRModal(true); setSaving(false); }
            else router.push('/dashboard');
        } catch (err: any) { alert('Fehler: ' + err.message); setSaving(false); }
    };

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-accent font-bold">Lade...</div>;

    if (showPRModal) return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <div className="animate-in zoom-in duration-500 space-y-6 max-w-sm w-full">
                <div className="text-7xl animate-bounce">🏆</div>
                <h1 className="text-4xl font-black text-foreground">Neue Bestleistung!</h1>
                <div className="space-y-3">
                    {newPRs.map(pr => (
                        <div key={pr.name} className="rounded-2xl border border-accent bg-accent/10 p-4">
                            <p className="text-xs font-black text-accent uppercase tracking-widest">{pr.name}</p>
                            <p className="text-3xl font-black text-foreground mt-1">{pr.weight} <span className="text-base text-muted">kg</span></p>
                        </div>
                    ))}
                </div>
                <button onClick={() => router.push('/dashboard')} className="btn-primary w-full text-lg">Weiter 💪</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex flex-col border-b border-card-border bg-background px-6 py-4 gap-3">
                <div className="flex w-full items-center justify-between">
                    <Link href="/dashboard" className="text-muted hover:text-foreground">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </Link>
                    <h1 className="text-lg font-black tracking-tighter text-foreground uppercase truncate max-w-[60%] text-center">{planName}</h1>
                    <button onClick={handleFinish} disabled={saving}
                        className="rounded-full bg-accent px-4 py-1.5 text-xs font-black text-background uppercase tracking-wider disabled:opacity-50">
                        {saving ? '...' : 'Finish'}
                    </button>
                </div>
                <div className="flex items-center gap-2 bg-card-border/30 rounded-full py-1.5 px-4 self-start">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)}
                        className="bg-transparent text-sm font-bold text-foreground border-none outline-none" />
                </div>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8">
                <div className="space-y-12">
                    {exercises.map((ex) => {
                        const rm = get1RM(ex.name);
                        return (
                            <div key={ex.name}>
                                <div className="flex items-start justify-between border-b border-accent/20 pb-2">
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight text-foreground">{ex.name}</h2>
                                        <div className="flex items-center gap-3 mt-0.5">
                                            <p className="text-xs font-bold text-muted uppercase tracking-widest">{ex.sets} Sets &bull; {ex.reps} Reps</p>
                                            {rm > 0 && <p className="text-xs font-bold text-accent uppercase tracking-widest">1RM ~{rm}kg</p>}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button onClick={() => addWarmup(ex.name)} className="rounded-lg bg-card-border/40 px-2 py-1 text-[9px] font-bold text-muted uppercase hover:text-foreground">+ Warm</button>
                                        <button onClick={() => addSet(ex.name)} className="rounded-lg bg-card-border px-2 py-1 text-[9px] font-bold text-accent uppercase hover:bg-accent/10">+ Set</button>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-3">
                                    {(logs[ex.name] || []).map((set, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black border ${set.isWarmup ? 'bg-muted/10 border-muted/30 text-muted' : 'bg-accent/10 border-accent/20 text-accent'}`}>
                                                {set.isWarmup ? 'W' : idx + 1}
                                            </div>
                                            <div className="grid flex-1 grid-cols-2 gap-3">
                                                <input type="number" placeholder="KG"
                                                    className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none"
                                                    value={set.weight} onChange={e => updateSet(ex.name, idx, 'weight', e.target.value)} />
                                                <input type="number" placeholder="REPS"
                                                    className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none"
                                                    value={set.reps} onChange={e => updateSet(ex.name, idx, 'reps', e.target.value)} />
                                            </div>
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
            </main>

            <div className="fixed bottom-8 inset-x-0 flex justify-center px-6">
                <button onClick={handleFinish} disabled={saving}
                    className="btn-primary w-full max-w-sm flex items-center justify-center gap-3 text-lg disabled:opacity-50">
                    {saving ? 'Speichere...' : 'Session beenden'}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </button>
            </div>
        </div>
    );
}
