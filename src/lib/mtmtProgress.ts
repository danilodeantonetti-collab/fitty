// MTMT-Fortschritt: localStorage als schneller Cache, Supabase (mtmt_state)
// als geräteübergreifende Wahrheit. Häkchen von Handy und PC werden vereinigt;
// bei Monat/Woche gewinnt die zuletzt geänderte Seite.

import { supabase } from "@/lib/supabaseClient";

export interface MtmtProgress {
    month: number; // 1-12
    week: number; // 1-4
}

export interface MtmtDoneEntry {
    month: number;
    week: number;
    day: number;
    date: string; // ISO yyyy-mm-dd
    sessionId?: string; // gespeicherte Session -> ermöglicht späteres Bearbeiten
}

const PROGRESS_KEY = "fitty_mtmt_progress";
const DONE_KEY = "fitty_mtmt_done";
const UPDATED_KEY = "fitty_mtmt_updated";

// Daniel startet das Programm mit Monat 2 (Kapazitätsphase)
export const MTMT_START: MtmtProgress = { month: 2, week: 1 };

function touchLocal() {
    try { localStorage.setItem(UPDATED_KEY, new Date().toISOString()); } catch {}
}

function localUpdatedAt(): number {
    try { return Date.parse(localStorage.getItem(UPDATED_KEY) ?? "") || 0; } catch { return 0; }
}

export function getMtmtProgress(): MtmtProgress {
    if (typeof window === "undefined") return MTMT_START;
    try {
        const raw = localStorage.getItem(PROGRESS_KEY);
        if (raw) {
            const p = JSON.parse(raw);
            if (p && p.month >= 1 && p.month <= 12 && p.week >= 1 && p.week <= 4) {
                // Alt gespeicherter Default (Monat 1) ohne absolvierte Trainings -> auf den echten Start umziehen
                if (p.month === 1 && p.week === 1 && getMtmtDone().length === 0 && (MTMT_START.month !== 1 || MTMT_START.week !== 1)) {
                    return MTMT_START;
                }
                return p;
            }
        }
    } catch {}
    return MTMT_START;
}

export function setMtmtProgress(p: MtmtProgress) {
    if (typeof window === "undefined") return;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    touchLocal();
    void pushMtmtState();
}

export function getMtmtDone(): MtmtDoneEntry[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(DONE_KEY);
        if (raw) {
            const list = JSON.parse(raw);
            if (Array.isArray(list)) return list;
        }
    } catch {}
    return [];
}

export function isMtmtDone(list: MtmtDoneEntry[], month: number, week: number, day: number): boolean {
    return list.some((e) => e.month === month && e.week === week && e.day === day);
}

export function markMtmtDone(entry: MtmtDoneEntry) {
    const list = getMtmtDone();
    if (!isMtmtDone(list, entry.month, entry.week, entry.day)) {
        list.push(entry);
        localStorage.setItem(DONE_KEY, JSON.stringify(list));
        touchLocal();
        void pushMtmtState();
    }
}

// Nach einem absolvierten Training den Fortschritt weiterschalten:
// alle Tage der Woche fertig -> nächste Woche, Woche 4 fertig -> nächster Monat.
export function advanceMtmtProgress(daysInMonth: number): MtmtProgress {
    const p = getMtmtProgress();
    const done = getMtmtDone();
    const weekComplete = Array.from({ length: daysInMonth }, (_, i) => i + 1).every((d) =>
        isMtmtDone(done, p.month, p.week, d)
    );
    if (!weekComplete) return p;
    let next: MtmtProgress;
    if (p.week < 4) next = { month: p.month, week: p.week + 1 };
    else if (p.month < 12) next = { month: p.month + 1, week: 1 };
    else next = p; // Programm komplett
    setMtmtProgress(next);
    return next;
}

// Lokalen Stand in die Cloud schreiben (best effort, blockiert nie die UI)
async function pushMtmtState() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const p = getMtmtProgress();
        await supabase.from("mtmt_state").upsert(
            [{ user_id: user.id, month: p.month, week: p.week, done: getMtmtDone(), updated_at: new Date().toISOString() }],
            { onConflict: "user_id" }
        );
    } catch {}
}

// Beim Öffnen aufrufen: Cloud- und Gerätestand zusammenführen.
export async function syncMtmtState(): Promise<{ progress: MtmtProgress; done: MtmtDoneEntry[] }> {
    const localP = getMtmtProgress();
    const localDone = getMtmtDone();
    if (typeof window === "undefined") return { progress: localP, done: localDone };
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { progress: localP, done: localDone };
        const { data, error } = await supabase
            .from("mtmt_state")
            .select("month, week, done, updated_at")
            .eq("user_id", user.id)
            .maybeSingle();
        if (error) return { progress: localP, done: localDone };

        const serverDone: MtmtDoneEntry[] = Array.isArray(data?.done) ? (data!.done as MtmtDoneEntry[]) : [];
        const merged = [...localDone];
        serverDone.forEach((e) => { if (!isMtmtDone(merged, e.month, e.week, e.day)) merged.push(e); });

        let progress = localP;
        const serverTs = data ? Date.parse(String(data.updated_at)) || 0 : 0;
        if (data && serverTs > localUpdatedAt()) progress = { month: data.month, week: data.week };

        localStorage.setItem(DONE_KEY, JSON.stringify(merged));
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

        const serverNeedsUpdate =
            !data || merged.length !== serverDone.length || progress.month !== data.month || progress.week !== data.week;
        if (serverNeedsUpdate) {
            await supabase.from("mtmt_state").upsert(
                [{ user_id: user.id, month: progress.month, week: progress.week, done: merged, updated_at: new Date().toISOString() }],
                { onConflict: "user_id" }
            );
        }
        return { progress, done: merged };
    } catch {
        return { progress: localP, done: localDone };
    }
}
