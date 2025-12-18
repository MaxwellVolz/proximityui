# Proximity UI

Proximity UI is a small, CSS-first component system for server-rendered applications.

- Behavior lives close to markup.
- Semantics come first.
- JavaScript is optional.

This project is designed to work with plain HTML and pairs naturally with HTMX, but does not depend on it.

## Goals
- Readable HTML
- No build step
- Copy-paste components
- Progressive enhancement
- Long-term maintainability

## Anti-Goals
- JavaScript frameworks
- Utility-first CSS
- Component compilers
- Client-side state management

## Local Development

Proximity UI requires no build step.

To view the docs locally:

```bash
python3 -m http.server
```

Then open [http://localhost:8000/docs ↗](http://localhost:8000/docs)

### HTMX Examples

A mock server runs on port 8001 and provides endpoints for testing HTMX interactions.

```bash

python3 examples/htmx/server.py
```
