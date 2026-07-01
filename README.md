# Cost Estimator

A client-side tool to estimate software project effort and cost, built for the
IOT591U Reflective Development Showcase during Sprint week.

## Running it

Because the code is split into ES modules, the files must be served over HTTP
rather than opened directly from the file system. Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Validation

The tool reproduces the module's test scenarios exactly: a 32 KLOC organic
project returns about 91 person-months, and the sample components file totals
142 unadjusted function points, 153.36 adjusted, and 19.17 person-months.
