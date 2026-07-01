# Cost Estimator

A client-side web tool that estimates software project effort and cost using two
industry-standard models: **COCOMO-81** and **Function Point Analysis (IFPUG)**.
All calculation runs in the browser; there is no server and no database.

Built for IOT591U Reflective Development Showcase (Assignment 002).

## Running it

Because the code is split into ES modules, the files must be served over HTTP
rather than opened directly from the file system (browsers block module imports
on `file://`). Any static server works:

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

GitHub Pages serves the files over HTTP automatically, so no build step or
configuration is needed there.

## Project structure

```
cost-estimator/
  index.html              Markup only. Links the stylesheet and the module entry point.
  css/
    styles.css            All styling.
  js/
    config.js             Shared constants: rate, COCOMO coefficients, FP types, sample data.
    format.js             UK-locale number formatting.
    models/
      cocomo.js           Pure COCOMO calculation (no DOM).
      fpa.js              Pure FPA calculation and CSV parsing (no DOM).
    ui/
      tabs.js             COCOMO / Function Points tab switching.
      cocomoPanel.js      Wires the COCOMO inputs to the read-out.
      fpaPanel.js         Wires the FPA panel: upload, drag-and-drop, sample, table.
      chart.js            Builds the SVG bar chart of function points by type.
    main.js               Entry point; initialises the panels.
  data/
    sample-components.csv Larger library-system dataset for the upload demonstration.
  README.md
```

The design keeps calculation separate from presentation. The `models/` files are
pure functions that take numbers and return numbers, so the estimation logic can
be read, checked, or reused without touching the page. The `ui/` files handle
only the DOM wiring. Constants live once in `config.js`.

## The two models

**COCOMO-81** — Effort = a x KLOC^b, Schedule = c x Effort^d, with the
coefficients set by project type (organic, semi-detached, embedded). A separate
contingency buffer is shown alongside the base estimate so it is never dropped.

**Function Point Analysis** — Unadjusted function points are summed from the
component list (count x weight per row), adjusted by the Value Adjustment Factor,
then divided by a productivity rate to give effort. Upload a components CSV or
load the built-in sample.

### CSV format

```
Component,Type,Count,Weight
Member login,External Inputs,6,4
```

`Type` is one of the five IFPUG types (External Inputs, External Outputs,
External Inquiries, Internal Logical Files, External Interface Files). `Weight`
is optional; if omitted, the standard weight for that type is used.
