// Parses the 12 MTMT "Digital Ausgabe" PDFs into a structured plan.json
// and the 4 info PDFs into an info-videos list.
import fs from 'node:fs';
import path from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const ROOT = 'c:/Users/danie/OneDrive - Interdependence Gmbh/KI/fitness/mtmt_blueprint_2_0';
const OUT = path.join(process.cwd(), 'extracted');

// column geometry (identical across all Digital PDFs, verified via header label x positions)
const X_TAG_MAX = 14; // vertical "Tag N" letters
const X_ID_MAX = 23.5; // a1/b2/c ids
const X_NAME_MAX = 108; // exercise names / section titles
const X_CUES_MAX = 192; // cues column
const WEEK_START = 193.5;
const WEEK_WIDTH = 99.55;
const SETS_WIDTH = 12; // sets sub-column within a week

function findDirs() {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^Monat \d+/.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
}

async function getPageData(file) {
  const doc = await getDocument({ data: new Uint8Array(fs.readFileSync(file)), useSystemFonts: true }).promise;
  const page = await doc.getPage(1);
  const tc = await page.getTextContent();
  const items = tc.items
    .map((i) => ({ s: i.str.trim(), x: i.transform[4], y: i.transform[5] }))
    .filter((i) => i.s);
  const annots = await page.getAnnotations();
  const links = annots
    .filter((a) => a.subtype === 'Link' && a.url)
    .map((a) => ({ url: a.url, x1: a.rect[0], y1: Math.min(a.rect[1], a.rect[3]), x2: a.rect[2], y2: Math.max(a.rect[1], a.rect[3]) }));
  return { items, links };
}

function groupLines(items) {
  const lines = [];
  for (const it of [...items].sort((a, b) => b.y - a.y || a.x - b.x)) {
    const line = lines.find((l) => Math.abs(l.y - it.y) < 1.6);
    if (line) line.items.push(it);
    else lines.push({ y: it.y, items: [it] });
  }
  return lines;
}

function weekCol(x) {
  const k = Math.floor((x - WEEK_START) / WEEK_WIDTH);
  return Math.max(0, Math.min(3, k));
}

