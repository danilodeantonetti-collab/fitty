"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [ready, setReady] = useState(false); // Recovery-Link verarbeitet, Session vorhanden?
    const [checking, setChecking] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // supabase-js liest das Recovery-Token aus der URL und erstellt eine Session.
    // Wir warten kurz darauf, statt sofort "ungültig" anzuzeigen.
    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) { setReady(true); setChecking(false); }
        });
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) setReady(true);
            setChecking(false);
        });
        return () => sub.subscription.unsubscribe();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 6) { setMessage({ type: "error", text: "Mindestens 6 Zeichen." }); return; }
        if (password !== password2) { setMessage({ type: "error", text: "Passwörter stimmen nicht überein." }); return; }
        setLoading(true);
        setMessage(null);
        const { error } = await supabase.auth.updateUser({ password });
        if (error) { setMessage({ type: "error", text: error.message }); setLoading(false); }
        else {
            setMessage({ type: "success", text: "Passwort geändert! Weiter geht's..." });
            window.location.assign("/dashboard");
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
            <div className="w-full max-w-sm space-y-8 animate-in fade-in duration-700">
                <div className="text-center">
                    <Link href="/" className="text-4xl font-black tracking-tighter text-foreground">
                        FIT<span className="text-accent italic">TY</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">Neues Passwort</h2>
                </div>

                <div className="glass mt-8 rounded-2xl p-8 neon-shadow">
                    {checking ? (
                        <p className="text-center text-sm text-muted">Prüfe Link...</p>
                    ) : !ready ? (
                        <div className="space-y-4 text-center">
                            <p className="text-sm text-muted">Dieser Link ist ungültig oder abgelaufen.</p>
                            <Link href="/auth/forgot-password" className="btn-primary block w-full">Neuen Link anfordern</Link>
                        </div>
                    ) : (
                        <form className="space-y-5" onSubmit={handleUpdate}>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-muted">Neues Passwort</label>
                                <input type="password" required className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-muted">Wiederholen</label>
                                <input type="password" required className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all" placeholder="••••••••" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                            </div>
                            {message && (
                                <div className={`rounded-lg p-3 text-sm font-medium ${message.type === 'success' ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-400'}`}>{message.text}</div>
                            )}
                            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 disabled:scale-100">
                                {loading ? "Speichere..." : "Passwort setzen"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
