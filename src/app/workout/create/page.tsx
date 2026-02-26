"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface ExerciseEntry { name: string; sets: number; reps: string; }

const EXERCISE_DB = [
    // Brust
    { name: "Bankdr\u00fccken", muscle: "Brust" },
    { name: "Schr\u00e4gbankdr\u00fccken", muscle: "Brust" },
    { name: "Fliegende Hantel", muscle: "Brust" },
    { name: "Dips", muscle: "Brust" },
    // R\u00fccken
    { name: "Klimmziehen", muscle: "R\u00fccken" },
    { name: "Klimmziehen eng", muscle: "R\u00fccken" },
    { name: "Langhantelrudern UG", muscle: "R\u00fccken" },
    { name: "Langhantelrudern OG", muscle: "R\u00fccken" },
    { name: "Kreuzheben", muscle: "R\u00fccken" },
    { name: "Rudern Maschine", muscle: "R\u00fccken" },
    // Beine
    { name: "Kniebeugen", muscle: "Beine" },
    { name: "Beinpresse", muscle: "Beine" },
    { name: "Ausfallschritte", muscle: "Beine" },
    { name: "Beinst\u00fctz", muscle: "Beine" },
    { name: "Romanian Deadlift", muscle: "Beine" },
    // Schultern
    { name: "Schulterdr\u00fccken (LH)", muscle: "Schultern" },
    { name: "Schulterdr\u00fccken Maschine", muscle: "Schultern" },
    { name: "Seitelh\u00fcben", muscle: "Schultern" },
    { name: "Face Pulls", muscle: "Schultern" },
    // Bizeps
    { name: "Langhantel Curls", muscle: "Bizeps" },
    { name: "SZ-Curls", muscle: "Bizeps" },
    { name: "Hammer Curls", muscle: "Bizeps" },
    { name: "Konzentrations Curls", muscle: "Bizeps" },
    // Trizeps
    { name: "Trizepsdr\u00fccken (Stange)", muscle: "Trizeps" },
    { name: "Trizepsdr\u00fccken (Seil)", muscle: "Trizeps" },
    { name: "Skull Crushers", muscle: "Trizeps" },
    { name: "Trizeps Kickback", muscle: "Trizeps" },
];

const MUSCLE_ICONS: Record<string, string> = {
    Brust: "🫁", R\u00fccken: "🔙", Beine: "🦵", Schultern: "🏈", Bizeps: "💪", Trizeps: "⚡"
};

