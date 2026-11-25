# Food Sewa Documentation

This documentation is the human-editable specification for the frontend and backend. Keep feature intent and acceptance criteria here so future changes are small, reviewable, and do not duplicate completed work.

## Index

| Document | Purpose |
| --- | --- |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Runtime boundaries, data flow, source layout, and configuration |
| [UI-SPEC.md](UI-SPEC.md) | Framework-independent visual, responsive, route, and interaction specification |
| [REPLICATION-CHECKLIST.md](REPLICATION-CHECKLIST.md) | Cross-project functional, security, and visual parity validation |
| [BACKLOG.md](BACKLOG.md) | Proposed and selected work, with status and acceptance criteria |
| [SECURITY.md](SECURITY.md) | Existing controls, security requirements, and observed hardening needs |
| [USERMODEL.md](USERMODEL.md) | User fields, roles, and restaurant relationships |
| [features/authentication.md](features/authentication.md) | Registration, login, profile, and access |
| [features/restaurants-and-menu.md](features/restaurants-and-menu.md) | Restaurant discovery, details, and menu management |
| [features/orders-and-payments.md](features/orders-and-payments.md) | Cart, checkout, order lifecycle, and payment status |
| [features/reviews.md](features/reviews.md) | Verified-order reviews, replies, and moderation |
| [features/restaurant-dashboard.md](features/restaurant-dashboard.md) | Restaurant operations and scoped admin tools |

## Status vocabulary

- **Implemented** — supported by the current application code; preserve unless a new request changes it.
- **Backlog** — a candidate idea, not approved for implementation. Backlog cards live in the first Kanban column.
- **Ready** — explicitly selected and sufficiently specified work; move the card to the Ready column.
- **In progress** — currently being implemented.
- **Done** — acceptance criteria are implemented and verified.
- **Blocked** — cannot proceed; the reason and decision needed must be recorded.

The code is authoritative for current behavior. A documentation statement that conflicts with the code should be resolved by checking the relevant source before implementation.

## Recreating this product in another app

Use the feature specs for behavior, [UI-SPEC.md](UI-SPEC.md) for user-visible presentation, [USERMODEL.md](USERMODEL.md) and [SECURITY.md](SECURITY.md) for identity and access rules, and [REPLICATION-CHECKLIST.md](REPLICATION-CHECKLIST.md) to verify parity. The current source code and assets are the final reference for details not captured here. These documents specify the product independently of React Router/Vite; a Next.js or other React implementation may use different internals but must preserve observable behavior.

## Feature-spec structure

Use this structure for new features or substantial behavior changes:

```markdown
# Feature: <name>

Status: Proposed | Ready | In progress | Done | Blocked

## Problem and goal
<User need and expected result>

## Scope
- In scope:
- Out of scope:

## Actors and permissions
<Who can perform each operation>

## Requirements
- [ ] <Observable behavior>

## Data and API
<Relevant models, routes, request/response behavior>

## Acceptance criteria
- [ ] Given <context>, when <action>, then <observable result>.

## Implementation references
<Existing source paths; update after implementation>

## Open decisions
- None, or list decisions blocking implementation.
```

Keep the implemented summary and future requirements distinct. Do not promote an idea to `Ready` without an explicit request.
