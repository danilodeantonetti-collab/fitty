"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

type Phase = "IDLE" | "WORK" | "REST";
type Mode = "loop" | "rest"; // loop = Work/Rest im Wechsel, rest = einmaliger Pausen-Countdown

interface TimerCtx {
    phase: Phase;
    timeLeft: number;
    currentSet: number;
    workTime: number;
    restTime: number;
    setWorkTime: (v: number) => void;
    setRestTime: (v: number) => void;
    start: () => void;
    stop: () => void;
    startRest: (seconds: number) => void; // Einmal-Pause, z. B. nach einem abgehakten Satz
    startIntervals: (work: number, rest: number) => void; // Intervall direkt aus dem Workout
}

const TimerContext = createContext<TimerCtx | null>(null);

export function useTimer() {
    const ctx = useContext(TimerContext);
    if (!ctx) throw new Error("useTimer must be used inside TimerProvider");
    return ctx;
}

function playBeep(frequency: number, duration: number, volume = 0.3) {
    try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = frequency;
        osc.type = "sine";
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch {}
}

export function TimerProvider({ children }: { children: React.ReactNode }) {
    const [workTime, setWorkTime] = useState(90);
    const [restTime, setRestTime] = useState(120);
    const [phase, setPhase] = useState<Phase>("IDLE");
    const [timeLeft, setTimeLeft] = useState(0);
    const [currentSet, setCurrentSet] = useState(0);
    const phaseRef = useRef<Phase>("IDLE");
    const modeRef = useRef<Mode>("loop");
    const workRef = useRef(90);
    const restRef = useRef(120);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => { phaseRef.current = phase; }, [phase]);
    useEffect(() => { workRef.current = workTime; }, [workTime]);
    useEffect(() => { restRef.current = restTime; }, [restTime]);

    const tick = useCallback(() => {
        setTimeLeft((prev) => {
            const next = prev - 1;

            // Countdown beeps: last 5 seconds
            if (next > 0 && next <= 5) {
                playBeep(660, 0.1, 0.2); // short tick
            }

            if (next <= 0) {
                // Phase switch beep
                if (phaseRef.current === "WORK") {
                    playBeep(880, 0.4, 0.4); // high end-of-work beep
                    setPhase("REST");
                    phaseRef.current = "REST";
                    return restRef.current;
                } else if (modeRef.current === "rest") {
                    // Einmal-Pause: fertig -> zurück auf IDLE
                    playBeep(440, 0.4, 0.4);
                    setPhase("IDLE");
                    phaseRef.current = "IDLE";
                    setCurrentSet(0);
                    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
                    return 0;
                } else {
                    playBeep(440, 0.4, 0.4); // low end-of-rest beep
                    setPhase("WORK");
                    phaseRef.current = "WORK";
                    setCurrentSet((s) => s + 1);
                    return workRef.current;
                }
            }
            return next;
        });
    }, []);

    const start = useCallback(() => {
        modeRef.current = "loop";
        setPhase("WORK");
        phaseRef.current = "WORK";
        setTimeLeft(workRef.current);
        setCurrentSet(1);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(tick, 1000);
    }, [tick]);

    const stop = useCallback(() => {
        modeRef.current = "loop";
        setPhase("IDLE");
        phaseRef.current = "IDLE";
        setTimeLeft(0);
        setCurrentSet(0);
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    }, []);

    const startRest = useCallback((seconds: number) => {
        modeRef.current = "rest";
        setPhase("REST");
        phaseRef.current = "REST";
        setTimeLeft(seconds);
        setCurrentSet(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(tick, 1000);
    }, [tick]);

    const startIntervals = useCallback((work: number, rest: number) => {
        workRef.current = work;
        restRef.current = rest;
        setWorkTime(work);
        setRestTime(rest);
        start();
    }, [start]);

    return (
        <TimerContext.Provider value={{ phase, timeLeft, currentSet, workTime, restTime, setWorkTime, setRestTime, start, stop, startRest, startIntervals }}>
            {children}
        </TimerContext.Provider>
    );
}