function parseTable(lines, links) {
  // lines: all lines of one table (below header), sorted by y desc
  const day = { day: null, sections: [] };
  let section = null;
  const exercises = []; // flat, with y for link matching

  const ensureSection = (title) => {
    section = { title, exercises: [] };
    day.sections.push(section);
  };

  // pass 1: find anchor lines (with exercise id)
  const anchors = [];
  for (const line of lines) {
    for (const it of line.items) {
      if (it.x >= X_TAG_MAX && it.x < X_ID_MAX) {
        const m = it.s.match(/^([a-z]\d?)($|\s+(.*))/);
        if (m) anchors.push({ y: line.y, id: m[1], nameRest: m[3] || '' });
      }
    }
  }

  const anchorFor = (y) => {
    let best = null;
    for (const a of anchors) {
      const d = Math.abs(a.y - y);
      if (d < 7.5 && (!best || d < Math.abs(best.y - y))) best = a;
    }
    return best;
  };

  const exByAnchor = (a) => (a ? exercises.find((e) => e.id === a.id && Math.abs(e.anchorY - a.y) < 1.6) : null);
  const classify = (line) => ({
    idItem: line.items.find((i) => i.x >= X_TAG_MAX && i.x < X_ID_MAX && /^[a-z]\d?($|\s)/.test(i.s)),
    nameItems: line.items.filter((i) => i.x >= X_ID_MAX && i.x < X_NAME_MAX),
    cueItems: line.items.filter((i) => i.x >= X_NAME_MAX && i.x < X_CUES_MAX),
    weekItems: line.items.filter((i) => i.x >= X_CUES_MAX),
  });
  const isSectionHeader = (line) => {
    const { idItem, nameItems } = classify(line);
    return !idItem && nameItems.length && nameItems[0].x < 26 && !anchorFor(line.y);
  };

  // PASS 1: create sections + exercises (anchor lines only), in document order
  const sectionAtY = []; // section headers with their y position
  for (const line of lines) {
    const tagDigit = line.items.find((i) => i.x < X_TAG_MAX && /^\d$/.test(i.s));
    if (tagDigit) day.day = parseInt(tagDigit.s);

    const { idItem, nameItems, weekItems } = classify(line);

    if (isSectionHeader(line)) {
      ensureSection(nameItems.map((i) => i.s).join(' '));
      const notes = [null, null, null, null];
      for (const it of weekItems) notes[weekCol(it.x)] = ((notes[weekCol(it.x)] || '') + ' ' + it.s).trim();
      if (notes.some(Boolean)) section.weekNotes = notes;
      sectionAtY.push({ y: line.y, section });
      continue;
    }

    if (!section) {
      ensureSection('Training');
      sectionAtY.push({ y: line.y + 1, section });
    }

    const anchor = idItem ? anchors.find((a) => Math.abs(a.y - line.y) < 1.6 && a.id === idItem.s.match(/^([a-z]\d?)/)[1]) : null;
    if (anchor && !exByAnchor(anchor)) {
      const ex = {
        id: anchor.id,
        anchorY: anchor.y,
        name: [],
        cues: [],
        weeks: [
          { sets: '', reps: '' },
          { sets: '', reps: '' },
          { sets: '', reps: '' },
          { sets: '', reps: '' },
        ],
        videoUrl: null,
        lineYs: [line.y],
      };
      if (anchor.nameRest) ex.name.push({ y: line.y, s: anchor.nameRest });
      section.exercises.push(ex);
      exercises.push(ex);
    }
  }

  // PASS 2: distribute remaining content now that every exercise exists
  const sectionForY = (y) => {
    let cur = null;
    for (const s of sectionAtY) if (s.y > y) cur = s.section; // headers sit above their rows
    return cur ?? sectionAtY[0]?.section ?? null;
  };
  for (const line of lines) {
    if (isSectionHeader(line)) continue; // already handled
    const { nameItems, cueItems, weekItems } = classify(line);
    const anchor = anchorFor(line.y);
    const ex = exByAnchor(anchor);

    if (ex) {
      if (!ex.lineYs.includes(line.y)) ex.lineYs.push(line.y);
      for (const it of nameItems) ex.name.push({ y: it.y, s: it.s });
      for (const it of cueItems) ex.cues.push({ y: it.y, s: it.s });
    }

    if (!weekItems.length) continue;
    // week-column content: belongs to the exercise on its anchor line,
    // otherwise it is a floating group line (rounds for supersets/circuits)
    if (ex && Math.abs(ex.anchorY - line.y) < 1.6) {
      for (const it of weekItems) {
        if (/^[A-Za-z]$/.test(it.s)) continue; // vertical "Runden" letters
        const k = weekCol(it.x);
        const isSets = it.x - (WEEK_START + k * WEEK_WIDTH) < SETS_WIDTH;
        const w = ex.weeks[k];
        if (isSets) w.sets = (w.sets + ' ' + it.s).trim();
        else w.reps = (w.reps + ' ' + it.s).trim();
      }
    } else {
      const sec = sectionForY(line.y);
      const vals = [null, null, null, null];
      let any = false;
      for (const it of weekItems) {
        if (/^[A-Za-z]$/.test(it.s)) continue;
        vals[weekCol(it.x)] = ((vals[weekCol(it.x)] || '') + ' ' + it.s).trim();
        any = true;
      }
      if (any && sec) {
        if (!sec.groupSets) sec.groupSets = [null, null, null, null];
        for (let k = 0; k < 4; k++) if (vals[k]) sec.groupSets[k] = ((sec.groupSets[k] || '') + ' ' + vals[k]).trim();
      }
    }
  }

  // finalize: join name/cue fragments top-down
  for (const s of day.sections) {
    for (const ex of s.exercises) {
      ex.name = ex.name.sort((a, b) => b.y - a.y).map((f) => f.s).join(' ').replace(/\s+/g, ' ').trim();
      ex.cues = ex.cues.sort((a, b) => b.y - a.y).map((f) => f.s).join(' ').replace(/\s+/g, ' ').trim();
    }
    s.exercises = s.exercises.filter((e) => e.name);
  }
  day.sections = day.sections.filter((s) => s.exercises.length || s.weekNotes);

  // link matching
  const flat = day.sections.flatMap((s) => s.exercises);
  const unmatched = [];
  for (const l of links) {
    const yc = (l.y1 + l.y2) / 2;
    let best = null;
    for (const ex of flat) {
      for (const ly of ex.lineYs) {
        // text baseline sits at rect bottom; accept baseline within rect ± tolerance
        if (ly >= l.y1 - 3.5 && ly <= l.y2 + 2) {
          const d = Math.abs(ly - yc);
          if (!best || d < best.d) best = { ex, d };
        }
      }
    }
    if (best) {
      if (!best.ex.videoUrl) best.ex.videoUrl = l.url;
      else if (best.ex.videoUrl !== l.url) (best.ex.moreUrls ??= []).push(l.url);
    } else unmatched.push(l.url);
  }
  for (const s of day.sections) for (const ex of s.exercises) { delete ex.lineYs; delete ex.anchorY; }
  return { day, unmatched };
}

