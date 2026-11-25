# UI Specification

**Status:** Implemented reference
**Reference implementation:** `frontend/`
**Purpose:** Recreate FoodSewa's existing user-visible interface and interactions in another React or Next.js application without changing its product behavior.

This specification captures the current UI observed in the source. When a detail is missing or conflicts with the current app, inspect the original frontend and assets rather than inventing a new design. The existing app contains a few brand/content inconsistencies noted below; preserving them is part of reproducing the current UI unless a separate change is requested.

## 1. Product and visual identity

- Public product name and logo wordmark: **FoodSewa**.
- Logo image: `frontend/public/logo.png`; display the image with the adjacent red `FoodSewa` wordmark.
- Main food hero: `frontend/public/hero-food.jpg`, or `VITE_HERO_IMAGE_URL` when configured. Cover the hero container and use a dark gradient overlay.
- Other checked-in imagery: `frontend/public/about-food.jpg`, `frontend/public/og-image.jpg`; favicon is `frontend/public/favicon.svg`.
- Restaurant banners/logos, menu photos, and review photos are data-provided image URLs (currently Cloudinary URLs); use the same seeded URLs in a comparison environment.
- Dashboard brand is currently rendered as **FoodHub** in the sidebar, unlike the public **FoodSewa** brand. Preserve this existing difference for exact parity.
- Font imports in `frontend/index.html`: Inter weights 400, 500, 600, 700 and Plus Jakarta Sans weights 600, 700, 800. `frontend/src/index.css` defines Inter as the sans stack and Plus Jakarta Sans as the display stack. Most current components use the default sans stack.
- Icons come from `lucide-react`; use matching icon shapes and stroke appearance for corresponding controls.

## 2. Layout and design tokens

The current frontend uses Tailwind CSS v4 utilities. Use these as the reference rather than introducing a new theme:

| Property | Current reference |
| --- | --- |
| Main page background | White; dashboard canvas uses `gray-50` |
| Primary text | `gray-900`; secondary text typically `gray-500` |
| Borders | `gray-100` for cards/dividers; `gray-200` for inputs |
| Brand/action accent | Orange (`orange-500` links/actions, `orange-600` strong/selected text, `orange-50` selected backgrounds) |
| Primary action gradient | `red-600` to `orange-500` |
| Decorative/identity gradient | Commonly `yellow-400` to `orange-500` |
| Common color values | `gray-900` `#111827`, `gray-500` `#6b7280`, `gray-100` `#f3f4f6`, `orange-50` `#fff7ed`, `orange-500` `#f97316`, `orange-600` `#ea580c`, `red-600` `#dc2626`, `yellow-400` `#facc15` |
| Marketing section colors | CTA red `#FF3008` (hover `#E02B07`); partner-section background `#FFF5F3` |
| Error/success surfaces | `red-50`/`red-600` and `green-50`/`green-500` |
| Buttons | Pill-shaped; small/medium/large padding variants |
| Inputs | Full width, white, `rounded-xl`, subtle gray border; orange focus border/ring; red error border/ring |
| Cards | White, thin gray border, usually `rounded-2xl`; light shadow only where shown |
| Common content widths | `max-w-7xl` public content; route-specific narrower widths below |
| Page gutters | `px-4 sm:px-6 lg:px-8` where used |

Use Tailwind's standard responsive breakpoints: `sm` 640px, `md` 768px, and `lg` 1024px. Important visibility rules:

- Public header desktop navigation starts at `md`; its search input starts at `lg`.
- Public mobile navigation is shown below `md`; sign-in actions are hidden below `sm` in the desktop header and appear in the mobile menu.
- Login decorative split panel starts at `lg`.
- Dashboard sidebar starts at `lg`; below that, use the dashboard header's menu toggle and mobile link panel.
- Multi-column cards/forms collapse to one column until their specified `sm`/`lg` breakpoints.

## 3. Shared application shells

### Public shell

- White full-height flex column; sticky white header at the top (`h-16`, border bottom, subtle shadow, `z-40`).
- Header order: FoodSewa logo, route links, desktop search, cart icon with quantity badge, auth buttons or user dropdown, mobile menu toggle.
- Public links: Home, Restaurants, and authenticated My Orders (source of truth: `frontend/src/components/layout/navLinks.js`). Staff open Dashboard from the user dropdown; it is not a desktop/mobile public-nav link.
- Search submits to `/restaurants?search=<encoded query>`; header search is hidden on small/tablet widths.
- Mobile menu uses stacked links and, when signed out, full-width Login and Sign Up buttons.
- Main route content takes the remaining height; footer follows with brand/description, Explore, For Business, and Support columns, then copyright.
- Footer link groups: Explore (Restaurants, My Orders, Cart), For Business (Become a Partner, Dashboard), Support (Help Center, Contact Us, Privacy Policy).
- The footer's Help Center, Contact Us, and Privacy Policy links currently use `#`; do not invent pages while reproducing this version.

