# Feature: Restaurant Reviews

**Status:** Implemented

## Problem and goal

Allow customers to review completed orders and let restaurant staff respond to and moderate reviews within their restaurant scope.

## Actors and permissions

- Public visitors can read visible restaurant reviews.
- An authenticated customer can create a review for their own delivered order and manage their own review.
- The restaurant owner or a scoped admin can reply to reviews and moderate visibility for that restaurant.

## Implemented behavior

- A review references one order, customer, and restaurant; unique `orderId` enforces at most one review per order.
- Reviews have an overall 1-5 rating, optional food/delivery/service ratings, comment, image URLs, edit metadata, owner reply, and moderation fields.
- Creation verifies order ownership and delivered status.
- Public restaurant review listing is paginated, excludes hidden reviews, and can filter by minimum rating.
- Authenticated routes support creating/listing own reviews, editing/deleting, owner reply, and hide/restore.
- Mongoose hooks recalculate restaurant average rating and visible-review count after review saves, updates, and deletes.
- Frontend displays reviews on restaurant detail and provides a dashboard review area.

## Acceptance criteria for changes

- [ ] Only the customer who owns a delivered order can create its review.
- [ ] An order can never receive more than one review.
- [ ] Public results exclude hidden reviews; moderation remains scoped to the corresponding restaurant.
- [ ] Review aggregates reflect visible reviews after create, edit, delete, hide, or restore.
- [ ] Comments and ratings respect schema validation and length/range limits.

## Implementation references

`backend/src/routes/reviewRoutes.js`, `backend/src/controllers/reviewController.js`, `backend/src/models/reviewModel.js`, `frontend/src/hooks/useReviews.js`, `frontend/src/components/review/`, `frontend/src/pages/dashboard/DashboardReviewsPage.jsx`.
