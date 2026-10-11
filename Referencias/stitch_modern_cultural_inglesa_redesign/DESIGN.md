---
name: Modern Academic Heritage
colors:
  surface: '#f1fdef'
  surface-dim: '#d1ddd1'
  surface-bright: '#f1fdef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf7ea'
  surface-container: '#e5f1e4'
  surface-container-high: '#e0ebdf'
  surface-container-highest: '#dae6d9'
  on-surface: '#141e16'
  on-surface-variant: '#41493f'
  inverse-surface: '#29332a'
  inverse-on-surface: '#e8f4e7'
  outline: '#71796e'
  outline-variant: '#c0c9bc'
  surface-tint: '#2e6b34'
  primary: '#12521e'
  on-primary: '#ffffff'
  primary-container: '#2e6b34'
  on-primary-container: '#a7e9a5'
  inverse-primary: '#95d693'
  secondary: '#7b5800'
  on-secondary: '#ffffff'
  secondary-container: '#fdc348'
  on-secondary-container: '#705100'
  tertiary: '#274191'
  on-tertiary: '#ffffff'
  tertiary-container: '#415aab'
  on-tertiary-container: '#cfd8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f3ad'
  primary-fixed-dim: '#95d693'
  on-primary-fixed: '#002106'
  on-primary-fixed-variant: '#12521e'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#f7bd43'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4200'
  tertiary-fixed: '#dce1ff'
  tertiary-fixed-dim: '#b6c4ff'
  on-tertiary-fixed: '#00164e'
  on-tertiary-fixed-variant: '#264191'
  background: '#f1fdef'
  on-background: '#141e16'
  surface-variant: '#dae6d9'
  academic-gold: '#C69214'
  forest-deep: '#1B4321'
  surface-cream: '#FBFBF9'
  whatsapp-connect: '#25D366'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system reimagines classical academic prestige into an accessible, warm, and distinctly modern digital experience. Catering to prospective students, parents, and working professionals, the system evokes intellectual rigor tempered with human warmth, clarity, and institutional reliability. 

The aesthetic sits at the intersection of **Corporate / Modern** clarity and refined academic warmth. It replaces antiquated institutional density with generous whitespace, crisp structural cards, rhythmic typographic hierarchy, and purposeful chromatic accents. Every interaction reinforces trust, progressive pedagogy, and educational excellence through deliberate, understated polish rather than decorative noise.

## Colors

The color palette centers on `#2E6B34`, an authoritative yet fresh British Racing/Forest green that grounds the institution's heritage in a clean contemporary hue. 

- **Primary (`#2E6B34`)**: Serves as the anchor for key actions, brand signals, and prominent navigation headers. Deepened variants (`#1B4321`) provide robust text contrast on light tones.
- **Secondary (`#C69214`)**: A warm, scholarly gold derived from academic heraldry. Used sparingly for achievements, badges, premium distinctions, and key highlights.
- **Tertiary (`#1E3A8A`)**: A deep Cambridge navy providing structural grounding for auxiliary data points, links, and secondary badges.
- **Neutral (`#5A655B`)**: An earthy, olive-tinted slate that keeps text comfortably readable and softens standard greys, paired with an off-white paper canvas (`#FBFBF9`).
- **Functional Accent (`#25D366`)**: Reserved exclusively for immediate communication pathways such as WhatsApp admissions channels.

## Typography

Typography pairs **Plus Jakarta Sans** for headlines with **Inter** for core reading surfaces. 

- **Headlines & Titles**: Plus Jakarta Sans provides contemporary geometric clarity, softened by subtle curves that feel humane, inviting, and educationally progressive without descending into informality.
- **Body & Labels**: Inter ensures immaculate optical balance across course syllabi, class schedules, and dense academic documentation, retaining supreme legibility at small viewport sizes.
- **Fluid Scale Rules**: Display and top-tier headline tokens must automatically switch to their dedicated mobile variants beneath 768px viewports to prevent awkward line wraps and horizontal overflow.

## Layout & Spacing

This design system uses a 12-column responsive grid on desktop screens (max-width: 1280px) and collapses into an 8-column layout on tablets and a 4-column layout on mobile viewports.

