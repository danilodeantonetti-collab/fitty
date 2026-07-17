# FITTY

Persönliche Fitness-PWA (deutsch), deployed auf Vercel: https://fitty-qrxj.vercel.app
GitHub: danilodeantonetti-collab/fitty — Push auf `main` deployt automatisch.

## Stack

- Next.js (App Router) + React + TypeScript strict, Tailwind v4 (CSS-Konfiguration in `src/app/globals.css`, kein tailwind.config)
- Supabase (Postgres + Auth) über `src/lib/supabaseClient.ts`; Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (lokal in `.env.local`, auf Vercel gesetzt)
- Design: dunkel, Akzent `#e2ff00`, Utilities `glass`, `neon-shadow`, `btn-primary`
- Konvention: Seiten sind self-contained Client-Components; Typen inline pro Seite; kein UI-Framework, Icons als Inline-SVG

## Datenmodell (Supabase)

- `profiles` (id = auth user id, nickname, goal, age_range)
- `sessions` (user_id, workout_id nullable, date)
- `sets` (session_id, `exercise_id` **oder** `exercise_name`, weight, reps, order) — Standard-Pläne loggen per exercise_id, eigene + MTMT-Workouts per exercise_name
- `custom_workouts` (exercises als jsonb)
- `body_weight` (user_id, date, weight; unique user_id+date) — **muss einmalig per `SETUP_SUPABASE.sql` angelegt werden**, bis dahin localStorage-Fallback
- localStorage: `fitty_theme`, `fitty_mtmt_progress`, `fitty_mtmt_done`, `fitty_bodyweight` (Fallback), `fitty_timer_preset`

## MTMT Blueprint 2.0 (12-Monats-Programm)

- Daten: `src/data/mtmt.ts` — **generiert, nicht von Hand editieren.** 12 Monate → 3 Tage → Sektionen (mit `groupSets` = Runden und `weekNotes` = RiR pro Woche) → Übungen (Sätze/Reps für Woche 1–4, YouTube-`videoUrl`).
- Quelle: Original-PDFs in `C:\Users\danie\OneDrive - Interdependence Gmbh\KI\fitness\mtmt_blueprint_2_0\` (Digital-Ausgaben; Video-URLs stecken als Link-Annotationen an den Übungsnamen).
- Pipeline (`scripts/mtmt/`, braucht devDependency pdfjs-dist):
  1. `node scripts/mtmt/parse.mjs` — parst die PDFs koordinatenbasiert (Spalten-X-Positionen, zwei Durchgänge wegen mehrzeiliger Namen) → `extracted/plan.json` im Arbeitsverzeichnis
  2. `node scripts/mtmt/convert.mjs` — normalisiert (NFC, Mojibake `a╠ê`→`ä` aus Mac-Ordnernamen), holt fehlende Videotitel per YouTube-oEmbed → schreibt `src/data/mtmt.ts`
- Seiten: `/program` (Übersicht + Technik-Videos), `/program/[month]` (Wochenwahl + Tage), `/program/[month]/[day]` (Logger mit Video-Modal, Wochenzielen, Timer-Preset-Übergabe)
- Fortschritt (Monat/Woche/erledigte Tage) liegt in localStorage (`src/lib/mtmtProgress.ts`); geloggte Sätze in Supabase

## Befehle

- `npm run dev` / `npm run build` / `npx tsc --noEmit`
- Lokaler Smoke-Test: `npx next start -p 3300`, dann `/program`, `/program/2/2` prüfen
