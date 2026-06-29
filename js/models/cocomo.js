import { COCOMO_COEFFICIENTS } from '../config.js';

// Pure COCOMO-81 estimate. Takes plain numbers and returns effort, schedule,
// staffing and the contingency split, with no DOM dependencies so it can be
// reasoned about and tested on its own.
export function estimateCocomo({ kloc, projectType, contingencyPercent }) {
  const [a, b, c, d] = COCOMO_COEFFICIENTS[projectType] || COCOMO_COEFFICIENTS.organic;
  const size = Math.max(0, kloc) || 0;
  const contingency = Math.max(0, contingencyPercent) / 100;

  const effort = size > 0 ? a * Math.pow(size, b) : 0;
  const time = effort > 0 ? c * Math.pow(effort, d) : 0;
  const staff = time > 0 ? effort / time : 0;
  const buffer = effort * contingency;
  const total = effort + buffer;
  const basePercent = total > 0 ? (effort / total) * 100 : 80;

  return { effort, time, staff, buffer, total, basePercent };
}
