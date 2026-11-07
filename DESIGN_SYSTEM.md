# Oilinga Design System

Phase 2 · Public website: homepage, marketplace, shop directory and storefronts,
product discovery, and authentication.

The design system is a small, token-driven CSS layer plus a typed React component
library. Pages are composed from components, and components consume semantic
tokens. Nothing outside `assets/styles/tokens.css` should hard-code a brand
colour, font, spacing step or shadow.

A live reference of every token and component is available at
[`/design-system`](http://localhost:3000/design-system) while the dev server is
running.

---

## 1. File map

```
assets/styles/
  tokens.css      Design tokens — the single source of truth
  base.css        Reset, base typography, layout + a11y helpers
  components.css  Reusable UI components (oi-* classes)
  layouts.css     Site shell, header, navigation, footer
  app.css         Page compositions (hero, marketplace, dashboard, about)
app/globals.css   Import order for the layers above

components/
  brand/Logo.tsx
  layout/SiteHeader.tsx, SiteFooter.tsx
  auth/AuthProvider.tsx, AuthForm.tsx, AccountView.tsx
  ui/Icon.tsx, Button.tsx, ButtonLink.tsx, Badge.tsx, SearchField.tsx,
    Section.tsx, Toast.tsx, StarRating.tsx, Breadcrumbs.tsx
  marketplace/ProductCard.tsx, CategoryGrid.tsx, ShopCard.tsx, TrustRow.tsx,
    SellerBanner.tsx, RouteSearch.tsx, QuerySelect.tsx, AddToCart.tsx
  views/HomeView.tsx, AboutView.tsx, SellerDashboard.tsx

lib/
  cn.ts                 Tiny className joiner
  data.ts               Mock domain data, discovery helpers and shared types
  search-params.ts      URL query helpers for marketplace and shop filters

app/
  (site)/               Public site shell: header, main, footer
    page.tsx            Homepage
    marketplace/        Marketplace with q, category, price, verified and sort
    shops/              Shop directory + /shops/[slug] storefronts
    products/[slug]/    Product detail pages
    login/, signup/     Authentication
    account/            Protected account view
    seller/, about/     Seller portal preview and About
  design-system/        Living style reference
  not-found.tsx         Custom 404
```

All component classes are prefixed `oi-` and all CSS custom properties are namespaced
so they cannot collide with Tailwind or third-party styles.

---

## 2. Brand palette

The five official colours live as raw tokens and are never used directly by
components. Components use the semantic aliases instead.

| Brand colour  | Token                    | Value     | Semantic use                    |
| ------------- | ------------------------ | --------- | ------------------------------- |
| Deep Green    | `--oilinga-deep-green`   | `#234B36` | Primary actions, brand surfaces |
| Harvest Gold  | `--oilinga-harvest-gold` | `#D99A32` | Accent, focus ring, highlights  |
| Palm Red      | `--oilinga-palm-red`     | `#741F18` | Destructive / sign-up action    |
| Warm Cream    | `--oilinga-warm-cream`   | `#FFF4E7` | Page background                 |
| Charcoal      | `--oilinga-charcoal`     | `#282522` | Body text                       |

Each brand colour also has a full 50–950 scale (for example `--green-700`,
`--gold-200`, `--red-800`) for tints, borders and states.

### Semantic aliases

```css
--color-primary        /* deep green   */
--color-primary-hover
--color-primary-soft
--color-accent         /* harvest gold */
--color-accent-strong
--color-danger         /* palm red     */
--color-bg             /* warm cream   */
--color-surface
--color-surface-raised
--color-text
--color-text-muted
--color-text-subtle
--color-text-inverse
--color-border
--color-border-strong
--color-focus
--color-success / --color-warning / --color-info (+ -soft variants)
```

**Rule:** add new colours as semantic aliases in `tokens.css`, then reference the
alias in component CSS. Do not reference `--oilinga-*` or scale steps directly
from a component.

---

## 3. Typography

| Role          | Family                             | Token                        |
| ------------- | ---------------------------------- | ---------------------------- |
| Display / H1–H6 | Manrope                         | `--font-display`             |
| Body / UI     | DM Sans                            | `--font-sans`                |
| Code / labels | System monospace                   | `--font-mono`                |

Fonts are loaded once in `app/globals.css` via Google Fonts (`DM Sans` 400–700,
`Manrope` 500–800). Size steps run from `--text-2xs` (10px) to `--text-6xl`
(fluid 44–68px), with `--text-5xl`/`--text-6xl` using `clamp()` so display type
scales with the viewport.

Line-height (`--leading-*`), weight (`--weight-*`) and tracking (`--tracking-*`)
tokens are available for one-off compositions.

---

## 4. Spacing, radius, elevation, motion

- **Spacing** — 4px base scale from `--space-1` (4px) to `--space-24` (96px), plus
  `--section-gap` for vertical rhythm between page sections.
- **Radius** — `--radius-xs` → `--radius-2xl`, plus `--radius-pill` and
  `--radius-full`.
- **Elevation** — `--shadow-xs` → `--shadow-xl`, aliased as `--shadow-card`;
  `--focus-ring` is the shared harvest-gold focus treatment.
- **Motion** — `--duration-fast/base/slow` and `--ease-out`/`--ease-in-out`.
  All animations are disabled under `prefers-reduced-motion`.
- **Layout** — `--container-max` (1440px), `--container-gutter` (fluid),
  `--header-height`, `--sidebar-width`.

---

## 5. Components

| Component      | Import                                        | Notes |
| -------------- | --------------------------------------------- | ----- |
| `Button`       | `@/components/ui/Button`                      | `primary`, `gold`, `danger`, `outline`, `ghost`, `glass`; `sm`/`md`/`lg`; `block` |
| `ButtonLink`   | `@/components/ui/ButtonLink`                  | Same variants and sizes, rendered as a Next `Link` |
| `IconButton`   | `@/components/ui/Button`                      | Requires an accessible `label` |
| `Badge`        | `@/components/ui/Badge`                        | `gold`, `green`, `neutral`, `red`, `blue`, `pending`, `shipped`, `delivered` |
| `StarRating`   | `@/components/ui/StarRating`                  | Rating + optional review count with an accessible label |
| `Breadcrumbs`  | `@/components/ui/Breadcrumbs`                 | Home / section / page trail with `aria-current` |
| `SearchField`  | `@/components/ui/SearchField`                 | `sm` (header) and `lg` (marketplace) sizes |
| `RouteSearch`  | `@/components/marketplace/RouteSearch`        | Search form that pushes a URL query and keeps filters |
| `QuerySelect`  | `@/components/marketplace/QuerySelect`        | Sort/filter select that updates the URL query |
| `Section`      | `@/components/ui/Section`                     | Optional eyebrow, title and action |
| `Icon`         | `@/components/ui/Icon`                        | Inline SVG registry; inherits `currentColor` |
| `ToastProvider`/`useToast` | `@/components/ui/Toast`         | Single polite live-region toast |
| `Logo`         | `@/components/brand/Logo`                     | `sm`/`md`/`lg`; `default`/`light` |
| `SiteHeader`   | `@/components/layout/SiteHeader`              | Route-aware nav, search, auth state, keyboard-dismissible mobile menu |
| `SiteFooter`   | `@/components/layout/SiteFooter`              | Dark green brand surface with route links |
| `ProductCard`/`ProductGrid` | `@/components/marketplace/ProductCard` | Linked product tile, rating, add-to-cart toast |
| `ShopCard`/`ShopGrid` | `@/components/marketplace/ShopCard`    | Storefront card with verified badge, location, rating |
| `CategoryGrid` | `@/components/marketplace/CategoryGrid`       | Five category links into the marketplace |
| `TrustRow`     | `@/components/marketplace/TrustRow`           | Four trust signals |
| `SellerBanner` | `@/components/marketplace/SellerBanner`       | Seller call-to-action |
| `AuthProvider`/`useAuth` | `@/components/auth/AuthProvider`     | Demo session state, sign-in/sign-up/sign-out |
| `AuthForm`     | `@/components/auth/AuthForm`                  | Login/sign-up form with validation and demo fill |
| `AccountView`  | `@/components/auth/AccountView`               | Protected account page and sign-out |
| Views          | `@/components/views/*`                        | Composed page sections |

### Example

```tsx
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

<Button variant="gold" size="lg">
    Start shopping <Icon name="arrow-right" size={16} />
</Button>

<Badge tone="delivered">Delivered</Badge>
```

### Class-based usage

Components are thin wrappers over the CSS layer, so the same building blocks can
be used in server components or plain HTML:

```html
<button class="oi-btn oi-btn--primary oi-btn--lg">Start shopping</button>
<div class="oi-card oi-card--pad">…</div>
```

---

## 6. Logo integration

The transparent lockup at `public/assets/brand/oilinga-logo-transparent.png`
(2172×724) is the canonical logo. Use `<Logo />` rather than an `<img>` so sizes
and the light variant stay consistent.

| Size | Width | Use |
| ---- | ----- | --- |
| `sm` | 110px | Seller sidebar, compact surfaces |
| `md` | 144px | Header (default) |
| `lg` | 170px | Feature / design-system showcase |

`variant="light"` applies a white filter for dark surfaces such as the footer and
the design-system green panel. App icons live in `public/assets/app-icons/` and
are referenced by `app/layout.tsx` metadata and `app/manifest.ts`.

---

## 7. Layout and navigation

`SiteHeader` is sticky at `--z-sticky` and collapses at **900px**. Below that
breakpoint the primary navigation becomes a dropdown panel, the header actions
move into the panel, and a menu toggle (`aria-expanded` + `aria-controls`) is
shown. `Escape` closes the panel, and the panel closes on pathname changes.

Navigation is route-based: Home, Marketplace, Shops, For Sellers and About. The
active item is derived from `usePathname()`, so nested routes such as
`/shops/palm-harvest-foods` keep the Shops item highlighted. Signed-in users see
an account chip in place of Log in / Sign up.

The page shell lives in `app/(site)/layout.tsx`:

```
SiteHeader
main#main-content   ← route page composed from components
SiteFooter
```

A skip link targets `#main-content`, and `SiteFooter` carries the secondary
navigation.

---

## 8. Public routes and discovery

| Route | Purpose |
| ----- | ------- |
| `/` | Homepage: hero search, popular searches, categories, featured shops, featured products, seller CTA |
| `/marketplace` | Product discovery with `q`, `category`, `min`, `max`, `verified` and `sort` query parameters |
| `/shops` | Shop directory with search and category chips |
| `/shops/[slug]` | Storefront: producer profile, stats, products and other shops |
| `/products/[slug]` | Product detail: price, facts, add-to-cart, producer and related products |
| `/login`, `/signup` | Authentication forms |
| `/account` | Protected account page |
| `/seller` | Seller portal preview |
| `/about` | About Oilinga |
| `/design-system` | Living reference for tokens and components |

Discovery is URL-driven. Every filter is a link or a GET form, so results are
shareable, crawlable and survive refresh. Sorting uses a small client select
that pushes an updated query string. Empty results show a reset action.

Product cards link to both the product page and the producer's storefront. Shop
cards link to the storefront and show verified status, location, rating and
product count.

---

## 9. Authentication (Phase 2 demo)

Authentication is currently a browser-persisted demo with a clean seam for a
real provider:

- `AuthProvider` stores accounts in `localStorage` under `oilinga.accounts`
  and the active session under `oilinga.session`.
- A non-sensitive `oilinga_session=1` cookie mirrors the session for future
  server-side checks.
- Demo account: `demo@oilinga.com` / `oilinga` (Amina Okafor).
- Sign-up creates a local account; passwords are demo-only and never sent to a
  server.
- `/account` redirects to `/login?next=/account` when signed out.
- Sign-out clears the session and returns home.

Replace the provider internals with a real identity service in a later phase;
the `useAuth()` surface (`user`, `ready`, `signIn`, `signUp`, `signOut`) can stay
the same.

---

## 10. Responsive strategy

Mobile-first CSS with content-driven breakpoints:

| Breakpoint | Behaviour |
| ---------- | --------- |
| `≤ 1024px` | Compact desktop: tighter gutters, 2-up metrics, narrower hero copy |
| `≤ 900px`  | Navigation collapses; seller dashboard becomes single-column with a horizontal sidebar; categories go 3-up; shop grid 2-up |
| `≤ 760px`  | Mobile: hero stacks photo above copy, trust row 2×2, products 2-up, marketplace filters stack above results, auth aside hides, account and storefront grids stack |
| `≤ 480px`  | Products and category grid go single/2-up; shop grid single; hero actions wrap |

The only breakpoint that changes navigation structure is **900px**; keep new
components aligned with this table rather than inventing new widths.

---

## 9. Accessibility

- Every interactive element has a visible `:focus-visible` ring
  (`--focus-ring`, 3px harvest gold).
- The menu toggle exposes `aria-expanded`/`aria-controls`; the mobile panel
  closes on `Escape`.
- The marketplace filter toggle mirrors this pattern with `aria-expanded`.
- Decorative glyphs and icons are `aria-hidden`; icons with a `label` become
  `role="img"`.
- Toasts use `role="status"` and `aria-live="polite"`.
- A skip link is the first focusable element on the page.
- Motion is disabled under `prefers-reduced-motion`.
- Colour: deep green on cream and white on green both exceed WCAG AA for body
  text; use the semantic text tokens rather than tints for copy.

---

## 10. Environment

`app/layout.tsx` resolves `metadataBase` in this order:

1. `NEXT_PUBLIC_SITE_URL` (set this in production, e.g. `https://oilinga.com`)
2. `https://$VERCEL_URL` on Vercel previews
3. `http://localhost:3000` locally

Open Graph and Twitter images use
`/assets/brand/oilinga-brand-visual-reference.png`.

---

## 11. Legacy files

These files are from the initial vanilla prototype and are **not referenced** by
the Next.js app:

- `public/assets/styles/*`
- `public/assets/scripts/app.js`
- `assets/scripts/app.js`

The active stylesheet layers live in `assets/styles/` and are imported by
`app/globals.css`. The legacy files can be deleted once the team confirms nothing
outside this repository (e.g. an old static deploy) still serves them.

---

## 12. Adding a component

1. Add component CSS to `assets/styles/components.css` (or `layouts.css` for
   structure) using only tokens and the `oi-` prefix.
2. Add a typed React wrapper under `components/` if the component is reused.
3. Add responsive rules alongside the component or in the matching section of
   `app.css` for page compositions.
4. Add an example to `app/design-system/page.tsx` so the component is documented
   visually.
5. Run `npx tsc --noEmit` and `npm run build` before committing.
