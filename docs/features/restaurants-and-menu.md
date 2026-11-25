# Feature: Restaurant Discovery and Menu

**Status:** Implemented

## Problem and goal

Let customers discover active restaurants and browse their menus. Let an owner or correctly scoped admin manage restaurant details and menu items.

## Actors and permissions

- Public visitors can browse restaurant and menu data.
- Authenticated restaurant owners and admins scoped to the target restaurant can perform permitted management actions.
- Restaurant owners create their restaurant during registration; the API also exposes authenticated restaurant creation for owners.

## Implemented behavior

- Restaurant list/detail and owner lookup are exposed under `/api/restaurants`. Listing supports search, activity, payment-method, pagination, and related filters in the controller.
- Restaurant profile data includes name/about, address/phone, logo/banner URLs, payment methods, active flag, and review aggregates.
- Restaurant owners or scoped admins can update/toggle active state; ownership middleware checks the associated restaurant.
- Public menu endpoints are under `/api/menu-items`; listing supports restaurant/category/availability/price/search filters and pagination.
- Menu items belong to a restaurant and include name, price, category, description, image URL, and availability.
- Owners/scoped admins can create, edit, toggle availability, and delete menu items. Restaurant detail UI displays a browsable, category-filtered menu and allows cart additions.
- Frontend routes: `/restaurants` and `/restaurants/:id`; dashboard management: `/dashboard/restaurant` and `/dashboard/menu`.

## Acceptance criteria for changes

- [ ] Public browsing excludes or clearly identifies inactive restaurants and unavailable menu items according to the agreed UX.
- [ ] Mutations validate input and are authorized against the restaurant on the backend.
- [ ] Menu item IDs cannot be moved across restaurant boundaries by client-supplied values.
- [ ] Customer-facing restaurant/menu behavior remains consistent with cart and order validation.
- [ ] Images remain URLs/references to Cloudinary assets; secrets are never exposed to the browser.

## Implementation references

`backend/src/routes/restaurantRoute.js`, `backend/src/controllers/restaurantController.js`, `backend/src/models/restaurantModel.js`, `backend/src/routes/menuRoute.js`, `backend/src/controllers/menuController.js`, `backend/src/models/menuModel.js`, `backend/src/middleware/ownershipMiddleware.js`, `frontend/src/pages/customer/RestaurantsPage.jsx`, `frontend/src/pages/customer/RestaurantDetailPage.jsx`.

## Open decisions

- Clarify whether a restaurant owner may own multiple restaurants before changing the current account-to-dashboard assumptions.
