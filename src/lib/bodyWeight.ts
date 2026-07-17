// Körpergewichts-Einträge: primär in Supabase (Tabelle body_weight),
// Fallback auf localStorage solange die Tabelle noch nicht angelegt ist
// (SQL dafür: siehe SETUP_SUPABASE.sql im Repo-Root).

import { supabase } from "@/lib/supabaseClient";

export interface BodyWeightEntry {
    date: string; // yyyy-mm-dd
    weight: number; // kg
}

export interface BodyWeightResult {
    entries: BodyWeightEntry[];
    cloud: boolean; // false = Tabelle fehlt noch, Daten liegen nur lokal
}

const LOCAL_KEY = "fitty_bodyweight";

function readLocal(): BodyWeightEntry[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(LOCAL_KEY);
        const list = raw ? JSON.parse(raw) : [];
        return Array.isArray(list) ? list : [];
    } catch {
        return [];
    }
}

function writeLocal(entries: BodyWeightEntry[]) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
}

function upsertIn(entries: BodyWeightEntry[], entry: BodyWeightEntry): BodyWeightEntry[] {
    const rest = entries.filter((e) => e.date !== entry.date);
    return [...rest, entry].sort((a, b) => a.date.localeCompare(b.date));
}

export async function loadBodyWeight(userId: string): Promise<BodyWeightResult> {
    const { data, error } = await supabase
        .from("body_weight")
        .select("date, weight")
        .eq("user_id", userId)
        .order("date", { ascending: true });

    if (error) {
        return { entries: readLocal().sort((a, b) => a.date.localeCompare(b.date)), cloud: false };
    }

    let entries: BodyWeightEntry[] = (data || []).map((r: any) => ({ date: r.date, weight: Number(r.weight) }));

    // einmalige Migration: lokale Einträge in die Cloud übernehmen
    const local = readLocal();
    if (local.length) {
        const missing = local.filter((l) => !entries.some((e) => e.date === l.date));
        if (missing.length) {
            const { error: upErr } = await supabase
                .from("body_weight")
                .upsert(missing.map((m) => ({ user_id: userId, date: m.date, weight: m.weight })), { onConflict: "user_id,date" });
            if (!upErr) entries = missing.reduce((acc, m) => upsertIn(acc, m), entries);
        }
        localStorage.removeItem(LOCAL_KEY);
    }

    return { entries, cloud: true };
}

export async function saveBodyWeight(userId: string, entry: BodyWeightEntry): Promise<boolean> {
    const { error } = await supabase
        .from("body_weight")
        .upsert([{ user_id: userId, date: entry.date, weight: entry.weight }], { onConflict: "user_id,date" });
    if (error) {
        writeLocal(upsertIn(readLocal(), entry));
        return false; // nur lokal gespeichert
    }
    return true;
}

export async function deleteBodyWeight(userId: string, date: string): Promise<void> {
    const { error } = await supabase.from("body_weight").delete().eq("user_id", userId).eq("date", date);
    if (error) writeLocal(readLocal().filter((e) => e.date !== date));
}

// 7-Tage-gleitender Durchschnitt (kalendertagbasiert, robust bei Lücken)
export function rollingAverage(entries: BodyWeightEntry[], days = 7): BodyWeightEntry[] {
    return entries.map((e) => {
        const end = new Date(e.date + "T00:00:00");
        const start = new Date(end);
        start.setDate(start.getDate() - (days - 1));
        const window = entries.filter((x) => {
            const d = new Date(x.date + "T00:00:00");
            return d >= start && d <= end;
        });
        const avg = window.reduce((s, x) => s + x.weight, 0) / window.length;
        return { date: e.date, weight: Math.round(avg * 10) / 10 };
    });
}