- **Grid Disciplines**: Desktop sections apply generous vertical rhythms (`margin` combined with multi-step `space-xl` stacks), eliminating the cluttered feel of traditional flyers and noticeboards.
- **Gutters & Alignments**: Fluid gutters adjust smoothly from `gutter-mobile` (16px) to `gutter` (24px). Course comparison matrices and campus location cards span 4 columns on desktop, 4 columns (half-width) on tablet, and full-width on mobile.
- **Rhythm**: Element internals adhere strictly to 4px/8px incremental steps, guaranteeing uniform alignment across interactive cards, form controls, and badge locks.

## Elevation & Depth

Visual hierarchy uses a refined **tonal layering system** complemented by light, ambient drop shadows. Heavy borders and skeuomorphic drop-shadows are avoided.

- **Base Surfaces**: The primary window background sits on a warm parchment neutral (`#FBFBF9`). Foreground cards sit on pure white (`#FFFFFF`).
- **Ambient Shadow Profile**: Elevated cards employ a gentle, double-stop diffused shadow tinted with forest neutral pigments (`rgba(46, 107, 52, 0.04)` 0px 4px 16px, plus `rgba(0, 0, 0, 0.02)` 0px 1px 2px) to lift elements subtly without dark muddy halos.
- **Interactive Lifts**: Interactive items (such as level-test cards and syllabus downloads) translate Y by -2px on hover, shifting the shadow to a slightly more pronounced ambient layer (`rgba(46, 107, 52, 0.08)` 0px 8px 24px).
- **Structural Outlines**: When low contrast separation is needed, cards use a 1px solid border in tinted neutral (`rgba(46, 107, 52, 0.08)`) instead of hard grey strokes.

## Shapes

With a roundedness factor of `2`:
- Base component corners (inputs, standard buttons, badges) carry an `8px` (`0.5rem`) radius.
- Cards, modal dialogues, and alert banners scale to `rounded-lg` (`16px` / `1rem`).
- Large promotional hero wrappers and feature banners scale up to `rounded-xl` (`24px` / `1.5rem`).
- Pills remain strictly reserved for standalone status tags and numeric metric badges.

This cohesive curvature balances institutional stability with modern, welcoming aesthetics.

## Components

### Buttons
- **Primary**: Solid `#2E6B34` fill, white typography, 8px radius, height 48px on desktop (44px on mobile), padding 12px 24px. Micro-interaction: Subtle brightness shift and -1px Y-translation on hover; gentle scale (0.98) on active press.
- **Secondary / Ghost**: Pure white background with a 1.5px border in `#2E6B34`, font colored in `#2E6B34`. Hover triggers an ultra-soft tint wash (`rgba(46, 107, 52, 0.05)`).
- **Direct WhatsApp Action**: Solid `#25D366` with high-contrast dark forest typography, providing immediate access for admissions and branch inquiries.

### Cards & Modules
- **Course & Exam Cards**: Pure `#FFFFFF` fill with an 8px or 16px radius, enclosed in a 1px border (`rgba(46, 107, 52, 0.08)`). Content follows a consistent hierarchy: age/level pill on top, Plus Jakarta Sans title, concise Inter body description, structured schedule data chips, and full-width CTA button at the base.

### Chips & Badges
- **Academic Status Chips**: Height 28px, 8px radius, font size 12px semi-bold. Backgrounds use pastel tints (e.g., gold badge uses `#C69214` at 12% opacity with a solid `#9A700C` label; green tags use `#2E6B34` at 10% opacity with solid `#1E4E24` label).

### Form Fields & Inputs
- **Inputs & Selects**: Height 48px, 8px radius, `#FFFFFF` background, 1px border in `#D4DAD4`. On focus, the field transitions smoothly to a 1.5px `#2E6B34` stroke with a 3px outer ring at 15% opacity (`rgba(46, 107, 52, 0.15)`).

### Selection Controls (Checkboxes & Radios)
- **Checkboxes & Radios**: 20px box with 4px radius (checkbox) or circular format (radio). Unchecked: 1.5px neutral border. Checked: Solid `#2E6B34` fill with crisp white SVG iconography.

### Branch & Sede Selector
- **Location Cards**: Feature an iconographic indicator, branch title, interactive address link, and immediate direct-chat triggers, arranged in a responsive grid that eliminates horizontal scrolling on narrow screens.