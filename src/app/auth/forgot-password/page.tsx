"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        });
        if (error) setMessage({ type: "error", text: error.message });
        else setMessage({ type: "success", text: "E-Mail verschickt! Prüfe dein Postfach (auch Spam) und klicke den Link." });
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
            <div className="w-full max-w-sm space-y-8 animate-in fade-in duration-700">
                <div className="text-center">
                    <Link href="/" className="text-4xl font-black tracking-tighter text-foreground">
                        FIT<span className="text-accent italic">TY</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">Passwort vergessen</h2>
                    <p className="mt-2 text-sm text-muted">Wir schicken dir einen Link zum Zurücksetzen.</p>
                </div>

                <div className="glass mt-8 rounded-2xl p-8 neon-shadow">
                    <form className="space-y-5" onSubmit={handleReset}>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted">Email</label>
                            <input type="email" required className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {message && (
                            <div className={`rounded-lg p-3 text-sm font-medium ${message.type === 'success' ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-400'}`}>{message.text}</div>
                        )}
                        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 disabled:scale-100">
                            {loading ? "Sende..." : "Reset-Link senden"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <Link href="/auth/login" className="font-bold text-accent hover:underline">Zurück zum Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
