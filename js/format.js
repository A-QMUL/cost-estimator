// Number formatting helpers, using UK locale and tabular figures.

export function formatNumber(value, decimals = 1) {
  if (!Number.isFinite(value)) return '0';
  return value.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