### Auth shell

- `/auth` and `/auth/register` render without the public header/footer.
- Login: full viewport, two equal columns at `lg`. Form panel is centered with a `max-w-md` content column. Right panel is hidden below `lg`; above it, use a pale yellow/orange background, soft decorative glows/dotted grid, four floating food/delivery callouts, FoodSewa mark, and centered delivery headline. Preserve callout copy: “Fast Delivery / ~20 mins”, “Hot Pizza / 4.9 (1.2k)”, “Juicy Burgers / Free Shipping”, and “Live Courier Tracking”; central badge “Express Food Delivery”; heading “Delicious food, delivered fast”; paragraph “Order from your favorite local restaurants and track your delivery live every step of the way.”
- Registration: white page, centered `max-w-2xl`, logo, title/subtitle, two-tab customer/restaurant-owner switcher, then the active form.

### Dashboard shell

- Full viewport, `gray-50` canvas. On desktop, non-shrinking 64-unit (16rem) white sidebar with border and brand/nav/footer; content column has a sticky white 16-unit top header.
- Main padding: `p-4 sm:p-6 lg:p-8`. Sidebar width: `w-64`.
- Sidebar links: Overview, Orders, Menu, Reviews, Restaurant; Owners additionally see Admins. Active link uses orange text and pale orange background. Footer links to public site and logout.
- Below `lg`, sidebar is hidden and the dashboard header offers a menu panel. The current mobile list omits Admins; preserve this behavior unless intentionally changed.
- Header shows Dashboard title at `sm+`, user name/role at `sm+`, and circular initial avatar.

## 4. Route-by-route visual and interaction contract

