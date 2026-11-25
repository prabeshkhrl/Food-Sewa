# Security

This document records security-relevant behavior and requirements for changes. It is not a substitute for a complete security assessment. Treat the backend as the enforcement boundary; frontend route guards and hidden controls do not protect API data.

## Existing controls

- Passwords are hashed with `bcryptjs` during customer, owner, and admin registration.
- The user schema excludes `password` from normal query results.
- JWT bearer tokens are verified by `requireAuth`; roles are checked by `requireRole` and `requireAdmin`.
- Restaurant and menu mutation middleware checks restaurant ownership or an admin scoped to that restaurant.
- Order creation reloads menu items from MongoDB, enforces that all items belong to the requested restaurant, and uses stored prices and availability.
- Review creation requires the authenticated customer to own a delivered order; the schema makes `orderId` unique.
- CORS allows the configured client URL plus local development origins. Keep production origins explicit.

## Observed hardening needs

These are current-code observations and should be prioritized before production-facing changes:

1. `backend/src/utils/jwt.js` falls back to the literal secret `change-me-in-env` when `JWT_SECRET` is absent. Production configuration should be required and validated at startup.
2. `backend/src/routes/UserRoute.js` exposes generic `POST /`, `GET /`, `GET /:id`, `PUT /:id`, and `DELETE /:id` routes without authentication middleware. Define intended access or remove unused routes. The `/me` profile routes are authenticated separately.
3. `backend/src/routes/orderRoutes.js` requires authentication for payment-status updates, but the route does not itself specify a role guard. Review the controller's owner/scoped-admin checks and maintain a strict backend policy when changing this flow.
4. The frontend permits selecting Cash on Delivery, eSewa, or Khalti; the presence of payment-status fields/routes is not evidence that an online provider payment has been verified. See [orders-and-payments.md](features/orders-and-payments.md).
5. The user model allows the role values customer, restaurantOwner, and admin. Public registration must continue to force the intended role; never trust a role supplied by an unauthenticated client.

## Requirements for future changes

- Never place secrets in source control, documentation examples, browser bundles, logs, or error responses.
- Use environment variables for server credentials; validate required production configuration and fail startup explicitly when invalid.
- Authenticate every private API operation and authorize it against the target resource and tenant/restaurant scope on the server.
- Validate identifiers, enums, numeric bounds, and request payloads at API boundaries. Avoid returning password or credential fields.
- Preserve password hashing and compare credentials with the password-hashing library; do not log passwords or tokens.
- For payment operations, verify provider responses server-side; do not treat client input as authoritative payment confirmation.
- Keep errors useful to clients without exposing stack traces, secrets, database internals, or sensitive account existence details.
- Add authorization and validation tests for behavior that changes access to accounts, restaurants, orders, reviews, or payments.

## Change checklist

- [ ] Does the server enforce authorization for every affected endpoint?
- [ ] Is access scoped to the correct user, role, restaurant, and resource?
- [ ] Are client-controlled identity, role, price, status, and payment claims verified or ignored as appropriate?
- [ ] Are secrets absent from tracked files and frontend configuration?
- [ ] Are denied and malformed requests covered by appropriate checks/tests?
