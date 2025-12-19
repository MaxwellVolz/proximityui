# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Proximity UI is a CSS-first component system for server-rendered applications. The core philosophy is:
- **Behavior lives close to markup** - semantic HTML drives the system
- **No build step required** - direct CSS/JS files
- **JavaScript is optional** - progressive enhancement only
- **HTMX-friendly** but not dependent on it

## Development Commands

### View Documentation Locally

```bash
python3 -m http.server
# Then open http://localhost:8000/docs
```

### Test HTMX Examples

```bash
# Terminal 1: Main docs server
python3 -m http.server

# Terminal 2: Mock backend for HTMX examples
python3 examples/htmx/server.py
```

The mock server runs on port 8001 and provides endpoints for testing HTMX interactions:
- `GET /alert` - Returns alert component HTML
- `GET /card` - Returns card component HTML
- `GET /modal` - Returns modal component HTML with `open` attribute
- `GET /tab-content` - Returns tab panel content for lazy-loading
- `GET /toast-trigger` - Returns content with X-Toast headers for toast notifications
- `POST /save` - Returns success message for form examples

## Architecture and Design Principles

### Core Files

- **proximity.css** - The main CSS file containing design tokens and component styles
- **proximity.js** - Optional JavaScript enhancements (minimal, no DOM creation or state management)
- **docs/** - HTML documentation and component examples (no build step)

### CSS Architecture

The CSS is structured in this order:
1. **Design Tokens** (CSS custom properties in `:root`)
   - Colors (base, surfaces, actions)
   - Typography (font stacks, sizes, weights)
   - Spacing scale
   - Borders and radius
   - Elevation (shadows)
   - Motion (transitions)
   - Focus ring styles
   - Z-index layers

2. **Dark Mode** - Automatic via `prefers-color-scheme` media query, variable overrides only

3. **Components** - Class-based (`.btn`, `.card`, etc.)

### Component Design Contract

When adding or modifying components:

1. **HTML is the API** - Components are defined by their HTML structure and CSS classes, not JavaScript
2. **Semantic first** - Use proper HTML elements (`<button>`, `<form>`, etc.)
3. **Variants via classes** - `.btn.primary`, `.btn.danger` (not data attributes or inline styles)
4. **States use attributes** - `disabled`, `aria-disabled`, `aria-expanded`
5. **Progressive enhancement** - Component must work without JavaScript
6. **Copy-paste friendly** - Each component example should be self-contained

### JavaScript Constraints

When adding JavaScript enhancements:
- **Keep proximity.js under 5kb gzipped**
- **No DOM creation** - only enhance existing HTML
- **No state ownership** - state lives in HTML attributes
- **No dependencies** - vanilla JavaScript only
- **Feature detection** - graceful degradation required
- **Optional only** - everything must work with JS disabled

Allowed JS features:
- Focus trap for modals
- Escape key handling
- Auto-dismiss timers (toasts, alerts)
- Click-outside detection
- Keyboard navigation for tabs (arrow keys, home/end)
- Dynamic toast creation and dismissal
- ARIA live region announcements

### Hard Constraints (Never Break)

- No build step
- No utility-first CSS frameworks (no Tailwind)
- No JSX or template compilers
- No framework wrappers (React/Vue/Svelte)
- No CLI tools
- No theming engines beyond CSS variables
- No client-side state management

### Documentation Structure

Component documentation pages follow this pattern:
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>ComponentName – Proximity UI</title>
  <meta name="htmx-config" content='{"selfRequestsOnly":false}'>
  <link rel="stylesheet" href="../../proximity.css">
  <script src="../../proximity.js"></script> <!-- Only if JS needed -->
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
<body>
  <main class="container">
    <h1>Component Name</h1>
    <p>Brief description</p>

    <h2>Basic</h2>
    <!-- Simplest example -->

    <h2>Variants</h2>
    <!-- Different visual styles -->

    <h2>HTMX Example</h2>
    <!-- Optional HTMX integration -->

    <h2>HTML Structure</h2>
    <!-- Code example showing markup -->

    <h2>Keyboard Navigation</h2>
    <!-- For interactive components -->

    <h2>Accessibility</h2>
    <!-- ARIA, keyboard, screen reader support -->

    <h2>When to Use</h2>
    <!-- Use cases -->

    <h2>When Not to Use</h2>
    <!-- Anti-patterns -->
  </main>
</body>
</html>
```

Each component should document:
- When to use / when not to use
- Accessibility considerations (ARIA roles, keyboard navigation)
- HTMX integration patterns (if applicable)
- HTML structure with code examples

### Adding New Components

1. **Add CSS to proximity.css** under the Components section
2. **Create docs page** at `docs/components/{name}.html`
3. **Link from** `docs/index.html`
4. **Test without JavaScript** first
5. **Add HTMX examples** if relevant
6. **Validate accessibility** (keyboard nav, screen readers, ARIA)

Component status:
- ✅ Implemented: Button, Form controls, Alert, Card, Modal, Tabs, Toast
- 🔲 Remaining: Dropdown

Implementation notes for tabs:
- Uses anchor links + `:target` pseudo-class for no-JS fallback
- JavaScript enhances with keyboard navigation and ARIA management
- Supports HTMX lazy-loading via `hx-get` on tabs
- Includes underline (default) and contained variants
- All panels except first should have `hidden` attribute initially

Implementation notes for toast:
- Positioned bottom-right, stacks bottom-to-top (column-reverse)
- Maximum 5 simultaneous toasts, oldest auto-dismisses when limit reached
- JavaScript creates container dynamically, removes when empty
- Supports data attributes: `data-toast`, `data-toast-type`, `data-toast-duration`
- Global API: `ProximityUI.showToast(message, type, duration)`
- HTMX integration via response headers: `X-Toast-Message`, `X-Toast-Type`, `X-Toast-Duration`
- Uses `role="status"` and `aria-live="polite"` for screen reader announcements

### Design Token Usage

Always use CSS variables, never hardcode values:
- Colors: `var(--color-primary)`, `var(--color-danger)`, etc.
- Spacing: `var(--space-sm)` through `var(--space-2xl)`
- Typography: `var(--font-sans)`, `var(--font-weight-medium)`
- Motion: `var(--transition-fast)`, `var(--transition-base)`

### Browser Compatibility

Target modern browsers with CSS custom properties support. Use:
- `color-mix()` for hover states
- `:focus-visible` for keyboard focus
- `prefers-color-scheme` for dark mode

### Git Workflow

- Main branch: `master`
- Follow SemVer versioning
- Update CHANGELOG.md for significant changes
