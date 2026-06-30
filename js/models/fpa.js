import { FP_TYPES } from '../config.js';

// Default weight per component type, derived from FP_TYPES so the values live
// in exactly one place.
const DEFAULT_WEIGHTS = Object.fromEntries(FP_TYPES.map((t) => [t.key, t.defaultWeight]));

// Parse a components CSV into rows of { name, type, count, weight }. Column
// order is flexible: headers are matched by keyword, and a missing weight falls
// back to the IFPUG default for that component type.
export function parseComponentsCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];

  const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const nameIndex = header.findIndex((h) => h.includes('component') || h.includes('name') || h.includes('feature'));
  const typeIndex = header.findIndex((h) => h.includes('type'));
  const countIndex = header.findIndex((h) => h.includes('count'));
  const weightIndex = header.findIndex((h) => h.includes('weight'));

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',');
    const type = (cells[typeIndex] || '').trim();
    if (!type) continue;

    const name = (nameIndex >= 0 ? cells[nameIndex] : '').trim();
    const count = parseFloat(cells[countIndex]) || 0;
    let weight = weightIndex >= 0 ? parseFloat(cells[weightIndex]) : NaN;
    if (!Number.isFinite(weight)) weight = DEFAULT_WEIGHTS[type.toLowerCase()] || 4;

    rows.push({ name, type, count, weight });
  }
  return rows;
}

// Pure FPA estimate from parsed rows. Returns UFP, adjusted FP, effort and the
// function points aggregated by component type (for the chart).
export function estimateFpa(rows, { vaf, productivity }) {
  const perType = {};
  let ufp = 0;
  rows.forEach((row) => {
    const fp = row.count * row.weight;
    ufp += fp;
    const key = row.type.toLowerCase();
    perType[key] = (perType[key] || 0) + fp;
  });

  const adjustmentFactor = Number.isFinite(vaf) ? vaf : 0;
  const perMonth = productivity > 0 ? productivity : 1;
  const afp = ufp * adjustmentFactor;
  const effort = afp / perMonth;

  return { ufp, afp, effort, perType };
}
