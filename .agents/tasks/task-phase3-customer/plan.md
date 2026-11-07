# Implementation Plan — Phase 3: Customer Experience

## Exploration findings

### Existing infrastructure
- `lib/cart-context.tsx` — CartProvider with `addItem`, `removeItem`, `clearCart`, `totalCount`. **Missing**: `updateQty`. Must be added.
- `components/auth/AuthProvider.tsx` — `useAuth()` provides `user` (name, email, initials, joined), `ready`, `signIn`, `signUp`, `signOut`.
- `components/auth/AccountView.tsx` — placeholder with hero + 3 stat cards + 3 quick-link cards. Must be **replaced** with full dashboard shell.
- `app/(site)/layout.tsx` — wraps all (site) pages with `SiteHeader` + `SiteFooter`.
- `app/layout.tsx` — root layout wraps everything in `ToastProvider > AuthProvider > CartProvider`.
- CSS lives in `assets/styles/app.css` (`oi-*` classes). Dashboard classes confirmed: `.oi-dashboard`, `.oi-sidebar`, `.oi-sidebar__link`, `.oi-sidebar__nav`, `.oi-sidebar__profile`, `.oi-metrics`, `.oi-metric`, `.oi-dash-card`, `.oi-table`, `.oi-table-wrap`, `.oi-card-head`, `.oi-badge`, `.oi-account__*`.
- Status badge tones in `Badge.tsx`: `pending`, `shipped`, `delivered`, `green`, `neutral`, `gold`, `red`, `blue`.
- Icon names available: `bag`, `heart`, `receipt`, `user`, `settings`, `grid`, `check`, `star`, `truck`, `shield`, `headset`, `package`, `arrow-right`, `arrow-left`, `plus`, `logout`, `mail`, `lock`, `calendar`, `close`, `chevron-right`, `pin`.

### Illustration assets confirmed present
- `/public/assets/illustrations/empty-cart.svg` ✓
- `/public/assets/illustrations/no-orders.svg` ✓
- `/public/assets/illustrations/payment-success.svg` ✓
- `/public/assets/illustrations/no-products.svg` ✓

### Ambiguities resolved
1. **No `updateQty` on CartContext** — must add it; also wire `AddToCart.tsx` "Save for later" to real wishlist.
2. **No `/cart`, `/checkout`, `/orders`, `/wishlist` routes** — all new.
3. **No `WishlistContext`** — new file `lib/wishlist-context.tsx`.
4. **Reviews stored in localStorage** — no backend; reviews keyed by product slug.
5. **`/account/settings`** — implement as a nested route `app/(site)/account/settings/page.tsx` rather than a query-param tab, for clean URL. `AccountDashboard` renders tab-like sidebar nav; clicking "Settings" navigates to `/account/settings`.
6. **`/account/reviews`** — same pattern: `app/(site)/account/reviews/page.tsx`.
7. **Header cart icon** — `SiteHeader.tsx` has no cart icon today; must add one linking to `/cart` with live count badge.
8. **No new npm packages** — confirmed only `next`, `react`, `react-dom` in `dependencies`.
9. **Build command** — `yarn build` per Phase 2 context.

---

## Deliverable 1 — Customer Dashboard (`/account`, `/account/settings`, `/account/reviews`)

### Files to create / modify

| Action | File | Description |
|--------|------|-------------|
| Replace | `components/auth/AccountView.tsx` | Full AccountDashboard shell: sidebar nav (Overview, Orders, Wishlist, Reviews, Settings), Overview tab content |
| Create | `app/(site)/account/settings/page.tsx` | Settings page (profile form + password change + save toast) |
| Create | `app/(site)/account/reviews/page.tsx` | Reviews list page inside dashboard layout |
| Modify | `app/(site)/account/page.tsx` | Keep thin — still renders AccountView (now AccountDashboard) |

### Implementation detail

