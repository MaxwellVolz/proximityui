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

### Development
- Added CLAUDE.md development guide
- Updated mock server with CORS support
- Mock server now supports GET /alert endpoint for alert component examples
