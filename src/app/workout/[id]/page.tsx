"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Exercise {
    id: string;
    name: string;
    target_reps: string;
    target_sets: number;
}

interface SetLog {
    reps: string;
    weight: string;
}

export default function WorkoutSession() {
    const { id } = useParams();
    const router = useRouter();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [logs, setLogs] = useState<Record<string, SetLog[]>>({});
    const [lastPerformance, setLastPerformance] = useState<Record<string, { weight: string, reps: string }>>({});
    const [loading, setLoading] = useState(true);
    
    const [sessionDate, setSessionDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const mockPlanA = [
        { id: "a1", name: "Kniebeugen", target_sets: 5, target_reps: "5" },
        { id: "a2", name: "Kreuzheben", target_sets: 1, target_reps: "5" },
        { id: "a3", name: "Klimmziehen eng", target_sets: 4, target_reps: "6-8" },
        { id: "a4", name: "Schrägbankdrücken", target_sets: 4, target_reps: "6-8" },
        { id: "a5", name: "Langhantelrudern OG", target_sets: 3, target_reps: "8-12" },
        { id: "a6", name: "Trizepsdrücken (Stange)", target_sets: 3, target_reps: "8-12" },
        { id: "a7", name: "Hammer Curls", target_sets: 2, target_reps: "8-12" },
    ];

    const mockPlanB = [
        { id: "b1", name: "Kniebeugen", target_sets: 5, target_reps: "5" },
        { id: "b2", name: "Bankdrücken", target_sets: 5, target_reps: "5" },
        { id: "b3", name: "Langhantelrudern UG", target_sets: 5, target_reps: "5" },
        { id: "b4", name: "Schulterdrücken (LH)", target_sets: 3, target_reps: "8-12" },
        { id: "b5", name: "SZ-Curls", target_sets: 3, target_reps: "8-12" },
        { id: "b6", name: "Trizepsdrücken (Seil)", target_sets: 2, target_reps: "8-12" },
    ];

    useEffect(() => {
        const loadWorkoutData = async () => {
            const activePlan = id === "tag-a" ? mockPlanA : (id === "tag-b" ? mockPlanB : []);
            setExercises(activePlan);

            try {
               const { data: { user } } = await supabase.auth.getUser();
               if (user) {
                   const workoutDbId = id === "tag-a" ? "d5e86566-a4c3-4d64-8ab3-c36b81a7b1fb" : "a12bc85d-8b01-447a-b552-320e8b2b78a9";
                   
                   const { data: lastSession } = await supabase
                        .from('sessions')
                        .select('id, date')
                        .eq('user_id', user.id)
                        .eq('workout_id', workoutDbId)
                        .order('date', { ascending: false })
                        .limit(1)
                        .single();

                   if (lastSession) {
                       const { data: lastSets } = await supabase
                            .from('sets')
                            .select('exercise_id, weight, reps')
                            .eq('session_id', lastSession.id)
                            .order('weight', { ascending: false });
                        
                       if (lastSets) {
                           const performanceMap: Record<string, { weight: string, reps: string }> = {};
                           lastSets.forEach(set => {
                               if (!performanceMap[set.exercise_id]) {
                                   performanceMap[set.exercise_id] = { 
                                       weight: set.weight.toString(), 
                                       reps: set.reps.toString() 
                                   };
                               }
                           });
                           setLastPerformance(performanceMap);
                       }
                   }
               }
            } catch (error) {
                console.error("Could not fetch history", error);
            }

            setLoading(false);
        };

        loadWorkoutData();
    }, [id]);

    const addSet = (exerciseId: string) => {
        setLogs((prev) => ({
            ...prev,
            [exerciseId]: [...(prev[exerciseId] || []), { reps: "", weight: "" }],
        }));
    };

    const updateSet = (exerciseId: string, index: number, field: keyof SetLog, value: string) => {
        const newLogs = { ...logs };
        newLogs[exerciseId][index][field] = value;
        setLogs(newLogs);
    };

    const handleFinish = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("Nicht eingeloggt!");
                setLoading(false);
                return;
            }

            const workoutDbId = id === "tag-a" ? "d5e86566-a4c3-4d64-8ab3-c36b81a7b1fb" : "a12bc85d-8b01-447a-b552-320e8b2b78a9";
            const fullDate = new Date(sessionDate).toISOString();

            const { data: sessionInfo, error: sessionError } = await supabase
                .from('sessions')
                .insert([{
                    user_id: user.id,
                    workout_id: workoutDbId,
                    date: fullDate
                }])
                .select()
                .single();

            if (sessionError) throw sessionError;

            const setsToInsert: any[] = [];
            Object.keys(logs).forEach(exerciseId => {
                logs[exerciseId].forEach((set, idx) => {
                    if (set.reps || set.weight) {
                        setsToInsert.push({
                            session_id: sessionInfo.id,
                            exercise_id: exerciseId,
                            weight: set.weight ? parseFloat(set.weight) : 0,
                            reps: set.reps ? parseInt(set.reps) : 0,
                            order: idx + 1
                        });
                    }
                });
            });

            if (setsToInsert.length > 0) {
                const { error: setsError } = await supabase
                    .from('sets')
                    .insert(setsToInsert);

                if (setsError) throw setsError;
            }

            router.push("/dashboard");
        } catch (error: any) {
            console.error("Error saving workout:", error);
            alert("Fehler beim Speichern des Workouts: " + error.message);
            setLoading(false);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-accent font-bold">Lade Workout...</div>;

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex flex-col items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md gap-3">
                <div className="flex w-full items-center justify-between">
                    <Link href="/dashboard" className="text-muted hover:text-foreground">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-black tracking-tighter text-foreground uppercase">
                        {id?.toString().replace("-", " ")}
                    </h1>
                    <button
                        onClick={handleFinish}
                        className="rounded-full bg-accent px-4 py-1.5 text-xs font-black text-background uppercase tracking-wider"
                    >
                        Finish
                    </button>
                </div>
                
                <div className="flex items-center gap-2 mt-2 w-full justify-center bg-card-border/30 rounded-full py-1.5 px-4 max-w-[200px]">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <input 
                        type="date" 
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        className="bg-transparent text-sm font-bold text-foreground border-none outline-none cursor-pointer focus:ring-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full left-0 top-0 m-0 p-0 relative"
                    />
                </div>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8">
                <div className="space-y-12">
                    {exercises.map((ex) => (
                        <div key={ex.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-end justify-between border-b border-accent/20 pb-2">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black tracking-tight text-foreground">{ex.name}</h2>
                                    <div className="flex gap-4">
                                        <p className="text-xs font-bold text-muted uppercase tracking-widest">
                                            Ziel: <span className="text-foreground">{ex.target_sets} x {ex.target_reps}</span>
                                        </p>
                                        {lastPerformance[ex.id] && (
                                            <p className="text-xs font-bold text-accent uppercase tracking-widest">
                                                Zuletzt: {lastPerformance[ex.id].weight}kg x {lastPerformance[ex.id].reps}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => addSet(ex.id)}
                                    className="rounded-lg bg-card-border px-3 py-1 text-[10px] font-bold text-accent uppercase tracking-tighter hover:bg-accent/10 transition-colors"
                                >
                                    + Set hinzufügen
                                </button>
                            </div>

                            <div className="mt-4 space-y-3">
                                {(logs[ex.id] || []).map((set, idx) => (
                                    <div key={idx} className="flex items-center gap-4 animate-in zoom-in-95 duration-300">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/20 text-sm font-black text-accent">
                                            {idx + 1}
                                        </div>
                                        <div className="grid flex-1 grid-cols-2 gap-3">
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    placeholder="KG"
                                                    className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all"
                                                    value={set.weight}
                                                    onChange={(e) => updateSet(ex.id, idx, "weight", e.target.value)}
                                                />
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    placeholder="REPS"
                                                    className="w-full rounded-xl border border-card-border bg-card p-3 text-center text-sm font-bold text-foreground focus:border-accent focus:outline-none transition-all"
                                                    value={set.reps}
                                                    onChange={(e) => updateSet(ex.id, idx, "reps", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(logs[ex.id] || []).length === 0 && (
                                    <p className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-muted/30">
                                        Noch keine Sätze geloggt
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 w-full max-w-sm">
                <button
                    onClick={handleFinish}
                    className="btn-primary w-full flex items-center justify-center gap-3 text-lg"
                >
                    Session beenden
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