**`AccountView.tsx`** becomes `AccountDashboard`:
- Uses `.oi-dashboard` + `.oi-sidebar` layout (same as SellerDashboard pattern).
- Sidebar nav links: `Overview` (→ `/account`), `Orders` (→ `/orders`), `Wishlist` (→ `/wishlist`), `Reviews` (→ `/account/reviews`), `Settings` (→ `/account/settings`).
- Sidebar profile block at bottom with user initials + name from `useAuth()`.
- **Overview tab** (at `/account`): welcome banner (`.oi-dashboard__top` with greeting + avatar), 3 stat cards (`.oi-metrics`): Orders placed, Wishlist items, Reviews written — each reads from localStorage at render time. Below stats: recent orders mini-table (`.oi-table-wrap` + `.oi-table`), last 3 orders from `oilinga_orders`.
- Sign-out button in sidebar profile block via `useAuth().signOut`.
- Auth guard: same redirect pattern as existing `AccountView` — redirect to `/login?next=/account` if !user.

**`app/(site)/account/settings/page.tsx`** renders a client component `AccountSettings`:
- Profile form: name field (pre-filled from user), email (read-only), save button → updates localStorage `oilinga.session`, shows toast "Profile saved".
- Password change form: current password, new password, confirm — validates; on success clears fields + toast "Password updated".

**`app/(site)/account/reviews/page.tsx`** renders `AccountReviews` (from `components/auth/AccountReviews.tsx`):
- Reads `oilinga_reviews` from localStorage.
- Lists reviews with product name, star rating, text, date.
- Empty state: "You haven't written any reviews yet" with link to marketplace.

### New CSS needed
Add to `assets/styles/app.css` under a `/* Phase 3 */` section:
- `.oi-account-dashboard` — shared wrapper ensuring sidebar + content layout reuses `.oi-dashboard`.
- `.oi-account-banner` — welcome banner inside overview with gradient, name, avatar.
- `.oi-stat-mini` — compact stat card variant if `.oi-metric` needs tweaking (prefer reusing `.oi-metric`).
- `.oi-form-group` + `.oi-form-label` + `.oi-form-input` — shared form field layout (used across settings, checkout, review form).
- `.oi-form-section` — visual divider between form groups.

---

## Deliverable 2 — Cart (`/cart`)

### Files to create / modify

| Action | File | Description |
|--------|------|-------------|
| Modify | `lib/cart-context.tsx` | Add `updateQty(slug: string, qty: number)` to CartContextValue |
| Modify | `lib/types.ts` | No change needed; CartItem is already here |
| Create | `app/(site)/cart/page.tsx` | Thin server page, renders `CartView` |
| Create | `components/views/CartView.tsx` | Full cart page UI |
| Modify | `components/layout/SiteHeader.tsx` | Add cart icon button linking to `/cart` with `totalCount` badge |
| Modify | `components/marketplace/AddToCart.tsx` | Wire "Save for later" to WishlistContext (done in D5); also update to use router for checkout button |

### Implementation detail

**`lib/cart-context.tsx`** — add `updateQty`:
```
updateQty: (slug: string, qty: number) => void
```
If `qty <= 0`, calls `removeItem(slug)`. Implementation: `setItems(prev => prev.map(item => item.product.slug === slug ? { ...item, quantity: qty } : item).filter(i => i.quantity > 0))`.

**`CartView`** client component:
- **Empty state**: shows `<img src="/assets/illustrations/empty-cart.svg" />` + heading "Your cart is empty" + ButtonLink to `/marketplace`.
- **Line items**: each row uses `.oi-cart-item` (new class). Shows product art glyph in colour background, product name, seller, unit price, quantity stepper (− qty +), line total, remove button (trash/close icon).
- **Quantity stepper**: calls `updateQty(slug, qty + 1)` / `updateQty(slug, qty - 1)`. Min 1.
- **Order summary** aside: subtotal (sum of `priceValue * qty`), delivery note ("Calculated at checkout"), total, "Proceed to checkout" button → `/checkout`.
- Responsive: at ≤760px, summary stacks below items.

**`SiteHeader.tsx`** — add cart icon:
- Import `useCart`. Add `<Link href="/cart" className="oi-cart-btn">` with `<Icon name="bag" size={18} />` and `{totalCount > 0 && <span className="oi-cart-badge">{totalCount}</span>}`.

### New CSS needed
- `.oi-cart-layout` — 2-column grid (items + summary).
- `.oi-cart-item` — flex row for line item (art thumb, info, stepper, price, remove).
- `.oi-cart-stepper` — qty control (− span + buttons with `.oi-stepper__btn`).
- `.oi-cart-summary` — summary aside card.
- `.oi-cart-empty` — centered empty state.
- `.oi-cart-btn` — header cart button (relative container for badge).
- `.oi-cart-badge` — absolute badge on cart icon.

