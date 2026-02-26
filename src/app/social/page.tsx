"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SocialPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [friends, setFriends] = useState<any[]>([]);
    const [pending, setPending] = useState<any[]>([]);
    const [searchEmail, setSearchEmail] = useState("");
    const [searchResult, setSearchResult] = useState<any>(null);
    const [searchMsg, setSearchMsg] = useState("");
    const [leaderboard, setLeaderboard] = useState<{ name: string; sessions: number }[]>([]);
    const [exercise, setExercise] = useState("Bankdr\u00fccken");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push("/auth/login"); return; }
            setUser(user);
            await loadFriends(user.id);
            setLoading(false);
        };
        load();
    }, [router]);

    const loadFriends = async (uid: string) => {
        const { data } = await supabase.from('friendships')
            .select('id, status, requester_id, addressee_id, profiles!friendships_requester_id_fkey(nickname), profiles!friendships_addressee_id_fkey(nickname)')
            .or(`requester_id.eq.${uid},addressee_id.eq.${uid}`);
        const accepted = (data || []).filter(f => f.status === 'accepted');
        const pend = (data || []).filter(f => f.status === 'pending' && f.addressee_id === uid);
        setFriends(accepted);
        setPending(pend);
    };

    const searchUser = async () => {
        setSearchResult(null); setSearchMsg("");
        const { data, error } = await supabase.from('profiles').select('id, nickname').eq('id',
            (await supabase.from('profiles').select('id').textSearch('nickname', searchEmail)).data?.[0]?.id || ''
        ).single();
        // Simpler: search by email via auth (not possible client-side), so search nickname
        const { data: found } = await supabase.from('profiles').select('id, nickname').ilike('nickname', searchEmail).neq('id', user?.id).limit(1).single();
        if (found) setSearchResult(found);
        else setSearchMsg("Kein User gefunden");
    };

    const sendRequest = async () => {
        if (!searchResult) return;
        const { error } = await supabase.from('friendships').insert({ requester_id: user.id, addressee_id: searchResult.id });
        if (error) setSearchMsg("Bereits angefragt oder befreundet");
        else { setSearchMsg(`Anfrage an ${searchResult.nickname} gesendet! ✓`); setSearchResult(null); setSearchEmail(""); }
    };

    const acceptRequest = async (friendshipId: string, requesterId: string) => {
        await supabase.from('friendships').update({ status: 'accepted' }).eq('id', friendshipId);
        await loadFriends(user.id);
        // Build quick leaderboard
        const { data: sessions } = await supabase.from('sessions').select('user_id').in('user_id', [user.id, requesterId]);
        if (sessions) {
            const count: Record<string, number> = {};
            sessions.forEach((s: any) => { count[s.user_id] = (count[s.user_id] || 0) + 1; });
            const { data: p1 } = await supabase.from('profiles').select('nickname').eq('id', user.id).single();
            const { data: p2 } = await supabase.from('profiles').select('nickname').eq('id', requesterId).single();
            setLeaderboard([
                { name: p1?.nickname || 'Du', sessions: count[user.id] || 0 },
                { name: p2?.nickname || 'Freund', sessions: count[requesterId] || 0 },
            ].sort((a, b) => b.sessions - a.sessions));
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center bg-black text-accent font-bold">Laden...</div>;

    const exercises = ["Bankdr\u00fccken", "Kniebeugen", "Kreuzheben", "Klimmziehen eng"];

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <h1 className="text-2xl font-black tracking-tighter text-foreground">SO<span className="text-accent italic">CIAL</span></h1>
                <span className="text-2xl">👥</span>
            </header>

            <main className="mx-auto max-w-lg px-6 pt-8 space-y-6">
                {/* Friend search */}
                <div className="rounded-3xl p-6 border border-card-border bg-card-border/20 space-y-4">
                    <h3 className="text-sm font-black text-muted uppercase tracking-widest">Freunde hinzufügen</h3>
                    <div className="flex gap-3">
                        <input type="text" placeholder="Spitzname suchen..." value={searchEmail} onChange={e => setSearchEmail(e.target.value)}
                            className="flex-1 rounded-xl border border-card-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none" />
                        <button onClick={searchUser} className="rounded-xl bg-accent px-4 py-3 text-xs font-black text-background uppercase tracking-widest">Suchen</button>
                    </div>
                    {searchResult && (
                        <div className="flex items-center justify-between rounded-2xl border border-accent/30 bg-accent/5 p-4">
                            <span className="font-bold text-foreground">{searchResult.nickname}</span>
                            <button onClick={sendRequest} className="rounded-full bg-accent px-4 py-1.5 text-xs font-black text-background">+ Hinzufügen</button>
                        </div>
                    )}
                    {searchMsg && <p className="text-xs font-bold text-accent">{searchMsg}</p>}
                </div>

                {/* Pending requests */}
                {pending.length > 0 && (
                    <div className="rounded-3xl p-6 border border-accent/30 bg-accent/5 space-y-3">
                        <h3 className="text-sm font-black text-accent uppercase tracking-widest">Anfragen ({pending.length})</h3>
                        {pending.map(f => (
                            <div key={f.id} className="flex items-center justify-between">
                                <span className="font-bold text-foreground">{(f as any)['profiles!friendships_requester_id_fkey']?.nickname || 'Jemand'}</span>
                                <button onClick={() => acceptRequest(f.id, f.requester_id)} className="rounded-full bg-accent px-4 py-1.5 text-xs font-black text-background">Annehmen ✓</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Friends list */}
                <div className="rounded-3xl p-6 border border-card-border bg-card-border/20 space-y-3">
                    <h3 className="text-sm font-black text-muted uppercase tracking-widest">Freunde ({friends.length})</h3>
                    {friends.length === 0 ? <p className="text-xs text-muted font-bold">Noch keine Freunde. Lade jemanden ein!</p> :
                        friends.map(f => {
                            const other = f.requester_id === user?.id ? (f as any)['profiles!friendships_addressee_id_fkey'] : (f as any)['profiles!friendships_requester_id_fkey'];
                            return (
                                <div key={f.id} className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/20 border border-accent/30">
                                        <span className="text-sm font-black text-accent">{other?.nickname?.[0]?.toUpperCase() || '?'}</span>
                                    </div>
                                    <span className="font-bold text-foreground">{other?.nickname || 'Freund'}</span>
                                </div>
                            );
                        })}
                </div>

                {/* Weekly Challenge Leaderboard */}
                {leaderboard.length > 0 && (
                    <div className="rounded-3xl p-6 border border-card-border bg-card-border/20 space-y-4">
                        <h3 className="text-sm font-black text-muted uppercase tracking-widest">🏆 Sessions Ranking</h3>
                        {leaderboard.map((e, i) => (
                            <div key={e.name} className="flex items-center gap-4">
                                <span className="text-xl">{i === 0 ? '🥇' : '🥈'}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-bold text-foreground">{e.name}</span>
                                        <span className="text-xs font-black text-accent">{e.sessions}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-background overflow-hidden">
                                        <div className="h-full rounded-full bg-accent" style={{ width: `${(e.sessions / Math.max(...leaderboard.map(x => x.sessions), 1)) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <nav className="fixed bottom-6 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 px-6">
                <div className="flex items-center justify-around rounded-full bg-background py-3 border border-card-border shadow-2xl">
                    <Link href="/dashboard" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></Link>
                    <Link href="/progress" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></Link>
                    <Link href="/timer" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></Link>
                    <div className="p-2 text-accent"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg></div>
                </div>
            </nav>
        </div>
    );
}