async function parseMonth(dirName) {
  const dir = path.join(ROOT, dirName);
  const file = fs
    .readdirSync(dir)
    .find((f) => f.includes('Digital') && f.endsWith('.pdf') && !f.startsWith('._'));
  const { items, links } = await getPageData(path.join(dir, file));
  const monthNum = parseInt(dirName.match(/^Monat (\d+)/)[1]);
  const phase = dirName.replace(/^Monat \d+ - /, '').replace('Hypertrophiephaes', 'Hypertrophiephase').normalize('NFC');

  // split page into tables at header lines ("Übung (Implement)")
  const lines = groupLines(items.filter((i) => i.y > 30)); // drop footer
  const headerYs = lines.filter((l) => l.items.some((i) => i.s.includes('Übung (Implement)'.normalize('NFD')) || i.s.normalize('NFC').includes('Übung (Implement)'))).map((l) => l.y);
  headerYs.sort((a, b) => b - a);
  const tables = [];
  for (let t = 0; t < headerYs.length; t++) {
    const top = headerYs[t];
    const bottom = t + 1 < headerYs.length ? headerYs[t + 1] + 12 : 30; // stop above next table's title row
    const tLines = lines.filter((l) => l.y < top - 1 && l.y > bottom);
    const tLinks = links.filter((l) => (l.y1 + l.y2) / 2 < top && (l.y1 + l.y2) / 2 > bottom);
    tables.push(parseTable(tLines, tLinks));
  }
  const days = tables.map((t, i) => ({ ...t.day, day: t.day.day ?? i + 1 }));
  const unmatched = tables.flatMap((t) => t.unmatched);
  return { month: monthNum, phase, days, unmatched };
}

// info PDFs: (label, url) pairs
async function parseInfoPdf(file) {
  const doc = await getDocument({ data: new Uint8Array(fs.readFileSync(file)), useSystemFonts: true }).promise;
  const out = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    const items = tc.items.map((i) => ({ s: i.str.trim(), x: i.transform[4], y: i.transform[5] })).filter((i) => i.s);
    const annots = await page.getAnnotations();
    for (const a of annots) {
      if (a.subtype !== 'Link' || !a.url) continue;
      const y1 = Math.min(a.rect[1], a.rect[3]) - 3.5;
      const y2 = Math.max(a.rect[1], a.rect[3]) + 2;
      const x1 = a.rect[0] - 2;
      const x2 = a.rect[2] + 2;
      const label = items
        .filter((i) => i.y >= y1 && i.y <= y2 && i.x >= x1 - 5 && i.x <= x2)
        .sort((i, j) => j.y - i.y || i.x - j.x)
        .map((i) => i.s)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      out.push({ label: label || null, url: a.url, page: p });
    }
  }
  return out;
}

const months = [];
let totalUnmatched = [];
for (const dir of findDirs()) {
  const m = await parseMonth(dir);
  months.push(m);
  totalUnmatched.push(...m.unmatched.map((u) => `M${m.month}: ${u}`));
  const nEx = m.days.reduce((s, d) => s + d.sections.reduce((s2, sec) => s2 + sec.exercises.length, 0), 0);
  const nVid = m.days.reduce((s, d) => s + d.sections.reduce((s2, sec) => s2 + sec.exercises.filter((e) => e.videoUrl).length, 0), 0);
  console.log(`Monat ${m.month} (${m.phase}): ${m.days.length} Tage, ${nEx} Übungen, ${nVid} mit Video, Tage=[${m.days.map((d) => d.day)}]`);
}

// info videos
const infoFiles = [];
for (const dir of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const f of fs.readdirSync(path.join(ROOT, dir.name))) {
    if (f.startsWith('#') && f.endsWith('.pdf') && !f.startsWith('._')) infoFiles.push({ dir: dir.name, file: f });
  }
}
const infoVideos = [];
for (const { dir, file } of infoFiles) {
  const vids = await parseInfoPdf(path.join(ROOT, dir, file));
  const src = file.match(/#\d+ ([A-ZÄÖÜa-zäöü╠ê]+)/)?.[1]?.normalize('NFC') ?? file;
  for (const v of vids) infoVideos.push({ source: src, ...v });
  console.log(`Info ${file}: ${vids.length} Links`);
}

for (const m of months) delete m.unmatched;
fs.writeFileSync(path.join(OUT, 'plan.json'), JSON.stringify({ months, infoVideos }, null, 1));
console.log(`\nUnmatched links (${totalUnmatched.length}):`);
totalUnmatched.forEach((u) => console.log('  ' + u));
console.log('\nWritten plan.json');