---

## Deliverable 3 — Checkout (`/checkout`)

### Files to create / modify

| Action | File | Description |
|--------|------|-------------|
| Create | `app/(site)/checkout/page.tsx` | Thin page rendering `CheckoutView` |
| Create | `components/views/CheckoutView.tsx` | 3-step wizard |
| Modify | `lib/types.ts` | Add `CustomerOrder` interface |

### Implementation detail

**`lib/types.ts`** — add:
```ts
export interface CustomerOrder {
  id: string;            // "OL-XXXX"
  date: string;          // ISO
  items: CartItem[];
  subtotal: number;
  delivery: DeliveryInfo;
  payment: PaymentMethod;
  status: "Processing" | "Shipped" | "Delivered";
}

export interface DeliveryInfo {
  name: string;
  phone: string;
  address: string;
  state: string;
  notes: string;
}

export type PaymentMethod = "card" | "bank-transfer" | "pay-on-delivery";
```

**`CheckoutView`** client component — 3-step wizard using local state `step: 1 | 2 | 3`:

- **Step 1 — Delivery**: form with name, phone, address (textarea), state (select with all 36 Nigerian states + FCT), delivery notes. Validates required fields before advancing.
- **Step 2 — Payment**: radio cards for "Pay by Card" / "Bank Transfer" / "Pay on Delivery". Each with icon + label.
- **Step 3 — Review**: read-only summary of delivery + payment + item list with totals. "Place Order" button.
- **Place Order handler**: generates ID `OL-${Math.random().toString(36).slice(2,6).toUpperCase()}`, builds `CustomerOrder`, writes array to `localStorage.setItem('oilinga_orders', JSON.stringify([...existing, newOrder]))`, calls `clearCart()`, calls `router.push(`/orders/${id}`)`.
- Step indicator: `.oi-checkout-steps` with 3 numbered steps showing active/complete state.

### New CSS needed
- `.oi-checkout-layout` — 2-column (form + summary sidebar).
- `.oi-checkout-steps` — horizontal stepper bar.
- `.oi-checkout-step` / `.is-active` / `.is-done` — step pill.
- `.oi-payment-option` — radio card for payment method.
- `.oi-checkout-review` — review summary block.

---

## Deliverable 4 — Orders & Tracking (`/orders`, `/orders/[id]`)

### Files to create / modify

| Action | File | Description |
|--------|------|-------------|
| Create | `app/(site)/orders/page.tsx` | Orders list page |
| Create | `app/(site)/orders/[id]/page.tsx` | Order detail / tracking page |
| Create | `components/views/OrdersView.tsx` | Orders list client component |
| Create | `components/views/OrderDetailView.tsx` | Order detail client component |

### Implementation detail

**`OrdersView`** client component:
- Reads `oilinga_orders` from localStorage on mount (SSR guard + try/catch).
- **Empty state**: `<img src="/assets/illustrations/no-orders.svg" />` + heading "No orders yet" + ButtonLink to `/marketplace`.
- **Orders list**: each row is a card / table row with order ID (link to `/orders/[id]`), date, items summary (first product name + count), total, status badge (tone matching `pending`/`shipped`/`delivered`).

**`OrderDetailView`** client component:
- Reads order by ID from localStorage.
- If not found: "Order not found" with link back to `/orders`.
- **Order header**: order ID, date, total, status badge.
- **Status timeline**: 4-step horizontal/vertical tracker: "Order placed" → "Processing" → "Shipped" → "Delivered". Each step has icon + label + date (show date only if status has reached that step). Active step highlighted in green; future steps muted.
- **Items list**: product name, quantity, unit price, line total.
- **Delivery address**: name, phone, address, state.
- **Need help?** link → `mailto:support@oilinga.com` or `/about`.
- **Write a review** button: shown only for "Delivered" status, links to `/account/reviews?order=[id]` (review form handles the query param).

### New CSS needed
- `.oi-orders-list` — stacked card list.
- `.oi-order-row` — single order list card.
- `.oi-order-timeline` — 4-step tracker.
- `.oi-timeline-step` / `.is-done` / `.is-active` — step state modifiers.
- `.oi-order-detail-grid` — 2-column layout for items + delivery address.

