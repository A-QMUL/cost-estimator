import { parseComponentsCsv, estimateFpa } from '../models/fpa.js';
import { buildFpChart } from './chart.js';
import { formatNumber } from '../format.js';
import { RATE_PER_PERSON_MONTH, SAMPLE_CSV } from '../config.js';

// Wire the Function Point panel: CSV upload, drag-and-drop, the sample button,
// the component table, the read-out and the chart.
export function initFpaPanel() {
  const el = (id) => document.getElementById(id);
  let rows = [];

  function render() {
    const body = el('fpbody');
    body.innerHTML = '';
    rows.forEach((row) => {
      const fp = row.count * row.weight;
      const tr = document.createElement('tr');
      tr.innerHTML =
        `<td>${row.name || '&mdash;'}</td>` +
        `<td>${row.type}</td>` +
        `<td class="num">${row.count}</td>` +
        `<td class="num">${row.weight}</td>` +
        `<td class="num">${fp}</td>`;
      body.appendChild(tr);
    });

    const result = estimateFpa(rows, {
      vaf: parseFloat(el('vaf').value),
      productivity: parseFloat(el('prod').value),
    });
    el('ufp').textContent = result.ufp;
    el('fp-ufp').textContent = result.ufp;
    el('fp-afp').textContent = formatNumber(result.afp, 2);
    el('fp-effort').textContent = formatNumber(result.effort, 2);
    el('fp-cost').textContent = formatNumber(result.effort * RATE_PER_PERSON_MONTH, 0);
    el('fpchart').innerHTML = rows.length ? buildFpChart(result.perType) : '';
  }

  function loadCsvText(text) {
    rows = parseComponentsCsv(text);
    render();
  }

  function readFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => loadCsvText(reader.result);
    reader.readAsText(file);
  }

  const drop = el('drop');
  el('csv').addEventListener('change', (e) => readFile(e.target.files[0]));
  ['dragover', 'dragenter'].forEach((ev) =>
    drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.add('over');
    })
  );
  ['dragleave', 'drop'].forEach((ev) =>
    drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.remove('over');
    })
  );
  drop.addEventListener('drop', (e) => readFile(e.dataTransfer.files[0]));
  el('loadsample').addEventListener('click', () => loadCsvText(SAMPLE_CSV));
  ['vaf', 'prod'].forEach((id) => el(id).addEventListener('input', render));

  loadCsvText(SAMPLE_CSV);
}
