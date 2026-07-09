# Whiskey Peak Media Design System
> One-line Vibe: A premium dark digital distillery with glowing golden details.
> Theme: Pure Dark (#0A0A0A Canvas)

---

## 1. Style Summary
The design system of Whiskey Peak Media is crafted to project high-end digital authority and editorial sophistication. Layouts rely on bold serif typographies, clean line borders, and dark spacious density. We use deep background canvases to ground the interface, utilizing a metallic warm gold (#C8A97E) as a precise highlight color to direct user focus.

---

## 2. Tokens: Colors
| Token Name | CSS Class | Hex Value | Primary Role |
| :--- | :--- | :--- | :--- |
| `background` | `bg-background` | `#0A0A0A` | Global canvas base background |
| `surface` | `bg-surface` | `#111111` | Bento layout cards and FAQ section backgrounds |
| `card` | `bg-card` | `#161616` | Dynamic stacking cards and interactive containers |
| `gold` | `text-gold` / `bg-gold` | `#C8A97E` | Main accent details, active scroll highlights, text hover glows |
| `gold-hover` | `hover:text-gold-hover` | `#D4B88F` | Bright active highlight for hovered buttons |
| `foreground` | `text-foreground` | `#F0EDE8` | Primary high-contrast text and main typography headings |
| `body` | `text-body` | `#C8C4BC` | Secondary body text and text paragraphs |
| `dim` | `text-dim` | `#888888` | Footnotes, metadata, and copyright text |

---

## 3. Tokens: Typography
| Font | Weights | Letter Spacing | Styling Role | Google Font | Free Substitute |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Playfair Display` | Bold (700) | `tracking-tight` | Luxury headings, display titles, card headers | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | Georgia |
| `Inter` | Light (300), Medium (500) | `tracking-widest` | Navigation links, monospace accents, body paragraphs, CTAs | [Inter](https://fonts.google.com/specimen/Inter) | Arial / Helvetica |

### Type Scale Hierarchy
- **Display Heading**: `text-6xl md:text-9xl` (Playfair Display)
- **Section Heading**: `text-4xl md:text-5xl` (Playfair Display)
- **Card/Modal Heading**: `text-2xl md:text-3xl` (Playfair Display)
- **Body Copy**: `text-sm md:text-base` (Inter, leading-relaxed)
- **Sublabel Accent**: `text-xs uppercase tracking-[0.3em]` (Inter, uppercase)

---

## 4. Tokens: Spacing and Shapes
- **Button Corners**: `rounded-sm` (2px) — keeps clickable elements sharp and geometric.
- **Card Corners**: `rounded-3xl` (24px) / `rounded-[40px]` (40px) — organic frame boundaries.
- **Input Corners**: `rounded-xl` (12px) — balanced rounded inputs.
- **Borders**: `1px solid rgba(255, 255, 255, 0.03)` (Card boundary) / `rgba(255, 255, 255, 0.06)` (Footer boundary).
- **Elevation Shadow**: `0 45px 80px -20px rgba(0, 0, 0, 0.85)` (Applied to process stacking cards).
- **Text Glow**: `0 0 6px rgba(224, 195, 156, 0.55)` (Applied to hovered text words).

---

## 5. Component Specifications
### Primary Action Button
- **Structure**: `<Button variant="primary">`
- **Styling**: `bg-gold text-background hover:bg-gold-hover rounded-sm font-medium uppercase tracking-widest`
- **Entrance Animation**: 3D slide-up on mount with spring physics on mouse movement.

### Secondary Action Button
- **Structure**: `<Button variant="outline">`
- **Styling**: `bg-transparent text-gold border border-gold hover:bg-gold hover:text-background rounded-sm font-medium uppercase tracking-widest`

### Process Stacking Card
- **Structure**: `.process-card`
- **Styling**: `absolute inset-0 rounded-[40px] border border-white/3 bg-card shadow-2xl`
- **Overlay**: `bg-gradient-to-t from-black/96 via-black/50 to-black/15`
- **Text Alignment**: Bottom-left aligned content (`p-16 md:p-20`).

---

## 6. Do's and Don'ts
*   **DO** use `@supports (-webkit-background-clip: text)` to supply solid fallback colors for mobile WebKit compatibility.
*   **DO** use local React components with `useState` and inline style overrides for word-by-word hover glows to bypass CSS specificity collisions.
*   **DO** use `transform-gpu` on elements during GSAP scrubbing to leverage hardware acceleration.
*   **DON'T** mix raw hexadecimal strings inside components; reference colors via Tailwind color utility tokens (`bg-gold`, `text-background`, etc.).
*   **DON'T** use rounded corners larger than 2px on buttons.
*   **DON'T** scrub animations placed at the absolute scroll limit of the page (like footers); use entry visibility triggers.

---

## 7. Surfaces and Elevation
1.  **Canvas Level (Base)**: `#0A0A0A` (Global page body background)
2.  **Surface Level (Mid)**: `#111111` (Bento layout, sticky scroll columns)
3.  **Elevation Level (Top)**: `#161616` (Interactive stacking cards, FAQs, inputs)
    *   *Shadow Rule*: Only elements at **Elevation Level** are allowed shadows (`shadow-2xl` or custom values).

---

## 8. Agent Quick Reference
```yaml
canvas-bg: "#0A0A0A"
surface-bg: "#111111"
card-bg: "#161616"
primary-accent: "#C8A97E"
hover-accent: "#D4B88F"
primary-text: "#F0EDE8"
secondary-text: "#C8C4BC"
button-radius: "2px"
card-radius: "40px"
```

### Example Component Prompts
1.  **Card Prompt**: `"Create a premium bento card inside a rounded-[40px] bg-card container with a 1px border-neutral/5 border and hover transition scale."`
2.  **Button Prompt**: `"Add a CTA button using Button.tsx with variant primary, size lg, and custom text-background."`

---

## 9. Quick Start Stylesheet
```css
:root {
  --bg-deep: #0A0A0A;
  --bg-surface: #111111;
  --bg-card: #161616;
  --text-primary: #F0EDE8;
  --text-body: #C8C4BC;
  --accent-gold: #C8A97E;
  --accent-gold-hover: #D4B88F;
  --border-subtle: rgba(200, 169, 126, 0.18);
  --border-neutral: rgba(255, 255, 255, 0.06);
}
```
