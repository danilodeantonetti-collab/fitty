"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
    const [email, setEmail] = useState("da@hotelshop.one");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setMessage({ type: "error", text: error.message });
            setLoading(false);
        } else {
            setMessage({ type: "success", text: "Registrierung erfolgreich! Bitte prüfe deine E-Mails." });
            window.location.assign('/dashboard');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
            <div className="w-full max-w-sm space-y-8 animate-in fade-in duration-700">
                <div className="text-center">
                    <Link href="/" className="text-4xl font-black tracking-tighter text-foreground">
                        FIT<span className="text-accent italic">TY</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                        Start your journey to health and happiness.
                    </p>
                </div>

                <div className="glass mt-8 rounded-2xl p-8 neon-shadow">
                    <form className="space-y-6" onSubmit={handleSignup}>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted text-left">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                className="mt-2 w-full rounded-xl border border-card-border bg-background/50 px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                placeholder="min. 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {message && (
                            <div className={`rounded-lg p-3 text-sm font-medium ${message.type === 'success' ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-400'}`}>
                                {message.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-card-border"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#0a0a0a] px-2 text-muted">Or preview</span>
                            </div>
                        </div>

                        <Link
                            href="/dashboard"
                            className="flex w-full items-center justify-center rounded-xl border border-card-border bg-white/5 py-3 text-sm font-bold text-foreground transition-all hover:bg-white/10 hover:neon-shadow"
                        >
                            Preview Dashboard (No Auth)
                        </Link>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <span className="text-muted">Already have an account? </span>
                        <Link href="/auth/login" className="font-bold text-accent hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
