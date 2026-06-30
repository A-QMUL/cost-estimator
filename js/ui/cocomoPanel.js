import { estimateCocomo } from '../models/cocomo.js';
import { formatNumber } from '../format.js';
import { RATE_PER_PERSON_MONTH } from '../config.js';

// Wire the COCOMO inputs to the read-out, recomputing on every change.
export function initCocomoPanel() {
  const el = (id) => document.getElementById(id);

  function render() {
    const result = estimateCocomo({
      kloc: parseFloat(el('kloc').value) || 0,
      projectType: el('ptype').value,
      contingencyPercent: parseFloat(el('cont').value) || 0,
    });

    el('co-effort').textContent = formatNumber(result.effort);
    el('co-time').textContent = formatNumber(result.time);
    el('co-staff').textContent = formatNumber(result.staff, 1);
    el('co-cost').textContent = formatNumber(result.effort * RATE_PER_PERSON_MONTH, 0);
    el('co-total').textContent = formatNumber(result.total);
    el('co-bufval').textContent = formatNumber(result.buffer);
    el('co-baselab').textContent = formatNumber(result.effort) + ' base';
    el('co-basebar').style.width = result.basePercent + '%';
    el('co-bufbar').style.width = 100 - result.basePercent + '%';
  }

  ['kloc', 'ptype', 'cont'].forEach((id) => el(id).addEventListener('input', render));
  render();
}
