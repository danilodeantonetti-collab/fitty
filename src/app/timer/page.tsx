"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "IDLE" | "WORK" | "REST";

function loadState() {
    if (typeof window === 'undefined') return null;
    try {
        const s = localStorage.getItem('fitty_timer');
        if (!s) return null;
        const d = JSON.parse(s);
        if (d.phase === 'IDLE') return null;
        const elapsed = Math.floor((Date.now() - d.savedAt) / 1000);
        let timeLeft = d.timeLeft - elapsed;
        let phase = d.phase as Phase;
        let currentSet = d.currentSet;
        const workTime = d.workTime;
        const restTime = d.restTime;
        while (timeLeft <= 0) {
            if (phase === 'WORK') { phase = 'REST'; timeLeft += restTime; }
            else { phase = 'WORK'; currentSet++; timeLeft += workTime; }
        }
        return { phase, timeLeft, currentSet, workTime, restTime };
    } catch { return null; }
}

export default function TimerPage() {
    const saved = useRef(loadState());
    const [workTime, setWorkTime] = useState(saved.current?.workTime || 90);
    const [restTime, setRestTime] = useState(saved.current?.restTime || 120);
    const [phase, setPhase] = useState<Phase>(saved.current?.phase || "IDLE");
    const [timeLeft, setTimeLeft] = useState(saved.current?.timeLeft || 0);
    const [currentSet, setCurrentSet] = useState(saved.current?.currentSet || 0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<AudioContext | null>(null);

    const playBeep = useCallback(() => {
        try {
            if (!audioRef.current) audioRef.current = new AudioContext();
            const ctx = audioRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.frequency.value = 880; osc.type = "sine"; gain.gain.value = 0.3;
            osc.start(); osc.stop(ctx.currentTime + 0.2);
        } catch {}
    }, []);

    // Save state on every tick
    useEffect(() => {
        if (phase !== 'IDLE') {
            localStorage.setItem('fitty_timer', JSON.stringify({ phase, timeLeft, currentSet, workTime, restTime, savedAt: Date.now() }));
        } else {
            localStorage.removeItem('fitty_timer');
        }
    }, [phase, timeLeft, currentSet, workTime, restTime]);

    useEffect(() => {
        if (phase === "IDLE") return;
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    playBeep();
                    if (phase === "WORK") { setPhase("REST"); return restTime; }
                    else { setPhase("WORK"); setCurrentSet((s) => s + 1); return workTime; }
                }
                return prev - 1;
            });
        }, 1000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [phase, workTime, restTime, playBeep]);

    const start = () => { setPhase("WORK"); setTimeLeft(workTime); setCurrentSet(1); };
    const stop = () => { setPhase("IDLE"); setTimeLeft(0); setCurrentSet(0); if (intervalRef.current) clearInterval(intervalRef.current); };
    const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const total = phase === "WORK" ? workTime : restTime;
    const progress = total > 0 ? ((total - timeLeft) / total) * 100 : 0;
    const circumference = 2 * Math.PI * 120;
    const presets = [
        { label: "Kraft", work: 180, rest: 180 },
        { label: "Hypertrophie", work: 90, rest: 120 },
        { label: "Ausdauer", work: 45, rest: 60 },
        { label: "HIIT", work: 30, rest: 15 },
    ];

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-card-border bg-background/80 px-6 py-4 backdrop-blur-md">
                <h1 className="text-2xl font-black tracking-tighter text-foreground">TI<span className="text-accent italic">MER</span></h1>
                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-card-border bg-card-border/30"><svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
            </header>
            <main className="mx-auto max-w-lg px-6 pt-8 space-y-8">
                <div className="flex justify-center animate-in fade-in duration-700">
                    <div className="relative">
                        <svg width="280" height="280" className="-rotate-90"><circle cx="140" cy="140" r="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" /><circle cx="140" cy="140" r="120" fill="none" stroke={phase === "REST" ? "#3b82f6" : "#e2ff00"} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (progress / 100) * circumference} className="transition-all duration-1000 ease-linear" /></svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${phase === "REST" ? "text-blue-400" : "text-accent"}`}>{phase === "IDLE" ? "Bereit" : phase === "WORK" ? "Arbeit" : "Pause"}</span>
                            <span className="text-6xl font-black tracking-tighter text-foreground mt-1">{phase === "IDLE" ? formatTime(workTime) : formatTime(timeLeft)}</span>
                            {phase !== "IDLE" && <span className="text-sm font-bold text-muted mt-2">Set {currentSet}</span>}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    {phase === "IDLE" ? (
                        <button onClick={start} className="btn-primary px-12 text-lg flex items-center gap-3"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>Start</button>
                    ) : (
                        <button onClick={stop} className="rounded-2xl border border-red-500/30 bg-red-500/10 px-12 py-3 text-lg font-bold text-red-400 transition-all hover:bg-red-500/20 active:scale-95">Stop</button>
                    )}
                </div>
                {phase === "IDLE" && (
                    <>
                        <div className="space-y-4"><h3 className="text-sm font-bold tracking-widest text-muted uppercase">Presets</h3>
                            <div className="grid grid-cols-2 gap-3">{presets.map((p) => (
                                <button key={p.label} onClick={() => { setWorkTime(p.work); setRestTime(p.rest); }} className={`rounded-2xl p-4 text-left border transition-all hover:scale-[1.02] active:scale-[0.98] ${workTime === p.work && restTime === p.rest ? 'border-accent bg-accent/10' : 'border-card-border bg-card-border/20'}`}>
                                    <span className="text-xs font-black text-accent uppercase tracking-widest">{p.label}</span>
                                    <p className="text-sm text-muted mt-1">{formatTime(p.work)} / {formatTime(p.rest)}</p>
                                </button>))}
                            </div>
                        </div>
                        <div className="rounded-3xl p-6 space-y-6 border border-card-border bg-card-border/20">
                            <h3 className="text-sm font-bold tracking-widest text-muted uppercase">Eigene Einstellungen</h3>
                            <div className="space-y-4">
                                <div><div className="flex justify-between mb-2"><span className="text-xs font-bold text-foreground">Arbeitszeit</span><span className="text-xs font-black text-accent">{formatTime(workTime)}</span></div>
                                    <input type="range" min="10" max="300" step="5" value={workTime} onChange={(e) => setWorkTime(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none bg-card-border cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent" /></div>
                                <div><div className="flex justify-between mb-2"><span className="text-xs font-bold text-foreground">Pausenzeit</span><span className="text-xs font-black text-blue-400">{formatTime(restTime)}</span></div>
                                    <input type="range" min="10" max="300" step="5" value={restTime} onChange={(e) => setRestTime(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none bg-card-border cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400" /></div>
                            </div>
                        </div>
                    </>
                )}
            </main>
            <nav className="fixed bottom-6 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 px-6">
                <div className="flex items-center justify-around rounded-full bg-background py-3 border border-card-border shadow-2xl">
                    <Link href="/dashboard" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></Link>
                    <Link href="/progress" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></Link>
                    <div className="p-2 text-accent"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                    <Link href="/account" className="p-2 text-muted hover:text-accent"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></Link>
                </div>
            </nav>
        </div>
    );
}