| Route | Layout and visible composition | Interactions/states |
| --- | --- | --- |
| `/` | Public shell. Home sections in order: Hero, Category Chips, Everything You Crave, Partner CTA, About Us, How It Works, Stats Banner, Featured Restaurants. | Hero search opens filtered restaurant listing. Category chips navigate to `/restaurants?category=<label>`; the current listing does not initialize/apply this query parameter, so preserve that limitation rather than implying category filtering works. Other calls-to-action follow their current links. Featured section shows six cards, skeletons while loading, and a centered no-restaurants message when empty. |
| `/restaurants` | Public shell; `max-w-7xl`, top/bottom padding 10. Title “Discover restaurants”, result-count subtitle, search/Open now filters, then 1/2/3-column cards at base/`sm`/`lg`. Restaurant cards use 4:3 image region, title, rating/review count, optional one-line description, address, and fixed 20–30 minute label. | Search is debounced 400ms; Open now toggles. Loading shows six skeleton cards; errors show centered failure text; empty results show icon/title/description. |
| `/restaurants/:id` | Public shell. Banner at 3:1 ratio, changing to 4:1 from `sm`; overlapping white restaurant info card with logo, name/status, description, rating, location, phone, and 20–30 minute estimate. Below: Menu/category chips, menu cards, then Reviews summary and review cards with pagination. | Category filter is client-side. Menu cards show price, optional description, availability, in-cart count, image/fallback, and add button. Add is disabled for closed restaurant/unavailable item and gives confirmation/toast feedback. If this restaurant has cart items, a fixed bottom-right “View cart” pill opens a right-side cart drawer. Review list has loading placeholders and Previous/Next pagination. |
| `/cart` | Public shell; `max-w-4xl`. Empty cart uses the dedicated centered empty state. Non-empty cart: continue-shopping control, “Your Cart”, item panel beside sticky `top-24` order summary at `lg`. | Quantity changes, remove, clear-cart confirmation, checkout navigation. Summary displays subtotal, Rs. 50 delivery fee when nonempty, 13% VAT, and total. |
| `/checkout` | Authenticated; public shell; `max-w-6xl`. “Checkout” heading, two columns at `lg`: left delivery and payment cards, right sticky order summary and action. | Required delivery address and phone; optional notes. Payment choices: Cash on Delivery, eSewa, Khalti. Summary lists quantities/items and totals. Place Order shows loading/disabled state, success navigates to `/orders/:id/success`, API errors render inline. Empty cart disables submission; checkout also reports empty cart on submit. |
| `/auth` | Auth shell login layout described above. Left form has “Welcome back”, supporting copy, Email or Username and Password fields, full-width Sign In button, and Sign up link. | Required-field messages, server error panel, password visibility control, spinner/loading label, post-login redirect to prior protected page or role-based default. |
| `/auth/register` | Auth shell registration layout described above. Customer form fields: Full Name, Username, Email, Password, Phone Number. Owner form sections: Your Account (same account fields) and Restaurant Details (Restaurant Name, About, Address, Restaurant Phone). | Tabs switch forms. Required/email/password errors and server errors are inline; password minimum is six characters. Submit has loading state and routes to home (customer) or dashboard (owner). |
| `/profile` | Authenticated public shell; `max-w-4xl`, title/description, profile header, then account details and password change panels in two columns at `lg`. | Edit profile and change password separately; show field/server errors, loading, and success notifications. |
| `/orders` | Authenticated public shell; `max-w-3xl`; “My Orders”, subtitle, status filter, order list. | Loading skeletons, empty state, status-specific cards and route to order detail. |
| `/orders/:id` | Authenticated public shell; `max-w-5xl`; back link, order detail, then review form only after delivery. | Loading skeleton, API error panel, order status/timeline, delivery details, line items/totals; cancellation is offered only for allowed states and uses the current confirmation modal. |
| `/orders/:id/success` | Authenticated public shell; centered `max-w-md` success panel with green check, “Order placed!”, confirmation copy, order number when loaded, Track order and Order more actions. | Track order links to detail; Order more links to restaurant discovery. |
| `/dashboard` | Dashboard shell; `max-w-7xl`; Overview heading/copy, four stat cards, Recent Orders card with View all, up to five recent order rows. | Stats and orders have skeletons; empty recent-orders message; rows link to focused order queue. |
| `/dashboard/orders` | Dashboard shell; `max-w-5xl`; Orders heading, 15-second refresh description, status filter, live queue. | Status filtering, order details/status controls, empty/loading states, and cancellation modal where applicable. |
| `/dashboard/menu` | Dashboard shell; `max-w-5xl`; Menu heading/copy and menu-item table. | Create/edit form modal, availability toggle, delete confirmation, load/error/empty states. |
| `/dashboard/restaurant` | Dashboard shell; `max-w-5xl`; Restaurant heading, public-page link, profile form (two-thirds at `lg`) and active toggle/info card sidebar. | Loading skeleton, missing-association state, API error state, edit/save feedback; activity toggle is separate from profile save. |
| `/dashboard/reviews` | Dashboard shell; `max-w-5xl`; Reviews heading/copy, optional rating summary strip, review cards with customer/date/rating/comment/images/reply, pagination. | Loading skeletons, empty state, and owner/scoped-admin reply as authorized. The current dashboard page does not display a review hide/moderation control. |
| `/dashboard/admins` | Dashboard shell; `max-w-5xl`; Admins heading/copy and admin table. | Owner-only UI; invite-admin modal, remove action, loading/error/empty states. Non-owner is redirected to dashboard. |
| Unknown route | Public shell with the custom Not Found screen. | Search form, return-to-home/navigation action; preserve the current illustration, message, and responsive layout from `NotFoundPage.jsx`. |

### Home-section content and order

