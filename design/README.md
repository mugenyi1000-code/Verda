# Design canvas

Hi-fi artboards for Verda, matched value-for-value to `app/styles.css` — same
tokens, same type ramp, same component anatomy. They document the running app
and propose refinements inside its vocabulary; they are not a separate design
language.

```
node design/build-artboards.mjs
```

writes eight `.dc.html` artboards plus `canvas.json` into `design/artboards/`
(git-ignored — they are generated, and each carries an embedded font subset):

| Artboard | What it shows |
|---|---|
| `Main` | Dashboard — auto-KPI tiles, the 30-day obligation register, incident classification |
| `Analytics` | The KPI engine: site filter, exposure denominator, the 14 definitions with their formulas |
| `Inspections` | Equipment inspection register and two calculators, including an invalid-input state |
| `Reporting` | The ESSR builder — section picker, data-entry table with carried-forward cells, photographs, narrative, generated document |
| `Audits` | A protocol being worked: item controls, risk matrix, the actions the findings raise |
| `Workflows` | A procedure in progress — steps, roles, deadlines, closing evidence |
| `Field` | 390px — the observation screen used standing on a bench |
| `System` | The design system sheet: four themes, type, shape, elevation, states |

## Why the fonts are vendored

Each artboard renders in its own sandboxed iframe with no network, so IBM Plex
cannot be linked from Google Fonts. `design/fonts/` holds the latin subsets
(SIL Open Font License 1.1), embedded as base64 at build time.

## Publishing

The artboards are seeded into a Claude Design canvas with the `design` skill's
`seed-canvas.mjs` helper and published as an artifact. The written spec — the
one to hand to a designer or paste into a prompt-driven builder — is
`docs/design-system.md`.
