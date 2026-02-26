"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [goal, setGoal] = useState("");
    const [ageRange, setAgeRange] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const goals = [
        { value: "Kraft aufbauen", emoji: "💪", label: "Kraft aufbauen" },
        { value: "Abnehmen", emoji: "🔥", label: "Abnehmen" },
        { value: "Muskeln aufbauen", emoji: "🏋️", label: "Muskeln aufbauen" },
        { value: "Fit bleiben", emoji: "🏃", label: "Fit bleiben" },
        { value: "Beweglichkeit", emoji: "🧘", label: "Beweglichkeit" },
        { value: "Ausdauer", emoji: "❤️", label: "Ausdauer verbessern" },
    ];

    const ages = ["Unter 18", "18-24", "25-34", "35-44", "45-54", "55+"];

    const handleSignup = async () => {
        setLoading(true);
        setMessage(null);
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
        if (error) { setMessage({ type: "error", text: error.message }); setLoading(false); return; }

        if (data.user) {
            await supabase.from('profiles').insert({ id: data.user.id, nickname, goal, age_range: ageRange });
        }
        setMessage({ type: "success", text: "Willkommen bei Fitty!" });
        window.location.assign('/dashboard');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
            <div className="w-full max-w-sm space-y-8 animate-in fade-in duration-700">
                <div className="text-center">
                    <Link href="/" className="text-4xl font-black tracking-tighter text-foreground">
                        FIT<span className="text-accent italic">TY</span>
                    </Link>
                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`h-2 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-accent' : 'w-2 bg-card-border'}`} />
                        ))}
                    </div>
                </div>

                <div className="glass mt-8 rounded-2xl p-8 neon-shadow">
                    {/* Step 1: Account */}
                    {step === 1 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-xl font-black text-foreground text-center">Account erstellen</h2>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-muted">Spitzname</label>
                                <input type="text" required className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all" placeholder="Wie sollen wir dich nennen?" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-muted">Email</label>
                                <input type="email" required className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-muted">Passwort</label>
                                <input type="password" required className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all" placeholder="min. 6 Zeichen" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button onClick={() => { if (nickname && email && password.length >= 6) setStep(2); else setMessage({ type: 'error', text: 'Bitte alle Felder ausfüllen (Passwort min. 6 Zeichen)' }); }}
                                className="btn-primary w-full">Weiter</button>
                        </div>
                    )}

                    {/* Step 2: Goal */}
                    {step === 2 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-xl font-black text-foreground text-center">Was ist dein Ziel?</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {goals.map((g) => (
                                    <button key={g.value} onClick={() => setGoal(g.value)}
                                        className={`rounded-2xl p-4 text-left border transition-all hover:scale-[1.02] active:scale-[0.98] ${goal === g.value ? 'border-accent bg-accent/10 neon-shadow' : 'border-card-border glass'}`}>
                                        <span className="text-2xl">{g.emoji}</span>
                                        <p className="text-xs font-bold text-foreground mt-2">{g.label}</p>
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} className="flex-1 rounded-xl border border-card-border py-3 text-sm font-bold text-muted hover:text-foreground transition-colors">Zurück</button>
                                <button onClick={() => { if (goal) setStep(3); }} className={`flex-1 btn-primary ${!goal ? 'opacity-40' : ''}`}>Weiter</button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Age */}
                    {step === 3 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-xl font-black text-foreground text-center">Wie alt bist du?</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {ages.map((a) => (
                                    <button key={a} onClick={() => setAgeRange(a)}
                                        className={`rounded-2xl py-4 text-center border transition-all hover:scale-[1.02] active:scale-[0.98] ${ageRange === a ? 'border-accent bg-accent/10 neon-shadow' : 'border-card-border glass'}`}>
                                        <span className="text-sm font-black text-foreground">{a}</span>
                                    </button>
                                ))}
                            </div>
                            {message && (
                                <div className={`rounded-lg p-3 text-sm font-medium ${message.type === 'success' ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-400'}`}>{message.text}</div>
                            )}
                            <div className="flex gap-3">
                                <button onClick={() => setStep(2)} className="flex-1 rounded-xl border border-card-border py-3 text-sm font-bold text-muted hover:text-foreground transition-colors">Zurück</button>
                                <button onClick={() => { if (ageRange) handleSignup(); }} disabled={loading || !ageRange}
                                    className={`flex-1 btn-primary disabled:opacity-50 disabled:scale-100`}>
                                    {loading ? "Erstelle..." : "Los geht's! 🚀"}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted">Schon einen Account? </span>
                            <Link href="/auth/login" className="font-bold text-accent hover:underline">Einloggen</Link>
                        </div>
                    )}

                    {step === 1 && message && (
                        <div className={`mt-4 rounded-lg p-3 text-sm font-medium ${message.type === 'success' ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-400'}`}>{message.text}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
