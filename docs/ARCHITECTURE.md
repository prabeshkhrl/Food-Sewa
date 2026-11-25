# Architecture

## System overview

Food Sewa is a single repository with two independently installed JavaScript applications:

- **Frontend:** React 19, React Router, Vite, Tailwind CSS, Zustand, TanStack Query, and Axios.
- **Backend:** Node.js ES modules, Express 5, Mongoose, and MongoDB.
- **Image storage:** Cloudinary. The browser uploads images using configured Cloudinary upload settings; the server has Cloudinary credentials for image deletion.

The frontend communicates with the backend JSON REST API under `/api`. MongoDB is the persistent application store. The cart and auth store are persisted in browser storage by Zustand.

## Request and state flow

1. `frontend/src/main.jsx` mounts the router, TanStack Query provider, global toast handling, and application.
2. `frontend/src/App.jsx` defines public, authenticated, and dashboard routes.
3. Page components compose feature components and hooks.
4. Hooks in `frontend/src/hooks/` use the shared Axios client at `frontend/src/lib/api.js`. Queries use TanStack Query; mutations invalidate related query keys.
5. The Axios request interceptor attaches the persisted bearer token. Its response interceptor clears auth and navigates to login for most `401` responses.
6. `backend/app.js` configures JSON/form parsing, CORS, MongoDB, and mounts the API routers.
7. Routers call controllers. Controllers apply domain rules and read/write Mongoose models. Authentication and ownership middleware enforce identity and restaurant scope.

## Backend source map

| Path | Responsibility |
| --- | --- |
| `backend/app.js` | Express setup, CORS, database connection, route mounting, server startup |
| `backend/src/routes/` | HTTP paths and middleware chains |
| `backend/src/controllers/` | Request validation, domain behavior, and JSON responses |
| `backend/src/models/` | Mongoose schemas, indexes, and model hooks |
| `backend/src/middleware/authMiddleware.js` | JWT authentication and role checks |
| `backend/src/middleware/ownershipMiddleware.js` | Restaurant/menu ownership and scoped-admin checks |
| `backend/src/utils/jwt.js` | JWT sign/verify helpers |
| `backend/src/lib/cloudinary.js` | Cloudinary image deletion helpers |

Mounted route prefixes: `/api/auth`, `/api/users`, `/api/admins`, `/api/restaurants`, `/api/menu-items`, `/api/orders`, and `/api/reviews`.

## Frontend source map

| Path | Responsibility |
| --- | --- |
| `frontend/src/App.jsx` | Route composition and page access guards |
| `frontend/src/pages/` | Route-level screens for home, auth, customer, profile, and dashboard |
| `frontend/src/components/` | Feature and shared UI components |
| `frontend/src/hooks/` | Query and mutation hooks for API-backed features |
| `frontend/src/lib/api.js` | Axios base URL, bearer token, and unauthorized handling |
| `frontend/src/store/useAuthStore.js` | Persisted authenticated user and token |
| `frontend/src/store/useCartStore.js` | Persisted, single-restaurant shopping cart |
| `frontend/src/main.jsx` | Router, query client, global error toasts, application bootstrap |

## Domain relationships

- A `User` may be a customer, restaurant owner, or restaurant-scoped admin. Owners/admins are associated with a restaurant through `restaurantId`.
- A `Restaurant` references its owner using `ownerId`.
- A `MenuItem` belongs to one restaurant through `restaurantId`.
- An `Order` belongs to one customer and one restaurant. Its item rows snapshot menu item name, price, image, and quantity at purchase time.
- A `Review` is linked to one order, customer, and restaurant. An order can have at most one review.

See [USERMODEL.md](USERMODEL.md) and the feature specs for field and behavior details.

## Configuration and local development

Install dependencies separately in `backend/` and `frontend/`. The package scripts are:

- Backend: `npm run dev`, `npm start`. The backend package currently has no configured test suite.
- Frontend: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.

Relevant environment variable names:

| Application | Variables |
| --- | --- |
| Backend | `PORT`, `CLIENT_URL`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` |
| Frontend | `VITE_API_URL`, `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET` |

Use local environment files for values. Never commit credentials. Frontend variables are bundled into browser code and must not contain secrets.

## Design constraints

- Keep role and ownership enforcement on the backend; route guards in the browser are for navigation/UX, not authorization.
- Preserve the one-restaurant-per-order invariant. The backend reloads menu item prices and availability when creating orders.
- Keep feature API calls in the existing hooks/client patterns and reuse established cache invalidation and error toast behavior.
- Existing backend order creation uses MongoDB transactions. The MongoDB deployment must support transactions for this flow.
- Current deployment/configuration conventions may change; verify repository configuration before assuming a hosting provider or URL.
