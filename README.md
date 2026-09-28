# Roots & Rifts

**Roots & Rifts** is a browser-based, gamified Precalculus learning environment for the polynomial and rational functions chapter. It is a standalone React/Vite application with no server-side dependency; learner progress is stored in browser local storage.

## Learning path

The guided expedition contains twelve progressively unlocked eight-question routes and a 20-question timed final summit. Each replay samples a shuffled set from a ten-question bank for the route.

| Route | Major concepts |
|---|---|
| Polynomial Scout | Definition, degree, maximum turns, end behavior, y-intercepts |
| Root Beacons | Zeros, x-intercepts, multiplicity, crossing/touching, flattening |
| Sketch Station | Qualitative polynomial sketches and additional points |
| Division Forge | Long division and the Division Algorithm |
| Synthetic Bay | Synthetic division and zero placeholders |
| Remainder Relay | Remainder Theorem and Factor Theorem |
| Root Hunter | Rational Zero Theorem and real-zero search |
| Bound Watch | Upper/Lower Bound Theorem |
| Complex Vault | Fundamental Theorem of Algebra, conjugate pairs, linear factors |
| Polynomial Lab | Building polynomials from zeros and conditions |
| Rational Outpost | Holes, intercepts, and all asymptote types |
| Rift Chart | Sign charts, asymptote intersections, and rational sketches |

The optional **Pattern Oracle** introduces Descartes’ Rule of Signs after the Rational Zero Theorem route. It is a bonus challenge and does not affect the core progression.

## Features

- Immediate feedback with worked mathematical explanations.
- Qualitative interactive graph canvases illustrating end behavior, multiplicity flattening, synthetic division, bounds, complex conjugates, rational branches, sign charts, and slant asymptotes.
- “Teach Me!” reference guide with formulas, worked examples, and common-error reminders.
- Persistent XP, badges, unlocks, best scores, and attempts.
- CSV scorecard export for learners to share with an instructor.
- Browser-triggered looping soundtrack with play, mute, and volume controls.
- A responsive interface designed for desktop and mobile use.

## Local development

```bash
pnpm install
pnpm dev --host
```

To create a production bundle:

```bash
pnpm build
```

The compiled static site is written to `dist/`.

## GitHub Pages deployment

This repository is configured for the `PyAIM/RootsAndRifts` project-site URL:

> https://pyaim.github.io/RootsAndRifts/

The included `.github/workflows/deploy-pages.yml` workflow builds the production `dist/` folder on GitHub and deploys it to GitHub Pages after every push to `main`. See [GITHUB-PAGES-POWERSHELL.md](./GITHUB-PAGES-POWERSHELL.md) for the complete Windows PowerShell workflow and [MATH-MATTERS-ROOTS-AND-RIFTS-LINK.md](./MATH-MATTERS-ROOTS-AND-RIFTS-LINK.md) for the Math-Matters Precalculus listing copy.

## Curriculum note

Polynomial sketching deliberately focuses on structural, qualitative reasoning—degree, end behavior, intercepts, multiplicities, signs, and extra points. Precise extrema location is appropriately identified as a calculus-based task.
