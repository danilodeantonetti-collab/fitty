"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { setMessage({ type: "error", text: error.message }); setLoading(false); }
        else { setMessage({ type: "success", text: "Erfolgreich eingeloggt!" }); window.location.assign('/dashboard'); }
    };

    const handleOAuth = async (provider: 'google' | 'apple') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) setMessage({ type: "error", text: error.message });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
            <div className="w-full max-w-sm space-y-8 animate-in fade-in duration-700">
                <div className="text-center">
                    <Link href="/" className="text-4xl font-black tracking-tighter text-foreground">
                        FIT<span className="text-accent italic">TY</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">Welcome Back</h2>
                    <p className="mt-2 text-sm text-muted">Log in to continue your progress.</p>
                </div>

                <div className="glass mt-8 rounded-2xl p-8 neon-shadow">
                    {/* OAuth Buttons */}
                    <div className="space-y-3 mb-6">
                        <button onClick={() => handleOAuth('google')}
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-card-border bg-white/5 py-3 text-sm font-bold text-foreground transition-all hover:bg-white/10 active:scale-[0.98]">
                            <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            Mit Google anmelden
                        </button>
                        <button onClick={() => handleOAuth('apple')}
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-card-border bg-white/5 py-3 text-sm font-bold text-foreground transition-all hover:bg-white/10 active:scale-[0.98]">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                            Mit Apple anmelden
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-card-border"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0a0a0a] px-2 text-muted">Oder mit E-Mail</span></div>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted">Email</label>
                            <input type="email" required className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted">Passwort</label>
                            <input type="password" required className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {message && (
                            <div className={`rounded-lg p-3 text-sm font-medium ${message.type === 'success' ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-400'}`}>{message.text}</div>
                        )}
                        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 disabled:scale-100">
                            {loading ? "Einloggen..." : "Login"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted">Noch kein Account? </span>
                        <Link href="/auth/signup" className="font-bold text-accent hover:underline">Registrieren</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
