// Offline-Warteschlange: schlägt "Session beenden" fehl (kein Netz im Gym),
// landet die Session hier und wird beim nächsten App-Öffnen automatisch hochgeladen.

import { supabase } from "@/lib/supabaseClient";

export interface PendingSetRow {
    exercise_name: string;
    weight: number;
    reps: number;
    order: number;
}

export interface PendingSession {
    date: string; // ISO
    sets: PendingSetRow[];
    queuedAt: number;
}

const KEY = "fitty_pending_sessions";

function readQueue(): PendingSession[] {
    try {
        const raw = localStorage.getItem(KEY);
        const l = raw ? JSON.parse(raw) : [];
        return Array.isArray(l) ? l : [];
    } catch {
        return [];
    }
}

export function queuePendingSession(entry: PendingSession) {
    try {
        const list = readQueue();
        list.push(entry);
        localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
}

export function pendingSessionCount(): number {
    return typeof window === "undefined" ? 0 : readQueue().length;
}

// Wartende Sessions hochladen; Fehlgeschlagene bleiben in der Warteschlange.
export async function flushPendingSessions(): Promise<number> {
    if (typeof window === "undefined") return 0;
    const list = readQueue();
    if (!list.length) return 0;
    let ok = 0;
    const remaining: PendingSession[] = [];
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return 0;
        for (const entry of list) {
            try {
                const { data: session, error } = await supabase
                    .from("sessions")
                    .insert([{ user_id: user.id, date: entry.date }])
                    .select()
                    .single();
                if (error || !session) { remaining.push(entry); continue; }
                if (entry.sets.length) {
                    const { error: setsErr } = await supabase
                        .from("sets")
                        .insert(entry.sets.map((s) => ({ ...s, session_id: session.id })));
                    if (setsErr) { remaining.push(entry); continue; }
                }
                ok++;
            } catch {
                remaining.push(entry);
            }
        }
        localStorage.setItem(KEY, JSON.stringify(remaining));
    } catch {}
    return ok;
}
