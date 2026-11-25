# Feature: Cart, Orders, and Payments

**Status:** Implemented (payment-provider integration is not established by the current code)

## Problem and goal

Allow a customer to maintain a cart for one restaurant, submit an order, and follow its status. Enable restaurant staff to process orders and record payment status.

## Actors and permissions

- Customers manage their cart locally, submit orders, view their own orders, and cancel eligible orders.
- A restaurant owner or admin scoped to that restaurant views/processes its orders.
- The backend must enforce customer, owner, and admin authorization for each order operation.

## Implemented behavior

- The persisted Zustand cart (`foodhub-cart`) holds items from one restaurant at a time; switching restaurants asks before clearing it.
- Authenticated checkout sends restaurant ID, item IDs/quantities/instructions, payment method, and delivery details.
- `POST /api/orders` validates restaurant and items, checks availability, recomputes item prices/totals from MongoDB, snapshots item details, and creates the order in a transaction.
- Orders include an order number, totals, payment method/status, delivery contact/address, current status, and status history.
- Customer order routes include `GET /api/orders/my`, `GET /api/orders/:id`, and `PATCH /api/orders/:id/cancel`.
- Restaurant order routes include `GET /api/orders/restaurant/:restaurantId` and `PATCH /api/orders/:id/status`; dashboard queries refresh periodically.
- Status values are `placed`, `confirmed`, `preparing`, `ready`, `out_for_delivery`, `delivered`, `cancelled`, and `rejected`, with transitions enforced by the controller.
- Payment methods in the model/UI are Cash on Delivery, eSewa, and Khalti. Payment status values include `pending`, `paid`, `failed`, and `refunded`.
- Payment status can be changed through `PATCH /api/orders/:id/payment`, subject to controller authorization.
- Frontend routes include `/cart`, `/checkout`, `/orders`, `/orders/:id`, and `/orders/:id/success`.

## Explicit limitation

The current model and UI support eSewa/Khalti as selectable payment methods and store payment status. This documentation does not assert that provider checkout, server-side payment verification, callbacks, refunds, or reconciliation are implemented. Specify and implement those separately if real online payments are required.

## Acceptance criteria for changes

- [ ] An order always belongs to one restaurant, and the customer is derived from the authenticated user.
- [ ] Prices and availability are taken from the server-side menu at order creation.
- [ ] Quantity, payment method, delivery fields, totals, and status transitions are validated server-side.
- [ ] Customers cannot read or change another customer's order.
- [ ] Owners/admins cannot operate on orders for a restaurant outside their authorization scope.
- [ ] Any online payment status is based on trusted provider verification, not a browser assertion.
- [ ] Cancellation, paid/refund state, and status history remain consistent.

## Implementation references

`backend/src/routes/orderRoutes.js`, `backend/src/controllers/orderController.js`, `backend/src/models/orderModel.js`, `frontend/src/store/useCartStore.js`, `frontend/src/pages/customer/CheckoutPage.jsx`, `frontend/src/pages/customer/MyOrdersPage.jsx`, `frontend/src/pages/dashboard/DashboardOrdersPage.jsx`.
