// Converts extracted/plan.json into src/data/mtmt.ts for the FITTY app
import fs from 'node:fs';
import path from 'node:path';

const { months, infoVideos } = JSON.parse(fs.readFileSync('./extracted/plan.json', 'utf8'));
const OUT_FILE = 'C:/Users/danie/dev/fitty/src/data/mtmt.ts';

// Mac-Ordnernamen kamen als Mojibake an: UTF-8-Bytes des kombinierenden
// Tremas (CC 88) wurden als CP437 "╠ê" ausgepackt -> zurück zum Umlaut.
const demojibake = (s) =>
  s
    .replace(/a╠ê/g, 'ä').replace(/o╠ê/g, 'ö').replace(/u╠ê/g, 'ü')
    .replace(/A╠ê/g, 'Ä').replace(/O╠ê/g, 'Ö').replace(/U╠ê/g, 'Ü');
const nfc = (s) => demojibake((s ?? '').normalize('NFC')).replace(/\s+/g, ' ').trim();
const fixTypos = (s) =>
  s
    .replace(/Superest/g, 'Superset')
    .replace(/Refernce/g, 'Reference')
    .replace(/Kapazität|Kapazität/g, 'Kapazität');

// --- info videos: dedupe, drop redacted "lll…" labels, fetch missing titles via YouTube oEmbed
const KNOWN_SOURCES = { INTRO: 'Intro', KOMPETENZ: 'Kompetenz', 'KAPAZITÄT': 'Kapazität', HYPERTROPHIE: 'Hypertrophie' };
const cleanLabel = (l) => {
  if (!l) return null;
  const s = nfc(l);
  const lCount = (s.match(/l/g) || []).length;
  if (lCount > s.length * 0.6) return null; // redacted overlay text
  return s;
};
const bySource = new Map();
for (const v of infoVideos) {
  const source = KNOWN_SOURCES[nfc(v.source).toUpperCase()] ?? nfc(v.source);
  const key = source + '|' + v.url;
  const label = cleanLabel(v.label);
  const cur = bySource.get(key);
  if (!cur) bySource.set(key, { source, url: v.url, label });
  else if (!cur.label && label) cur.label = label;
}
const dedupedInfo = [...bySource.values()];

async function fetchTitle(url) {
  try {
    const res = await fetch('https://www.youtube.com/oembed?url=' + encodeURIComponent(url) + '&format=json');
    if (!res.ok) return null;
    return (await res.json()).title ?? null;
  } catch {
    return null;
  }
}
for (const v of dedupedInfo) {
  if (!v.label) {
    v.label = (await fetchTitle(v.url)) ?? 'Video';
    console.log(`oEmbed: ${v.url} -> ${v.label}`);
  }
}

// --- program
const outMonths = months.map((m) => ({
  month: m.month,
  phase: fixTypos(nfc(m.phase)),
  days: m.days.map((d) => ({
    day: d.day,
    sections: d.sections.map((s) => {
      const sec = { title: fixTypos(nfc(s.title)) };
      if (s.weekNotes) sec.weekNotes = s.weekNotes.map((n) => (n ? nfc(n) : null));
      if (s.groupSets) sec.groupSets = s.groupSets.map((n) => (n ? nfc(n) : null));
      sec.exercises = s.exercises.map((e) => {
        const ex = {
          id: e.id,
          name: fixTypos(nfc(e.name)),
          weeks: e.weeks.map((w) => ({ sets: nfc(w.sets) || null, reps: nfc(w.reps) || null })),
        };
        if (nfc(e.cues)) ex.cues = fixTypos(nfc(e.cues));
        if (e.videoUrl) ex.videoUrl = e.videoUrl;
        return ex;
      });
      return sec;
    }),
  })),
}));

// sanity stats
let nEx = 0, nVid = 0;
for (const m of outMonths) for (const d of m.days) for (const s of d.sections) { nEx += s.exercises.length; nVid += s.exercises.filter((e) => e.videoUrl).length; }

const ts = `// MTMT Blueprint 2.0 — Trainingsprogramm-Daten
// Automatisch aus den Original-PDFs extrahiert. Nicht von Hand bearbeiten.
// ${outMonths.length} Monate, ${nEx} Übungen (${nVid} mit Video).

export interface MtmtWeekTarget {
    sets: string | null;
    reps: string | null;
}

export interface MtmtExercise {
    id: string; // Position im Plan, z. B. "a1", "b2", "c"
    name: string;
    weeks: MtmtWeekTarget[]; // Index 0-3 = Woche 1-4
    cues?: string;
    videoUrl?: string;
}

export interface MtmtSection {
    title: string;
    weekNotes?: (string | null)[]; // z. B. RiR-Vorgabe pro Woche
    groupSets?: (string | null)[]; // Runden/Sätze für Superset/Zirkel pro Woche
    exercises: MtmtExercise[];
}

export interface MtmtDay {
    day: number;
    sections: MtmtSection[];
}

export interface MtmtMonth {
    month: number;
    phase: string;
    days: MtmtDay[];
}

export interface MtmtInfoVideo {
    source: string; // Intro | Kompetenz | Kapazität | Hypertrophie
    label: string;
    url: string;
}

export const MTMT_WEEKS = 4;

export const MTMT_MONTHS: MtmtMonth[] = ${JSON.stringify(outMonths, null, 4)};

export const MTMT_INFO_VIDEOS: MtmtInfoVideo[] = ${JSON.stringify(dedupedInfo.map(({ source, label, url }) => ({ source, label, url })), null, 4)};

export function getMtmtMonth(month: number): MtmtMonth | undefined {
    return MTMT_MONTHS.find((m) => m.month === month);
}

export function getMtmtDay(month: number, day: number): MtmtDay | undefined {
    return getMtmtMonth(month)?.days.find((d) => d.day === day);
}

// Stabiler Name für das Logging in der sets-Tabelle (exercise_name)
export function mtmtExerciseLogName(ex: MtmtExercise): string {
    return ex.name;
}
`;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, ts, 'utf8');
console.log(`Written ${OUT_FILE}: ${outMonths.length} Monate, ${nEx} Übungen, ${nVid} mit Video, ${dedupedInfo.length} Info-Videos`);