---

## Deliverable 5 — Wishlist (`/wishlist`)

### Files to create / modify

| Action | File | Description |
|--------|------|-------------|
| Create | `lib/wishlist-context.tsx` | WishlistProvider + useWishlist hook |
| Modify | `lib/types.ts` | Add `WishlistItem` interface |
| Create | `app/(site)/wishlist/page.tsx` | Wishlist page |
| Create | `components/views/WishlistView.tsx` | Wishlist client component |
| Modify | `components/marketplace/ProductCard.tsx` | Wire heart button to toggle wishlist |
| Modify | `components/marketplace/AddToCart.tsx` | Wire "Save for later" to useWishlist |
| Modify | `app/layout.tsx` | Wrap with WishlistProvider (inside CartProvider) |

### Implementation detail

**`lib/wishlist-context.tsx`**:
- `WishlistItem { product: Product }` (add to `lib/types.ts`).
- localStorage key `oilinga_wishlist`.
- Context value: `{ items: WishlistItem[], addToWishlist(product), removeFromWishlist(slug), isInWishlist(slug), toggleWishlist(product) }`.
- SSR guard + try/catch in read/write helpers.
- Hydrate on mount via `useEffect`.

**`WishlistView`** client component:
- **Empty state**: `<img src="/assets/illustrations/no-products.svg" />` + "Your wishlist is empty" + link to marketplace.
- **Product grid**: reuses `.oi-product-grid`. Each card shows filled heart remove button in top-right corner. Clicking remove calls `removeFromWishlist(slug)` + toast "Removed from wishlist".
- No auth required — wishlist is anonymous localStorage.