- **Hero:** Full-bleed image and black gradient; headline “Your favorite dishes from hundreds of local spots, delivered in minutes.” Search placeholder “Search restaurants or dishes...” and “Find food” CTA. Minimum height 600px and 680px at `lg`.
- **Category Chips:** Heading “What are you craving?”, subtitle “Pick a category to explore.”, “View all →” link. Eight image cards in order: Pizza, Burgers, Rice, Curry, Sides, Desserts, Beverages, Salads. Each links to `/restaurants?category=<capitalized-label>`, though the listing currently ignores the category query parameter.
- **Everything You Crave:** Heading “Everything you crave, delivered.”, subheading “Your favorite local restaurants”, body “Get a slice of pizza or the whole pie delivered, or pick up house lo mein from the Chinese takeout spot you've been meaning to try.” CTA “Find restaurants”.
- **Partner CTA:** Heading “Grow your business with us”, body “Businesses large and small partner with us to reach new customers, increase order volume, and drive more sales.” CTA “Become a Partner”.
- **About Us:** Badge “About FoodSewa”, heading “Bringing Nepal's best food to your door.” Paragraphs: “FoodSewa started with a simple idea: the food you love — the momo shop around the corner, the pizzeria your family has ordered from for years, the new café that just opened down the street — should be one tap away.”; “We're a local team building a platform that puts neighborhood restaurants and home chefs first. No middlemen, no hidden fees, no compromises on the food you've grown up loving.” Closing line: “Because great food deserves to travel fast.”
- **How It Works:** Heading “How FoodSewa works”; subtitle “Order from local favorites, track every step, and enjoy fresh food at your door.” Three numbered cards:
  - “Order in minutes” — “Browse hundreds of local restaurants and order your favorite dishes with a few taps. Pay with cash, eSewa, or Khalti.” CTA “Start ordering” to `/restaurants`.
  - “Become a partner” — “List your restaurant on FoodSewa and reach thousands of hungry customers. Set up your menu in minutes — no setup fees.” CTA “Register your restaurant” to `/auth/register`.
  - “Track your order” — “Watch your food being prepared and follow it every step of the way — from the kitchen to your door, in real time.” CTA “View your orders” to `/orders`.
- **Stats Banner:** “Our Impact”, headline “Good food. Great moments. Delivered.”, plus 500+ Partner Restaurants, 10K+ Happy Customers, 50K+ Orders Delivered, and 4.9/5 Average App Rating. Include food photo caption “Your cravings, delivered.” / “Fresh meals from restaurants you love.” and floating “4.9 out of 5 / Loved by our customers” card.
- **Featured Restaurants:** Heading “Featured restaurants”, subtitle “Top-rated places near you right now.”, link “See all”; six highest-rated restaurants from the first fetched page; grid, skeleton, or empty-state message “No restaurants available yet. Check back soon!”

Preserve the exact text, image URLs, and alt text from the source component when implementing a different framework. Do not replace current marketing content with generic copy.

## 5. Component behavior and visual states

- **Buttons:** `primary`, `secondary`, `ghost`, `danger`; sizes `sm`, `md`, `lg`. Keep current gradients, pill radius, disabled opacity/cursor, and link/button semantics.
- **Inputs:** shared `Input` uses full width, `rounded-xl`, gray border, orange focus ring, red error styling. Form fields show label, optional hint, required indicator, and inline error using current components.
- **Cards:** usually white with a `gray-100` border and `rounded-2xl`; keep section-specific padding and hover state rather than applying a new global card style.
- **Modals:** centered white panel, rounded `2xl`, size variants `sm`/`md`/`lg`/`xl`; click backdrop or Escape to close; lock body scroll while open.
- **Cart drawer:** full-width on narrow screens, 24rem wide from `sm`, slides in from right; dimmed backdrop; lock body scroll.
- **Toasts:** top-right, rich color, close button, up to four visible, 3.5-second duration, 10px gap.
- **Loading:** preserve each screen's current skeleton layout and count. Do not replace it with a blocking full-page spinner.
- **Empty/error:** keep the existing icon, exact message/call-to-action, and location in the page; errors must remain distinguishable from empty results.
- **Responsive overflow:** tables, filter bars, card rows, dialogs, nav menus, and dashboard layout must remain usable at mobile widths; match the current wrapping/stacking behavior.

## 6. Asset and data requirements for faithful reproduction

1. Copy the checked-in assets listed in section 1 to equivalent public paths in the new app; do not use placeholder or newly generated images.
2. Keep the following remote image sources from the current home components, or copy the actual source images without changing their appearance:

   | Use | Current image source |
   | --- | --- |
   | Category: Pizza | `https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80` |
   | Category: Burgers | `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80` |
   | Category: Rice | `https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80` |
   | Category: Curry | `https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80` |
   | Category: Sides | `https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80` |
   | Category: Desserts | `https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80` |
   | Category: Beverages | `https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=300&q=80` |
   | Category: Salads | `https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80` |
   | Everything You Crave | `https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80` |
   | Partner CTA | `https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80` |
   | About Us | `https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80` |
   | How it works: order | `https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80` |
   | How it works: partner | `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80` |
   | How it works: tracking | `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80` |
   | Stats photo | `https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85` |

