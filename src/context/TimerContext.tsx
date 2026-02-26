"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

type Phase = "IDLE" | "WORK" | "REST";

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
}

const TimerContext = createContext<TimerCtx | null>(null);

export function useTimer() {
    const ctx = useContext(TimerContext);
    if (!ctx) throw new Error("useTimer must be used inside TimerProvider");
    return ctx;
}

export function TimerProvider({ children }: { children: React.ReactNode }) {
    const [workTime, setWorkTime] = useState(90);
    const [restTime, setRestTime] = useState(120);
    const [phase, setPhase] = useState<Phase>("IDLE");
    const [timeLeft, setTimeLeft] = useState(0);
    const [currentSet, setCurrentSet] = useState(0);
    const phaseRef = useRef<Phase>("IDLE");
    const workRef = useRef(90);
    const restRef = useRef(120);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Keep refs in sync with state for use inside setInterval
    useEffect(() => { phaseRef.current = phase; }, [phase]);
    useEffect(() => { workRef.current = workTime; }, [workTime]);
    useEffect(() => { restRef.current = restTime; }, [restTime]);

    const tick = useCallback(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                if (phaseRef.current === "WORK") {
                    setPhase("REST");
                    phaseRef.current = "REST";
                    return restRef.current;
                } else {
                    setPhase("WORK");
                    phaseRef.current = "WORK";
                    setCurrentSet((s) => s + 1);
                    return workRef.current;
                }
            }
            return prev - 1;
        });
    }, []);

    const start = useCallback(() => {
        setPhase("WORK");
        phaseRef.current = "WORK";
        setTimeLeft(workRef.current);
        setCurrentSet(1);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(tick, 1000);
    }, [tick]);

    const stop = useCallback(() => {
        setPhase("IDLE");
        phaseRef.current = "IDLE";
        setTimeLeft(0);
        setCurrentSet(0);
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    }, []);

    return (
        <TimerContext.Provider value={{ phase, timeLeft, currentSet, workTime, restTime, setWorkTime, setRestTime, start, stop }}>
            {children}
        </TimerContext.Provider>
    );
}
