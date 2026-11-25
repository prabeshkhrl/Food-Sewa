# User Model

## Purpose

`backend/src/models/userModel.js` defines the account model used by authentication, profile operations, restaurant ownership, and scoped dashboard access.

## Fields

| Field | Type | Constraints/default | Notes |
| --- | --- | --- | --- |
| `name` | String | Required, trimmed | Display name |
| `username` | String | Required, unique, trimmed | Login identifier |
| `email` | String | Required, unique, lowercase, trimmed | Login/contact identifier |
| `password` | String | Required, `select: false` | Persist a bcrypt hash, never a raw password |
| `phoneNumber` | String | Defaults to `""` | Optional contact detail |
| `role` | String | `customer`, `restaurantOwner`, or `admin`; defaults to `customer` | Controls application privileges |
| `restaurantId` | ObjectId ref `Restaurant` | Defaults to `null` | Restaurant association for owner/admin scope |
| `createdAt`, `updatedAt` | Dates | Mongoose timestamps | Created and maintained by Mongoose |

The schema does not currently declare address, account-disabled, or global-super-admin fields. Do not assume those capabilities exist.

## Roles and relationships

### Customer

- Created through `POST /api/auth/register/customer`.
- Registration forces `role: "customer"` and `restaurantId: null`.
- May place orders and manage their own profile/password.
- May review their own delivered orders.

### Restaurant owner

- Created through `POST /api/auth/register/restaurant`, which also creates a restaurant and links it to the owner.
- Registration forces `role: "restaurantOwner"`.
- Owns a restaurant via the restaurant's `ownerId`; the user's `restaurantId` provides a direct dashboard association.
- May create restaurant-scoped admin accounts and manage resources within the restaurant's authorization policy.

### Restaurant-scoped admin

- Created by an authenticated restaurant owner through `POST /api/auth/register/admin`.
- Assigned the owner's `restaurantId`; this role is not a global administrator in the observed model.
- Authorization middleware compares that ID with the target restaurant before granting scoped operations.

## Authentication rules

- Login accepts email or username and a password; the password field must be explicitly selected for comparison because it is excluded by default.
- Passwords are hashed using bcrypt before persistence. Current registration requires a minimum length of six characters.
- JWT payloads include the user ID and role; protected requests use `Authorization: Bearer <token>`.
- `requireAuth` reloads the account from MongoDB and places it on `req.user`; authorization should rely on the current database user, not solely on role data from an old token.
- Never accept client-provided role or restaurant ownership values for public registration. Preserve server-side assignment.

## Relationship summary

```text
User (restaurantOwner) --owns via Restaurant.ownerId--> Restaurant
User (restaurantOwner/admin) --scoped by User.restaurantId--> Restaurant
User (customer) --places--> Order --contains snapshots of--> MenuItem
User (customer) --writes at most one review for--> delivered Order
```

## Change requirements

- Changing roles or `restaurantId` changes authorization boundaries; update [SECURITY.md](SECURITY.md) and add tests.
- Keep the owner relationship and admin scope consistent when restaurant ownership changes.
- Add schema fields only with a documented purpose, validation/default, migration or compatibility plan, and affected feature-spec updates.
- Ensure user API responses never include the password hash.
