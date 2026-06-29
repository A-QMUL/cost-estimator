// Shared configuration for the two estimation models.

// Notional cost per person-month. Used only to translate effort into an
// indicative price; the models estimate effort, not price.
export const RATE_PER_PERSON_MONTH = 6000;

// COCOMO-81 coefficients [a, b, c, d] per project type.
//   Effort = a * KLOC^b        Time = c * Effort^d
export const COCOMO_COEFFICIENTS = {
  organic: [2.4, 1.05, 2.5, 0.38],
  semi: [3.0, 1.12, 2.5, 0.35],
  embedded: [3.6, 1.2, 2.5, 0.32],
};

// The five IFPUG function point component types, each with its display label
// and the default weight applied when a CSV row omits an explicit weight.
export const FP_TYPES = [
  { key: 'external inputs', label: 'Inputs', defaultWeight: 4 },
  { key: 'external outputs', label: 'Outputs', defaultWeight: 5 },
  { key: 'external inquiries', label: 'Inquiries', defaultWeight: 4 },
  { key: 'internal logical files', label: 'Logical Files', defaultWeight: 10 },
  { key: 'external interface files', label: 'Interface Files', defaultWeight: 7 },
];

// Built-in demonstration data (a small online-shop system, 142 UFP) loaded by
// the "Load sample" button, so the tool works instantly and offline. The larger
// library-system dataset in data/sample-components.csv is for the upload demo.
export const SAMPLE_CSV = `Component,Type,Count,Weight
User login,External Inputs,8,4
Order report,External Outputs,6,5
Catalogue search,External Inquiries,4,4
Member records,Internal Logical Files,5,10
Payment gateway,External Interface Files,2,7`;
