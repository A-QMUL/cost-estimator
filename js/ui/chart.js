import { FP_TYPES } from '../config.js';

// Build a horizontal SVG bar chart of function points per component type.
// Returns an SVG string, or an empty string when there is nothing to plot.
export function buildFpChart(perType) {
  const data = FP_TYPES
    .map((t) => ({ label: t.label, fp: perType[t.key] || 0 }))
    .filter((d) => d.fp > 0);
  if (!data.length) return '';

  const rowHeight = 26;
  const width = 380;
  const labelX = 120;
  const max = Math.max(...data.map((d) => d.fp), 1);
  const height = data.length * rowHeight + 6;

  let svg = `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img">`;
  data.forEach((d, i) => {
    const y = i * rowHeight + 4;
    const barWidth = (d.fp / max) * (width - labelX - 34);
    svg += `<text x="0" y="${y + 13}" font-size="10" fill="#9DB0CE">${d.label}</text>`;
    svg += `<rect class="bar" x="${labelX}" y="${y + 3}" width="${barWidth}" height="14" rx="3" fill="#2A4FD6"/>`;
    svg += `<text x="${labelX + barWidth + 6}" y="${y + 13}" font-size="10" fill="#fff">${d.fp}</text>`;
  });
  svg += '</svg>';
  return svg;
}