export default function CreateWorkout() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [selected, setSelected] = useState<ExerciseEntry[]>([]);
    const [search, setSearch] = useState("");
    const [saving, setSaving] = useState(false);
    const [muscleFilter, setMuscleFilter] = useState<string>("Alle");

    const muscles = ["Alle", ...Array.from(new Set(EXERCISE_DB.map(e => e.muscle)))];
    const filtered = EXERCISE_DB.filter(e =>
        (muscleFilter === "Alle" || e.muscle === muscleFilter) &&
        e.name.toLowerCase().includes(search.toLowerCase())
    );
    const isAdded = (n: string) => selected.some(s => s.name === n);

    const addExercise = (n: string) => {
        if (isAdded(n)) return;
        setSelected(p => [...p, { name: n, sets: 3, reps: "8-12" }]);
    };
    const removeExercise = (n: string) => setSelected(p => p.filter(s => s.name !== n));
    const updateEntry = (idx: number, field: "sets" | "reps", value: string) => {
        setSelected(p => p.map((e, i) => i === idx ? { ...e, [field]: field === "sets" ? parseInt(value) || 1 : value } : e));
    };

    const handleSave = async () => {
        if (!name.trim()) { alert("Bitte einen Namen eingeben"); return; }
        if (selected.length === 0) { alert("Bitte mindestens eine \u00dcbung ausw\u00e4hlen"); return; }
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { alert("Nicht eingeloggt"); setSaving(false); return; }
        const { error } = await supabase.from('custom_workouts').insert({ user_id: user.id, name: name.trim(), exercises: selected });
        if (error) { alert("Fehler: " + error.message); setSaving(false); }
        else router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <Link href="/dashboard" className="text-muted hover:text-foreground">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </Link>
                <h1 className="text-xl font-black tracking-tighter text-foreground uppercase">Neues Workout</h1>
                <button onClick={handleSave} disabled={saving || !name.trim() || selected.length === 0}
                    className="rounded-full bg-accent px-4 py-1.5 text-xs font-black text-background uppercase tracking-wider disabled:opacity-40">
                    {saving ? "..." : "Speichern"}
                </button>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8 space-y-8">
                {/* Plan name */}
                <div>
                    <label className="text-xs font-black text-muted uppercase tracking-widest">Name des Plans</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="z.B. Push Day, Rumpf, ..." maxLength={30}
                        className="mt-2 w-full rounded-2xl border border-card-border bg-card px-5 py-4 text-xl font-black text-foreground focus:border-accent focus:outline-none placeholder:text-muted/30" />
                </div>

                {/* Selected exercises */}
                {selected.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-xs font-black text-muted uppercase tracking-widest">Ausgew\u00e4hlt ({selected.length})</h3>
                        {selected.map((ex, idx) => (
                            <div key={ex.name} className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/5 px-4 py-3">
                                <div className="flex-1">
                                    <p className="text-sm font-black text-foreground">{ex.name}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] text-muted uppercase">Sets</span>
                                            <input type="number" min={1} max={10} value={ex.sets} onChange={e => updateEntry(idx, "sets", e.target.value)}
                                                className="w-10 rounded-lg border border-card-border bg-background px-1 py-0.5 text-center text-xs font-bold text-foreground focus:border-accent focus:outline-none" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] text-muted uppercase">Reps</span>
                                            <input type="text" value={ex.reps} onChange={e => updateEntry(idx, "reps", e.target.value)}
                                                className="w-14 rounded-lg border border-card-border bg-background px-1 py-0.5 text-center text-xs font-bold text-foreground focus:border-accent focus:outline-none" />
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => removeExercise(ex.name)} className="p-1 text-muted hover:text-red-400 transition-colors">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Exercise database */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-muted uppercase tracking-widest">\u00dcbungs-Datenbank</h3>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Suchen..."
                        className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-sm font-bold text-foreground focus:border-accent focus:outline-none" />
                    {/* Muscle filter */}
                    <div className="flex gap-2 flex-wrap">
                        {muscles.map(m => (
                            <button key={m} onClick={() => setMuscleFilter(m)}
                                className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-colors ${muscleFilter === m ? 'bg-accent text-background' : 'bg-card-border/20 text-muted border border-card-border hover:text-foreground'}`}>
                                {MUSCLE_ICONS[m] || ""} {m}
                            </button>
                        ))}
                    </div>
                    {/* Exercise list */}
                    <div className="divide-y divide-card-border rounded-2xl border border-card-border overflow-hidden">
                        {filtered.length === 0 && <p className="p-4 text-center text-xs text-muted">Keine \u00dcbungen gefunden</p>}
                        {filtered.map(ex => (
                            <button key={ex.name} onClick={() => addExercise(ex.name)}
                                className={`flex w-full items-center justify-between px-5 py-4 text-left transition-colors ${
                                    isAdded(ex.name) ? 'bg-accent/10' : 'bg-background hover:bg-card-border/20'
                                }`}>
                                <div>
                                    <p className={`text-sm font-bold ${isAdded(ex.name) ? 'text-accent' : 'text-foreground'}`}>{ex.name}</p>
                                    <p className="text-[10px] text-muted uppercase tracking-widest">{MUSCLE_ICONS[ex.muscle]} {ex.muscle}</p>
                                </div>
                                {isAdded(ex.name)
                                    ? <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    : <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                }
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
