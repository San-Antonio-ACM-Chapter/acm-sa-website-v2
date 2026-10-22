# Slide Consolidation Refactor

Branch: `refactor/slide-consolidation`

## Motivation

Several files had grown large (showcase/page.tsx ~2316 lines, playtest-night/page.tsx ~1684 lines)
with duplicated patterns across them. This refactor extracts shared logic without changing any
visible behavior, styles, or slide designs.

---

## Baseline (before)

| File | Lines |
|---|---|
| `slides/kickoff/slide-utils.tsx` | 171 |
| `slides/showcase/page.tsx` | 2316 |
| `slides/playtest-night/page.tsx` | 1684 |
| `velocicode/page.tsx` | 1055 |
| **Total** | **5226** |

## After

| File | Lines | Change |
|---|---|---|
| `slides/kickoff/slide-utils.tsx` | 293 | +122 (hook + cardCls added) |
| `slides/slide-fonts.ts` | 27 | new |
| `slides/SlideFrame.tsx` | 74 | new |
| `slides/showcase/page.tsx` | 2166 | −150 |
| `slides/playtest-night/page.tsx` | 1528 | −156 |
| `velocicode/page.tsx` | 1025 | −30 |
| **Total** | **5113** | **−113 net** |

Build: clean ✓  All spot-checks: pass ✓

---

## Problems addressed

### 1. `cardCls` duplicated verbatim
Identical 10-line function in both `showcase/page.tsx:158` and `playtest-night/page.tsx:60`.

**Fix:** Move to `slide-utils.tsx` as an export.

### 2. Font declarations duplicated across slide pages
Both showcase and playtest-night each declared the same `next/font/google` objects
(~33 lines each). Showcase also used `.style.fontFamily` inline instead of the CSS
variables already defined on `.frame` in `slides.module.css`.

**Fix:** Extract to `slides/slide-fonts.ts`. Use `SLIDE_FONT_CLASSES` everywhere.
Slide components use CSS vars (`"var(--vc-font-display-1)"` etc.) rather than
font object references.

CSS variable → font mapping (defined in `slides.module.css` on `.frame`):
```
--vc-font-display-1  →  Luckiest Guy
--vc-font-display-2  →  Rubik Dirt
--vc-font-display-3  →  Bowlby One SC
--vc-font-hand       →  Caveat Brush
--vc-font-stamp      →  Special Elite
--vc-font-mono       →  DM Mono
```

### 3. Slide runtime boilerplate duplicated
Both `ShowcaseRuntime` and `PlaytestRuntime` shared ~60 lines of identical logic:
- Scale-to-viewport state + resize listener
- `reducedRef` setup
- Swap state machine (idx, outIdx, inIdx, swapping + refs)
- Core `advance` function body
- Keyboard navigation effect

**Fix:** Extract to `useSlideNav` hook in `slide-utils.tsx`.
Each runtime passes an `onIntercept` callback for its custom reveal logic.

### 4. Slide chrome rendered identically in both runtimes
The `viewport → frame → contour → brand → counter → footer → zones` structure
was duplicated verbatim (~35 lines each).

**Fix:** Extract to `slides/SlideFrame.tsx` component.
Props: `scale`, `idx`, `total`, `footerRight`, `onPrev`, `onNext`, `children`,
plus optional `beforeFrame` and `afterCards` slots for showcase's audio elements.

### 5. AllyCard pattern duplicated in `velocicode/page.tsx`
The `Tag = s.href ? "a" : "div"` sponsor/partner card pattern appeared twice
(SPONSORS loop and COMMUNITY_PARTNERS loop), ~30 lines each.

**Fix:** Extract to local `AllyCard` component inside `page.tsx`.

---

## Spot-check markers (verify after)

### `cardCls` (was showcase:158, playtest:60)
Function must no longer appear in showcase or playtest pages.
Import from `slide-utils` instead.

### Font strategy (was showcase:27-59, playtest:18-56)
- `luckiestGuy.style.fontFamily` must not appear in showcase/page.tsx
- `rubikDirt.style.fontFamily` must not appear in showcase/page.tsx
- `elite.style.fontFamily` must not appear in showcase/page.tsx
- `caveat.style.fontFamily` must not appear in showcase/page.tsx
- `dmMono.style.fontFamily` must not appear in showcase/page.tsx
- Font imports and declarations must not appear in showcase or playtest pages
- `slide-fonts.ts` must export `SLIDE_FONT_CLASSES`

### Scale effect (was showcase:1955-1961, playtest:1529-1534)
`window.addEventListener("resize"` must not appear in showcase or playtest pages.
Handled by `useSlideNav`.

### Ally cards (was page.tsx:769, 824)
`const Tag = s.href ? "a" : "div"` must not appear in page.tsx twice.
Replaced by `<AllyCard>` usage.

---

## Files changed

| File | Change |
|---|---|
| `slides/slide-fonts.ts` | New — shared font declarations |
| `slides/SlideFrame.tsx` | New — shared slide chrome component |
| `slides/kickoff/slide-utils.tsx` | Added `cardCls`, `useSlideNav` exports |
| `slides/showcase/page.tsx` | Use shared utilities; CSS var fonts |
| `slides/playtest-night/page.tsx` | Use shared utilities |
| `velocicode/page.tsx` | Local `AllyCard` component |

---

## Phase 2: remaining decks

Extends the same consolidation to every deck under `slides/`.

### Runtime migration
`judges`, `gdg-level-01`, `dynamic-procedural-audio-godot`, `how-to-submit`,
`final-sprint-workshop`, `unreal-engine-5-whats-new`, and `kickoff` now use
`useSlideNav` + `<SlideFrame>` + `SLIDE_FONT_CLASSES`, and import `cardCls`.

- `useSlideNav` gained `autoplaySec` (paused-by-default timer; returns `paused`,
  `progress`, `onTogglePause`) and `onStep` (fires with the destination index).
  The autoplay timer bypasses `onIntercept`; an intercepted advance resets it.
- `SlideFrame` gained an `autoplay` prop that renders the progress track and
  pause button.
- Kickoff's theme reveal uses `onIntercept` to step through the reveal and
  `onStep` to reset it.
- Footer brand text is normalized to "VelociCode" (kickoff and UE5 said
  "Velocicode"; the footer is uppercased by CSS so nothing visible changes).

### Shared slides
Byte-identical slide components moved to `slides/shared-slides.tsx`:

| Component | Decks |
|---|---|
| `CommunityPartnersSlide` | godot, final-sprint, gdg, how-to-submit, playtest-night, ue5 |
| `SponsorsSlide` | godot, final-sprint, how-to-submit, playtest-night, ue5 |
| `ClosingSlide` | godot, final-sprint, gdg, playtest-night, ue5 |
| `VelociCodeSlide` | godot, final-sprint, gdg |

Same-named slides whose content differs per event (`ScheduleSlide`,
`SubmissionsDueSlide`, `HostSlide`, `HandoffSlide`, `TitleSlide`, how-to-submit's
`ClosingSlide`, ue5's `VelociCodeSlide`, showcase's `SponsorsSlide`/`ClosingSlide`)
stay local.

### Display
Uses its own transition system, so only its fonts, `makeQR`, and `QRImg` were
switched to the shared versions.

### Not changed
`configure/page.tsx` applies three fonts directly as classNames on a form UI,
not a slide deck.

Net vs `main` across `src/app/velocicode`: +1081 / −4217.
Typecheck, `biome check`, and `pnpm run build`: clean.
