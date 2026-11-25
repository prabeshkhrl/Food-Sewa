# Feature: Authentication and Profile

**Status:** Implemented

## Problem and goal

Support customer and restaurant-owner onboarding, sign-in, account profile updates, and restaurant-scoped dashboard access.

## Actors and permissions

- Customers and restaurant owners can self-register.
- An authenticated restaurant owner can create admins scoped to their restaurant.
- Authenticated users can update their own profile and password.
- Dashboard browser routes admit `restaurantOwner` and `admin`; backend authorization remains authoritative.

## Implemented behavior

- `POST /api/auth/register/customer` creates a customer account and returns a JWT.
- `POST /api/auth/register/restaurant` creates an owner and restaurant in a MongoDB transaction, links their IDs, and returns a JWT.
- `POST /api/auth/register/admin` requires a restaurant-owner role and associates the admin with the owner's restaurant.
- `POST /api/auth/login` accepts email or username and password.
- `PATCH /api/users/me` updates the authenticated user's profile; `PATCH /api/users/me/password` changes their password.
- Frontend auth state persists user/token under Zustand storage key `foodhub-auth`; the Axios client attaches the bearer token.
- `/auth`, `/auth/register`, guarded profile/checkout/orders, and role-guarded `/dashboard` are wired in `frontend/src/App.jsx`.

## Acceptance criteria for changes

- [ ] Public registration cannot choose a privileged role or arbitrary restaurant scope.
- [ ] Passwords remain hashed, and API responses never return a password or hash.
- [ ] Private profile operations act only on the authenticated account.
- [ ] Dashboard and private API access are denied when authentication/role/scope is insufficient.
- [ ] Expired/invalid sessions are handled consistently by the API client and guards.

## Implementation references

`backend/src/controllers/authController.js`, `backend/src/controllers/userController.js`, `backend/src/middleware/authMiddleware.js`, `backend/src/models/userModel.js`, `frontend/src/store/useAuthStore.js`, `frontend/src/lib/api.js`, `frontend/src/App.jsx`.

## Open decisions

- Whether generic user CRUD routes are still needed; see [BACKLOG.md](../BACKLOG.md).
