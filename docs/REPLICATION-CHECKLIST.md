# Cross-Project Replication and Parity Checklist

Use this checklist when implementing FoodSewa in a new repository, a different React setup, or Next.js. The framework may change; the user's observable product must not. Read [UI-SPEC.md](UI-SPEC.md), the relevant feature specs, [ARCHITECTURE.md](ARCHITECTURE.md), [USERMODEL.md](USERMODEL.md), and [SECURITY.md](SECURITY.md) before implementation.

## A. Scope and source-of-truth

- [ ] Record the target framework/router and whether the existing backend API is reused or reimplemented.
- [ ] Treat current feature specs as implemented behavior. Do not remove routes, fields, states, permissions, or flows as a framework simplification.
- [ ] Check the original frontend source for UI details absent from the docs; do not invent substitute copy or interaction.
- [ ] List any deliberate differences requested by the user in a separate section before implementation. Do not classify unrequested differences as parity.
- [ ] Keep proposed backlog items unimplemented unless explicitly selected.
- [ ] Make target-framework adaptations only at the architecture boundary. Keep route URLs, labels, form behavior, model rules, API semantics, and security constraints stable.

## B. Route and feature coverage

- [ ] Implement every route in [UI-SPEC.md](UI-SPEC.md), including unknown-route handling.
- [ ] Implement all public, customer, authentication/profile, and restaurant dashboard workflows in `docs/features/`.
- [ ] Match role-gated navigation and server-side authorization; verify owner/admin/customer separately.
- [ ] Match loading, empty, failure, disabled, confirmation, success, and unauthorized states—not only the happy-path page.
- [ ] Match persistence/lifecycle behavior for auth, cart, menu availability, order transitions/cancellation, payment status, reviews, and admin scope.
- [ ] Ensure no placeholder screen replaces a feature that exists in the reference implementation.

## C. Visual and interaction parity

- [ ] Match the typography, layout widths, colors, borders, radii, shadows, gradients, icon set, assets, and exact visible copy in [UI-SPEC.md](UI-SPEC.md).
- [ ] Verify desktop public navigation, mobile public navigation, desktop dashboard sidebar, and mobile dashboard menu.
- [ ] Verify forms, dropdowns, modals, drawer, filters, pagination, status actions, and links by mouse, keyboard, and touch.
- [ ] Verify image crop/fallbacks, text truncation/wrapping, sticky elements, overlays, scroll locking, and responsive collapse.
- [ ] Confirm the current FoodHub dashboard sidebar mark and other documented current quirks are preserved unless the requested spec explicitly changes them.

## D. Security parity (required even for UI-only rewrites)

- [ ] Route guards are UX only; private data and every mutation are enforced by the server.
- [ ] Public registration cannot set privileged roles or restaurant scope.
- [ ] Passwords remain hashed; API responses never include password hashes; password changes verify the current password.
- [ ] Restaurant/menu/order/review/admin actions enforce authenticated ownership and restaurant scope server-side.
- [ ] Order ownership is derived from the session; prices, availability, totals, payment status, and workflow transitions are not trusted from a browser claim.
- [ ] Online payment is not marked paid without server-side provider verification.
- [ ] Follow the explicit findings and hardening requirements in [SECURITY.md](SECURITY.md); do not copy unsafe implementation details merely to duplicate its appearance.
- [ ] Test both permitted and denied access for each affected role and resource.

## E. Functional verification

Use a stable backend or representative test fixtures; avoid treating a page render as feature completion.

- [ ] Customer: browse/search/filter restaurant, browse categories/menu, add/update/remove cart items, enforce one-restaurant cart, checkout, view/cancel eligible orders, review delivered order, update profile/password.
- [ ] Restaurant owner: register restaurant, update public restaurant details/availability, manage menu, process order transitions, read/reply/moderate reviews, invite/remove scoped admins.
- [ ] Scoped admin: confirm only permitted actions for the linked restaurant and inability to manage admins or cross restaurant boundaries.
- [ ] API failure: exercise invalid input, missing/expired authentication, forbidden scope, not-found resource, unavailable restaurant/item, and server error UX.
- [ ] Confirm backend-driven data state appears consistently in the frontend after mutations and refresh/navigation.

## F. Visual comparison procedure

1. Run reference and replica with the same browser engine, device scale factor 1, fonts, assets, fixture data, locale, and timezone.
2. Capture screenshots at **1440x900**, **1024x768**, and **390x844** for every route that has meaningful content. Capture mobile menu/drawer/modal states separately.
3. Use the same user role and deterministic fixture records. Stub or freeze variable network timing, dates, order numbers, animations, and live refresh.
4. Compare corresponding screenshots side by side and with an image-diff tool. Review the entire page, not only the first viewport; capture full-page screenshots where appropriate.
5. Require no visible layout/content/interaction differences. Investigate every diff beyond unavoidable browser antialiasing; mask only truly dynamic text and never mask layout or component regions.
6. Record browser/version, routes, fixture identifiers, screenshot location, visual findings, and unresolved differences in the PR/task report.

## G. Completion criteria

- [ ] All feature acceptance criteria pass against the documented behavior.
- [ ] All required security checks pass, including negative authorization cases.
- [ ] Every listed route and responsive state has been exercised.
- [ ] Visual comparison is complete at the specified viewports, or blockers are explicitly reported.
- [ ] Applicable lint/build/tests pass in the target app.
- [ ] Changed docs match the verified target behavior; open differences are listed rather than called complete.

## Important limitation

Markdown alone cannot guarantee pixel-identical output. Exact comparison requires the reference app, matching assets/fonts/data, the same browser/rendering conditions, and captured reference screenshots. If those are missing, implementation can follow this specification but must be described as **spec-aligned, parity not fully verified**, not “exactly the same.”
