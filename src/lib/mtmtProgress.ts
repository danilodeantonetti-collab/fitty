// Merkt sich lokal, wo der Nutzer im MTMT Blueprint steht und welche
// Trainings bereits absolviert wurden (gleiche Konvention wie fitty_theme).

export interface MtmtProgress {
    month: number; // 1-12
    week: number; // 1-4
}

export interface MtmtDoneEntry {
    month: number;
    week: number;
    day: number;
    date: string; // ISO yyyy-mm-dd
}

const PROGRESS_KEY = "fitty_mtmt_progress";
const DONE_KEY = "fitty_mtmt_done";

export function getMtmtProgress(): MtmtProgress {
    if (typeof window === "undefined") return { month: 1, week: 1 };
    try {
        const raw = localStorage.getItem(PROGRESS_KEY);
        if (raw) {
            const p = JSON.parse(raw);
            if (p && p.month >= 1 && p.month <= 12 && p.week >= 1 && p.week <= 4) return p;
        }
    } catch {}
    return { month: 1, week: 1 };
}

export function setMtmtProgress(p: MtmtProgress) {
    if (typeof window === "undefined") return;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
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
