# Changelog

## Unreleased

### Added
- Layout Primitives section with `.container` class (max-width: 72rem, centered, responsive padding)
- Base body styles for proper color inheritance and typography defaults
- Form components (input, textarea, labels, help text, error states, select, radio, checkbox)
- Form component documentation page
- HTMX button example with proper CORS config

### Changed
- Improved form label visibility: increased font size to 1rem and weight to bold
- Enhanced color contrast for WCAG AAA compliance:
  - Light mode muted text: `#6b7280` → `#57606a` (7:1 contrast)
  - Dark mode muted text: `#9ca3af` → `#adbac7` (improved contrast)
  - Dark mode foreground: `#f3f4f6` → `#ffffff` (17:1 contrast)
- Disabled form inputs now use `color: var(--color-muted)` instead of `opacity: 0.6` for better accessibility
- Focus ring on form inputs simplified to prevent container overflow

### Fixed
- Horizontal bleed on form inputs by adding `box-sizing: border-box`
- Focus ring bleeding outside containers by removing offset
- Text visibility issues with proper body color application

### Development
- Added CLAUDE.md development guide
- Updated mock server with CORS support
