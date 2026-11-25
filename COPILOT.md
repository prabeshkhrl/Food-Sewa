# Copilot Guide

This repository is a spec-driven food ordering application. Use the documentation below as the working contract before changing code.

## Start here

1. Read [docs/README.md](docs/README.md) for the documentation map.
2. Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for repository boundaries and data flow.
3. Read only the feature spec(s) and model/security references relevant to the requested change.
4. Check [docs/BACKLOG.md](docs/BACKLOG.md) only when asked to select or continue backlog work.

## Working rules

- Keep context and token use small: do not reread unrelated files or every feature document for a focused task. Follow references to the relevant source files and verify only the affected behavior.
- Inspect the current implementation before editing. The code is the record of what is implemented; documentation describes intended behavior and must not be used to assume a feature already exists.
- Do not redo completed work. Preserve working behavior, and implement only the requested change or an explicitly selected `Ready` backlog item. If the requested behavior already exists, report that rather than rebuilding it.
- Treat `Implemented` sections as existing functionality, not a to-do list. Treat `Proposed`/`Planned` items as unapproved until the user selects them.
- Keep changes scoped. Do not silently add unrelated features, alter business rules, or migrate architecture.
- For behavior changes, update the matching feature spec and backlog status as appropriate. Do not mark work complete until code and its acceptance criteria are verified.
- If implementing the product in another repository or with Next.js/React, use [docs/UI-SPEC.md](docs/UI-SPEC.md) and [docs/REPLICATION-CHECKLIST.md](docs/REPLICATION-CHECKLIST.md) as framework-independent requirements. Reproduce the documented routes, visible content, responsive layout, visual states, and interactions; do not redesign or omit features. Keep the original API/security constraints unless the user explicitly requests a documented change.
- A claim of UI parity requires comparing the new app with the running reference using the same viewport, browser, fonts, images, representative data, and user role. If any reference, asset, or test data is unavailable, state that parity is not fully verified; do not claim exact visual equality from Markdown alone.
- Keep secrets out of source, docs, and examples. Record variable names and safe placeholders only.

## Spec-driven workflow

For each requested feature:

1. Identify the relevant feature spec and current implementation.
2. Confirm any ambiguity that changes user-visible behavior, data ownership, or compatibility.
3. Convert the request into observable requirements and acceptance criteria in Markdown before or alongside implementation.
4. Implement the smallest change that satisfies those criteria, following existing patterns.
5. Run the narrowest applicable checks; report any unavailable or failing checks plainly.
6. Update the spec and backlog status so the next task does not repeat completed work.

When a request has no corresponding spec, add one under `docs/features/` using the feature-spec structure in [docs/README.md](docs/README.md), then link it from the documentation index.

## Documentation map

- [docs/README.md](docs/README.md) — index, status conventions, spec template.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — application architecture and repository map.
- [docs/UI-SPEC.md](docs/UI-SPEC.md) — framework-independent UI requirements and responsive behavior.
- [docs/REPLICATION-CHECKLIST.md](docs/REPLICATION-CHECKLIST.md) — cross-project functional, security, and visual parity checks.
- [docs/BACKLOG.md](docs/BACKLOG.md) — proposed work and acceptance criteria.
- [docs/SECURITY.md](docs/SECURITY.md) — security constraints and hardening requirements.
- [docs/USERMODEL.md](docs/USERMODEL.md) — users, roles, and identity relationships.
- [docs/features/](docs/features/) — implemented feature behavior and editable feature specs.
