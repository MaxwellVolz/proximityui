# Changelog

## Unreleased

### Added
- Layout Primitives section with `.container` class (max-width: 72rem, centered, responsive padding)
- Base body styles for proper color inheritance and typography defaults
- Form components (input, textarea, select, checkbox, radio, labels, help text, error states)
- Form component documentation page with comprehensive examples for all input types
- Alert component with four semantic variants (info, success, warning, danger)
- Alert component documentation page with HTMX example
- Checkbox and radio button styles with custom styling and accessibility support
- HTMX button example with proper CORS config
- Tabs component with underline style (default) and contained variant
- Tabs JavaScript enhancement with keyboard navigation (Arrow keys, Home, End)
- Tabs documentation page with HTMX lazy-loading example
- ARIA-compliant tabs with full accessibility support (aria-selected, aria-controls, tabindex management)
- Toast/notification component with auto-dismiss and manual close
- Toast variants (info, success, warning, error) with semantic colors
- Toast JavaScript API: `ProximityUI.showToast(message, type, duration)`
- Toast data attribute triggers and HTMX support via response headers
- Maximum 5 simultaneous toasts with automatic oldest-first dismissal

### Changed
- Form documentation consolidated: select, checkbox, and radio components now documented in form.html
- Improved form label visibility: increased font size to 1rem and weight to bold
- Enhanced color contrast for WCAG AAA compliance:
  - Light mode muted text: `#6b7280` → `#57606a` (7:1 contrast)
  - Dark mode muted text: `#9ca3af` → `#adbac7` (improved contrast)
  - Dark mode foreground: `#f3f4f6` → `#ffffff` (17:1 contrast)
- Disabled form inputs now use `color: var(--color-muted)` instead of `opacity: 0.6` for better accessibility
- Focus ring on form inputs simplified to prevent container overflow
- HTMX form example now includes select, radio, and checkbox controls

### Fixed
- Horizontal bleed on form inputs by adding `box-sizing: border-box`
- Focus ring bleeding outside containers by removing offset
- Text visibility issues with proper body color application
- Vertical scrollbar on tab-list by adding `overflow-y: hidden`
- Modal endpoint in mock server now returns proper modal HTML instead of card HTML
- Toast close button not dismissing toasts (added type="button", preventDefault, improved pointer-events)
- Toast dismissal using setTimeout instead of unreliable animationend event
- Toast max 5 limit not enforcing properly (immediate removal instead of animated dismissal)
- Toast warning variant text color changed to foreground for better readability
- HTMX toast integration using htmx:afterRequest event instead of htmx:afterSwap
- Toast custom headers exposed via Access-Control-Expose-Headers for CORS compatibility

### Development
- Added CLAUDE.md development guide
- Updated mock server with CORS support
- Mock server now supports GET /alert endpoint for alert component examples
- Mock server now supports GET /tab-content endpoint for tabs lazy-loading examples
- Mock server now supports GET /modal endpoint with proper modal HTML structure
- Mock server now supports GET /toast-trigger endpoint with X-Toast headers for toast examples