**`ProductCard.tsx`** changes:
- Import `useWishlist` (conditionally — it's a client component already).
- Replace toast-only heart button with real toggle: `toggleWishlist(product)`, show filled/outline heart based on `isInWishlist(product.slug)`, aria-label changes accordingly.
- Show filled heart (use `fill="currentColor"` on Icon, or a new `heart-filled` icon — **decision**: add a CSS class `.is-wishlisted` that sets `fill: currentColor` on the SVG, so we reuse the existing `heart` icon).

**`SiteHeader.tsx`** — update wishlist button:
- Replace toast-only handler with `<Link href="/wishlist">` (if user) or keep toast for unauthenticated (user check from useAuth). Actually: wishlist is anonymous, so always link to `/wishlist`.

### New CSS needed
- `.oi-wishlist-empty` — centered empty state (can reuse `.oi-cart-empty` pattern).
- `.oi-product-card__wish` — heart button overlay on product card (positioned absolute top-right on the art section).
- `.oi-product-card__wish.is-active` — filled heart state (red color).

---

## Deliverable 6 — Reviews (`/account/reviews`, review form, star display)

### Files to create / modify

| Action | File | Description |
|--------|------|-------------|
| Modify | `lib/types.ts` | Add `Review` interface |
| Create | `lib/reviews-context.tsx` | ReviewsProvider + useReviews (or localStorage utils) |
| Create | `components/views/AccountReviews.tsx` | Account reviews list (used in `/account/reviews/page.tsx`) |
| Create | `components/ui/ReviewForm.tsx` | Star-picker + textarea review form (modal or inline) |
| Modify | `components/marketplace/ProductCard.tsx` | Show average star rating from reviews (merged with stored reviews) |
| Modify | `app/(site)/products/[slug]/page.tsx` | Show reviews section below related products; show "Write a review" button |

### Implementation detail

**`lib/types.ts`** — add:
```ts
export interface Review {
  id: string;
  productSlug: string;
  productName: string;
  rating: number;       // 1–5
  text: string;
  date: string;         // ISO
  authorName: string;
}
```

**`lib/reviews-context.tsx`** (or `lib/reviews.ts` utils — **decision**: simple util module, not a context, since reviews only need to be read/written at specific points, not globally subscribed):
- `REVIEWS_KEY = 'oilinga_reviews'`
- `readReviews(): Review[]` — localStorage read with SSR guard + try/catch.
- `writeReview(review: Review): void` — appends to array, writes back.
- `reviewsForProduct(slug: string): Review[]` — filters by productSlug.
- `averageRating(slug: string): number | null` — returns null if no reviews.

**`AccountReviews.tsx`** client component:
- Reads all reviews from localStorage.
- Lists each review: product name (linked to `/products/[slug]`), star display, date, text snippet.
- "Write a review" button opens inline `ReviewForm`.

**`ReviewForm.tsx`** client component:
- Props: `productSlug`, `productName`, `authorName`, `onSubmit?: () => void`.
- Interactive star picker (5 stars, click to set rating).
- Textarea for review text (min 10 chars).
- Submit: validates, calls `writeReview(...)`, calls `onSubmit?.()`, shows toast "Review submitted".
- Used on: `/account/reviews` (Write a review flow) and `/orders/[id]` (via "Write a review" button on delivered orders, pre-filling productSlug from order items).

**Product detail** (`/products/[slug]/page.tsx`) — add reviews section:
- Call `reviewsForProduct(slug)` (client component wrapper needed since it's a server page — **decision**: add a `ProductReviews` client component that reads localStorage and renders reviews + form). This keeps the page server-rendered.
- Shows average rating, review count, list of reviews.
- "Write a review" button inline (opens form if logged in; toast if not).

**`ProductCard.tsx`** — rating enhancement:
- The existing `StarRating` already shows `product.rating` from data. To show localStorage reviews, the card would need to be a client component and read localStorage — that's too expensive for a grid.
- **Decision**: Keep ProductCard showing mock `product.rating`. The product detail page (`/products/[slug]`) will show the merged/averaged review rating. This avoids making every card client-only and spamming localStorage reads.

### New CSS needed
- `.oi-review-form` — form card for review submission.
- `.oi-star-picker` — interactive star row.
- `.oi-star-picker__star` / `.is-active` — filled/outline star state.
- `.oi-review-card` — single review display card.
- `.oi-reviews-section` — section wrapper on product detail page.

---

## Cross-cutting concerns

### `lib/types.ts` — summary of all new types
```ts
WishlistItem, CustomerOrder, DeliveryInfo, PaymentMethod, Review
```

### `app/layout.tsx`
Add `WishlistProvider` wrapping `CartProvider` (or inner — either works since they're independent):
```tsx
<WishlistProvider>
  <CartProvider>
    {children}
  </CartProvider>
</WishlistProvider>
```

### Nigerian states list
36 states + FCT. Define as a `const NIGERIAN_STATES: string[]` in `CheckoutView.tsx` (no separate file needed).

### Order ID generation
```ts
function generateOrderId(): string {
  return `OL-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
```
Collision risk negligible for localStorage demo.

### localStorage key registry
```
oilinga.cart         — CartProvider (existing)
oilinga.session      — AuthProvider (existing)
oilinga.accounts     — AuthProvider (existing)
oilinga_orders       — CustomerOrder[]   (new)
oilinga_wishlist     — WishlistItem[]    (new)
oilinga_reviews      — Review[]          (new)
```

---

## Build order (dependency sequence)

1. **Types** — add all new interfaces to `lib/types.ts`
2. **Cart context** — add `updateQty` to `lib/cart-context.tsx`
3. **Wishlist context** — create `lib/wishlist-context.tsx`
4. **Reviews utils** — create `lib/reviews.ts`
5. **Root layout** — add `WishlistProvider` to `app/layout.tsx`
6. **CSS** — add Phase 3 classes to `assets/styles/app.css`
7. **Customer Dashboard** — replace `AccountView`, create settings + reviews pages
8. **Cart** — create `CartView`, update `SiteHeader`, update `cart-context`
9. **Checkout** — create `CheckoutView`
10. **Orders** — create `OrdersView` + `OrderDetailView`
11. **Wishlist** — create `WishlistView`, wire `ProductCard`
12. **Reviews** — create `ReviewForm`, `AccountReviews`, `ProductReviews`
13. **Wire-up** — update `AddToCart` (save for later), `ProductCard` (heart), `SiteHeader` (cart count)
14. **Build verify** — `yarn build` passes with 0 type errors

---

## Verification
```bash
cd /Users/mac/Desktop/oilinga && yarn build
```
Expected: exit 0, "✓ Generating static pages", no TypeScript errors. Routes that involve client-only reads (`/cart`, `/orders`, `/wishlist`) should render as client components with SSR-safe guards.
