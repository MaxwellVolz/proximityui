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

The mock server runs on port 8001 and provides endpoints for testing HTMX interactions.

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
- Auto-dismiss timers
- Click-outside detection

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
  <link rel="stylesheet" href="../../proximity.css">
</head>
<body>
  <main class="container">
    <h1>Component Name</h1>
    <p>Brief description</p>

    <h2>Basic</h2>
    <!-- Example -->

    <h2>Variants</h2>
    <!-- Variants -->

    <h2>HTMX Example</h2>
    <!-- Optional HTMX integration -->
  </main>
</body>
</html>
```

Each component should document:
- When to use / when not to use
- Accessibility considerations
- HTMX integration patterns (if applicable)

### Adding New Components

1. **Add CSS to proximity.css** under the Components section
2. **Create docs page** at `docs/components/{name}.html`
3. **Link from** `docs/index.html`
4. **Test without JavaScript** first
5. **Add HTMX examples** if relevant
6. **Validate accessibility** (keyboard nav, screen readers, ARIA)

Priority order (from zzz.md roadmap):
- Core: Button, Form controls
- Informational: Alert, Card
- Interactive: Modal, Tabs (high risk - validate carefully)
- Minor: Dropdown, Toast

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
