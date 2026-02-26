"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ sessions: 0, totalVolume: 0 });

    useEffect(() => {
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push("/auth/login"); return; }
            setUser(user);
            const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            if (profileData) setProfile(profileData);
            const { data } = await supabase.from('sessions').select('id, sets(weight, reps)').eq('user_id', user.id);
            if (data) {
                let vol = 0;
                data.forEach((s: any) => s.sets.forEach((set: any) => { vol += (set.weight||0)*(set.reps||0); }));
                setStats({ sessions: data.length, totalVolume: vol });
            }
            setLoading(false);
        };
        load();
    }, [router]);

    const handleSignOut = async () => { await supabase.auth.signOut(); router.push('/auth/login'); };
    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-accent font-bold">Laden...</div>;

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <h1 className="text-2xl font-black tracking-tighter text-foreground">ACC<span className="text-accent italic">OUNT</span></h1>
                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-card-border bg-accent/10">
                    <span className="text-sm font-bold text-accent">{profile?.nickname?.[0]?.toUpperCase() || '?'}</span>
                </div>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8 space-y-6">
                {/* Profile Card */}
                <div className="rounded-3xl p-6 border border-card-border bg-card-border/20">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-accent/20 border-2 border-accent">
                            <span className="text-2xl font-black text-accent">{profile?.nickname?.[0]?.toUpperCase() || '?'}</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-foreground">{profile?.nickname || 'Athlete'}</h2>
                            <p className="text-sm text-muted">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl p-5 text-center border border-card-border bg-card-border/20">
                        <span className="text-3xl font-black text-foreground">{stats.sessions}</span>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Sessions</p>
                    </div>
                    <div className="rounded-2xl p-5 text-center border border-card-border bg-card-border/20">
                        <span className="text-3xl font-black text-accent">{stats.totalVolume.toLocaleString()}</span>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">KG Total</p>
                    </div>
                </div>

                {/* Details */}
                <div className="rounded-3xl p-6 space-y-0 border border-card-border bg-card-border/20">
                    <h3 className="text-sm font-bold tracking-widest text-muted uppercase mb-4">Details</h3>
                    <div className="flex justify-between py-3 border-b border-card-border">
                        <span className="text-sm text-muted">Spitzname</span>
                        <span className="text-sm font-bold text-foreground">{profile?.nickname || '-'}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-card-border">
                        <span className="text-sm text-muted">Alter</span>
                        <span className="text-sm font-bold text-foreground">{profile?.age_range || '-'}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-card-border">
                        <span className="text-sm text-muted">E-Mail</span>
                        <span className="text-sm font-bold text-foreground truncate max-w-[60%] text-right">{user?.email}</span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span className="text-sm text-muted">Mitglied seit</span>
                        <span className="text-sm font-bold text-foreground">{new Date(user?.created_at).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>

                <button onClick={handleSignOut}
                    className="w-full rounded-2xl border border-red-500/30 bg-red-500/10 py-4 text-sm font-bold text-red-400 transition-all hover:bg-red-500/20 active:scale-[0.98]">
                    Abmelden
                </button>
            </main>

            <nav className="fixed bottom-6 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 px-6">
                <div className="flex items-center justify-around rounded-full bg-background py-3 border border-card-border shadow-2xl">
                    <Link href="/dashboard" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></Link>
                    <Link href="/progress" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></Link>
                    <Link href="/timer" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></Link>
                    <div className="p-2 text-accent"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                </div>
            </nav>
        </div>
    );
}
