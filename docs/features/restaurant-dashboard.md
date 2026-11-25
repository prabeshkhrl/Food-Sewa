# Feature: Restaurant Dashboard

**Status:** Implemented

## Problem and goal

Give restaurant owners and their scoped admins a protected workspace to monitor restaurant activity and manage orders, menus, restaurant details, reviews, and admin accounts.

## Actors and permissions

- Browser dashboard routes allow `restaurantOwner` and `admin` roles.
- Backend middleware must verify ownership or that an admin's `restaurantId` matches the resource's restaurant.
- Admin-account creation/removal and listing are owner-only in the current API.

## Implemented behavior

- `/dashboard` provides a dashboard landing page and nested orders, menu, restaurant, reviews, and admins views.
- Restaurant orders can be listed with status/pagination filters and auto-refresh in the frontend.
- Owners/scoped admins manage restaurant and menu data subject to backend checks.
- Owners can create, list, and remove admins associated with their restaurant.
- Dashboard data uses TanStack Query hooks and mutation cache invalidation.

## Acceptance criteria for changes

- [ ] Browser role guards are not treated as a substitute for API authorization.
- [ ] Every dashboard API operation is scoped to the authenticated user's restaurant.
- [ ] Admin account management cannot cross restaurant boundaries.
- [ ] Role changes or missing restaurant associations produce an explicit, safe UX.
- [ ] Query caches update after successful mutations without exposing another restaurant's data.

## Implementation references

`frontend/src/pages/dashboard/`, `frontend/src/components/dashboard/`, `frontend/src/hooks/useDashboard*.js`, `frontend/src/hooks/useRestaurantOrders.js`, `frontend/src/hooks/useAdmins.js`, `backend/src/routes/adminRoutes.js`, `backend/src/controllers/adminController.js`, `backend/src/middleware/ownershipMiddleware.js`.