3. Provide the same logo, hero image, icon library, font files/network font loading, and restaurant/menu/review image URLs.
4. Use deterministic fixture data that matches one another across reference and replica: restaurant order/rating/availability, menu names/prices/images/categories, cart contents, order state/history, review content, user name/role, and admin list.
5. Freeze dates, relative-time labels, currency formatting, random IDs, loading delays, API response order, and viewport for screenshot comparison.
6. Keep region-specific presentation consistent: Nepali rupee prefix `Rs.`, 13% VAT, Rs. 50 delivery fee, `en-US` review dates where currently used.

If these assets or data cannot be obtained, record the missing dependency; do not mark screenshot parity complete.

## 7. Detailed form and status presentation

- **Menu editor:** modal title “Add Menu Item” or “Edit Menu Item”; fields Item Name, Price (Rs.), Category (suggestions Pizza, Burgers, Rice, Curry, Sides, Desserts, Beverages, Salads, Other), Image, optional Description, and availability. Image uploader uses a square preview. Price accepts decimals and must be at least zero.
- **Restaurant profile editor:** Restaurant Banner with “Wide image — recommended 1200×400 px.” hint, Logo, Restaurant Name, About, Address, Phone Number, selectable Cash on Delivery/eSewa/Khalti pills, save action, and success/error feedback. The active toggle is a separate dashboard card/action.
- **Checkout payment choices:** each is a full-width selectable card with icon, label, description (“Pay when your food arrives”, “Pay with your eSewa wallet”, or “Pay with your Khalti wallet”), orange border/ring when selected, and radio-like indicator.
- **Review form:** overall required star rating; optional Food, Delivery, and Service star ratings; Your review textarea with 1000-character count; optional photo uploader allowing up to five JPG/PNG/WEBP images; full-width Submit Review. After success, show green thank-you panel and delete-own-review flow. The customer-facing review card can delete only the current user's review.
- **Dashboard review reply:** show “Your response” with text/time when a reply exists; otherwise a two-row reply field and “Post reply” button.
- **Order cancellation:** modal title “Cancel order”; warning that cancellation cannot be undone and may be unavailable after preparation starts; reasons Ordered by mistake, Changed my mind, Taking too long, Found a better option, Wrong items in cart, Other. Other reveals a 200-character textarea. Actions “Keep order” and “Cancel order”. Customer detail offers cancel only for placed/confirmed.
- **Order status badges:** Placed (blue), Confirmed (indigo), Preparing (yellow), Ready (orange), Out for delivery (purple), Delivered (green), Cancelled (gray), Rejected (red), all as small bordered pills.
- **Order timeline:** Placed → Confirmed → Preparing → Ready → On the way → Delivered. Completed/current steps use orange circles; current step has a pale orange ring and any matching event shows its localized time. Cancelled/rejected instead show a red explanatory panel.
- **Dashboard summary cards:** Today's Orders, Today's Revenue, Pending Orders, Average Rating; use orange, green, yellow, and blue icon accents respectively.

## 8. Unknown route and other interaction details

The 404 page is not a generic error page. It uses a warm animated food illustration, “404 | Empty Plate” badge, heading “Oops! This plate is empty.”, explanatory copy, search field (“Search dishes or restaurants...”), quick links Pizza/Burgers/Asian/Desserts, Back to Home or Back to Dashboard, Explore Restaurants, Go back to previous page, and a “Bored? Catch snacks!” mini-game toggle with score. Preserve the game and interactions for exact parity.

- Password visibility buttons use Eye/EyeOff icons and accessible labels Show password/Hide password.
- Cart quantity badge caps at `99+`.
- Restaurant card and restaurant-detail no-image placeholders, menu/cart fallback images, and image aspect ratios must match the source components.
- Order/review dates and times use the existing browser locale formatting; use the same locale and timezone during visual comparison.

## 9. Intentionally documented current limitations

- The UI displays estimates/marketing labels such as 20–30 minute delivery, home-page sample statistics, “live courier tracking” on the login artwork, and Open now. These are not evidence of actual courier tracking, calculated ETA, or live availability schedules.
- Public footer support links are placeholders (`#`).
- The UI offers eSewa and Khalti choices; see [orders-and-payments.md](features/orders-and-payments.md) for the online-payment limitation.
- Do not silently improve or reinterpret these behaviors while recreating the current version. Add a separate requested spec for a behavior change.

## 10. Source mapping

The UI reference is primarily `frontend/src/App.jsx`, `frontend/src/index.css`, `frontend/index.html`, `frontend/src/pages/`, and `frontend/src/components/`. The source paths named throughout this spec are the detailed reference for exact copy, spacing, icons, transitions, validation messages, and page states.
